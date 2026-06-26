'use client'

import { useState, useMemo } from 'react'

interface SimplePost {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
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

export default function BlogManager({ posts: initialPosts, categories }: { posts: SimplePost[]; categories: string[] }) {
  const [pin, setPin]           = useState('')
  const [authed, setAuthed]     = useState(false)
  const [pinError, setPinError] = useState('')
  const [pinLoading, setPinLoading] = useState(false)

  const [posts, setPosts]         = useState(initialPosts)
  const [filterCat, setFilterCat] = useState<string>('all')
  const [search, setSearch]       = useState('')
  const [deleteSlug, setDeleteSlug]   = useState<string | null>(null)
  const [deleting, setDeleting]       = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [deleteSuccess, setDeleteSuccess] = useState('')
  const [previewSlug, setPreviewSlug] = useState<string | null>(null)

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

  // ── Delete ────────────────────────────────────────────────────────────
  async function handleDelete(slug: string) {
    setDeleting(true)
    setDeleteError('')
    try {
      const res = await fetch('/api/blog/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, pin }),
      })
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.slug !== slug))
        setDeleteSlug(null)
        setDeleteSuccess(`"${posts.find(p => p.slug === slug)?.title}" has been deleted.`)
        setTimeout(() => setDeleteSuccess(''), 5000)
      } else {
        const data = await res.json().catch(() => ({}))
        setDeleteError(data.error || 'Failed to delete.')
      }
    } catch { setDeleteError('Network error.') }
    setDeleting(false)
  }

  // ── Derived ───────────────────────────────────────────────────────────
  const filteredPosts = useMemo(() => {
    let result = [...posts]
    if (filterCat !== 'all') result = result.filter(p => p.category === filterCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.slug.includes(q))
    }
    return result
  }, [filterCat, search, posts])

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    categories.forEach(c => { counts[c] = 0 })
    posts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })
    return counts
  }, [posts, categories])

  const previewPost = previewSlug ? posts.find(p => p.slug === previewSlug) : null
  const deletePost = deleteSlug ? posts.find(p => p.slug === deleteSlug) : null

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
          <div style={{ width: 56, height: 56, background: '#eaf3de', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>📋</div>
          <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.4rem', color: '#173404', margin: '0 0 8px' }}>Blog Manager</h1>
          <p style={{ color: '#888', fontSize: '0.9rem', margin: '0 0 28px' }}>Enter your PIN to review and manage posts</p>
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

      {/* Delete confirmation modal */}
      {deleteSlug && deletePost && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}
          onClick={() => { setDeleteSlug(null); setDeleteError('') }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '32px 36px', maxWidth: 480, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>⚠️</div>
            <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.2rem', color: '#173404', margin: '0 0 8px' }}>Delete this post?</h2>
            <p style={{ color: '#555', fontSize: '0.92rem', margin: '0 0 6px', fontWeight: 600 }}>{deletePost.title}</p>
            <p style={{ color: '#888', fontSize: '0.82rem', margin: '0 0 20px' }}>
              This will permanently remove the post from the blog. This action cannot be undone.
            </p>
            {deleteError && <p style={{ color: '#c0392b', fontSize: '0.85rem', margin: '0 0 12px' }}>{deleteError}</p>}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => { setDeleteSlug(null); setDeleteError('') }}
                style={{ padding: '10px 20px', background: '#f0f0ec', border: 'none', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', color: '#555' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteSlug)} disabled={deleting}
                style={{ padding: '10px 20px', background: deleting ? '#ccc' : '#c0392b', color: '#fff', border: 'none', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600, cursor: deleting ? 'not-allowed' : 'pointer' }}>
                {deleting ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview panel */}
      {previewSlug && previewPost && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'flex-end', zIndex: 200 }}
          onClick={() => setPreviewSlug(null)}>
          <div style={{ background: '#fff', width: '50%', maxWidth: 600, minWidth: 380, height: '100%', overflowY: 'auto', padding: '32px 36px', boxShadow: '-4px 0 24px rgba(0,0,0,0.1)' }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: (CATEGORY_COLORS[previewPost.category] || DEFAULT_COLOR).text, background: (CATEGORY_COLORS[previewPost.category] || DEFAULT_COLOR).bg, padding: '3px 10px', borderRadius: 4, border: `1px solid ${(CATEGORY_COLORS[previewPost.category] || DEFAULT_COLOR).border}` }}>
                  {previewPost.category}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#888', marginLeft: 10 }}>{previewPost.date}</span>
              </div>
              <button onClick={() => setPreviewSlug(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#888', padding: '4px 8px' }}>✕</button>
            </div>
            <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.5rem', color: '#173404', margin: '0 0 14px', lineHeight: 1.3 }}>{previewPost.title}</h2>
            <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>{previewPost.excerpt}</p>
            <div style={{ borderTop: '1px solid #e8e8e4', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: '0.78rem', color: '#888' }}>
                <strong style={{ color: '#555' }}>Slug:</strong> /blog/{previewPost.slug}
              </div>
              <a href={`https://www.vitalishealthcare.com/blog/${previewPost.slug}`} target="_blank" rel="noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', background: '#3a7d1e', color: '#fff', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', width: 'fit-content' }}>
                View Live Post →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Top bar */}
      <div style={{ background: '#173404', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 18 }}>📋</span>
          <span style={{ color: '#fff', fontFamily: 'Lora, Georgia, serif', fontSize: '1.05rem' }}>Blog Manager</span>
          <span style={{ color: '#97c459', fontSize: '0.75rem', marginLeft: 4 }}>{posts.length} posts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {deleteSuccess && <span style={{ color: '#97c459', fontSize: '0.85rem', fontWeight: 600 }}>✓ {deleteSuccess}</span>}
          <a href="/admin/blog/categorize" style={{ color: '#97c459', fontSize: '0.85rem', textDecoration: 'none' }}>Categories</a>
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
        </aside>

        {/* Main */}
        <main style={{ padding: '20px 28px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 20 }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search posts by title..."
              style={{ ...inputStyle, width: '100%', maxWidth: 500 }} />
          </div>

          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e8e8e4', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 170px 90px 130px', padding: '12px 20px', borderBottom: '1px solid #e8e8e4', background: '#fafaf8', gap: 8 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</span>
            </div>

            {filteredPosts.map(post => {
              const color = CATEGORY_COLORS[post.category] || DEFAULT_COLOR
              return (
                <div key={post.slug} style={{
                  display: 'grid', gridTemplateColumns: '1fr 170px 90px 130px', padding: '12px 20px',
                  borderBottom: '1px solid #f0f0ec', alignItems: 'center', gap: 8,
                }}>
                  <div style={{ fontSize: '0.88rem', color: '#173404', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '0.72rem', fontWeight: 600, padding: '4px 10px', borderRadius: 4,
                      background: color.bg, color: color.text, border: `1px solid ${color.border}`,
                    }}>
                      {post.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#888' }}>{post.date}</div>
                  <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                    <button onClick={() => setPreviewSlug(post.slug)}
                      style={{ padding: '5px 12px', background: '#eaf3de', color: '#27500a', border: '1px solid #97c459', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Review
                    </button>
                    <button onClick={() => { setDeleteSlug(post.slug); setDeleteError('') }}
                      style={{ padding: '5px 12px', background: '#fff', color: '#c0392b', border: '1px solid #e8c8c8', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                      Delete
                    </button>
                  </div>
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
