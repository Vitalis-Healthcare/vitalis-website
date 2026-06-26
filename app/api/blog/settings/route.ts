import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { pin, action } = body

    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createServiceClient()

    if (action === 'get') {
      const { data, error } = await supabase
        .from('blog_settings')
        .select('armed, start_monday, veto_days, web_search, last_run_at, last_run_note')
        .eq('id', 1)
        .maybeSingle()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ ok: true, settings: data })
    }

    if (action === 'save') {
      const armed = !!body.armed
      const startMonday: string | null = body.start_monday || null
      const vetoDays = Number.isFinite(body.veto_days) ? Math.max(0, Math.min(7, body.veto_days)) : 2
      const webSearch = body.web_search !== false

      if (armed && !startMonday) {
        return NextResponse.json({ error: 'A start date is required to arm.' }, { status: 400 })
      }

      const { error: upErr } = await supabase
        .from('blog_settings')
        .update({
          armed,
          start_monday: startMonday,
          veto_days: vetoDays,
          web_search: webSearch,
          updated_at: new Date().toISOString(),
        })
        .eq('id', 1)
      if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 })

      // Stamp publish dates whenever a start date is provided.
      if (startMonday) {
        const { error: rpcErr } = await supabase.rpc('arm_blog_schedule', { p_start: startMonday })
        if (rpcErr) return NextResponse.json({ error: rpcErr.message }, { status: 500 })
      }

      const { data } = await supabase
        .from('blog_settings')
        .select('armed, start_monday, veto_days, web_search, last_run_at, last_run_note')
        .eq('id', 1)
        .maybeSingle()
      return NextResponse.json({ ok: true, settings: data })
    }

    return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
