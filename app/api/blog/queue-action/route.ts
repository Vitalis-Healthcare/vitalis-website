import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { pin, position, action } = await req.json()

    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (typeof position !== 'number') {
      return NextResponse.json({ error: 'A position is required.' }, { status: 400 })
    }

    const map: Record<string, string> = {
      hold: 'held',
      release: 'review',
      skip: 'skipped',
      unskip: 'pending',
    }
    const newStatus = map[action]
    if (!newStatus) {
      return NextResponse.json({ error: 'Unknown action.' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { error } = await supabase
      .from('blog_queue')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('position', position)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true, position, status: newStatus })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
