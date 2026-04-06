import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/blog'
import type { Post } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog & Resources | Vitalis HealthCare Services',
  description: 'Health tips, caregiving advice, and resources for Maryland families and caregivers. Expert guidance from the Vitalis HealthCare team in Silver Spring, MD.',
}

const categories = [
  { key: 'Family Resources',   label: 'For Families',        desc: 'Guidance for families navigating home care decisions',  color: { bg: '#eaf3de', text: '#27500a', border: '#97c459' } },
  { key: 'Senior Health',      label: 'Senior Health',       desc: 'Health guidance, conditions, and wellness for older adults', color: { bg: '#e6f1fb', text: '#185fa5', border: '#85b7eb' } },
  { key: 'Caregiver Tips',     label: 'Caregiver Tips',      desc: 'Professional advice for caregivers and home health aides', color: { bg: '#faeeda', text: '#854f0b', border: '#fac775' } },
  { key: 'Maryland Home Care', label: 'Maryland Home Care',  desc: 'Local resources, payment options, and Maryland-specific guides', color: { bg: '#f3f9ec', text: '#3b6d11', border: '#c0dd97' } },
  { key: 'Company News',       label: 'Company News',        desc: 'Awards, announcements, and updates from Vitalis HealthCare', color: { bg: '#fbeaf0', text: '#993556', border: '#f4c0d1' } },
]

// Top posts — highest SEO value and most useful for families
const featuredSlugs = [
  'signs-time-hire-caregiver',
  'a-guide-to-medicaid-and-medicare-coverage-for-home-care-in-maryland',
  'the-difference-between-home-care-and-home-health-care',
  'how-to-prevent-falls-in-your-home',
  'how-to-detect-early-signs-of-dementia',
  'vitalis-healthcare-bags-best-of-homecare-award-third-year-in-a-row',
]

function PostCard({ post, size = 'normal' }: { post: Post; size?: 'large' | 'normal' }) {
  const cat = categories.find(c => c.key === post.category)
  const color = cat?.color ?? { bg: '#eaf3de', text: '#27500a', border: '#97c459' }
  return (
    <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        border: '1px solid var(--border)',
        padding: size === 'large' ? '28px 26px' : '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        transition: 'border-color .15s',
      }}>
        <span style={{ display: 'inline-block', background: color.bg, color: color.text, border: `1px solid ${color.border}`, borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 500, alignSelf: 'flex-start' }}>
          {post.category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: size === 'large' ? '19px' : '15px', fontWeight: 500, color: 'var(--text)', lineHeight: 1.35, margin: 0 }}>
          {post.title}
        </h3>
        <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--muted)', flex: 1, margin: 0 }}>
          {post.excerpt.slice(0, size === 'large' ? 140 : 110)}{post.excerpt.length > (size === 'large' ? 140 : 110) ? '...' : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{post.dateFormatted}</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--g-bd)' }}>Read →</span>
        </div>
      </div>
    </a>
  )
}

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
