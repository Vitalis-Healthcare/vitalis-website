import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import BlogSearch from '@/components/BlogSearch'
import { getAllPosts } from '@/lib/blog'
import type { Post } from '@/lib/blog'
import { categories, PostCard } from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: { absolute: 'Blog & Resources | Vitalis HealthCare Services' },
  description: 'Health tips, caregiving advice, and resources for Maryland families and caregivers. Expert guidance from the Vitalis HealthCare team in Silver Spring, MD.',
  alternates: { canonical: '/blog' },}

// Top posts — highest SEO value and most useful for families
const featuredSlugs = [
  'signs-time-hire-caregiver',
  'a-guide-to-medicaid-and-medicare-coverage-for-home-care-in-maryland',
  'the-difference-between-home-care-and-home-health-care',
  'how-to-prevent-falls-in-your-home',
  'how-to-detect-early-signs-of-dementia',
  'vitalis-healthcare-bags-best-of-homecare-award-third-year-in-a-row',
]

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  
  // Sort by date descending
  const sorted = [...allPosts].sort((a, b) => b.date.localeCompare(a.date))
  
  // Featured posts
  const featured = featuredSlugs
    .map(slug => allPosts.find(p => p.slug === slug))
    .filter(Boolean) as Post[]
  
  // By category
  const byCategory = Object.fromEntries(
    categories.map(c => [c.key, sorted.filter(p => p.category === c.key)])
  )

  // Searchable post metadata (no contentHtml — keeps client bundle small)
  const searchPosts = allPosts.map(({ slug, title, excerpt, category, dateFormatted }) => ({
    slug, title, excerpt, category, dateFormatted,
  }))

  return (
    <>
      <Nav />
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <span>Blog & Resources</span>
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '56px 48px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="lp-badge" style={{ marginBottom: '16px' }}><span className="bdot" />Resources for Maryland Families & Caregivers</div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '40px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '14px' }}>
            Blog & Resources
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '580px', marginBottom: '20px' }}>
            {allPosts.length} articles on senior health, caregiving, and home care in Maryland — written for families, not professionals.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(c => (
              <a key={c.key} href={`#${c.key.toLowerCase().replace(/ /g,'-')}`} style={{ textDecoration: 'none' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff', border: `1px solid ${c.color.border}`, borderRadius: '20px', padding: '5px 14px', fontSize: '12px', fontWeight: 500, color: c.color.text, cursor: 'pointer' }}>
                  {c.label}
                  <span style={{ background: c.color.bg, borderRadius: '10px', padding: '1px 7px', fontSize: '10px' }}>{byCategory[c.key]?.length ?? 0}</span>
                </span>
              </a>
            ))}
          </div>
          <BlogSearch posts={searchPosts} />
        </div>
      </section>

      <TrustBar />

      {/* Top posts */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner-wide">
          <p className="sec-label">Most read</p>
          <h2 className="sec-h" style={{ marginBottom: '10px' }}>Top posts on our site</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '28px' }}>The articles families and caregivers come back to most.</p>
          <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {featured.map(post => <PostCard key={post.slug} post={post} size="large" />)}
          </div>
        </div>
      </section>

      {/* Latest */}
      <section className="sec">
        <div className="inner-wide">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p className="sec-label">Fresh off the press</p>
              <h2 className="sec-h" style={{ marginBottom: '4px' }}>Latest from our blog</h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>The newest articles on our site.</p>
            </div>
            <a href="/blog/all" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--g-bd)', textDecoration: 'none', whiteSpace: 'nowrap' }}>See all posts &rarr;</a>
          </div>
          <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {sorted.slice(0, 6).map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      {/* Category sections */}
      {categories.map((cat, i) => {
        const posts = byCategory[cat.key] ?? []
        if (posts.length === 0) return null
        return (
          <section
            key={cat.key}
            id={cat.key.toLowerCase().replace(/ /g, '-')}
            className={i % 2 === 0 ? 'sec sec-alt' : 'sec'}
          >
            <div className="inner-wide">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <span style={{ display: 'inline-block', background: cat.color.bg, color: cat.color.text, border: `1px solid ${cat.color.border}`, borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 500, marginBottom: '8px' }}>{cat.label}</span>
                  <h2 className="sec-h" style={{ marginBottom: '4px' }}>{cat.desc}</h2>
                </div>
                <span style={{ fontSize: '13px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{posts.length} articles</span>
              </div>
              <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                {posts.map(post => <PostCard key={post.slug} post={post} />)}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section style={{ background: 'var(--g-dk)', padding: '64px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '32px', fontWeight: 500, color: '#eaf3de', marginBottom: '12px', lineHeight: 1.25 }}>
          Have a question not answered here?
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#97c459', maxWidth: '480px', marginInline: 'auto', marginBottom: '28px' }}>
          Our team answers real questions — call, WhatsApp, or email us directly.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://getcare.vitalishealthcare.com" style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Talk to Our Team</a>
          <a href="tel:2407166874" style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', color: '#c0dd97', border: '2px solid #3b6d11', borderRadius: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>Call 240.716.6874</a>
        </div>
      </section>

      <Footer />
    </>
  )
}
