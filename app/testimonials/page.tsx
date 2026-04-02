import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Testimonials | Vitalis HealthCare Services',
  description: 'Real reviews from clients and caregivers who have experienced Vitalis HealthCare Services in Silver Spring, MD. See why families and caregivers trust Vitalis.',
}

const clientTestimonials = [
  {
    quote: 'After a poor experience with our previous agency, we settled with Vitalis HealthCare because of the attention to detail and professionalism with which they handled our assessment. When they began with us, we had several health challenges. We are pleased to say that through the reliable, high quality and well supervised care we have received, we have made significant progress.',
    name: 'D. & M. Thompson',
    role: 'Active Clients',
    stars: 5,
  },
  {
    quote: 'They have helped me with the things I couldn\'t manage alone — always respectfully, never making me feel like a burden. That matters more than I can say.',
    name: 'B. Davis',
    role: 'Active Client',
    stars: 5,
  },
  {
    quote: 'I like this agency because they\'re good and often people at the call center call us back and ask us how the nurses are doing and if we need anything else from the company. Basically they meet our needs, they are non-combative, they do their work well, and they are mostly on time.',
    name: 'S. McCoy',
    role: 'Active Client',
    stars: 5,
  },
  {
    quote: 'I like that they have good caregivers. They have helped me with little things like making the bed. I like that they are understanding towards me when I call in.',
    name: 'Active Client',
    role: 'Montgomery County',
    stars: 5,
  },
  {
    quote: 'The companion they sent became like a member of our family. She brought warmth and routine back into my mother\'s days. I cannot overstate how much that changed things for all of us.',
    name: 'E. Adaku',
    role: 'Family Member, Silver Spring MD',
    stars: 5,
  },
  {
    quote: 'The nurse who cared for my mother after her surgery was exceptional. She caught a potential infection early, called the doctor herself, and prevented what could have been a serious setback. That\'s the difference professional nursing makes.',
    name: 'S. McCoy',
    role: 'Family Member, Montgomery County',
    stars: 5,
  },
  {
    quote: 'The people working there are so good. It\'s like a family. The clients I work with are very nice. The man is like a father. I miss them a lot.',
    name: 'Vitalis Caregiver',
    role: 'Caregiver Team',
    stars: 5,
  },
]

const caregiverTestimonials = [
  {
    quote: 'It\'s the best company to work for. All nurses in the United States should come work here. My clients and their families are always very nice to me.',
    name: 'A. Komara',
    role: 'Vitalis Caregiver',
    stars: 5,
  },
  {
    quote: 'They care about us and the clients as well. I have had the same client for a long time. I go there every time and she is waiting for me to help her. She loves it — and so do I.',
    name: 'A. Ayala',
    role: 'Vitalis Caregiver',
    stars: 5,
  },
  {
    quote: 'They are always responsive to our needs. They send out refresher training which is very helpful. You feel like part of a real team.',
    name: 'M. Armelle',
    role: 'Vitalis Caregiver',
    stars: 5,
  },
  {
    quote: 'When we have someone scheduled they should show up. If they are sick they should have someone available to fill the position. I look for someone who is confident in what they are doing, know how to handle people, and is sensitive to their needs. They are kind, friendly and upbeat.',
    name: 'A. Ayala',
    role: 'Vitalis Caregiver',
    stars: 5,
  },
]

const awards = [
  { year: '2024', title: 'Best of Home Care — Employer of Choice', body: 'Awarded for outstanding caregiver satisfaction ratings by Home Care Pulse, an independent satisfaction research firm. Third consecutive year.' },
  { year: '2023', title: 'Best of Home Care — Employer of Choice', body: 'Second consecutive year recognized for excellence in caregiver satisfaction and workplace culture across Maryland.' },
  { year: '2022', title: 'Best of Home Care — Employer of Choice', body: 'First year receiving this recognition — based on verified caregiver surveys and an OSAT score of 8.75+.' },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '10px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: '16px' }}>★</span>
      ))}
    </div>
  )
}

function TestiCard({ quote, name, role, stars }: { quote: string; name: string; role: string; stars: number }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '14px',
      border: '1px solid var(--border)',
      padding: '26px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <Stars count={stars} />
      <p style={{
        fontFamily: 'var(--font-lora),Georgia,serif',
        fontSize: '15px',
        lineHeight: 1.75,
        color: 'var(--text)',
        fontStyle: 'italic',
        flex: 1,
      }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--g-bd)' }}>{name}</div>
        <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{role}</div>
      </div>
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <>
      <Nav />
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <span>Testimonials</span>
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '64px 48px 56px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div className="lp-badge" style={{ marginBottom: '16px', display: 'inline-flex' }}>
            <span className="bdot" />4.4 Stars · 9 Google Reviews · 3× Best of Home Care
          </div>
          <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '42px', fontWeight: 500, lineHeight: 1.2, color: 'var(--text)', marginBottom: '16px' }}>
            What families and caregivers say about Vitalis
          </h1>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', maxWidth: '580px', marginInline: 'auto' }}>
            These are real words from real people — clients, family members, and caregivers who have been part of the Vitalis family. Unscripted and unedited.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Stats bar */}
      <section style={{ background: 'var(--g-dk)', padding: '36px 48px' }}>
        <div className="testi-stats" style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px', textAlign: 'center' }}>
          {[
            { n: '4.4★', label: 'Google Rating' },
            { n: '9', label: 'Google Reviews' },
            { n: '3×', label: 'Best of Home Care Award' },
            { n: '250+', label: 'Clients Served' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '32px', fontWeight: 500, color: '#c0dd97', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '13px', color: '#639922', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Client testimonials */}
      <section className="sec">
        <div className="inner-wide">
          <p className="sec-label">From our clients & families</p>
          <h2 className="sec-h" style={{ marginBottom: '10px' }}>What families say about the care their loved ones receive</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>
            Collected via Home Care Pulse independent satisfaction surveys and direct client feedback.
          </p>
          <div className="grid-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px' }}>
            {clientTestimonials.map((t, i) => (
              <TestiCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Caregiver testimonials */}
      <section className="sec sec-alt">
        <div className="inner-wide">
          <p className="sec-label">From our caregivers</p>
          <h2 className="sec-h" style={{ marginBottom: '10px' }}>What our caregivers say about working at Vitalis</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '32px' }}>
            Caregivers who feel valued provide better care. These are their words.
          </p>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {caregiverTestimonials.map((t, i) => (
              <TestiCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner">
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
            <div>
              <p className="sec-label">Recognition</p>
              <h2 className="sec-h">Three years. Same result.</h2>
              <p className="sec-p" style={{ marginTop: '10px' }}>
                The Best of Home Care — Employer of Choice Award is based entirely on verified caregiver satisfaction surveys conducted by Home Care Pulse, an independent research firm. You can&apos;t buy it. You earn it by actually treating your caregivers well.
              </p>
              <p className="sec-p" style={{ marginTop: '12px' }}>
                We&apos;ve won it three years in a row. That consistency matters — it means the culture that earned it the first time is still the culture today.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {awards.map(({ year, title, body }) => (
                <div key={year} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #c0dd97', padding: '20px 22px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '28px', fontWeight: 500, color: '#c0dd97', lineHeight: 1, flexShrink: 0 }}>{year}</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>{title}</div>
                    <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--muted)', margin: 0 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section style={{ background: 'var(--g-dk)', padding: '64px 48px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.1em', color: '#97c459', marginBottom: '10px' }}>Share your experience</p>
        <h2 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '34px', fontWeight: 500, color: '#eaf3de', marginBottom: '14px', lineHeight: 1.25 }}>
          Have you worked with Vitalis?
        </h2>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#97c459', maxWidth: '520px', marginInline: 'auto', marginBottom: '28px' }}>
          If Vitalis has made a difference for your family or in your career, we&apos;d be honoured to hear about it. Your review helps other families make one of the most important decisions they&apos;ll ever face.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://g.page/r/CVkkpnLsvh0VEBM/review"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--g)', color: '#fff', borderRadius: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
          >
            Leave a Google Review
          </a>
          <a
            href="https://getcare.vitalishealthcare.com"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', color: '#c0dd97', border: '2px solid #3b6d11', borderRadius: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}
          >
            Request Home Care
          </a>
        </div>
      </section>

      <CTASection
        heading="Ready to experience the Vitalis difference?"
        body="Talk to our team — free, no obligation. We'll help you understand your options and find the right care for your loved one."
      />

      <Footer />
    </>
  )
}
