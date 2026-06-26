import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/blog'
import { PostCard } from '@/components/blog/PostCard'

export const metadata: Metadata = {
  title: { absolute: 'All Articles | Vitalis HealthCare Services' },
  description: 'Every article from the Vitalis HealthCare blog, newest first — senior health, caregiving, dementia care, and home care guidance for Maryland families.',
  alternates: { canonical: '/blog/all' },
}

export default async function AllBlogPage() {
  const allPosts = await getAllPosts()
  const sorted = [...allPosts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <>
      <Nav />
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <a href="/blog">Blog &amp; Resources</a> &rsaquo; <span>All Articles</span>
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '56px 48px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="lp-badge" style={{ marginBottom: '16px' }}><span className="bdot" />Every article, newest first</div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '40px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '14px' }}>
            All articles
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '580px', marginBottom: '20px' }}>
            All {allPosts.length} posts on senior health, caregiving, and home care in Maryland, in order of newest first.
          </p>
          <a href="/blog" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--g-bd)', textDecoration: 'none' }}>&larr; Back to Blog &amp; Resources</a>
        </div>
      </section>

      <TrustBar />

      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner-wide">
          <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
            {sorted.map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
