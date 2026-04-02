import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getPost, getPostSlugs } from '@/lib/blog'


interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Vitalis HealthCare Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Family Resources':   { bg: '#eaf3de', text: '#27500a', border: '#97c459' },
  'Senior Health':      { bg: '#e6f1fb', text: '#185fa5', border: '#85b7eb' },
  'Caregiver Tips':     { bg: '#faeeda', text: '#854f0b', border: '#fac775' },
  'Maryland Home Care': { bg: '#f3f9ec', text: '#3b6d11', border: '#c0dd97' },
  'Company News':       { bg: '#fbeaf0', text: '#993556', border: '#f4c0d1' },
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const catColor = categoryColors[post.category] ?? { bg: '#eaf3de', text: '#27500a', border: '#97c459' }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Vitalis HealthCare Services' },
    publisher: {
      '@type': 'Organization',
      name: 'Vitalis HealthCare Services',
      url: 'https://www.vitalishealthcare.com',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; <span>{post.title.slice(0, 50)}{post.title.length > 50 ? '...' : ''}</span>
      </div>

      {/* Post header */}
      <section style={{ background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '56px 48px 48px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span style={{ display: 'inline-block', background: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}`, borderRadius: '20px', padding: '4px 14px', fontSize: '12px', fontWeight: 500, marginBottom: '16px' }}>
            {post.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '38px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '16px' }}>
            {post.title}
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '20px' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: 'var(--muted)' }}>
            <span>By {post.author}</span>
            <span style={{ color: '#c0dd97' }}>·</span>
            <span>{post.dateFormatted}</span>
          </div>
        </div>
      </section>

      {/* Post content */}
      <section style={{ padding: '56px 48px', background: '#fff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <style>{`
            .blog-content h2 {
              font-family: var(--font-lora), Georgia, serif;
              font-size: 24px;
              font-weight: 500;
              color: var(--text);
              margin: 36px 0 14px;
              line-height: 1.3;
            }
            .blog-content h3 {
              font-family: var(--font-lora), Georgia, serif;
              font-size: 20px;
              font-weight: 500;
              color: var(--text);
              margin: 28px 0 10px;
            }
            .blog-content p {
              font-size: 16px;
              line-height: 1.85;
              color: #444;
              margin-bottom: 18px;
            }
            .blog-content ul, .blog-content ol {
              margin: 0 0 18px 20px;
            }
            .blog-content li {
              font-size: 15px;
              line-height: 1.8;
              color: #444;
              margin-bottom: 8px;
            }
            .blog-content strong {
              color: var(--text);
              font-weight: 500;
            }
            .blog-content em {
              font-style: italic;
            }
            .blog-content a {
              color: var(--g-bd);
              text-decoration: underline;
              text-underline-offset: 3px;
            }
            .blog-content a:hover {
              color: var(--g);
            }
            .blog-content blockquote {
              border-left: 3px solid var(--g-md);
              padding-left: 20px;
              margin: 24px 0;
              font-family: var(--font-lora), Georgia, serif;
              font-style: italic;
              font-size: 18px;
              color: var(--g-bd);
              line-height: 1.7;
            }
          `}</style>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--g-lt)', padding: '48px', borderTop: '1px solid #c0dd97' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <p style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '22px', fontWeight: 500, color: 'var(--g-dk)', marginBottom: '8px', lineHeight: 1.3 }}>
              Need home care for a loved one in Maryland?
            </p>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>
              Vitalis HealthCare serves Silver Spring, Rockville, Gaithersburg, and communities across Montgomery County and Baltimore County. MDH OHCQ Licensed #3879R.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
            <a href="https://getcare.vitalishealthcare.com" className="btn-primary" style={{ textAlign: 'center' }}>
              Get a Free Consultation
            </a>
            <a href="tel:2407166874" className="btn-secondary" style={{ textAlign: 'center' }}>
              Call 240.716.6874
            </a>
          </div>
        </div>
      </section>

      {/* Related / back to blog */}
      <section style={{ padding: '40px 48px', background: '#fff', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/blog" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--g-bd)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← Back to all articles
          </a>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/contact" style={{ fontSize: '13px', color: 'var(--muted)' }}>Contact Us</a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="/services/companion-care" style={{ fontSize: '13px', color: 'var(--muted)' }}>Our Services</a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
