import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'
import { locations, getLocation } from '@/lib/data/locations'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) return {}
  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `/home-care/${slug}` },
    openGraph: { title: loc.metaTitle, description: loc.metaDescription },
  }
}

export default async function LocationPage({ params }: Props) {
  const { slug } = await params
  const loc = getLocation(slug)
  if (!loc) notFound()

  const { city, state, county, bchd, intro, countryContext, neighborhoods, stats, faqs, testimonial, relatedLocations } = loc

  const trustItems = [
    { label: 'MDH OHCQ Licensed', value: 'RSA Level 3 · License #3879R' },
    { label: 'Regulated by', value: 'Maryland Dept. of Health' },
    { label: 'Network', value: 'CareScout Approved' },
    bchd
      ? { label: 'BCHD Recognized', value: county }
      : { label: 'County', value: county },
    { label: 'Payment', value: 'VA · Medicaid · LTC · Private Pay' },
    { label: 'Available', value: '24 Hours · 7 Days' },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HomeAndConstructionBusiness', 'MedicalBusiness', 'LocalBusiness'],
        name: 'Vitalis HealthCare Services',
        url: `https://www.vitalishealthcare.com/home-care/${slug}`,
        telephone: '+12407166874',
        email: 'team@vitalishealthcare.com',
        address: { '@type': 'PostalAddress', streetAddress: '8757 Georgia Avenue, Suite 440', addressLocality: 'Silver Spring', addressRegion: 'MD', postalCode: '20910', addressCountry: 'US' },
        areaServed: [city, county, 'Maryland'],
        openingHours: ['Mo-Fr 09:00-17:00', 'Sa 10:00-16:00'],
        hasCredential: ['OHCQ License #3879R', 'Maryland Dept. of Health OHCQ License #3879R — RSA Level 3', 'CareScout Approved Provider'],
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
        <a href="/">Home</a> &rsaquo; <a href="/home-care">Locations</a> &rsaquo; <span>Home Care in {city}, {state}</span>
      </div>

      {/* Hero */}
      <section className="hero-lp">
        <div className="hero-lp-inner">
          <div className="lp-badge">
            <span className="bdot" />
            Home Care · {city}, {state} · {county}
          </div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '42px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '18px' }}>
            Trusted home care in{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--g-bd)' }}>{city}, {state}</em>{' '}
            — for families who want the very best.
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '28px', maxWidth: '640px' }}>
            {intro.slice(0, 220)}...
          </p>
          <div style={{ display: 'flex', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
            <a href="https://getcare.vitalishealthcare.com" className="btn-primary">Talk to Us Today — It&apos;s Free</a>
            <a href="tel:2407166874" className="btn-secondary">Call 240.716.6874</a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['MDH OHCQ Licensed #3879R', 'Maryland Dept. of Health Regulated', bchd ? 'BCHD Recognized' : county, 'VA & Medicaid Accepted'].map((c) => (
              <span key={c} className="chip"><span className="cdot" />{c}</span>
            ))}
          </div>
        </div>
      </section>

      <TrustBar items={trustItems} />

      {/* About + Stats */}
      <section className="sec">
        <div className="inner">
          <div className="two-col">
            <div>
              <p className="sec-label">About our {city} care</p>
              <h2 className="sec-h">Home care built for {city} families.</h2>
              <p className="sec-p" style={{ marginBottom: '16px' }}>{intro}</p>
              <p className="sec-p" style={{ marginBottom: '16px' }}>{countryContext}</p>
              <p className="sec-p">We serve families in {neighborhoods}.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stats.map(([n, l]) => (
                <div key={n} className="card-green" style={{ textAlign: 'center' }}>
                  <div className="stat-n">{n}</div>
                  <div className="stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="sec sec-alt">
        <div className="inner">
          <p className="sec-label">What we offer in {city}</p>
          <h2 className="sec-h">Every level of care, under one trusted roof.</h2>
          <p className="sec-p" style={{ marginBottom: '28px' }}>We focus on three core services — so every client gets expert, well-supervised care, not a stretched generalist agency trying to do everything at once.</p>
          <div className="three-col">
            {[
              { pill: 'Companion Care', h: 'Someone to be there', p: 'Real conversation, shared errands, engagement, and the steady, friendly presence that keeps your loved one connected to life — and not lonely or isolated.' },
              { pill: 'Personal Care', h: 'Help with daily life, done with dignity', p: 'Bathing, dressing, grooming, and mobility assistance — professional, respectful, and delivered in a way that preserves your loved one\'s independence and self-esteem.' },
              { pill: 'Skilled Nursing', h: 'Clinical care at home', p: 'Registered nurses providing wound care, medication management, health monitoring, and post-surgical support — hospital-quality care without leaving the comfort of home.' },
            ].map(({ pill, h, p }) => (
              <div key={pill} className="card">
                <span className="pill">{pill}</span>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{h}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="sec sec-green">
        <div className="inner">
          <div className="testi-card" style={{ maxWidth: '680px', marginInline: 'auto' }}>
            <div className="stars">★★★★★</div>
            <p style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '16px', lineHeight: 1.7, color: 'var(--text)', marginBottom: '14px', fontStyle: 'italic' }}>&ldquo;{testimonial.quote}&rdquo;</p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}><strong style={{ color: 'var(--g-bd)' }}>{testimonial.name}</strong> · {testimonial.location}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="inner">
          <div className="two-col">
            <div>
              <p className="sec-label">Common questions</p>
              <h2 className="sec-h">What {city} families ask us most</h2>
              <p className="sec-p" style={{ marginBottom: '24px' }}>Every family&apos;s situation is different — and we&apos;re happy to answer questions specific to yours. Call or WhatsApp us any time. No obligation, no pressure.</p>
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

      <CTASection heading={`Ready to get started in ${city}?`} body="Call us, WhatsApp us, or fill out a short form. We'll answer your questions and arrange a free care consultation — usually the same day." />

      {/* Related */}
      <section className="sec">
        <div className="inner-wide">
          <p className="sec-label">Also serving</p>
          <h2 className="sec-h">Other communities we serve</h2>
          <div className="related-grid">
            {relatedLocations.map(({ city: rc, slug: rs }) => (
              <div key={rs} className="related-card">
                <div className="related-type">Location</div>
                <div className="related-h">Home Care in {rc}, MD</div>
                <a className="related-lnk" href={`/home-care/${rs}`}>Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
