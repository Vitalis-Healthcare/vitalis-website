'use client'

import { useState, useMemo } from 'react'

interface SimplePost {
  slug: string
  title: string
  date: string
  category: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Family Resources':        { bg: '#eaf3de', text: '#27500a', border: '#97c459' },
  'Senior Health':           { bg: '#e6f1fb', text: '#185fa5', border: '#85b7eb' },
  'Caregiver Tips':          { bg: '#faeeda', text: '#854f0b', border: '#fac775' },
  'Maryland Home Care':      { bg: '#f3f9ec', text: '#3b6d11', border: '#c0dd97' },
  'Dementia & Memory Care':  { bg: '#f3eefa', text: '#5b3a8c', border: '#c4a8e6' },
  'Post-Surgery & Recovery': { bg: '#eef5f0', text: '#2d6e4f', border: '#8ec5a4' },
  'Company News':            { bg: '#fbeaf0', text: '#993556', border: '#f4c0d1' },
}

const DEFAULT_COLOR = { bg: '#f0f0ec', text: '#555', border: '#ccc' }

export default function CategoryManager({ posts, categories }: { posts: SimplePost[]; categories: string[] }) {
  const [pin, setPin]           = useState('')
  const [authed, setAuthed]     = useState(false)
  const [pinError, setPinError] = useState('')
  const [pinLoading, setPinLoading] = useState(false)

  const [changes, setChanges] = useState<Record<string, string>>({})
  const [filterCat, setFilterCat] = useState<string>('all')
  const [search, setSearch]     = useState('')
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState('')

  // ── PIN ────────────────────────────────────────────────────────────────
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
      if (res.ok) setAuthed(true)
      else { setPinError('Incorrect PIN.'); setPin('') }
    } catch { setPinError('Network error.') }
    setPinLoading(false)
  }

  // ── Derived data ──────────────────────────────────────────────────────
  const getCategory = (post: SimplePost): string =>
    changes[post.slug] || post.category

  const filteredPosts = useMemo(() => {
    let result = [...posts]
    if (filterCat !== 'all') {
      result = result.filter(p => getCategory(p) === filterCat)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.slug.includes(q))
    }
    return result
  }, [filterCat, search, changes, posts])

  const changeCount = Object.keys(changes).length

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    categories.forEach(c => { counts[c] = 0 })
    posts.forEach(p => {
      const cat = getCategory(p)
      counts[cat] = (counts[cat] || 0) + 1
    })
    return counts
  }, [changes, posts, categories])

  // ── Save ──────────────────────────────────────────────────────────────
  async function handleSave() {
    if (changeCount === 0) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/blog/update-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes, pin }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 5000)
        setChanges({})
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Failed to save.')
      }
    } catch { setError('Network error.') }
    setSaving(false)
  }

  // ── Styles ────────────────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = {
    padding: '10px 14px', border: '1px solid #e8e8e4', borderRadius: 8,
    fontSize: '0.95rem', boxSizing: 'border-box', fontFamily: 'inherit', background: '#fff',
  }

  // ── PIN screen ────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f2' }}>
        <div style={{ background: '#fff', border: '1px solid #e8e8e4', borderRadius: 16, padding: '48px 40px', width: '100%', maxWidth: 380, textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, background: '#eaf3de', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>🏷️</div>
          <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.4rem', color: '#173404', margin: '0 0 8px' }}>Blog Category Manager</h1>
          <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 28px' }}>Enter your PIN to manage blog categories</p>
          <form onSubmit={handlePinSubmit}>
            <input type="password" value={pin} onChange={e => setPin(e.target.value)} placeholder="• • • • • •" autoFocus
              style={{ ...inputStyle, width: '100%', textAlign: 'center', fontSize: '1.4rem', letterSpacing: 8, marginBottom: 12 }} />
            {pinError && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: '0 0 12px' }}>{pinError}</p>}
            <button type="submit" disabled={pinLoading || !pin}
              style={{ width: '100%', background: pinLoading || !pin ? '#ccc' : '#3a7d1e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontSize: '1rem', fontWeight: 600, cursor: pinLoading || !pin ? 'not-allowed' : 'pointer' }}>
              {pinLoading ? 'Checking...' : 'Enter →'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Main UI ───────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f2', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Top bar */}
      <div style={{ background: '#173404', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>🏷️</span>
          <span style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontSize: '1.05rem' }}>Blog Category Manager</span>
          <span style={{ color: '#97c459', fontSize: '0.75rem', marginLeft: 4 }}>{posts.length} posts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {saved && <span style={{ color: '#97c459', fontSize: '0.85rem', fontWeight: 600 }}>✓ Saved & deploying!</span>}
          {error && <span style={{ color: '#ff8888', fontSize: '0.85rem' }}>{error}</span>}
          {changeCount > 0 && (
            <button onClick={handleSave} disabled={saving}
              style={{ padding: '8px 20px', background: saving ? '#666' : '#97c459', color: '#173404', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Saving...' : `Save ${changeCount} Change${changeCount > 1 ? 's' : ''}`}
            </button>
          )}
          <a href="/admin/blog/new" style={{ color: '#97c459', fontSize: '0.85rem', textDecoration: 'none' }}>← Blog Writer</a>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: 'calc(100vh - 52px)' }}>

        {/* Sidebar */}
        <aside style={{ background: '#fff', borderRight: '1px solid #e8e8e4', padding: '20px 0', overflowY: 'auto' }}>
          <div style={{ padding: '0 16px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Filter by Category
          </div>
          <button onClick={() => setFilterCat('all')} style={{
            width: '100%', padding: '10px 16px', border: 'none', background: filterCat === 'all' ? '#eaf3de' : 'transparent',
            textAlign: 'left', cursor: 'pointer', fontSize: '0.88rem', fontWeight: filterCat === 'all' ? 700 : 400,
            color: '#173404', fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between',
          }}>
            <span>All Posts</span>
            <span style={{ color: '#888', fontSize: '0.78rem' }}>{posts.length}</span>
          </button>
          {categories.map(cat => {
            const color = CATEGORY_COLORS[cat] || DEFAULT_COLOR
            return (
              <button key={cat} onClick={() => setFilterCat(cat)} style={{
                width: '100%', padding: '10px 16px', border: 'none',
                background: filterCat === cat ? color.bg : 'transparent',
                textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem',
                fontWeight: filterCat === cat ? 600 : 400, color: color.text,
                fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span>{cat}</span>
                <span style={{ fontSize: '0.75rem', background: color.bg, border: `1px solid ${color.border}`, borderRadius: 12, padding: '2px 8px', color: color.text, fontWeight: 600 }}>
                  {categoryCounts[cat] || 0}
                </span>
              </button>
            )
          })}

          {changeCount > 0 && (
            <div style={{ margin: '20px 16px 0', padding: '14px', background: '#fff8e6', borderRadius: 8, border: '1px solid #fac775' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#854f0b', marginBottom: 6 }}>
                {changeCount} unsaved change{changeCount > 1 ? 's' : ''}
              </div>
              {Object.entries(changes).map(([slug, newCat]) => {
                const post = posts.find(p => p.slug === slug)
                if (!post) return null
                return (
                  <div key={slug} style={{ fontSize: '0.72rem', color: '#666', marginBottom: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 8 }}>
                      {post.title.substring(0, 30)}...
                    </span>
                    <button onClick={() => {
                      const next = { ...changes }
                      delete next[slug]
                      setChanges(next)
                    }} style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: '0.7rem', fontWeight: 600, padding: '2px 4px' }}>
                      undo
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </aside>

        {/* Main */}
        <main style={{ padding: '20px 28px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 20 }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search posts by title..."
              style={{ ...inputStyle, width: '100%', maxWidth: 500 }} />
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8e8e4', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 100px', padding: '12px 20px', borderBottom: '1px solid #e8e8e4', background: '#fafaf8' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</span>
            </div>

            {filteredPosts.map(post => {
              const currentCat = getCategory(post)
              const isChanged = post.slug in changes
              const color = CATEGORY_COLORS[currentCat] || DEFAULT_COLOR
              return (
                <div key={post.slug} style={{
                  display: 'grid', gridTemplateColumns: '1fr 200px 100px', padding: '12px 20px',
                  borderBottom: '1px solid #f0f0ec', alignItems: 'center',
                  background: isChanged ? '#fffbeb' : 'transparent',
                }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: '#173404', fontWeight: isChanged ? 600 : 400, lineHeight: 1.4 }}>
                      {isChanged && <span style={{ color: '#854f0b', marginRight: 6, fontSize: '0.75rem' }}>●</span>}
                      {post.title}
                    </div>
                  </div>
                  <div>
                    <select
                      value={currentCat}
                      onChange={e => {
                        const newCat = e.target.value
                        if (newCat === post.category) {
                          const next = { ...changes }
                          delete next[post.slug]
                          setChanges(next)
                        } else {
                          setChanges({ ...changes, [post.slug]: newCat })
                        }
                      }}
                      style={{
                        padding: '6px 10px', borderRadius: 6, fontSize: '0.78rem', fontWeight: 500,
                        border: `1px solid ${color.border}`, background: color.bg, color: color.text,
                        cursor: 'pointer', fontFamily: 'inherit', width: '100%',
                      }}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#888' }}>{post.date}</div>
                </div>
              )
            })}

            {filteredPosts.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#aaa', fontSize: '0.9rem' }}>
                No posts match your filter.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
