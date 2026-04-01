import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { conditions, getCondition } from '@/lib/data/conditions'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return conditions.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cond = getCondition(slug)
  if (!cond) return {}
  return {
    title: cond.metaTitle,
    description: cond.metaDescription,
    openGraph: { title: cond.metaTitle, description: cond.metaDescription },
  }
}

export default async function ConditionPage({ params }: Props) {
  const { slug } = await params
  const cond = getCondition(slug)
  if (!cond) notFound()

  const { name, badge, h1, lead, whatItIs, signs, howWeHelp, faqs, testimonial, relatedConditions } = cond

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        name: `Vitalis HealthCare — ${name} in Silver Spring, MD`,
        url: `https://www.vitalishealthcare.com/conditions/${slug}`,
        description: cond.metaDescription,
        medicalSpecialty: 'Home Health Care',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <a href="/#conditions">Conditions</a> &rsaquo; <span>{name}</span>
      </div>

      {/* Hero */}
      <section className="hero-lp">
        <div className="hero-lp-inner">
          <div className="lp-badge"><span className="bdot" />{badge}</div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '42px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '18px' }}>
            {h1}
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '28px', maxWidth: '680px' }}>
            {lead.slice(0, 220)}...
          </p>
          <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <a href="https://getcare.vitalishealthcare.com" className="btn-primary">Talk to Us — Free Consultation</a>
            <a href="tel:2407166874" className="btn-secondary">Call 240.716.6874</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['OHCQ Licensed #3879R', 'Joint Commission Certified', 'RN-Supervised Care', 'VA & Medicaid Accepted'].map((c) => (
              <span key={c} className="chip"><span className="cdot" />{c}</span>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* What it is */}
      <section className="sec">
        <div className="inner">
          <p className="sec-label">Understanding the need</p>
          <h2 className="sec-h">What is {name} at home?</h2>
          <p className="sec-p" style={{ marginBottom: '16px' }}>{whatItIs}</p>
          <p className="sec-p">{lead}</p>
        </div>
      </section>

      {/* Signs */}
      <section className="sec sec-alt">
        <div className="inner-wide">
          <p className="sec-label">Signs it&apos;s time to call</p>
          <h2 className="sec-h">How do you know when professional care is needed?</h2>
          <p className="sec-p" style={{ marginBottom: '28px' }}>Families often wait too long — not because they don&apos;t care, but because they&apos;re not sure the situation is serious enough. Here are the signs to look for.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {signs.map(({ heading, body }) => (
              <div key={heading} className="card">
                <span className="pill">Warning sign</span>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{heading}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we help */}
      <section className="sec sec-green">
        <div className="inner">
          <p className="sec-label">How Vitalis helps</p>
          <h2 className="sec-h">What our {name.toLowerCase()} team actually does</h2>
          <div style={{ marginTop: '24px' }}>
            {howWeHelp.map(({ heading, body }) => (
              <div key={heading} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid #d4e8b8' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fff', border: '1px solid #97c459', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px', color: 'var(--g-bd)' }}>✓</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '5px' }}>{heading}</div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="sec">
        <div className="inner">
          <div className="testi-card" style={{ maxWidth: '680px', marginInline: 'auto' }}>
            <div className="stars">★★★★★</div>
            <p style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '16px', lineHeight: 1.7, color: 'var(--text)', marginBottom: '14px', fontStyle: 'italic' }}>&ldquo;{testimonial.quote}&rdquo;</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}><strong style={{ color: 'var(--g-bd)' }}>{testimonial.name}</strong> · {testimonial.location}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec sec-alt">
        <div className="inner">
          <div className="two-col">
            <div>
              <p className="sec-label">Your questions answered</p>
              <h2 className="sec-h">{name} — what families ask us</h2>
              <p className="sec-p" style={{ marginBottom: '24px' }}>You don&apos;t have to figure this out alone. We&apos;re happy to talk through your specific situation — no obligation, no pressure.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:2407166874" className="btn-primary" style={{ maxWidth: '240px', textAlign: 'center' }}>Call 240.716.6874</a>
                <a href="https://wa.me/12027796027" className="btn-wa" style={{ maxWidth: '240px' }}>WhatsApp Us</a>
              </div>
            </div>
            <div className="faq-list">
              {faqs.map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <div className="faq-q">{q}</div>
                  <p className="faq-a">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        heading="Your family doesn't have to manage this alone."
        body="We'll listen, answer your questions, and help you understand your options — at no cost and with no obligation. Most families feel relief just from having the conversation."
      />

      {/* Related conditions */}
      <section className="sec">
        <div className="inner-wide">
          <p className="sec-label">Related care</p>
          <h2 className="sec-h">Other conditions we specialize in</h2>
          <div className="related-grid">
            {relatedConditions.map(({ name: rn, slug: rs }) => (
              <div key={rs} className="related-card">
                <div className="related-type">Condition</div>
                <div className="related-h">{rn}</div>
                <a className="related-lnk" href={`/conditions/${rs}`}>Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
