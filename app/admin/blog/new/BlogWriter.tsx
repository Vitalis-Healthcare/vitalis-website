'use client'

import { useState, useEffect } from 'react'

const CATEGORIES = [
  'Family Resources',
  'Senior Health',
  'Caregiver Tips',
  'Maryland Home Care',
  'Company News',
  'Dementia & Memory Care',
  'Post-Surgery & Recovery',
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

// ── SEO Score Calculator ──────────────────────────────────────────────────────
function calcSeoScore(fields: {
  title: string; metaTitle: string; metaDesc: string;
  focusKeyword: string; body: string; slug: string; excerpt: string;
}) {
  const { title, metaTitle, metaDesc, focusKeyword, body, slug, excerpt } = fields
  const checks: { ok: boolean; label: string }[] = []
  const kw = (focusKeyword || '').toLowerCase().trim()
  const mt = metaTitle || title || ''

  if (!mt) checks.push({ ok: false, label: 'Meta title is missing' })
  else if (mt.length > 60) checks.push({ ok: false, label: `Meta title too long (${mt.length}/60)` })
  else if (mt.length < 30) checks.push({ ok: false, label: `Meta title too short (${mt.length}/60)` })
  else checks.push({ ok: true, label: `Meta title length good (${mt.length}/60)` })

  if (!metaDesc) checks.push({ ok: false, label: 'Meta description is missing' })
  else if (metaDesc.length > 160) checks.push({ ok: false, label: `Meta description too long (${metaDesc.length}/160)` })
  else if (metaDesc.length < 70) checks.push({ ok: false, label: `Meta description too short (${metaDesc.length}/160)` })
  else checks.push({ ok: true, label: `Meta description length good (${metaDesc.length}/160)` })

  if (!kw) checks.push({ ok: false, label: 'Focus keyword is missing' })
  else {
    checks.push({ ok: true, label: 'Focus keyword is set' })
    if (mt.toLowerCase().includes(kw)) checks.push({ ok: true, label: 'Keyword in meta title' })
    else checks.push({ ok: false, label: 'Keyword missing from meta title' })
    if ((metaDesc || '').toLowerCase().includes(kw)) checks.push({ ok: true, label: 'Keyword in meta description' })
    else checks.push({ ok: false, label: 'Keyword missing from meta description' })
    if ((body || '').toLowerCase().includes(kw)) checks.push({ ok: true, label: 'Keyword found in body' })
    else checks.push({ ok: false, label: 'Keyword missing from body' })
    if ((slug || '').toLowerCase().includes(kw.split(' ')[0])) checks.push({ ok: true, label: 'Keyword root in slug' })
    else checks.push({ ok: false, label: 'Keyword not reflected in slug' })
  }

  if (!excerpt) checks.push({ ok: false, label: 'Excerpt is missing' })
  else checks.push({ ok: true, label: 'Excerpt is set' })

  const wc = body.trim() ? body.trim().split(/\s+/).length : 0
  if (wc < 300) checks.push({ ok: false, label: `Body too short (${wc} words — aim for 1,200+)` })
  else if (wc < 800) checks.push({ ok: false, label: `Body could be longer (${wc} words — aim for 1,200+)` })
  else checks.push({ ok: true, label: `Good body length (${wc} words)` })

  if (!slug) checks.push({ ok: false, label: 'URL slug is missing' })
  else checks.push({ ok: true, label: 'URL slug is set' })

  const passed = checks.filter(c => c.ok).length
  const total = checks.length
  const pct = Math.round((passed / total) * 100)
  return { checks, passed, total, pct }
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

  // SEO fields
  const [metaTitle, setMetaTitle]             = useState('')
  const [metaDesc, setMetaDesc]               = useState('')
  const [focusKeyword, setFocusKeyword]       = useState('')
  const [secondaryKeywords, setSecondaryKeywords] = useState('')
  const [slug, setSlug]                       = useState('')
  const [slugManual, setSlugManual]           = useState(false)

  // UI
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'seo'>('editor')
  const [seoOpen, setSeoOpen]     = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished]   = useState(false)
  const [pubSlug, setPubSlug]       = useState('')
  const [error, setError]           = useState('')

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) setSlug(slugify(title))
  }, [title, slugManual])

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
  async function handlePublish() {
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setError('Title, excerpt, and content are all required.')
      return
    }
    setPublishing(true)
    setError('')
    const finalSlug = slug || slugify(title)
    const dateFormatted = formatDateDisplay(date)
    try {
      const res = await fetch('/api/blog/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, date, dateFormatted, excerpt, category, content,
          slug: finalSlug, pin,
          metaTitle, metaDescription: metaDesc, focusKeyword, secondaryKeywords,
        }),
      })
      if (res.ok) {
        setPublished(true)
        setPubSlug(finalSlug)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to publish — please try again.')
      }
    } catch {
      setError('Network error — please try again.')
    }
    setPublishing(false)
  }

  // ── Styles ────────────────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    border: '1px solid #e8e8e4', borderRadius: 8,
    fontSize: '0.95rem', boxSizing: 'border-box',
    fontFamily: 'inherit', background: '#fff',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 700,
    color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5,
  }
  const hintStyle: React.CSSProperties = {
    fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#aaa', marginLeft: 6, fontSize: '0.72rem',
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
              onClick={() => {
                setPublished(false); setTitle(''); setExcerpt(''); setContent('');
                setDate(todayISO()); setMetaTitle(''); setMetaDesc('');
                setFocusKeyword(''); setSecondaryKeywords(''); setSlug(''); setSlugManual(false)
              }}
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
  const seo = calcSeoScore({ title, metaTitle, metaDesc, focusKeyword, body: content, slug, excerpt })
  const seoColor = seo.pct >= 80 ? '#27500a' : seo.pct >= 50 ? '#854f0b' : '#c0392b'

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f2', display: 'flex', flexDirection: 'column' }}>

      {/* Top bar */}
      <div style={{ background: '#173404', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>✍️</span>
          <span style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontSize: '1.05rem' }}>Vitalis Blog Writer</span>
          <span style={{ color: '#97c459', fontSize: '0.75rem', marginLeft: 4 }}>v2.0 — SEO Edition</span>
        </div>
        <a href="https://www.vitalishealthcare.com/blog" target="_blank" rel="noreferrer"
          style={{ color: '#97c459', fontSize: '0.85rem', textDecoration: 'none' }}>
          View Live Blog →
        </a>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 0 }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ background: '#fff', borderRight: '1px solid #e8e8e4', overflowY: 'auto' }}>

          {/* Post Details */}
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #e8e8e4' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#27500a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>📝 Post Details</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>Post Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Write a clear, descriptive title..." style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Excerpt *<span style={hintStyle}>One sentence for the blog index</span></label>
                <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} placeholder="A single clear sentence describing what this post covers..." rows={2}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div style={{ borderBottom: '1px solid #e8e8e4' }}>
            <button onClick={() => setSeoOpen(!seoOpen)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '0.72rem', fontWeight: 700, color: '#27500a', textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              <span>🔍 SEO Settings</span>
              <span style={{ transform: seoOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
            </button>
            {seoOpen && (
              <div style={{ padding: '0 20px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Meta Title<span style={hintStyle}>≤ 60 chars — appears in Google results</span></label>
                  <div style={{ position: 'relative' }}>
                    <input value={metaTitle} onChange={e => setMetaTitle(e.target.value)} placeholder="SEO-optimized title..." maxLength={60} style={inputStyle} />
                    <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: '0.68rem', color: metaTitle.length > 54 ? '#c0392b' : '#bbb' }}>{metaTitle.length}/60</span>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Meta Description<span style={hintStyle}>≤ 160 chars — shown under title in search</span></label>
                  <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} placeholder="Compelling description that drives clicks..." rows={2}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
                  <div style={{ textAlign: 'right', fontSize: '0.68rem', color: metaDesc.length > 160 ? '#c0392b' : '#bbb', marginTop: 2 }}>{metaDesc.length}/160</div>
                </div>
                <div>
                  <label style={labelStyle}>Focus Keyword<span style={hintStyle}>The primary search term you're targeting</span></label>
                  <input value={focusKeyword} onChange={e => setFocusKeyword(e.target.value)} placeholder='e.g. "home care for seniors with dementia"' style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Secondary Keywords<span style={hintStyle}>Comma-separated related terms</span></label>
                  <input value={secondaryKeywords} onChange={e => setSecondaryKeywords(e.target.value)} placeholder='e.g. "dementia home care Maryland"' style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>URL Slug<span style={hintStyle}>Auto-generated from title — edit to override</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '0.82rem', color: '#aaa', whiteSpace: 'nowrap' }}>/blog/</span>
                    <input value={slug} onChange={e => { setSlug(e.target.value); setSlugManual(true) }}
                      placeholder="url-slug" style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '0.88rem' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEO Checklist */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e8e8e4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#27500a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>✅ SEO Checklist</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: seoColor }}>Score: {seo.pct}%</span>
              <span style={{ fontSize: '0.72rem', color: '#aaa' }}>{seo.passed}/{seo.total} checks passed</span>
            </div>
            <div style={{ height: 5, background: '#eee', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ height: '100%', width: `${seo.pct}%`, background: seoColor, borderRadius: 3, transition: 'width 0.4s, background 0.4s' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {seo.checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.78rem', color: c.ok ? '#27500a' : '#b8860b', lineHeight: 1.4 }}>
                  <span style={{ fontSize: '0.65rem', marginTop: 2, flexShrink: 0 }}>{c.ok ? '●' : '○'}</span>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publish */}
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: 8, textAlign: 'center' }}>
              {wordCount.toLocaleString()} words · ~{readTime} min read
            </div>
            {error && <p style={{ color: '#c0392b', fontSize: '0.82rem', margin: '0 0 10px', textAlign: 'center' }}>{error}</p>}
            <button
              onClick={handlePublish}
              disabled={publishing}
              style={{
                width: '100%', padding: '13px 20px',
                background: publishing ? '#ccc' : '#3a7d1e', color: '#fff',
                border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.95rem',
                cursor: publishing ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {publishing ? 'Publishing...' : '🚀 Publish Post'}
            </button>
          </div>
        </aside>

        {/* ── RIGHT: Editor / Preview / SEO ── */}
        <main style={{ display: 'flex', flexDirection: 'column', background: '#f5f5f2' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #e8e8e4', padding: '0 20px', flexShrink: 0 }}>
            {([
              { id: 'editor' as const, icon: '✏️', label: 'Editor', sub: 'Markdown' },
              { id: 'preview' as const, icon: '👁', label: 'Preview', sub: 'Rendered' },
              { id: 'seo' as const, icon: '🔎', label: 'SEO Preview', sub: 'Google & AI' },
            ]).map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: '14px 18px 12px', background: 'none', border: 'none',
                borderBottom: activeTab === tab.id ? '2.5px solid #3a7d1e' : '2.5px solid transparent',
                color: activeTab === tab.id ? '#173404' : '#aaa',
                fontSize: '0.85rem', fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span>{tab.icon}</span> {tab.label}
                <span style={{ fontSize: '0.7rem', color: '#bbb', fontWeight: 400 }}>{tab.sub}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>

            {activeTab === 'editor' && (
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
                  width: '100%', minHeight: 'calc(100vh - 160px)',
                  padding: '20px 24px', border: '1px solid #e8e8e4', borderRadius: 10,
                  fontSize: '0.95rem', fontFamily: 'monospace', lineHeight: 1.75,
                  resize: 'none', boxSizing: 'border-box', background: '#fafaf8',
                }}
              />
            )}

            {activeTab === 'preview' && (
              <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, padding: '36px 40px 48px', border: '1px solid #e8e8e4' }}>
                {title && <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.7rem', color: '#173404', margin: '0 0 10px', lineHeight: 1.3 }}>{title}</h1>}
                {excerpt && <p style={{ color: '#888', fontStyle: 'italic', margin: '0 0 20px', fontSize: '0.95rem', lineHeight: 1.6 }}>{excerpt}</p>}
                {(title || excerpt) && content && <hr style={{ border: 'none', borderTop: '1px solid #e8e8e4', margin: '0 0 24px' }} />}
                {content ? (
                  <div style={{ fontSize: '0.95rem', lineHeight: 1.8, color: '#1a1a1a' }} dangerouslySetInnerHTML={{ __html: renderPreview(content) }} />
                ) : (
                  <p style={{ color: '#ccc', fontStyle: 'italic' }}>Your formatted content will appear here as you type...</p>
                )}
              </div>
            )}

            {activeTab === 'seo' && (
              <div style={{ maxWidth: 640, margin: '0 auto' }}>
                {/* Google Preview */}
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>Google Search Preview</label>
                  <div style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', border: '1px solid #e8e8e4', marginTop: 6 }}>
                    <div style={{ fontSize: '0.78rem', color: '#202124', fontFamily: 'Arial, sans-serif', marginBottom: 3 }}>vitalishealthcare.com › blog › {slug || '...'}</div>
                    <div style={{ fontSize: '1.15rem', color: '#1a0dab', fontFamily: 'Arial, sans-serif', marginBottom: 5, lineHeight: 1.3, cursor: 'pointer' }}>
                      {(metaTitle || title || 'Your post title will appear here').substring(0, 60)}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#4d5156', fontFamily: 'Arial, sans-serif', lineHeight: 1.5 }}>
                      {(metaDesc || excerpt || 'Your meta description will appear here.').substring(0, 160)}
                    </div>
                  </div>
                </div>

                {/* AI Search Preview */}
                <div style={{ marginBottom: 28 }}>
                  <label style={labelStyle}>AI Search Preview (ChatGPT / Perplexity)</label>
                  <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '20px 24px', border: '1px solid #e8e8e4', marginTop: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3a7d1e' }} />
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#333' }}>Vitalis HealthCare</span>
                      <span style={{ fontSize: '0.72rem', color: '#888' }}>vitalishealthcare.com</span>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.6 }}>
                      {metaDesc || excerpt
                        ? `According to Vitalis HealthCare, ${(metaDesc || excerpt).toLowerCase().replace(/\.$/, '')}. The Silver Spring-based home care agency is licensed by the Maryland Department of Health (OHCQ #3879R).`
                        : 'Your content will be cited by AI search engines like this.'}
                    </div>
                    <div style={{ marginTop: 8, fontSize: '0.75rem', color: '#3a7d1e', fontWeight: 500 }}>
                      Source: vitalishealthcare.com/blog/{slug || '...'}
                    </div>
                  </div>
                </div>

                {/* Keyword placement */}
                <div>
                  <label style={labelStyle}>Keyword Placement Analysis</label>
                  <div style={{ background: '#fff', borderRadius: 10, padding: '18px 22px', border: '1px solid #e8e8e4', marginTop: 6 }}>
                    {focusKeyword ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        {[
                          { label: 'Post Title', found: title.toLowerCase().includes(focusKeyword.toLowerCase()) },
                          { label: 'Meta Title', found: metaTitle.toLowerCase().includes(focusKeyword.toLowerCase()) },
                          { label: 'Meta Description', found: metaDesc.toLowerCase().includes(focusKeyword.toLowerCase()) },
                          { label: 'URL Slug', found: slug.toLowerCase().includes(focusKeyword.toLowerCase().split(' ')[0]) },
                          { label: 'Excerpt', found: excerpt.toLowerCase().includes(focusKeyword.toLowerCase()) },
                          { label: 'Article Body', found: content.toLowerCase().includes(focusKeyword.toLowerCase()) },
                          { label: 'First 100 Words', found: content.substring(0, 600).toLowerCase().includes(focusKeyword.toLowerCase()) },
                        ].map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                            <span style={{ color: '#555' }}>{item.label}</span>
                            <span style={{
                              fontSize: '0.72rem', fontWeight: 600,
                              color: item.found ? '#27500a' : '#c0392b',
                              background: item.found ? '#eaf3de' : '#fce8e8',
                              padding: '3px 10px', borderRadius: 4,
                            }}>
                              {item.found ? 'Found ✓' : 'Missing'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ fontSize: '0.82rem', color: '#aaa', textAlign: 'center', margin: 0 }}>
                        Set a focus keyword in SEO Settings to see placement analysis.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}
