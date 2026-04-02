import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact Vitalis HealthCare | Silver Spring, MD | 240.716.6874',
  description: 'Contact Vitalis HealthCare Services in Silver Spring, MD. Request home care, reach our team, or connect with us as a referral source. Call 240.716.6874 or WhatsApp us anytime.',
  openGraph: {
    title: 'Contact Vitalis HealthCare Services',
    description: 'Three ways to reach us — families, existing clients, and referral sources. We respond the same day.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Vitalis HealthCare Services',
  url: 'https://www.vitalishealthcare.com/contact',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'Vitalis HealthCare Services',
    telephone: '+12407166874',
    email: 'team@vitalishealthcare.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8757 Georgia Avenue, Suite 440',
      addressLocality: 'Silver Spring',
      addressRegion: 'MD',
      postalCode: '20910',
    },
    openingHours: ['Mo-Fr 09:00-17:00', 'Sa 10:00-16:00'],
  },
}

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <span>Contact Us</span>
      </div>

      {/* Hero */}
      <section className="hero-lp">
        <div className="hero-lp-inner">
          <div className="lp-badge"><span className="bdot" />Silver Spring, MD · Available 24/7</div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '42px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '18px' }}>
            We&apos;re here. <em style={{ fontStyle: 'italic', color: 'var(--g-bd)' }}>Tell us how we can help.</em>
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '600px' }}>
            Whether you&apos;re a family looking for care, an existing client with a question, or a referral source wanting to connect — we respond the same day. No call center. No runaround. Real people who know what they&apos;re talking about.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Three paths */}
      <section className="sec">
        <div className="inner-wide">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <p className="sec-label">How can we help you?</p>
            <h2 className="sec-h">Choose the right path for your situation</h2>
          </div>

          <div className="three-col">

            {/* Path 1 — Families */}
            <div style={{ background: 'var(--g-lt)', borderRadius: '16px', border: '2px solid #97c459', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--g)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--g-bd)', marginBottom: '6px' }}>For families</div>
                <h3 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '22px', fontWeight: 500, color: 'var(--text)', marginBottom: '10px' }}>I need home care for a loved one</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '20px' }}>
                  Start here. Tell us about your loved one&apos;s situation and we&apos;ll help you understand your options, what you may qualify for, and what the next step looks like. Free consultation, no obligation.
                </p>
              </div>
              <a
                href="https://getcare.vitalishealthcare.com"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '14px 24px', fontSize: '15px', fontWeight: 500, textDecoration: 'none', marginTop: 'auto' }}
              >
                Request a Free Consultation →
              </a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
                <a href="tel:2407166874" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--g-bd)', fontWeight: 500 }}>
                  <span style={{ fontSize: '16px' }}>📞</span> 240.716.6874
                </a>
                <a href="https://wa.me/12027796027" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--g-bd)', fontWeight: 500 }}>
                  <span style={{ fontSize: '16px' }}>💬</span> WhatsApp Us
                </a>
              </div>
            </div>

            {/* Path 2 — Existing clients */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--g-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--g-bd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--g-bd)', marginBottom: '6px' }}>For current clients</div>
                <h3 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '22px', fontWeight: 500, color: 'var(--text)', marginBottom: '10px' }}>I&apos;m an existing client or family member</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '20px' }}>
                  For scheduling changes, caregiver concerns, billing questions, or anything about your current care — contact your case manager directly or reach our office. We respond the same day.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
                <a href="tel:2407166874" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--g-lt)', color: 'var(--g-bd)', border: '1.5px solid #97c459', borderRadius: '8px', padding: '13px 24px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
                  📞 Call 240.716.6874
                </a>
                <a href="mailto:team@vitalishealthcare.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fafaf8', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                  ✉️ team@vitalishealthcare.com
                </a>
                <a href="https://wa.me/12027796027" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            {/* Path 3 — Referral sources */}
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--g-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--g-bd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--g-bd)', marginBottom: '6px' }}>For referral sources</div>
                <h3 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '22px', fontWeight: 500, color: 'var(--text)', marginBottom: '10px' }}>I&apos;m a discharge planner, social worker, or physician</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--muted)', marginBottom: '20px' }}>
                  We make referrals easy. Our team responds to discharge referrals quickly, communicates clearly, and keeps you informed. Email our clinical team directly for the fastest response.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
                <a href="mailto:team@vitalishealthcare.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--g-lt)', color: 'var(--g-bd)', border: '1.5px solid #97c459', borderRadius: '8px', padding: '13px 24px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
                  ✉️ team@vitalishealthcare.com
                </a>
                <a href="tel:2407166874" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#fafaf8', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                  📞 240.716.6874
                </a>
                <a href="https://wa.me/12027796027" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', borderRadius: '8px', padding: '13px 24px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}>
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Office info + hours */}
      <section className="sec sec-alt">
        <div className="inner">
          <div className="two-col" style={{ gap: '56px', alignItems: 'start' }}>
            <div>
              <p className="sec-label">Find us</p>
              <h2 className="sec-h">Our office</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--g-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--g-bd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>Address</div>
                    <div style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.7 }}>8757 Georgia Avenue, Suite 440<br />Silver Spring, MD 20910</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--g-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--g-bd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>Phone</div>
                    <a href="tel:2407166874" style={{ fontSize: '14px', color: 'var(--g-bd)', fontWeight: 500 }}>240.716.6874</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '8px', background: 'var(--g-lt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--g-bd)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>Email</div>
                    <a href="mailto:team@vitalishealthcare.com" style={{ fontSize: '14px', color: 'var(--g-bd)' }}>team@vitalishealthcare.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="sec-label">When we&apos;re available</p>
              <h2 className="sec-h">Office hours</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '8px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
                {[
                  { day: 'Monday – Friday', hours: '9:00 AM – 5:00 PM', open: true },
                  { day: 'Saturday', hours: '10:00 AM – 4:00 PM', open: true },
                  { day: 'Sunday', hours: 'Closed', open: false },
                ].map(({ day, hours, open }, i) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: i % 2 === 0 ? '#fff' : '#fafaf8', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{day}</span>
                    <span style={{ fontSize: '14px', color: open ? 'var(--g-bd)' : 'var(--muted)', fontWeight: open ? 500 : 400 }}>{hours}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', background: 'var(--g-lt)', borderRadius: '10px', border: '1px solid #c0dd97', padding: '14px 18px' }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--g-bd)', marginBottom: '4px' }}>🕐 Care coordination — 24 hours, 7 days</div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  For urgent care needs outside office hours, call or WhatsApp us. Our on-call coordination team is always available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section style={{ height: '380px', background: '#e4f1d4', position: 'relative' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.3!2d-77.0261!3d38.9942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6b9b9b9b9b9%3A0x0!2s8757+Georgia+Ave%2C+Silver+Spring%2C+MD+20910!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="380"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vitalis HealthCare Office — 8757 Georgia Avenue, Silver Spring MD"
        />
      </section>

      {/* Referral partner callout */}
      <section className="sec" style={{ background: 'var(--g-dk)' }}>
        <div className="inner" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.1em', color: '#97c459', marginBottom: '10px' }}>For discharge planners & social workers</p>
          <h2 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '30px', fontWeight: 500, color: '#eaf3de', marginBottom: '14px', lineHeight: 1.25 }}>
            We make your job easier — not harder.
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#97c459', maxWidth: '580px', marginInline: 'auto', marginBottom: '28px' }}>
            We respond to referrals fast, communicate clearly, and follow through. MDH OHCQ licensed at RSA Level 3, BCHD contracted, and accepting VA, Medicaid Waiver, LTC Insurance, and private pay. If your patient needs home care, we can usually begin within 24–48 hours.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:team@vitalishealthcare.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
              Email Our Clinical Team
            </a>
            <a href="tel:2407166874" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#c0dd97', border: '2px solid #3b6d11', borderRadius: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>
              Call 240.716.6874
            </a>
          </div>
          <p style={{ fontSize: '12px', color: '#3b6d11', marginTop: '16px' }}>
            Referral email: team@vitalishealthcare.com &nbsp;·&nbsp; OHCQ License #3879R &nbsp;·&nbsp; NPI available on request
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
