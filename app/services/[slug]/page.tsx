import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { services, getService } from '@/lib/data/services'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const svc = getService(slug)
  if (!svc) return {}
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    openGraph: { title: svc.metaTitle, description: svc.metaDescription },
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const svc = getService(slug)
  if (!svc) notFound()

  const {
    name, badge, h1, lead, whatItIs, heroImage, heroImageAlt, heroPrompt,
    whoNeedsIt, whatIncludes, howWeDeliver, faqs, testimonial,
    relatedServices, relatedConditions,
  } = svc

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MedicalWebPage', 'Service'],
        name: `Vitalis HealthCare — ${name} in Silver Spring, MD`,
        url: `https://www.vitalishealthcare.com/services/${slug}`,
        description: svc.metaDescription,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Vitalis HealthCare Services',
          telephone: '+12407166874',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '8757 Georgia Avenue, Suite 440',
            addressLocality: 'Silver Spring',
            addressRegion: 'MD',
            postalCode: '20910',
          },
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <a href="/#services">Services</a> &rsaquo; <span>{name}</span>
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '480px' }}>
          {/* Left — text */}
          <div style={{ padding: '64px 48px 64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="lp-badge" style={{ marginBottom: '18px', alignSelf: 'flex-start' }}>
              <span className="bdot" />{badge}
            </div>
            <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '38px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '18px' }}>
              {h1}
            </h1>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '28px', maxWidth: '480px' }}>
              {lead.slice(0, 200)}...
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <a href="https://getcare.vitalishealthcare.com" className="btn-primary">
                Talk to Us — It&apos;s Free
              </a>
              <a href="tel:2407166874" className="btn-secondary">
                240.716.6874
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['MDH OHCQ Licensed #3879R', 'RN Supervised', 'VA & Medicaid Accepted', '24/7 Available'].map((c) => (
                <span key={c} className="chip"><span className="cdot" />{c}</span>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div style={{ position: 'relative', minHeight: '480px', background: '#d4e8b8' }}>
            {heroImage ? (
              <Image
                src={heroImage}
                alt={heroImageAlt}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="50vw"
                priority
              />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '32px', textAlign: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--g-lt)', border: '2px dashed #97c459', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="18" cy="12" r="7" /><path d="M3 34c0-8.284 6.716-15 15-15s15 6.716 15 15" />
                  </svg>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--g-bd)', fontWeight: 500 }}>Hero photo coming</p>
                {heroPrompt && (
                  <p style={{ fontSize: '11px', color: '#97c459', lineHeight: 1.5, maxWidth: '280px' }}>
                    Prompt: {heroPrompt.slice(0, 100)}...
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* What it is */}
      <section className="sec">
        <div className="inner">
          <p className="sec-label">What it is</p>
          <h2 className="sec-h">What is {svc.shortName}?</h2>
          <p className="sec-p" style={{ marginBottom: '16px' }}>{whatItIs}</p>
          <p className="sec-p">{lead}</p>
        </div>
      </section>

      {/* Who needs it */}
      <section className="sec sec-alt">
        <div className="inner-wide">
          <p className="sec-label">Is this right for your family?</p>
          <h2 className="sec-h">Signs your loved one may need {svc.shortName.toLowerCase()}</h2>
          <p className="sec-p" style={{ marginBottom: '28px' }}>
            Families often wait longer than they should. Here are the situations where {svc.shortName.toLowerCase()} makes the clearest difference.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '18px' }}>
            {whoNeedsIt.map(({ heading, body }) => (
              <div key={heading} className="card">
                <span className="pill">When to call</span>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{heading}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner">
          <p className="sec-label">What&apos;s included</p>
          <h2 className="sec-h">Everything covered under {svc.shortName.toLowerCase()}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '18px', marginTop: '28px' }}>
            {whatIncludes.map(({ heading, body }) => (
              <div key={heading} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: '#fff', borderRadius: '12px', border: '1px solid #c0dd97', padding: '22px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--g-lt)', border: '1px solid #97c459', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px', color: 'var(--g-bd)' }}>✓</div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '5px' }}>{heading}</div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we deliver */}
      <section className="sec sec-alt">
        <div className="inner">
          <p className="sec-label">The Vitalis difference</p>
          <h2 className="sec-h">How we deliver {svc.shortName.toLowerCase()}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '18px', marginTop: '28px' }}>
            {howWeDeliver.map(({ heading, body }, i) => (
              <div key={heading} className="card-green" style={{ borderRadius: '12px' }}>
                <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '32px', fontWeight: 500, color: '#c0dd97', lineHeight: 1, marginBottom: '10px' }}>0{i + 1}</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{heading}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{body}</p>
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
            <p style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '16px', lineHeight: 1.7, color: 'var(--text)', marginBottom: '14px', fontStyle: 'italic' }}>
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
              <strong style={{ color: 'var(--g-bd)' }}>{testimonial.name}</strong> · {testimonial.location}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec sec-alt">
        <div className="inner">
          <div className="two-col">
            <div>
              <p className="sec-label">Common questions</p>
              <h2 className="sec-h">{svc.shortName} — what families ask us</h2>
              <p className="sec-p" style={{ marginBottom: '24px' }}>
                We&apos;re happy to talk through your specific situation — no obligation, no pressure. Just honest answers.
              </p>
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
        heading={`Ready to talk about ${svc.shortName.toLowerCase()} for your family?`}
        body="We'll listen to your situation, answer every question, and help you understand your options — at no cost and with no obligation. Most families feel relief just from having the conversation."
      />

      {/* Related */}
      <section className="sec">
        <div className="inner-wide">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div>
              <p className="sec-label">Other services</p>
              <h2 className="sec-h" style={{ fontSize: '22px', marginBottom: '16px' }}>We also provide</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedServices.map(({ name: rn, slug: rs }) => (
                  <a key={rs} href={`/services/${rs}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--g-lt)', borderRadius: '10px', border: '1px solid #c0dd97', padding: '14px 18px', fontSize: '15px', fontWeight: 500, color: 'var(--g-bd)' }}>
                    <span className="cdot" />{rn} →
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="sec-label">Specialized care</p>
              <h2 className="sec-h" style={{ fontSize: '22px', marginBottom: '16px' }}>Condition-specific pages</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {relatedConditions.map(({ name: rn, slug: rs }) => (
                  <a key={rs} href={`/conditions/${rs}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fafaf8', borderRadius: '10px', border: '1px solid var(--border)', padding: '14px 18px', fontSize: '15px', fontWeight: 500, color: 'var(--text)' }}>
                    <span className="cdot" />{rn} →
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
