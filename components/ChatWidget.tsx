'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ─────────────────────────────────────────────
   Vita Chat Widget
   Floating care advisor for Vitalis HealthCare
   With inline lead capture card
   ───────────────────────────────────────────── */

interface Msg {
  role: 'user' | 'assistant'
  content: string
  showLeadCard?: boolean
}

type LeadStatus = 'idle' | 'shown' | 'submitted' | 'dismissed'

const WELCOME = `Hi there! I'm Vita, your care advisor at Vitalis HealthCare. 👋

I can help you understand your home care options, walk you through what's covered by insurance, and answer questions about finding the right caregiver.

What's on your mind?`

const STARTERS = [
  'What kind of care does my parent need?',
  'How much does home care cost?',
  'Does Medicaid or VA cover this?',
  'How quickly can care start?',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pulse, setPulse] = useState(true)

  // Lead capture state
  const [leadStatus, setLeadStatus] = useState<LeadStatus>('idle')
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadSending, setLeadSending] = useState(false)
  const [leadError, setLeadError] = useState('')

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom on new messages or lead card changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [msgs, loading, leadStatus])

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open])

  // Stop pulse after first open
  useEffect(() => {
    if (open) setPulse(false)
  }, [open])

  // Build conversation summary for lead context
  const getConversationContext = useCallback(() => {
    const userMsgs = msgs
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .slice(0, 5)
    return userMsgs.length > 0
      ? `Visitor asked about: ${userMsgs.join(' | ')}`
      : 'General inquiry'
  }, [msgs])

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return

    const userMsg: Msg = { role: 'user', content: text.trim() }
    const newMsgs = [...msgs, userMsg]
    setMsgs(newMsgs)
    setInput('')
    setLoading(true)

    try {
      // Build API messages — strip showLeadCard flag and [OFFER_CALLBACK] markers
      const apiMessages = newMsgs.map((m) => ({
        role: m.role,
        content: m.content.replace(/\[OFFER_CALLBACK\]/g, '').trim(),
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()
      let reply = data.reply || data.error || 'I\'m sorry, something went wrong. Please call us at 240.716.6874.'

      // Detect [OFFER_CALLBACK] marker — only trigger if we haven't shown yet
      const shouldShowLeadCard =
        reply.includes('[OFFER_CALLBACK]') &&
        leadStatus === 'idle'

      // Strip the marker from displayed text
      reply = reply.replace(/\[OFFER_CALLBACK\]/g, '').trim()

      const assistantMsg: Msg = {
        role: 'assistant',
        content: reply,
        showLeadCard: shouldShowLeadCard,
      }

      setMsgs((prev) => [...prev, assistantMsg])

      if (shouldShowLeadCard) {
        setLeadStatus('shown')
      }
    } catch {
      setMsgs((prev) => [
        ...prev,
        { role: 'assistant', content: 'I\'m having trouble connecting right now. You can reach our team directly at 240.716.6874 — we\'re available 24/7.' },
      ])
    } finally {
      setLoading(false)
    }
  }, [msgs, loading, leadStatus])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  const submitLead = useCallback(async () => {
    if (!leadName.trim() || !leadPhone.trim()) {
      setLeadError('Please enter your name and phone number.')
      return
    }

    const cleanPhone = leadPhone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      setLeadError('Please enter a valid phone number.')
      return
    }

    setLeadSending(true)
    setLeadError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName.trim(),
          phone: leadPhone.trim(),
          context: getConversationContext(),
          timestamp: new Date().toISOString(),
          page: typeof window !== 'undefined' ? window.location.pathname : '/',
        }),
      })

      if (res.ok) {
        setLeadStatus('submitted')
        setMsgs((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Thank you, ${leadName.trim().split(' ')[0]}! A care coordinator will reach out to you shortly — by text or a quick call, whichever you prefer. In the meantime, feel free to keep asking me anything.`,
          },
        ])
      } else {
        setLeadError('Something went wrong. Please try again or call us at 240.716.6874.')
      }
    } catch {
      setLeadError('Couldn\'t connect. Please call us directly at 240.716.6874.')
    } finally {
      setLeadSending(false)
    }
  }, [leadName, leadPhone, getConversationContext])

  const dismissLeadCard = () => {
    setLeadStatus('dismissed')
  }

  const showStarters = msgs.length === 1 && msgs[0].role === 'assistant'

  return (
    <>
      {/* ── Inline styles ── */}
      <style>{`
        .vita-fab {
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
          width: 62px; height: 62px; border-radius: 50%;
          background: linear-gradient(135deg, #5a9e2f 0%, #3b6d11 100%);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(59,109,17,.35), 0 0 0 0 rgba(90,158,47,.4);
          transition: transform .2s, box-shadow .2s;
        }
        .vita-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(59,109,17,.45); }
        .vita-fab.pulse { animation: vita-pulse 2.5s infinite; }
        @keyframes vita-pulse {
          0% { box-shadow: 0 4px 20px rgba(59,109,17,.35), 0 0 0 0 rgba(90,158,47,.45); }
          50% { box-shadow: 0 4px 20px rgba(59,109,17,.35), 0 0 0 14px rgba(90,158,47,0); }
          100% { box-shadow: 0 4px 20px rgba(59,109,17,.35), 0 0 0 0 rgba(90,158,47,0); }
        }

        .vita-badge {
          position: absolute; top: -2px; right: -2px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #e74c3c; border: 2px solid #fff;
        }

        .vita-panel {
          position: fixed; bottom: 24px; right: 24px; z-index: 10000;
          width: 400px; max-height: 600px; height: calc(100vh - 100px);
          background: #fff; border-radius: 20px;
          box-shadow: 0 12px 48px rgba(0,0,0,.15), 0 0 0 1px rgba(0,0,0,.04);
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: vita-slideUp .3s ease-out;
        }
        @keyframes vita-slideUp {
          from { opacity: 0; transform: translateY(20px) scale(.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 480px) {
          .vita-panel {
            width: 100vw; height: 100vh; max-height: 100vh;
            bottom: 0; right: 0; border-radius: 0;
          }
        }

        .vita-header {
          background: linear-gradient(135deg, #3b6d11 0%, #27500a 100%);
          padding: 18px 20px; display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .vita-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,.18); display: flex;
          align-items: center; justify-content: center;
          font-size: 20px; flex-shrink: 0;
        }
        .vita-hdr-name { color: #fff; font-weight: 600; font-size: 15px; }
        .vita-hdr-status { color: #c0dd97; font-size: 12px; display: flex; align-items: center; gap: 5px; }
        .vita-hdr-dot { width: 7px; height: 7px; border-radius: 50%; background: #97c459; display: inline-block; }
        .vita-close {
          margin-left: auto; background: rgba(255,255,255,.12); border: none;
          color: #fff; width: 32px; height: 32px; border-radius: 50%;
          cursor: pointer; font-size: 16px; display: flex;
          align-items: center; justify-content: center; transition: background .15s;
        }
        .vita-close:hover { background: rgba(255,255,255,.25); }

        .vita-msgs {
          flex: 1; overflow-y: auto; padding: 16px 16px 8px;
          display: flex; flex-direction: column; gap: 6px;
          scroll-behavior: smooth;
        }
        .vita-msgs::-webkit-scrollbar { width: 4px; }
        .vita-msgs::-webkit-scrollbar-thumb { background: #d4e8b8; border-radius: 4px; }

        .vita-bubble {
          max-width: 85%; padding: 12px 16px;
          font-size: 14px; line-height: 1.65; word-break: break-word;
          white-space: pre-wrap;
        }
        .vita-bubble-a {
          align-self: flex-start; background: #f3f9ec;
          color: #1a1a1a; border-radius: 4px 16px 16px 16px;
          border: 1px solid #e2efd0;
        }
        .vita-bubble-u {
          align-self: flex-end; background: #3b6d11;
          color: #fff; border-radius: 16px 4px 16px 16px;
        }

        .vita-bubble-a a, .vita-bubble-a a:visited {
          color: #3b6d11; font-weight: 600; text-decoration: underline;
          text-underline-offset: 2px;
        }

        .vita-typing {
          align-self: flex-start; padding: 14px 18px;
          background: #f3f9ec; border-radius: 4px 16px 16px 16px;
          border: 1px solid #e2efd0; display: flex; gap: 5px;
        }
        .vita-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #97c459;
          animation: vita-bounce 1.2s infinite;
        }
        .vita-dot:nth-child(2) { animation-delay: .15s; }
        .vita-dot:nth-child(3) { animation-delay: .3s; }
        @keyframes vita-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .vita-starters {
          display: flex; flex-wrap: wrap; gap: 8px;
          padding: 4px 16px 12px;
        }
        .vita-starter {
          background: #fff; border: 1.5px solid #d4e8b8;
          color: #3b6d11; border-radius: 20px; padding: 8px 16px;
          font-size: 13px; font-weight: 500; cursor: pointer;
          transition: all .15s; line-height: 1.3;
        }
        .vita-starter:hover { background: #eaf3de; border-color: #97c459; }

        .vita-input-area {
          padding: 12px 16px 14px; border-top: 1px solid #e2efd0;
          display: flex; align-items: flex-end; gap: 10px;
          background: #fff; flex-shrink: 0;
        }
        .vita-textarea {
          flex: 1; border: 1.5px solid #d4e8b8; border-radius: 12px;
          padding: 10px 14px; font-size: 14px; font-family: inherit;
          resize: none; outline: none; max-height: 100px;
          line-height: 1.5; color: #1a1a1a; background: #fafaf8;
          transition: border-color .15s;
        }
        .vita-textarea:focus { border-color: #5a9e2f; background: #fff; }
        .vita-textarea::placeholder { color: #999; }
        .vita-send {
          width: 40px; height: 40px; border-radius: 50%;
          background: #5a9e2f; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .15s, transform .1s; flex-shrink: 0;
        }
        .vita-send:hover { background: #3b6d11; }
        .vita-send:active { transform: scale(.92); }
        .vita-send:disabled { background: #d4e8b8; cursor: default; transform: none; }

        .vita-footer {
          padding: 8px 16px 10px; text-align: center;
          font-size: 11px; color: #999; background: #fafaf8;
          border-top: 1px solid #f0f0ec; flex-shrink: 0;
        }
        .vita-footer a { color: #5a9e2f; font-weight: 500; }

        /* ── Lead Capture Card ── */
        .vita-lead-card {
          align-self: flex-start; max-width: 92%;
          background: #fff; border: 1.5px solid #97c459;
          border-radius: 4px 16px 16px 16px;
          padding: 16px; margin-top: 6px;
          animation: vita-cardIn .35s ease-out;
        }
        @keyframes vita-cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .vita-lead-title {
          font-size: 14px; font-weight: 600; color: #3b6d11;
          margin-bottom: 4px; display: flex; align-items: center; gap: 6px;
        }
        .vita-lead-sub {
          font-size: 12.5px; color: #666; line-height: 1.5; margin-bottom: 14px;
        }
        .vita-lead-field {
          width: 100%; border: 1.5px solid #d4e8b8; border-radius: 8px;
          padding: 9px 12px; font-size: 14px; font-family: inherit;
          outline: none; color: #1a1a1a; background: #fafaf8;
          margin-bottom: 8px; transition: border-color .15s;
          box-sizing: border-box;
        }
        .vita-lead-field:focus { border-color: #5a9e2f; background: #fff; }
        .vita-lead-field::placeholder { color: #aaa; }
        .vita-lead-submit {
          width: 100%; padding: 11px; border: none; border-radius: 8px;
          background: #5a9e2f; color: #fff; font-size: 14px;
          font-weight: 600; font-family: inherit; cursor: pointer;
          transition: background .15s;
        }
        .vita-lead-submit:hover { background: #3b6d11; }
        .vita-lead-submit:disabled { background: #97c459; cursor: wait; }
        .vita-lead-dismiss {
          display: block; width: 100%; margin-top: 8px;
          background: none; border: none; color: #999;
          font-size: 12px; cursor: pointer; font-family: inherit;
          padding: 4px; transition: color .15s;
        }
        .vita-lead-dismiss:hover { color: #666; }
        .vita-lead-error {
          font-size: 12px; color: #c0392b; margin-bottom: 8px;
        }
        .vita-lead-success {
          align-self: flex-start; max-width: 92%;
          background: #eaf3de; border: 1.5px solid #97c459;
          border-radius: 4px 16px 16px 16px;
          padding: 14px 16px; margin-top: 6px;
          font-size: 13px; color: #3b6d11;
          font-weight: 500; display: flex; align-items: center; gap: 8px;
        }
      `}</style>

      {/* ── FAB Bubble ── */}
      {!open && (
        <button
          className={`vita-fab${pulse ? ' pulse' : ''}`}
          onClick={() => setOpen(true)}
          aria-label="Chat with Vita — Care Advisor"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {pulse && <span className="vita-badge" />}
        </button>
      )}

      {/* ── Chat Panel ── */}
      {open && (
        <div className="vita-panel">
          {/* Header */}
          <div className="vita-header">
            <div className="vita-avatar">🌿</div>
            <div>
              <div className="vita-hdr-name">Vita — Care Advisor</div>
              <div className="vita-hdr-status">
                <span className="vita-hdr-dot" />
                Online · Vitalis HealthCare
              </div>
            </div>
            <button className="vita-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="vita-msgs" ref={scrollRef}>
            {msgs.map((m, i) => (
              <div key={i}>
                {/* Message bubble */}
                <div
                  className={`vita-bubble ${m.role === 'assistant' ? 'vita-bubble-a' : 'vita-bubble-u'}`}
                  dangerouslySetInnerHTML={{
                    __html: m.role === 'assistant' ? linkify(m.content) : escapeHtml(m.content),
                  }}
                />

                {/* Lead capture card — appears after the triggering message */}
                {m.showLeadCard && leadStatus === 'shown' && (
                  <div className="vita-lead-card">
                    <div className="vita-lead-title">
                      <span>📞</span> Get a personal follow-up
                    </div>
                    <div className="vita-lead-sub">
                      Share your name and number and a care coordinator will reach out — by text or a quick call, whichever you prefer. No pressure, no obligation.
                    </div>
                    <input
                      className="vita-lead-field"
                      type="text"
                      placeholder="Your first name"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      disabled={leadSending}
                      autoComplete="given-name"
                    />
                    <input
                      className="vita-lead-field"
                      type="tel"
                      placeholder="Phone number"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      disabled={leadSending}
                      autoComplete="tel"
                      onKeyDown={(e) => { if (e.key === 'Enter') submitLead() }}
                    />
                    {leadError && <div className="vita-lead-error">{leadError}</div>}
                    <button
                      className="vita-lead-submit"
                      onClick={submitLead}
                      disabled={leadSending}
                    >
                      {leadSending ? 'Sending...' : 'Have someone reach out to me'}
                    </button>
                    <button className="vita-lead-dismiss" onClick={dismissLeadCard}>
                      Not right now — I&apos;ll keep chatting
                    </button>
                  </div>
                )}

                {/* Success confirmation after submission */}
                {m.showLeadCard && leadStatus === 'submitted' && (
                  <div className="vita-lead-success">
                    <span>✓</span> Got it! A care coordinator will be in touch soon.
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="vita-typing">
                <div className="vita-dot" />
                <div className="vita-dot" />
                <div className="vita-dot" />
              </div>
            )}
          </div>

          {/* Starter suggestions */}
          {showStarters && !loading && (
            <div className="vita-starters">
              {STARTERS.map((s) => (
                <button key={s} className="vita-starter" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="vita-input-area">
            <textarea
              ref={inputRef}
              className="vita-textarea"
              rows={1}
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              onInput={(e) => {
                const el = e.target as HTMLTextAreaElement
                el.style.height = 'auto'
                el.style.height = Math.min(el.scrollHeight, 100) + 'px'
              }}
            />
            <button
              className="vita-send"
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="vita-footer">
            Prefer to talk?{' '}
            <a href="tel:2407166874">Call 240.716.6874</a> ·{' '}
            <a href="https://getcare.vitalishealthcare.com" target="_blank" rel="noopener">
              Request Care
            </a>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Helpers ── */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function linkify(text: string): string {
  let safe = escapeHtml(text)
  // Make URLs clickable
  safe = safe.replace(
    /\b(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener">$1</a>',
  )
  // Make getcare.vitalishealthcare.com clickable even without protocol
  safe = safe.replace(
    /\bgetcare\.vitalishealthcare\.com\b/g,
    '<a href="https://getcare.vitalishealthcare.com" target="_blank" rel="noopener">getcare.vitalishealthcare.com</a>',
  )
  // Make phone numbers clickable
  safe = safe.replace(
    /240\.716\.6874/g,
    '<a href="tel:2407166874">240.716.6874</a>',
  )
  // Bold text between ** markers
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  return safe
}
