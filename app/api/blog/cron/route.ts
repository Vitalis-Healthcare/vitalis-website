import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 300
export const dynamic = 'force-dynamic'

const SITE_URL = process.env.SITE_URL || 'https://vitalishealthcare.com'
const MAX_GENERATE_PER_RUN = 2

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

async function runCron() {
  const supabase = createServiceClient()
  const pin = process.env.BLOG_ADMIN_PIN || ''

  const { data: settings, error: sErr } = await supabase
    .from('blog_settings')
    .select('armed, veto_days, web_search')
    .eq('id', 1)
    .maybeSingle()
  if (sErr) return { ok: false, error: sErr.message }
  if (!settings || !settings.armed) return { ok: true, skipped: 'not armed' }

  const today = new Date().toISOString().slice(0, 10)
  const vetoDays = typeof settings.veto_days === 'number' ? settings.veto_days : 2
  const webSearch = settings.web_search !== false
  const generateCutoff = addDays(today, vetoDays)

  const generated: Array<{ position: number; ok: boolean; note: string }> = []
  const published: Array<{ position: number; ok: boolean; note: string }> = []

  // ── Generate phase: stage drafts that are within the veto window ──────────
  const { data: toGen } = await supabase
    .from('blog_queue')
    .select('position')
    .eq('status', 'pending')
    .not('publish_date', 'is', null)
    .lte('publish_date', generateCutoff)
    .order('publish_date', { ascending: true })
    .limit(MAX_GENERATE_PER_RUN)

  for (const row of toGen || []) {
    try {
      const res = await fetch(`${SITE_URL}/api/blog/auto-generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, position: row.position, websearch: webSearch }),
      })
      const data = await res.json().catch(() => ({}))
      generated.push({ position: row.position, ok: res.ok, note: res.ok ? (data.valid ? 'valid' : 'failed checks') : data.error || 'error' })
    } catch (e) {
      generated.push({ position: row.position, ok: false, note: e instanceof Error ? e.message : 'error' })
    }
  }

  // ── Publish phase: publish review drafts whose date has arrived ───────────
  const { data: toPub } = await supabase
    .from('blog_queue')
    .select('position')
    .eq('status', 'review')
    .not('publish_date', 'is', null)
    .lte('publish_date', today)
    .order('publish_date', { ascending: true })

  for (const row of toPub || []) {
    try {
      const res = await fetch(`${SITE_URL}/api/blog/publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, position: row.position }),
      })
      const data = await res.json().catch(() => ({}))
      published.push({ position: row.position, ok: res.ok, note: res.ok ? data.slug : data.error || 'error' })
    } catch (e) {
      published.push({ position: row.position, ok: false, note: e instanceof Error ? e.message : 'error' })
    }
  }

  const note = `generated ${generated.filter((g) => g.ok).length}/${generated.length}, published ${published.filter((p) => p.ok).length}/${published.length}`
  await supabase
    .from('blog_settings')
    .update({ last_run_at: new Date().toISOString(), last_run_note: note })
    .eq('id', 1)

  return { ok: true, generated, published, note }
}

// Vercel cron hits GET. If CRON_SECRET is set, require it.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = req.headers.get('authorization') || ''
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }
  const result = await runCron()
  return NextResponse.json(result)
}

// Manual "run now" from the dashboard, PIN-protected.
export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json()
    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const result = await runCron()
    return NextResponse.json(result)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
