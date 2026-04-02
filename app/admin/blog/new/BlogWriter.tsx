'use client'

import { useState } from 'react'

const CATEGORIES = [
  'Family Resources',
  'Senior Health',
  'Caregiver Tips',
  'Maryland Home Care',
  'Company News',
]

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

function formatDateDisplay(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ]
  return `${months[parseInt(month) - 1]} ${parseInt(day)}, ${year}`
}

// Simple markdown preview renderer
function renderPreview(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;color:#27500a;margin:20px 0 8px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.3rem;color:#27500a;margin:24px 0 10px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.5rem;color:#27500a;margin:24px 0 12px">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="margin:12px 0;padding-left:20px">$&</ul>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#3a7d1e">$1</a>')
    .replace(/\n\n/g, '</p><p style="margin:0 0 14px;line-height:1.8">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p style="margin:0 0 14px;line-height:1.8">$1</p>')
}

export default function BlogWriter() {
  const [pin, setPin]               = useState('')
  const [authed, setAuthed]         = useState(false)
  const [pinError, setPinError]     = useState('')
  const [pinLoading, setPinLoading] = useState(false)

  const [title, setTitle]       = useState('')
  const [date, setDate]         = useState(todayISO())
  const [excerpt, setExcerpt]   = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [content, setContent]   = useState('')

  const [publishing, setPublishing] = useState(false)
  const [published, setPublished]   = useState(false)
  const [pubSlug, setPubSlug]       = useState('')
  const [error, setError]           = useState('')

  // ── PIN screen ──────────────────────────────────────────────────────────────
  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPinLoading(true)
    setPinError('')
    try {
      const res = await fetch('/api/blog/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      if (res.ok) {
        setAuthed(true)
      } else {
        setPinError('Incorrect PIN — please try again.')
        setPin('')
      }
    } catch {
      setPinError('Network error — please try again.')
    }
    setPinLoading(false)
  }

  // ── Publish ─────────────────────────────────────────────────────────────────
  async function handlePublish(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Title, excerpt, and content are all required.')
      return
    }
    setPublishing(true)
    setError('')
    const slug = slugify(title)
    const dateFormatted = formatDateDisplay(date)
    try {
      const res = await fetch('/api/blog/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, dateFormatted, excerpt, category, content, slug, pin }),
      })
      if (res.ok) {
        setPublished(true)
        setPubSlug(slug)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to publish — please try again.')
      }
    } catch {
      setError('Network error — please try again.')
    }
    setPublishing(false)
  }

  // ── Styles shared ────────────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    border: '1px solid #e8e8e4', borderRadius: 8,
    fontSize: '0.95rem', boxSizing: 'border-box',
    fontFamily: 'inherit', background: '#fff',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.75rem', fontWeight: 600,
    color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6,
  }

  // ── PIN screen ───────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f2' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: '#eaf3de', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>✍️</div>
          <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.4rem', color: '#173404', margin: '0 0 8px' }}>Vitalis Blog Admin</h1>
          <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 28px' }}>Enter your PIN to access the blog editor</p>
          <form onSubmit={handlePinSubmit}>
            <input
              type="password"
              value={pin}
              onChange={e => setPin(e.target.value)}
              placeholder="• • • • • •"
              autoFocus
              style={{ ...inputStyle, textAlign: 'center', fontSize: '1.4rem', letterSpacing: 8, marginBottom: 12 }}
            />
            {pinError && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: '0 0 12px' }}>{pinError}</p>}
            <button
              type="submit"
              disabled={pinLoading || !pin}
              style={{ width: '100%', background: pinLoading || !pin ? '#ccc' : '#3a7d1e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: '1rem', fontWeight: 600, cursor: pinLoading || !pin ? 'not-allowed' : 'pointer' }}
            >
              {pinLoading ? 'Checking...' : 'Enter →'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Success screen ───────────────────────────────────────────────────────────
  if (published) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f2' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 480, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, background: '#eaf3de', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
          <h2 style={{ fontFamily: 'Lora, Georgia, serif', color: '#173404', margin: '0 0 8px' }}>Post Published!</h2>
          <p style={{ color: '#555', margin: '0 0 8px' }}>Your post has been sent to GitHub and Vercel is deploying it now.</p>
          <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 28px' }}>It will be live in approximately 2 minutes.</p>
          <div style={{ background: '#eaf3de', borderRadius: 8, padding: '12px 16px', marginBottom: 28 }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#27500a' }}>
              URL: <strong>vitalishealthcare.com/blog/{pubSlug}</strong>
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`https://www.vitalishealthcare.com/blog/${pubSlug}`}
              target="_blank"
              rel="noreferrer"
              style={{ padding: '10px 20px', border: '1px solid #3a7d1e', borderRadius: 8, color: '#3a7d1e', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}
            >
              View Post →
            </a>
            <button
              onClick={() => { setPublished(false); setTitle(''); setExcerpt(''); setContent(''); setDate(todayISO()) }}
              style={{ padding: '10px 20px', background: '#3a7d1e', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
            >
              Write Another Post
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Main editor ──────────────────────────────────────────────────────────────
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const readTime = Math.max(1, Math.round(wordCount / 200))

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f2', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ background: '#173404', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>✍️</span>
          <span style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontSize: '1.05rem' }}>Vitalis Blog Writer</span>
        </div>
        <a href="https://www.vitalishealthcare.com/blog" target="_blank" rel="noreferrer"
          style={{ color: '#97c459', fontSize: '0.85rem', textDecoration: 'none' }}>
          View Live Blog →
        </a>
      </div>

      <form onSubmit={handlePublish} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Meta bar */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e8e8e4', padding: '18px 28px', flexShrink: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 160px auto', gap: 14, alignItems: 'end', marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>Post Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Write a clear, descriptive title..."
                style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
            </div>
            <button
              type="submit" disabled={publishing}
              style={{ padding: '10px 24px', background: publishing ? '#ccc' : '#3a7d1e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem', cursor: publishing ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
            >
              {publishing ? 'Publishing...' : '🚀 Publish Post'}
            </button>
          </div>

          <div>
            <label style={labelStyle}>Excerpt — one sentence that appears on the blog index *</label>
            <input value={excerpt} onChange={e => setExcerpt(e.target.value)}
              placeholder="A single clear sentence describing what this post covers..."
              style={inputStyle} required />
          </div>

          <div style={{ marginTop: 10, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {title && (
              <span style={{ fontSize: '0.8rem', color: '#888' }}>
                URL: <strong style={{ color: '#27500a' }}>vitalishealthcare.com/blog/{slugify(title) || '...'}</strong>
              </span>
            )}
            <span style={{ fontSize: '0.8rem', color: '#888' }}>{wordCount} words · ~{readTime} min read</span>
            {error && <span style={{ color: '#c0392b', fontSize: '0.85rem' }}>{error}</span>}
          </div>
        </div>

        {/* Editor + Preview */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>

          {/* Editor pane */}
          <div style={{ borderRight: '1px solid #e8e8e4', display: 'flex', flexDirection: 'column', padding: 20 }}>
            <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✏️ Editor — Markdown</span>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={[
                'Write your post here using Markdown...',
                '',
                '## Start with a main heading',
                '',
                'Write your opening paragraph. Keep it clear and direct.',
                '',
                '## Another section heading',
                '',
                'Continue with more content. Use **bold** for important words,',
                '*italics* for gentle emphasis.',
                '',
                '- Bullet point one',
                '- Bullet point two', 
                '- Bullet point three',
              ].join('\n')}
              style={{
                flex: 1, width: '100%', minHeight: 400,
                padding: '14px 16px', border: '1px solid #e8e8e4', borderRadius: 8,
                fontSize: '0.95rem', fontFamily: 'monospace', lineHeight: 1.7,
                resize: 'none', boxSizing: 'border-box', background: '#fafaf8',
              }}
            />
            <div style={{ marginTop: 8, fontSize: '0.75rem', color: '#aaa', lineHeight: 1.6 }}>
              <strong>## Heading</strong> &nbsp;·&nbsp; <strong>**bold**</strong> &nbsp;·&nbsp; <strong>*italic*</strong> &nbsp;·&nbsp; <strong>- bullet</strong> &nbsp;·&nbsp; <strong>[text](url)</strong>
            </div>
          </div>

          {/* Preview pane */}
          <div style={{ display: 'flex', flexDirection: 'column', padding: 20, background: '#fff', overflow: 'hidden' }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>👁 Preview</span>
            </div>
            <div style={{ flex: 1, border: '1px solid #e8e8e4', borderRadius: 8, padding: '20px 24px', overflowY: 'auto', minHeight: 400 }}>
              {title && (
                <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.6rem', color: '#173404', margin: '0 0 10px', lineHeight: 1.3 }}>
                  {title}
                </h1>
              )}
              {excerpt && (
                <p style={{ color: '#888', fontStyle: 'italic', margin: '0 0 16px', fontSize: '0.95rem' }}>{excerpt}</p>
              )}
              {(title || excerpt) && content && (
                <hr style={{ border: 'none', borderTop: '1px solid #e8e8e4', margin: '16px 0' }} />
              )}
              {content ? (
                <div
                  style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#1a1a1a' }}
                  dangerouslySetInnerHTML={{ __html: renderPreview(content) }}
                />
              ) : (
                <p style={{ color: '#ccc', fontStyle: 'italic', fontSize: '0.9rem' }}>
                  Your formatted content will appear here as you type...
                </p>
              )}
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
