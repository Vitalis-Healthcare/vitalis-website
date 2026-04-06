import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Caregiver Jobs in Silver Spring, MD | Vitalis HealthCare Careers',
  description: 'Join the Vitalis HealthCare team in Silver Spring, MD. Now hiring CNAs, CMTs, GNAs and HHAs. Competitive pay, real training, a team that treats you like family. Apply today.',
  alternates: { canonical: '/careers' },  openGraph: {
    title: 'Caregiver Jobs at Vitalis HealthCare — Silver Spring, MD',
    description: 'Now hiring CNAs, CMTs, GNAs and HHAs in Silver Spring and Montgomery County, MD. Apply at apply.vitalishealthcare.com.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: 'Home Health Aide / Caregiver',
  description: 'Vitalis HealthCare is hiring CNAs, CMTs, GNAs, and HHAs to serve clients across Silver Spring and Montgomery County, MD. Competitive pay, consistent scheduling, and a team that treats caregivers like professionals.',
  alternates: { canonical: '/careers' },  hiringOrganization: {
    '@type': 'Organization',
    name: 'Vitalis HealthCare Services',
    sameAs: 'https://www.vitalishealthcare.com',
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Silver Spring',
      addressRegion: 'MD',
      addressCountry: 'US',
    },
  },
  employmentType: 'FULL_TIME',
  datePosted: '2026-01-01',
}

const roles = [
  {
    code: 'CNA',
    title: 'Certified Nursing Assistant',
    tag: 'Actively Hiring',
    description: 'Work with a variety of clients — from elderly individuals needing daily assistance to those recovering from surgery or managing chronic conditions. CNAs at Vitalis are clinical professionals who are valued and supervised properly.',
    requirements: ['Active Maryland CNA certification', 'CPR/First Aid current', 'Reliable transportation', 'Background check clearance'],
    highlight: 'Most versatile role — wide client variety',
  },
  {
    code: 'CMT',
    title: 'Certified Medication Technician',
    tag: 'Actively Hiring',
    description: 'CMTs at Vitalis handle medication administration and management for clients with complex medication regimens. You\'ll work alongside our RN team and receive strong clinical support and supervision.',
    requirements: ['Active Maryland CMT certification', 'CNA certification required', 'Medication administration experience', 'Background check clearance'],
    highlight: 'Strong clinical teamwork environment',
  },
  {
    code: 'GNA',
    title: 'Geriatric Nursing Assistant',
    tag: 'Actively Hiring',
    description: 'GNAs bring specialized training in elder care — understanding the physical, emotional, and cognitive needs of older adults. At Vitalis, that expertise is recognized and put to work with clients who truly benefit from it.',
    requirements: ['Active Maryland GNA certification', 'Experience with elderly clients preferred', 'Patience and strong communication skills', 'Background check clearance'],
    highlight: 'Specialized elder care focus',
  },
  {
    code: 'HHA',
    title: 'Home Health Aide',
    tag: 'Actively Hiring',
    description: 'Our HHAs are the heart of what we do at Vitalis — providing daily personal care, companionship, and the steady, reliable presence that keeps our clients safe and well at home. No two days are the same.',
    requirements: ['Maryland HHA certification', 'Genuine care for elderly and disabled clients', 'Reliable and punctual', 'Background check clearance'],
    highlight: 'Entry point into the Vitalis team',
  },
]

const perks = [
  { icon: '💰', heading: 'Competitive pay', body: 'We pay above market rate because we believe caregivers who are valued do better work. Pay scales by certification and experience.' },
  { icon: '📅', heading: 'Consistent scheduling', body: 'We work to give you stable, predictable assignments — not random one-off shifts. Long-term client relationships are good for everyone.' },
  { icon: '📚', heading: 'Real training & development', body: 'Free refresher training, in-service sessions, and skill development — led by our Clinical Manager. We invest in making you better at what you do.' },
  { icon: '🏥', heading: 'Benefits (after probation)', body: 'Medical, dental, and life insurance coverage become available after successful completion of your probationary period.' },
  { icon: '🤝', heading: 'A team that supports you', body: 'Your case manager is your advocate. When you have a concern about a client situation, you can reach someone. We don\'t leave caregivers to figure things out alone.' },
  { icon: '🌱', heading: 'Room to grow', body: 'Happiness Samuel was a caregiver when she joined Vitalis HealthCare. Today she is our Client Care Supervisor. We promote from within and build careers, not just rosters.' },
]

export default function CareersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav />

      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <span>Careers</span>
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '72px 48px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="lp-badge" style={{ marginBottom: '18px' }}>
            <span className="bdot" />Now Hiring · Silver Spring, MD · Montgomery County
          </div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '44px', fontWeight: 500, lineHeight: 1.18, color: 'var(--text)', marginBottom: '20px' }}>
            Caregiving is a calling.<br />
            <em style={{ fontStyle: 'italic', color: 'var(--g-bd)' }}>We built a team for people who feel it that way.</em>
          </h1>
          <p style={{ fontSize: '17px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '640px', marginBottom: '32px' }}>
            At Vitalis HealthCare, we don&apos;t just hire caregivers — we build a team. We want people who take pride in the work, who show up consistently, and who treat every client like family. If that sounds like you, we want to hear from you.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <a
              href="https://apply.vitalishealthcare.com"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '15px 30px', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}
            >
              Apply Now →
            </a>
            <a href="tel:2407166874" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: 'var(--g-bd)', border: '2px solid #97c459', borderRadius: '8px', padding: '15px 30px', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>
              Call 240.716.6874
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['CNAs', 'CMTs', 'GNAs', 'HHAs', 'Silver Spring, MD', 'Montgomery County'].map((c) => (
              <span key={c} className="chip"><span className="cdot" />{c}</span>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Why Vitalis */}
      <section className="sec">
        <div className="inner">
          <p className="sec-label">Why Vitalis</p>
          <h2 className="sec-h">What makes working here different</h2>
          <p className="sec-p" style={{ marginBottom: '36px', maxWidth: '620px' }}>
            We know caregivers have options. Here&apos;s what we offer that most agencies don&apos;t — and why our caregivers stay.
          </p>
          <div className="three-col">
            {perks.map(({ icon, heading, body }) => (
              <div key={heading} style={{ background: 'var(--g-lt)', borderRadius: '14px', padding: '26px 22px' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{heading}</div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'var(--muted)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Caregiver quote */}
      <section className="sec sec-alt">
        <div className="inner">
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
            <div>
              <p className="sec-label">From our caregivers</p>
              <h2 className="sec-h">Don&apos;t take our word for it</h2>
              <p className="sec-p" style={{ marginTop: '8px' }}>
                These words come directly from caregivers who have been part of the Vitalis team — in their own words, unedited.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { q: '"It\'s the best company to work for. All nurses in the United States should come work here. My clients and their families are always very nice to me."', who: 'A. Komara', role: 'Vitalis Caregiver' },
                { q: '"They care about us and the clients as well. I have had the same client for a long time. I go there every time and she is waiting for me to help her."', who: 'A. Ayala', role: 'Vitalis Caregiver' },
                { q: '"They are always responsive to our needs. They send out refresher training which is very helpful. You feel like part of a real team."', who: 'M. Armelle', role: 'Vitalis Caregiver' },
              ].map(({ q, who, role }) => (
                <div key={who} style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--border)', padding: '20px' }}>
                  <div className="stars" style={{ fontSize: '13px', marginBottom: '8px' }}>★★★★★</div>
                  <p style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '14px', lineHeight: 1.7, color: 'var(--text)', fontStyle: 'italic', marginBottom: '10px' }}>{q}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted)' }}><strong style={{ color: 'var(--g-bd)' }}>{who}</strong> · {role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Happi story */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner">
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #97c459', margin: '0 auto 14px', background: '#e4f1d4', position: 'relative' }}>
                <img src="/team/happiness.png" alt="Happiness Samuel" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
              </div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text)' }}>Happiness Samuel <span style={{ color: '#97c459', fontSize: '12px' }}>&ldquo;Happi&rdquo;</span></div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Client Care Supervisor</div>
              <div style={{ display: 'inline-block', background: 'var(--g)', color: '#fff', borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 500, marginTop: '6px' }}>Started as a caregiver</div>
            </div>
            <div>
              <p className="sec-label">A Vitalis career story</p>
              <h2 className="sec-h" style={{ fontSize: '26px' }}>&ldquo;She was a caregiver when she joined us.&rdquo;</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--muted)', marginTop: '10px' }}>
                Happiness Samuel was a caregiver when she joined Vitalis HealthCare. She had spent time in clients&apos; homes, learned what families really need, and showed the kind of dedication and care that stands out. She has grown into her current role as Client Care Supervisor — overseeing scheduling, quality of care, and the day-to-day wellbeing of our clients and caregivers.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--muted)', marginTop: '12px' }}>
                Happi&apos;s story is not unusual at Vitalis. We promote from within. We notice when someone is exceptional. And we build careers, not just rosters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="sec sec-alt">
        <div className="inner-wide">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="sec-label">Open positions</p>
            <h2 className="sec-h">Roles we&apos;re hiring for right now</h2>
            <p className="sec-p" style={{ maxWidth: '560px', marginInline: 'auto' }}>
              All positions are based in Silver Spring, MD and serve clients throughout Montgomery County and surrounding areas.
            </p>
          </div>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {roles.map(({ code, title, tag, description, requirements, highlight }) => (
              <div key={code} style={{ background: '#fff', borderRadius: '14px', border: '1px solid var(--border)', padding: '28px 26px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'inline-block', background: 'var(--g-lt)', color: 'var(--g-bd)', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: 500, marginBottom: '8px', letterSpacing: '.04em' }}>{code}</div>
                    <h3 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '20px', fontWeight: 500, color: 'var(--text)' }}>{title}</h3>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#166534', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>{tag}</span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '16px' }}>{description}</p>
                <div style={{ background: 'var(--g-lt)', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--g-bd)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '8px' }}>Requirements</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {requirements.map((r) => (
                      <li key={r} style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--g)', flexShrink: 0, marginTop: '1px' }}>✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--g-bd)', fontWeight: 500, marginBottom: '14px' }}>💡 {highlight}</div>
                <a
                  href="https://apply.vitalishealthcare.com"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: 500, textDecoration: 'none' }}
                >
                  Apply for {code} Position →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sec">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p className="sec-label">What to expect</p>
            <h2 className="sec-h">Our hiring process</h2>
            <p className="sec-p" style={{ maxWidth: '520px', marginInline: 'auto' }}>
              We move quickly. Most applicants complete the process within 1–2 weeks from application to first shift.
            </p>
          </div>
          <div className="three-col" style={{ gap: '16px' }}>
            {[
              { n: '01', h: 'Apply online', p: 'Fill out a short application at apply.vitalishealthcare.com. Takes about 10 minutes. Tell us about your certification, your experience, and your availability.' },
              { n: '02', h: 'Interview & assessment', p: 'We\'ll schedule a call or in-person interview at our Silver Spring office. We want to understand who you are — not just your credentials.' },
              { n: '03', h: 'Background check & onboarding', p: 'We process your background check, verify credentials, and get you through our orientation program. Then we match you with your first client.' },
            ].map(({ n, h, p }) => (
              <div key={n} className="card-green" style={{ borderRadius: '14px' }}>
                <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '40px', fontWeight: 500, color: '#c0dd97', lineHeight: 1, marginBottom: '10px' }}>{n}</div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{h}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'var(--g-dk)', padding: '80px 48px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '38px', fontWeight: 500, color: '#eaf3de', marginBottom: '14px', lineHeight: 1.2 }}>
          Ready to join the Vitalis team?
        </h2>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#97c459', maxWidth: '500px', marginInline: 'auto', marginBottom: '32px' }}>
          It takes about 10 minutes to apply. We review every application and we&apos;ll be in touch within 2 business days.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://apply.vitalishealthcare.com" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '15px 32px', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>
            Apply at apply.vitalishealthcare.com
          </a>
          <a href="tel:2407166874" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#c0dd97', border: '2px solid #3b6d11', borderRadius: '8px', padding: '15px 32px', fontSize: '16px', fontWeight: 500, textDecoration: 'none' }}>
            Call 240.716.6874
          </a>
        </div>
        <p style={{ fontSize: '12px', color: '#3b6d11', marginTop: '20px' }}>
          Vitalis HealthCare Services · 8757 Georgia Avenue, Suite 440, Silver Spring, MD 20910 · OHCQ License #3879R
        </p>
      </section>

      <Footer />
    </>
  )
}
