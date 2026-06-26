'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import type { QueueRow } from './page'

const GREEN_DARK = '#2D5A1B'
const GREEN_BRIGHT = '#7AB52A'

const AUD_LABEL: Record<string, string> = {
  clients: 'Clients',
  caregivers: 'Caregivers',
  planners: 'Planners',
}
const AUD_COLOR: Record<string, { bg: string; text: string }> = {
  clients: { bg: '#e6f1fb', text: '#185fa5' },
  caregivers: { bg: '#faeeda', text: '#854f0b' },
  planners: { bg: '#f3eefa', text: '#5b3a8c' },
}
const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#eef2f6', text: '#475569' },
  generating: { bg: '#fff7e6', text: '#92600a' },
  review: { bg: '#e6f1fb', text: '#185fa5' },
  published: { bg: '#eaf3de', text: '#27500a' },
  skipped: { bg: '#f1f1f1', text: '#777777' },
  failed: { bg: '#fbeaea', text: '#a3261f' },
}

function Badge({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: bg,
        color: text,
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: 999,
        whiteSpace: 'nowrap',
        textTransform: 'capitalize',
      }}
    >
      {label}
    </span>
  )
}

export default function QueueViewer({
  rows,
  loadError,
}: {
  rows: QueueRow[]
  loadError: string
}) {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [err, setErr] = useState('')
  const [checking, setChecking] = useState(false)

  const weeks = useMemo(() => {
    const w: Record<number, QueueRow[]> = {}
    for (const r of rows) {
      if (!w[r.week_number]) w[r.week_number] = []
      w[r.week_number].push(r)
    }
    return w
  }, [rows])

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const r of rows) c[r.status] = (c[r.status] || 0) + 1
    return c
  }, [rows])

  async function submitPin() {
    setChecking(true)
    setErr('')
    try {
      const res = await fetch('/api/blog/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (res.ok) setAuthed(true)
      else setErr('Incorrect PIN')
    } catch {
      setErr('Something went wrong. Please try again.')
    } finally {
      setChecking(false)
    }
  }

  const wrap: CSSProperties = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: 1040,
    margin: '0 auto',
    padding: '40px 24px 80px',
    color: '#1f2937',
  }

  if (!authed) {
    return (
      <div style={wrap}>
        <div style={{ maxWidth: 380, margin: '60px auto', textAlign: 'center' }}>
          <h1 style={{ color: GREEN_DARK, fontSize: 24, marginBottom: 4 }}>
            Blog Queue
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
            Enter the blog admin PIN to continue.
          </p>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitPin()
            }}
            placeholder="PIN"
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 16,
              border: '1px solid #d1d5db',
              borderRadius: 8,
              boxSizing: 'border-box',
              marginBottom: 12,
            }}
          />
          {err && (
            <p style={{ color: '#a3261f', fontSize: 13, marginBottom: 12 }}>{err}</p>
          )}
          <button
            onClick={submitPin}
            disabled={checking}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 15,
              fontWeight: 600,
              color: '#fff',
              background: checking ? '#9ca3af' : GREEN_DARK,
              border: 'none',
              borderRadius: 8,
              cursor: checking ? 'default' : 'pointer',
            }}
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={wrap}>
      <h1 style={{ color: GREEN_DARK, fontSize: 28, marginBottom: 4 }}>Blog Queue</h1>
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 24 }}>
        The 30-week content plan, in publish order. This view is read-only.
      </p>

      {loadError ? (
        <div
          style={{
            background: '#fbeaea',
            color: '#a3261f',
            border: '1px solid #f3c0c0',
            borderRadius: 10,
            padding: '16px 18px',
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <strong>Could not load the queue.</strong>
          <div style={{ marginTop: 6 }}>{loadError}</div>
          <div style={{ marginTop: 10, color: '#7a1d18' }}>
            If this says the table is missing, run{' '}
            <code>migrations/002_blog_queue.sql</code> in the Supabase SQL Editor,
            then refresh.
          </div>
        </div>
      ) : (
        <>
          {/* Summary chips */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            <Badge label={`${rows.length} topics`} bg={GREEN_BRIGHT} text="#1a3a0f" />
            {['pending', 'generating', 'review', 'published', 'failed', 'skipped'].map(
              (s) =>
                counts[s] ? (
                  <Badge
                    key={s}
                    label={`${counts[s]} ${s}`}
                    bg={STATUS_COLOR[s].bg}
                    text={STATUS_COLOR[s].text}
                  />
                ) : null
            )}
          </div>

          {Object.keys(weeks)
            .map(Number)
            .sort((a, b) => a - b)
            .map((wk) => (
              <div key={wk} style={{ marginBottom: 18 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    color: GREEN_DARK,
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Week {wk}
                </div>
                <div
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  {weeks[wk].map((r, i) => {
                    const aud = AUD_COLOR[r.audience] || {
                      bg: '#eee',
                      text: '#444',
                    }
                    const st = STATUS_COLOR[r.status] || { bg: '#eee', text: '#444' }
                    return (
                      <div
                        key={r.position}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 12,
                          padding: '12px 16px',
                          borderTop: i === 0 ? 'none' : '1px solid #f1f1f1',
                          background: '#fff',
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            flexShrink: 0,
                            color: '#9ca3af',
                            fontSize: 13,
                            fontWeight: 600,
                            paddingTop: 1,
                          }}
                        >
                          {r.position}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: '#111827',
                              marginBottom: 4,
                            }}
                          >
                            {r.topic_title}
                          </div>
                          <div
                            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
                          >
                            <Badge label={AUD_LABEL[r.audience] || r.audience} bg={aud.bg} text={aud.text} />
                            <span style={{ fontSize: 12, color: '#6b7280' }}>{r.category}</span>
                            {r.publish_date && (
                              <span style={{ fontSize: 12, color: '#9ca3af' }}>
                                · {r.publish_date}
                              </span>
                            )}
                          </div>
                          {r.notes && (
                            <div
                              style={{
                                fontSize: 12,
                                color: '#9ca3af',
                                marginTop: 6,
                                fontStyle: 'italic',
                                lineHeight: 1.4,
                              }}
                            >
                              {r.notes}
                            </div>
                          )}
                        </div>
                        <div style={{ flexShrink: 0 }}>
                          <Badge label={r.status} bg={st.bg} text={st.text} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}
