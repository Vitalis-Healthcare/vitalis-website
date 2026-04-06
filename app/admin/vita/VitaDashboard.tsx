'use client'

import { useState, useEffect, useCallback } from 'react'

/* ─────────────────────────────────────────────
   Vita Admin Dashboard
   View all chat sessions, transcripts & leads
   ───────────────────────────────────────────── */

interface SessionRow {
  session_id: string
  page_url: string
  started_at: string
  last_msg_at: string
  msg_count: number
  lead_captured: boolean
  preview: string | null
  lead: { name: string; phone: string; followed_up: boolean } | null
}

interface MessageRow {
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

interface LeadDetail {
  id: string
  name: string
  phone: string
  phone_cleaned: string
  context: string
  page_url: string
  followed_up: boolean
  followed_up_at: string | null
  followed_up_by: string | null
  notes: string | null
  created_at: string
}

interface SessionDetail {
  session: SessionRow
  messages: MessageRow[]
  lead: LeadDetail | null
}

type Filter = 'all' | 'leads' | 'today' | 'week'

/* ── Styles ── */
const S = {
  page: { maxWidth: '960px', margin: '0 auto', padding: '40px 24px', fontFamily: 'var(--font-sans, -apple-system, sans-serif)' } as React.CSSProperties,
  h1: { fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '28px', fontWeight: 500, color: '#1a1a1a', marginBottom: '6px' } as React.CSSProperties,
  sub: { fontSize: '14px', color: '#888', marginBottom: '32px' } as React.CSSProperties,

  // PIN
  pinBox: { maxWidth: '360px', margin: '120px auto', textAlign: 'center' as const, padding: '40px 32px', background: '#fff', borderRadius: '16px', border: '1px solid #e2efd0' } as React.CSSProperties,
  pinTitle: { fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '22px', fontWeight: 500, marginBottom: '8px', color: '#1a1a1a' } as React.CSSProperties,
  pinSub: { fontSize: '13px', color: '#888', marginBottom: '24px' } as React.CSSProperties,
  pinInput: { width: '100%', padding: '12px 16px', border: '1.5px solid #d4e8b8', borderRadius: '8px', fontSize: '18px', textAlign: 'center' as const, letterSpacing: '4px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const } as React.CSSProperties,
  pinBtn: { width: '100%', marginTop: '14px', padding: '12px', background: '#5a9e2f', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' } as React.CSSProperties,
  pinErr: { marginTop: '12px', fontSize: '13px', color: '#c0392b' } as React.CSSProperties,

  // Stats
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '24px' } as React.CSSProperties,
  statCard: { padding: '16px 18px', background: '#f3f9ec', borderRadius: '10px', border: '1px solid #e2efd0' } as React.CSSProperties,
  statLabel: { fontSize: '11px', color: '#888', textTransform: 'uppercase' as const, letterSpacing: '.06em', marginBottom: '4px' } as React.CSSProperties,
  statVal: { fontSize: '26px', fontWeight: 600, color: '#3b6d11' } as React.CSSProperties,

  // Filters
  filterRow: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' as const } as React.CSSProperties,
  filterBtn: (active: boolean) => ({
    padding: '7px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', border: active ? '1.5px solid #5a9e2f' : '1.5px solid #e2efd0', background: active ? '#eaf3de' : '#fff', color: active ? '#3b6d11' : '#666', transition: 'all .15s',
  } as React.CSSProperties),

  // Session list
  sessionCard: { padding: '16px 18px', background: '#fff', border: '1px solid #e8e8e4', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer', transition: 'border-color .15s' } as React.CSSProperties,
  sessionTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '6px' } as React.CSSProperties,
  sessionTime: { fontSize: '12px', color: '#999', flexShrink: 0 } as React.CSSProperties,
  sessionPreview: { fontSize: '14px', color: '#444', lineHeight: 1.5 } as React.CSSProperties,
  sessionMeta: { display: 'flex', gap: '10px', marginTop: '8px', flexWrap: 'wrap' as const } as React.CSSProperties,
  badge: (color: string, bg: string) => ({
    display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, color, background: bg,
  } as React.CSSProperties),

  // Detail panel
  detailPanel: { position: 'fixed' as const, top: 0, right: 0, width: '480px', height: '100vh', background: '#fff', boxShadow: '-8px 0 32px rgba(0,0,0,.1)', zIndex: 1000, display: 'flex', flexDirection: 'column' as const, animation: 'slideIn .25s ease-out' } as React.CSSProperties,
  detailHeader: { padding: '20px 24px', borderBottom: '1px solid #e8e8e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 } as React.CSSProperties,
  detailClose: { background: 'none', border: 'none', fontSize: '20px', color: '#999', cursor: 'pointer', padding: '4px' } as React.CSSProperties,
  detailBody: { flex: 1, overflowY: 'auto' as const, padding: '20px 24px' } as React.CSSProperties,
  msgBubble: (isUser: boolean) => ({
    maxWidth: '90%', padding: '10px 14px', marginBottom: '8px', fontSize: '13px', lineHeight: 1.6, wordBreak: 'break-word' as const, whiteSpace: 'pre-wrap' as const,
    ...(isUser
      ? { alignSelf: 'flex-end', background: '#3b6d11', color: '#fff', borderRadius: '14px 4px 14px 14px' }
      : { alignSelf: 'flex-start', background: '#f3f9ec', color: '#1a1a1a', borderRadius: '4px 14px 14px 14px', border: '1px solid #e2efd0' }),
  } as React.CSSProperties),

  leadCard: { margin: '16px 0', padding: '16px', background: '#fff', border: '1.5px solid #97c459', borderRadius: '10px' } as React.CSSProperties,
  followUpBtn: { padding: '9px 18px', background: '#5a9e2f', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: '10px' } as React.CSSProperties,
}

export default function VitaDashboard() {
  // Auth
  const [pin, setPin] = useState('')
  const [authed, setAuthed] = useState(false)
  const [storedPin, setStoredPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [pinLoading, setPinLoading] = useState(false)

  // Data
  const [sessions, setSessions] = useState<SessionRow[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<Filter>('all')
  const [pageNum, setPageNum] = useState(0)

  // Detail
  const [detail, setDetail] = useState<SessionDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [followUpNotes, setFollowUpNotes] = useState('')
  const [markingFollowUp, setMarkingFollowUp] = useState(false)

  // ── PIN login ──
  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPinLoading(true)
    setPinError('')
    try {
      const res = await fetch('/api/vita/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (res.ok) {
        setAuthed(true)
        setStoredPin(pin)
      } else {
        setPinError('Incorrect PIN — please try again.')
        setPin('')
      }
    } catch {
      setPinError('Network error — please try again.')
    }
    setPinLoading(false)
  }

  // ── Fetch sessions ──
  const fetchSessions = useCallback(async () => {
    if (!storedPin) return
    setLoading(true)
    try {
      const res = await fetch(`/api/vita/sessions?filter=${filter}&page=${pageNum}`, {
        headers: { 'x-admin-pin': storedPin },
      })
      const data = await res.json()
      setSessions(data.sessions || [])
      setTotal(data.total || 0)
    } catch {
      console.error('Failed to fetch sessions')
    }
    setLoading(false)
  }, [storedPin, filter, pageNum])

  useEffect(() => {
    if (authed) fetchSessions()
  }, [authed, fetchSessions])

  // ── Open session detail ──
  async function openDetail(sessionId: string) {
    setDetailLoading(true)
    setDetail(null)
    setFollowUpNotes('')
    try {
      const res = await fetch(`/api/vita/sessions/${sessionId}`, {
        headers: { 'x-admin-pin': storedPin },
      })
      const data = await res.json()
      setDetail(data)
    } catch {
      console.error('Failed to fetch session detail')
    }
    setDetailLoading(false)
  }

  // ── Mark as followed up ──
  async function markFollowedUp() {
    if (!detail?.session?.session_id) return
    setMarkingFollowUp(true)
    try {
      await fetch(`/api/vita/sessions/${detail.session.session_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-pin': storedPin },
        body: JSON.stringify({ action: 'mark_followed_up', notes: followUpNotes, by: 'admin' }),
      })
      // Refresh
      await openDetail(detail.session.session_id)
      await fetchSessions()
    } catch {
      console.error('Failed to mark follow-up')
    }
    setMarkingFollowUp(false)
  }

  // ── Helpers ──
  function fmtTime(iso: string) {
    const d = new Date(iso)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return 'Just now'
    if (diffMin < 60) return `${diffMin}m ago`
    const diffHr = Math.floor(diffMin / 60)
    if (diffHr < 24) return `${diffHr}h ago`
    const diffDay = Math.floor(diffHr / 24)
    if (diffDay < 7) return `${diffDay}d ago`
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  function fmtFull(iso: string) {
    return new Date(iso).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York',
    }) + ' ET'
  }

  // ── Computed stats ──
  const totalSessions = total
  const leadCount = sessions.filter((s) => s.lead_captured).length
  const pendingFollowUps = sessions.filter((s) => s.lead && !s.lead.followed_up).length
  const todayCount = sessions.filter((s) => {
    const d = new Date(s.started_at)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  // ═══════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════

  // PIN screen
  if (!authed) {
    return (
      <div style={S.page}>
        <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        <div style={S.pinBox}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌿</div>
          <div style={S.pinTitle}>Vita Dashboard</div>
          <div style={S.pinSub}>Enter admin PIN to continue</div>
          <form onSubmit={handlePinSubmit}>
            <input
              style={S.pinInput}
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="• • • •"
              autoFocus
              disabled={pinLoading}
            />
            <button style={S.pinBtn} type="submit" disabled={pinLoading || !pin}>
              {pinLoading ? 'Verifying...' : 'Open Dashboard'}
            </button>
          </form>
          {pinError && <div style={S.pinErr}>{pinError}</div>}
        </div>
      </div>
    )
  }

  // Main dashboard
  return (
    <div style={S.page}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @media (max-width: 640px) {
          .vita-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .vita-detail-panel { width: 100vw !important; }
        }
      `}</style>

      <h1 style={S.h1}>🌿 Vita Dashboard</h1>
      <p style={S.sub}>Chat sessions, transcripts & leads from the Vita care advisor</p>

      {/* Stats */}
      <div style={S.statsRow} className="vita-stats-grid">
        <div style={S.statCard}>
          <div style={S.statLabel}>Total sessions</div>
          <div style={S.statVal}>{totalSessions}</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Leads captured</div>
          <div style={S.statVal}>{leadCount}</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Pending follow-up</div>
          <div style={{ ...S.statVal, color: pendingFollowUps > 0 ? '#c0392b' : '#3b6d11' }}>{pendingFollowUps}</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Today</div>
          <div style={S.statVal}>{todayCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div style={S.filterRow}>
        {([['all', 'All Sessions'], ['leads', 'With Leads'], ['today', 'Today'], ['week', 'This Week']] as [Filter, string][]).map(([f, label]) => (
          <button
            key={f}
            style={S.filterBtn(filter === f)}
            onClick={() => { setFilter(f); setPageNum(0) }}
          >
            {label}
          </button>
        ))}
        <button
          style={{ ...S.filterBtn(false), marginLeft: 'auto' }}
          onClick={fetchSessions}
        >
          ↻ Refresh
        </button>
      </div>

      {/* Session list */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading sessions...</div>
      ) : sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888', fontSize: '14px' }}>
          No sessions found for this filter. Conversations will appear here once visitors start chatting with Vita.
        </div>
      ) : (
        <>
          {sessions.map((s) => (
            <div
              key={s.session_id}
              style={{ ...S.sessionCard, borderColor: s.lead_captured && s.lead && !s.lead.followed_up ? '#97c459' : '#e8e8e4' }}
              onClick={() => openDetail(s.session_id)}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = '#97c459' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = s.lead_captured && s.lead && !s.lead.followed_up ? '#97c459' : '#e8e8e4' }}
            >
              <div style={S.sessionTop}>
                <div>
                  {s.lead && (
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#3b6d11', marginRight: '8px' }}>
                      {s.lead.name}
                    </span>
                  )}
                  <span style={S.sessionPreview}>
                    {s.preview ? (s.preview.length > 100 ? s.preview.slice(0, 100) + '…' : s.preview) : 'No messages yet'}
                  </span>
                </div>
                <span style={S.sessionTime}>{fmtTime(s.started_at)}</span>
              </div>
              <div style={S.sessionMeta}>
                <span style={S.badge('#666', '#f0f0ec')}>{s.msg_count} msgs</span>
                {s.lead_captured && (
                  <span style={S.badge('#3b6d11', '#eaf3de')}>
                    📞 Lead
                  </span>
                )}
                {s.lead && !s.lead.followed_up && (
                  <span style={S.badge('#c0392b', '#fde8e8')}>
                    Needs follow-up
                  </span>
                )}
                {s.lead?.followed_up && (
                  <span style={S.badge('#27500a', '#d4e8b8')}>
                    ✓ Followed up
                  </span>
                )}
                {s.page_url && s.page_url !== '/' && (
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{s.page_url}</span>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {total > 30 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '20px' }}>
              <button
                style={S.filterBtn(false)}
                onClick={() => setPageNum(Math.max(0, pageNum - 1))}
                disabled={pageNum === 0}
              >
                ← Previous
              </button>
              <span style={{ fontSize: '13px', color: '#888', padding: '8px' }}>
                Page {pageNum + 1} of {Math.ceil(total / 30)}
              </span>
              <button
                style={S.filterBtn(false)}
                onClick={() => setPageNum(pageNum + 1)}
                disabled={(pageNum + 1) * 30 >= total}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {/* ── Detail Panel (slide-in from right) ── */}
      {(detail || detailLoading) && (
        <>
          {/* Overlay */}
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.2)', zIndex: 999 }}
            onClick={() => setDetail(null)}
          />

          <div style={S.detailPanel} className="vita-detail-panel">
            <div style={S.detailHeader}>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a1a' }}>
                  {detail?.lead?.name || 'Chat Session'}
                </div>
                {detail?.session && (
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                    {fmtFull(detail.session.started_at)} · {detail.session.msg_count} messages
                  </div>
                )}
              </div>
              <button style={S.detailClose} onClick={() => setDetail(null)}>✕</button>
            </div>

            <div style={S.detailBody}>
              {detailLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Loading transcript...</div>
              ) : detail ? (
                <>
                  {/* Lead info card */}
                  {detail.lead && (
                    <div style={S.leadCard}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#3b6d11', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📞</span> Lead Information
                      </div>
                      <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                        <tbody>
                          <tr>
                            <td style={{ padding: '4px 0', color: '#888', width: '100px' }}>Name</td>
                            <td style={{ padding: '4px 0', fontWeight: 600 }}>{detail.lead.name}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '4px 0', color: '#888' }}>Phone</td>
                            <td style={{ padding: '4px 0' }}>
                              <a href={`tel:${detail.lead.phone_cleaned}`} style={{ color: '#3b6d11', fontWeight: 600 }}>
                                {detail.lead.phone}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '4px 0', color: '#888', verticalAlign: 'top' }}>Asked about</td>
                            <td style={{ padding: '4px 0', color: '#444' }}>{detail.lead.context}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '4px 0', color: '#888' }}>Page</td>
                            <td style={{ padding: '4px 0', color: '#aaa' }}>{detail.lead.page_url}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '4px 0', color: '#888' }}>Submitted</td>
                            <td style={{ padding: '4px 0', color: '#aaa' }}>{fmtFull(detail.lead.created_at)}</td>
                          </tr>
                          {detail.lead.followed_up && (
                            <tr>
                              <td style={{ padding: '4px 0', color: '#888' }}>Followed up</td>
                              <td style={{ padding: '4px 0', color: '#27500a', fontWeight: 500 }}>
                                ✓ {detail.lead.followed_up_at ? fmtFull(detail.lead.followed_up_at) : 'Yes'}
                                {detail.lead.followed_up_by && ` by ${detail.lead.followed_up_by}`}
                              </td>
                            </tr>
                          )}
                          {detail.lead.notes && (
                            <tr>
                              <td style={{ padding: '4px 0', color: '#888', verticalAlign: 'top' }}>Notes</td>
                              <td style={{ padding: '4px 0', color: '#444' }}>{detail.lead.notes}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {/* Follow-up action */}
                      {!detail.lead.followed_up && (
                        <div style={{ marginTop: '14px', borderTop: '1px solid #e2efd0', paddingTop: '14px' }}>
                          <textarea
                            style={{ width: '100%', border: '1px solid #d4e8b8', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical', minHeight: '50px', outline: 'none', boxSizing: 'border-box' }}
                            placeholder="Optional notes (e.g. 'Left voicemail', 'Scheduled intake call for Thursday')"
                            value={followUpNotes}
                            onChange={(e) => setFollowUpNotes(e.target.value)}
                          />
                          <button
                            style={S.followUpBtn}
                            onClick={markFollowedUp}
                            disabled={markingFollowUp}
                          >
                            {markingFollowUp ? 'Saving...' : '✓ Mark as Followed Up'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Transcript */}
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '12px', marginTop: '20px' }}>
                    Conversation Transcript
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {detail.messages.map((m, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={S.msgBubble(m.role === 'user')}>
                          {m.content}
                        </div>
                        <div style={{
                          fontSize: '10px', color: '#bbb', marginBottom: '6px',
                          alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                          paddingLeft: m.role === 'user' ? 0 : '4px',
                          paddingRight: m.role === 'user' ? '4px' : 0,
                        }}>
                          {new Date(m.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {detail.messages.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '30px', color: '#aaa', fontSize: '13px' }}>
                      No messages recorded for this session.
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
