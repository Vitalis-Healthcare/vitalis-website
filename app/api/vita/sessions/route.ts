import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    // Verify PIN from header
    const pin = req.headers.get('x-admin-pin')
    if (!pin || pin !== process.env.VITA_ADMIN_PIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sb = createServiceClient()
    const url = new URL(req.url)
    const filter = url.searchParams.get('filter') || 'all'
    const page = parseInt(url.searchParams.get('page') || '0')
    const limit = 30
    const offset = page * limit

    // Base query
    let query = sb
      .from('vita_sessions')
      .select('*', { count: 'exact' })
      .order('started_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (filter === 'leads') {
      query = query.eq('lead_captured', true)
    } else if (filter === 'today') {
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)
      query = query.gte('started_at', todayStart.toISOString())
    } else if (filter === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      query = query.gte('started_at', weekAgo.toISOString())
    }

    const { data: sessions, count, error } = await query

    if (error) {
      console.error('Sessions query error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // For each session, get the first user message as a preview
    const sessionIds = (sessions || []).map((s) => s.session_id)

    let previews: Record<string, string> = {}
    if (sessionIds.length > 0) {
      const { data: msgs } = await sb
        .from('vita_messages')
        .select('session_id, content')
        .in('session_id', sessionIds)
        .eq('role', 'user')
        .order('created_at', { ascending: true })

      if (msgs) {
        // Take the first user message per session
        for (const m of msgs) {
          if (!previews[m.session_id]) {
            previews[m.session_id] = m.content.slice(0, 120)
          }
        }
      }
    }

    // Get leads for sessions that have them
    let leads: Record<string, { name: string; phone: string; followed_up: boolean }> = {}
    const leadSessionIds = (sessions || []).filter((s) => s.lead_captured).map((s) => s.session_id)

    if (leadSessionIds.length > 0) {
      const { data: leadRows } = await sb
        .from('vita_leads')
        .select('session_id, name, phone, followed_up')
        .in('session_id', leadSessionIds)

      if (leadRows) {
        for (const l of leadRows) {
          if (l.session_id) {
            leads[l.session_id] = { name: l.name, phone: l.phone, followed_up: l.followed_up }
          }
        }
      }
    }

    // Assemble response
    const enriched = (sessions || []).map((s) => ({
      ...s,
      preview: previews[s.session_id] || null,
      lead: leads[s.session_id] || null,
    }))

    return NextResponse.json({ sessions: enriched, total: count || 0, page, limit })
  } catch (err) {
    console.error('Vita sessions API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
