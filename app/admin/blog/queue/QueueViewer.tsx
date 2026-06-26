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

type Check = { check: string; pass: boolean; detail: string }
type GenResult = {
  ok: boolean
  position: number
  valid: boolean
  draft: {
    title: string
    slug: string
    excerpt: string
    category: string
    metaTitle: string
    metaDescription: string
    focusKeyword: string
    secondaryKeywords: string
    body: string
  }
  validation: Check[]
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

  const [localRows, setLocalRows] = useState<QueueRow[]>(rows)
  const [generatingPos, setGeneratingPos] = useState<number | null>(null)
  const [genError, setGenError] = useState('')
  const [result, setResult] = useState<GenResult | null>(null)

  const weeks = useMemo(() => {
    const w: Record<number, QueueRow[]> = {}
    for (const r of localRows) {
      if (!w[r.week_number]) w[r.week_number] = []
      w[r.week_number].push(r)
    }
    return w
  }, [localRows])

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const r of localRows) c[r.status] = (c[r.status] || 0) + 1
    return c
  }, [localRows])

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

  async function generate(position: number) {
    setGeneratingPos(position)
    setGenError('')
    setResult(null)
    try {
      const res = await fetch('/api/blog/auto-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, position }),
      })
      const data = await res.json()
      if (!res.ok) {
        setGenError(data.error || 'Generation failed.')
        setLocalRows((prev) =>
          prev.map((r) => (r.position === position ? { ...r, status: 'failed' } : r))
        )
        return
      }
      setResult(data as GenResult)
      setLocalRows((prev) =>
        prev.map((r) =>
          r.position === position ? { ...r, status: 'review', slug: data.draft.slug } : r
        )
      )
    } catch {
      setGenError('Network error during generation.')
    } finally {
      setGeneratingPos(null)
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
          <h1 style={{ color: GREEN_DARK, fontSize: 24, marginBottom: 4 }}>Blog Queue</h1>
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
          {err && <p style={{ color: '#a3261f', fontSize: 13, marginBottom: 12 }}>{err}</p>}
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
      <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 20 }}>
        The 30-week content plan, in publish order. Click <strong>Generate draft</strong> on any
        pending topic to test the writer — it stages a draft for review and publishes nothing.
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
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            <Badge label={`${localRows.length} topics`} bg={GREEN_BRIGHT} text="#1a3a0f" />
            {['pending', 'generating', 'review', 'published', 'failed', 'skipped'].map((s) =>
              counts[s] ? (
                <Badge key={s} label={`${counts[s]} ${s}`} bg={STATUS_COLOR[s].bg} text={STATUS_COLOR[s].text} />
              ) : null
            )}
          </div>

          {genError && (
            <div
              style={{
                background: '#fbeaea',
                color: '#a3261f',
                border: '1px solid #f3c0c0',
                borderRadius: 10,
                padding: '12px 16px',
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              {genError}
            </div>
          )}

          {result && <ReviewPanel result={result} onClose={() => setResult(null)} />}

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
                <div style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
                  {weeks[wk].map((r, i) => {
                    const aud = AUD_COLOR[r.audience] || { bg: '#eee', text: '#444' }
                    const st = STATUS_COLOR[r.status] || { bg: '#eee', text: '#444' }
                    const busy = generatingPos === r.position
                    const anyBusy = generatingPos !== null
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
                        <div style={{ width: 28, flexShrink: 0, color: '#9ca3af', fontSize: 13, fontWeight: 600, paddingTop: 1 }}>
                          {r.position}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 15, fontWeight: 600, color: '#111827', marginBottom: 4 }}>
                            {r.topic_title}
                          </div>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                            <Badge label={AUD_LABEL[r.audience] || r.audience} bg={aud.bg} text={aud.text} />
                            <span style={{ fontSize: 12, color: '#6b7280' }}>{r.category}</span>
                          </div>
                          {r.notes && (
                            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 6, fontStyle: 'italic', lineHeight: 1.4 }}>
                              {r.notes}
                            </div>
                          )}
                        </div>
                        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                          <Badge label={busy ? 'generating' : r.status} bg={busy ? STATUS_COLOR.generating.bg : st.bg} text={busy ? STATUS_COLOR.generating.text : st.text} />
                          {(r.status === 'pending' || r.status === 'failed' || r.status === 'review') && (
                            <button
                              onClick={() => generate(r.position)}
                              disabled={anyBusy}
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: anyBusy ? '#9ca3af' : '#fff',
                                background: anyBusy ? '#e5e7eb' : GREEN_DARK,
                                border: 'none',
                                borderRadius: 6,
                                padding: '5px 10px',
                                cursor: anyBusy ? 'default' : 'pointer',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {busy ? 'Generating…' : r.status === 'review' ? 'Regenerate' : 'Generate draft'}
                            </button>
                          )}
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

function ReviewPanel({ result, onClose }: { result: GenResult; onClose: () => void }) {
  const d = result.draft
  const allPass = result.valid
  return (
    <div
      style={{
        border: `2px solid ${allPass ? '#97c459' : '#f0a8a8'}`,
        borderRadius: 12,
        padding: '20px 22px',
        marginBottom: 24,
        background: allPass ? '#fbfdf7' : '#fffafa',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: allPass ? '#27500a' : '#a3261f' }}>
          DRAFT STAGED · position {result.position} · {allPass ? 'all checks passed' : 'needs attention'}
        </div>
        <button
          onClick={onClose}
          style={{ fontSize: 12, color: '#6b7280', background: 'none', border: '1px solid #d1d5db', borderRadius: 6, padding: '4px 10px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>

      <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>{d.title}</div>

      <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, marginBottom: 14 }}>
        <div><strong>Slug:</strong> /blog/{d.slug}</div>
        <div><strong>Category:</strong> {d.category}</div>
        <div><strong>Excerpt:</strong> {d.excerpt}</div>
        <div><strong>Focus keyword:</strong> {d.focusKeyword}</div>
        <div><strong>Secondary:</strong> {d.secondaryKeywords}</div>
        <div><strong>Meta title</strong> ({d.metaTitle.length}/60): {d.metaTitle}</div>
        <div><strong>Meta description</strong> ({d.metaDescription.length}/160): {d.metaDescription}</div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>Validation</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
          {result.validation.map((c, i) => (
            <div key={i} style={{ fontSize: 12, color: c.pass ? '#27500a' : '#a3261f' }}>
              {c.pass ? '✓' : '✗'} {c.check}
              {c.detail ? <span style={{ color: '#9ca3af' }}> — {c.detail}</span> : null}
            </div>
          ))}
        </div>
      </div>

      <details>
        <summary style={{ fontSize: 13, fontWeight: 600, color: GREEN_DARK, cursor: 'pointer' }}>
          Read the full article
        </summary>
        <pre
          style={{
            marginTop: 10,
            maxHeight: 460,
            overflow: 'auto',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: '14px 16px',
            fontSize: 13,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: '#1f2937',
          }}
        >
          {d.body}
        </pre>
      </details>
    </div>
  )
}
