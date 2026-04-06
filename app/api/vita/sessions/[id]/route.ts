import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pin = req.headers.get('x-admin-pin')
    if (!pin || pin !== process.env.VITA_ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: sessionId } = await params
    const sb = createServiceClient()

    // Get session
    const { data: session, error: sessErr } = await sb
      .from('vita_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (sessErr || !session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get all messages
    const { data: messages } = await sb
      .from('vita_messages')
      .select('role, content, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    // Get lead if captured
    const { data: lead } = await sb
      .from('vita_leads')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    return NextResponse.json({
      session,
      messages: messages || [],
      lead: lead || null,
    })
  } catch (err) {
    console.error('Session detail error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH — mark lead as followed up
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const pin = req.headers.get('x-admin-pin')
    if (!pin || pin !== process.env.VITA_ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id: sessionId } = await params
    const body = await req.json()
    const sb = createServiceClient()

    if (body.action === 'mark_followed_up') {
      const { error } = await sb
        .from('vita_leads')
        .update({
          followed_up: true,
          followed_up_at: new Date().toISOString(),
          followed_up_by: body.by || 'admin',
          notes: body.notes || null,
        })
        .eq('session_id', sessionId)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err) {
    console.error('Session PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
