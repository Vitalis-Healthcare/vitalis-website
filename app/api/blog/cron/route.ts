// Vitalis blog automation — cron engine (v0.5.x). v0.5.3: in-process invocation.
import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { POST as runAutoGenerate } from '@/app/api/blog/auto-generate/route'
import { POST as runPublish } from '@/app/api/blog/publish/route'

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

function fmtDate(d: string | null): string {
  if (!d) return 'unscheduled'
  return new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
}

function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Build an in-process request for an internal route handler.
function internalRequest(path: string, body: unknown): NextRequest {
  return new NextRequest(`${SITE_URL}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

type StagedItem = { position: number; title: string; publish_date: string | null; valid: boolean }
type PublishedItem = { position: number; title: string; url: string }

// Soft-fail digest email — never throws, never blocks the run.
async function sendDigest(staged: StagedItem[], published: PublishedItem[]) {
  const key = process.env.RESEND_API_KEY
  if (!key) return
  if (staged.length === 0 && published.length === 0) return

  const to = process.env.BLOG_NOTIFY_EMAIL || 'info@vitalishealthcare.com'
  const dash = `${SITE_URL}/admin/blog/queue`

  const stagedRows = staged.map((s) => `
    <tr><td style="padding:9px 0;border-bottom:1px solid #eee;font-size:14px;color:#111827;">
      ${esc(s.title)}<br>
      <span style="font-size:12px;color:#6b7280;">Publishes ${fmtDate(s.publish_date)} &middot; ${
        s.valid ? 'passed all checks' : '&#9888; failed checks — will NOT auto-publish'
      }</span>
    </td></tr>`).join('')

  const publishedRows = published.map((p) => `
    <tr><td style="padding:9px 0;border-bottom:1px solid #eee;font-size:14px;color:#111827;">
      ${esc(p.title)}<br>
      <a href="${p.url}" style="font-size:12px;color:#2D5A1B;">${esc(p.url)}</a>
    </td></tr>`).join('')

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:560px;margin:0 auto;">
    <div style="background:#2D5A1B;padding:18px 22px;border-radius:10px 10px 0 0;">
      <span style="color:#ffffff;font-size:18px;font-weight:700;">Vitalis HealthCare &mdash; blog automation</span>
    </div>
    <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:20px 22px;">
      ${staged.length ? `
        <h2 style="font-size:15px;color:#2D5A1B;margin:0 0 8px;">Staged for review (${staged.length})</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">${stagedRows}</table>
        <p style="font-size:13px;color:#6b7280;margin:0 0 20px;line-height:1.5;">
          These publish on their dates unless you hold them. Review or hold here:
          <a href="${dash}" style="color:#2D5A1B;font-weight:600;">${esc(dash)}</a>
        </p>` : ''}
      ${published.length ? `
        <h2 style="font-size:15px;color:#2D5A1B;margin:0 0 8px;">Published (${published.length})</h2>
        <table style="width:100%;border-collapse:collapse;">${publishedRows}</table>` : ''}
    </div>
    <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:14px;">
      Vitalis HealthCare Services &middot; Silver Spring, MD &middot; automated notification
    </p>
  </div>`

  const subject = `Vitalis blog: ${staged.length} staged, ${published.length} published`

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Vitalis Blog <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      }),
    })
  } catch (e) {
    console.error('blog digest email error:', e instanceof Error ? e.message : e)
  }
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

  const staged: StagedItem[] = []
  const published: PublishedItem[] = []
  const genErrs: string[] = []
  const pubErrs: string[] = []
  let genAttempts = 0
  let pubAttempts = 0

  // ── Generate phase: stage drafts within the veto window (in-process call) ──
  const { data: toGen } = await supabase
    .from('blog_queue')
    .select('position, topic_title, publish_date')
    .eq('status', 'pending')
    .not('publish_date', 'is', null)
    .lte('publish_date', generateCutoff)
    .order('publish_date', { ascending: true })
    .limit(MAX_GENERATE_PER_RUN)

  for (const row of toGen || []) {
    genAttempts++
    try {
      const res = await runAutoGenerate(
        internalRequest('/api/blog/auto-generate', { pin, position: row.position, websearch: webSearch })
      )
      const text = await res.text()
      let data: { draft?: { title?: string }; valid?: boolean; error?: string } = {}
      try { data = JSON.parse(text) } catch { /* non-JSON */ }
      if (res.ok) {
        staged.push({
          position: row.position,
          title: (data.draft && data.draft.title) || row.topic_title,
          publish_date: row.publish_date,
          valid: !!data.valid,
        })
      } else {
        genErrs.push(`p${row.position}:${res.status} ${(data.error || text.slice(0, 90)).replace(/\s+/g, ' ').trim()}`)
      }
    } catch (e) {
      genErrs.push(`p${row.position}:threw ${(e instanceof Error ? e.message : 'error').slice(0, 90)}`)
    }
  }

  // ── Publish phase: publish review drafts whose date has arrived ───────────
  const { data: toPub } = await supabase
    .from('blog_queue')
    .select('position, topic_title')
    .eq('status', 'review')
    .not('publish_date', 'is', null)
    .lte('publish_date', today)
    .order('publish_date', { ascending: true })

  for (const row of toPub || []) {
    pubAttempts++
    try {
      const res = await runPublish(
        internalRequest('/api/blog/publish', { pin, position: row.position })
      )
      const text = await res.text()
      let data: { url?: string; error?: string } = {}
      try { data = JSON.parse(text) } catch { /* non-JSON */ }
      if (res.ok) {
        published.push({ position: row.position, title: row.topic_title, url: data.url || '' })
      } else {
        pubErrs.push(`p${row.position}:${res.status} ${(data.error || text.slice(0, 90)).replace(/\s+/g, ' ').trim()}`)
      }
    } catch (e) {
      pubErrs.push(`p${row.position}:threw ${(e instanceof Error ? e.message : 'error').slice(0, 90)}`)
    }
  }

  await sendDigest(staged, published)

  let note = `generated ${staged.length}/${genAttempts}, published ${published.length}/${pubAttempts}`
  if (genErrs.length) note += ` || gen ${genErrs.join(' ; ')}`
  if (pubErrs.length) note += ` || pub ${pubErrs.join(' ; ')}`
  note = note.slice(0, 480)
  await supabase
    .from('blog_settings')
    .update({ last_run_at: new Date().toISOString(), last_run_note: note })
    .eq('id', 1)

  return { ok: true, staged, published, genErrs, pubErrs, note }
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
