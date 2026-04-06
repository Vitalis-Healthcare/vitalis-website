'use client'

import { useState, useRef, useEffect } from 'react'

/* ─────────────────────────────────────────────
   Blog Search — instant client-side search
   ───────────────────────────────────────────── */

export interface SearchablePost {
  slug: string
  title: string
  excerpt: string
  category: string
  dateFormatted: string
}

interface Props {
  posts: SearchablePost[]
}

export default function BlogSearch({ posts }: Props) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Search logic — simple but effective
  const results = query.trim().length < 2
    ? []
    : posts
        .map((post) => {
          const q = query.toLowerCase()
          const titleMatch = post.title.toLowerCase().includes(q)
          const excerptMatch = post.excerpt.toLowerCase().includes(q)
          const categoryMatch = post.category.toLowerCase().includes(q)
          // Score: title match is strongest, then category, then excerpt
          const score = (titleMatch ? 10 : 0) + (categoryMatch ? 5 : 0) + (excerptMatch ? 2 : 0)
          return { post, score }
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map((r) => r.post)

  const showDropdown = focused && query.trim().length >= 2

  const categoryColors: Record<string, { bg: string; text: string }> = {
    'Family Resources':   { bg: '#eaf3de', text: '#27500a' },
    'Senior Health':      { bg: '#e6f1fb', text: '#185fa5' },
    'Caregiver Tips':     { bg: '#faeeda', text: '#854f0b' },
    'Maryland Home Care': { bg: '#f3f9ec', text: '#3b6d11' },
    'Company News':       { bg: '#fbeaf0', text: '#993556' },
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative', maxWidth: '520px', marginTop: '20px' }}>
      <style>{`
        .blog-search-input {
          width: 100%; padding: 13px 18px 13px 44px;
          border: 1.5px solid #c0dd97; border-radius: 12px;
          font-size: 15px; font-family: inherit; color: #1a1a1a;
          background: #fff; outline: none; transition: border-color .15s, box-shadow .15s;
          box-sizing: border-box;
        }
        .blog-search-input:focus {
          border-color: #5a9e2f;
          box-shadow: 0 0 0 3px rgba(90,158,47,.15);
        }
        .blog-search-input::placeholder { color: #999; }

        .blog-search-dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; right: 0;
          background: #fff; border: 1px solid #e2efd0;
          border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,.1);
          max-height: 420px; overflow-y: auto; z-index: 50;
          animation: blog-search-in .15s ease-out;
        }
        @keyframes blog-search-in {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .blog-search-dropdown::-webkit-scrollbar { width: 4px; }
        .blog-search-dropdown::-webkit-scrollbar-thumb { background: #d4e8b8; border-radius: 4px; }

        .blog-search-item {
          display: block; padding: 14px 18px; border-bottom: 1px solid #f5f5f3;
          text-decoration: none; transition: background .1s; cursor: pointer;
        }
        .blog-search-item:last-child { border-bottom: none; }
        .blog-search-item:hover { background: #f9fdf5; }

        .blog-search-title {
          font-family: var(--font-lora, Georgia, serif);
          font-size: 14px; font-weight: 500; color: #1a1a1a;
          line-height: 1.35; margin-bottom: 4px;
        }
        .blog-search-excerpt {
          font-size: 12.5px; color: #888; line-height: 1.5;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .blog-search-meta {
          display: flex; align-items: center; gap: 8px; margin-top: 6px;
        }
        .blog-search-cat {
          display: inline-block; padding: 2px 8px; border-radius: 10px;
          font-size: 10px; font-weight: 500;
        }
        .blog-search-date { font-size: 11px; color: #aaa; }
        .blog-search-empty {
          padding: 28px 18px; text-align: center; color: #999; font-size: 14px;
        }

        @media (max-width: 640px) {
          .blog-search-dropdown {
            position: fixed; left: 12px; right: 12px; top: auto;
            max-height: 60vh;
          }
        }
      `}</style>

      {/* Search icon */}
      <svg
        style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="#97c459" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        className="blog-search-input"
        type="text"
        placeholder="Search articles — e.g. Medicaid, dementia, fall prevention..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        aria-label="Search blog articles"
      />

      {/* Clear button */}
      {query && (
        <button
          onClick={() => { setQuery(''); setFocused(false) }}
          style={{
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
            background: '#f0f0ec', border: 'none', borderRadius: '50%',
            width: '22px', height: '22px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', fontSize: '12px', color: '#888',
          }}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}

      {/* Results dropdown */}
      {showDropdown && (
        <div className="blog-search-dropdown">
          {results.length > 0 ? (
            results.map((post) => {
              const catColor = categoryColors[post.category] || { bg: '#f0f0ec', text: '#666' }
              return (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-search-item"
                  onClick={() => setFocused(false)}
                >
                  <div className="blog-search-title">{highlightMatch(post.title, query)}</div>
                  <div className="blog-search-excerpt">{post.excerpt}</div>
                  <div className="blog-search-meta">
                    <span
                      className="blog-search-cat"
                      style={{ background: catColor.bg, color: catColor.text }}
                    >
                      {post.category}
                    </span>
                    <span className="blog-search-date">{post.dateFormatted}</span>
                  </div>
                </a>
              )
            })
          ) : (
            <div className="blog-search-empty">
              No articles found for &ldquo;{query}&rdquo;
              <div style={{ marginTop: '6px', fontSize: '12px' }}>
                Try a broader term, or <a href="tel:2407166874" style={{ color: '#5a9e2f', fontWeight: 500 }}>call us</a> — we love answering questions.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* Highlight matching text in title */
function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text
  const before = text.slice(0, idx)
  const match = text.slice(idx, idx + query.length)
  const after = text.slice(idx + query.length)
  return (
    <>
      {before}
      <span style={{ background: '#eaf3de', borderRadius: '2px', padding: '0 1px' }}>{match}</span>
      {after}
    </>
  )
}
