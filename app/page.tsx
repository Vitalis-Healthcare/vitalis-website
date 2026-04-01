import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'Vitalis HealthCare | Home Care in Silver Spring, MD',
  description: 'Licensed, certified home care in Silver Spring, MD and across Maryland. Companion care, personal care & skilled nursing. Joint Commission Gold Seal. VA & Medicaid accepted. Call 240.716.6874.',
}

const S = {
  heroSection: { background: 'linear-gradient(135deg,#f0f7e8 0%,#e4f1d4 100%)', padding: '80px 48px 72px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '56px', alignItems: 'center' } as React.CSSProperties,
  h1: { fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '44px', fontWeight: 500, lineHeight: 1.18, color: 'var(--text)', marginBottom: '22px' } as React.CSSProperties,
  heroSub: { fontSize: '16px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '30px', maxWidth: '460px' } as React.CSSProperties,
  heroImgBox: { background: '#fff', borderRadius: '20px', border: '1px solid #d4e8b8', aspectRatio: '4/5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px' } as React.CSSProperties,
}

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section style={S.heroSection}>
        <div>
          <div className="lp-badge" style={{ marginBottom: '22px' }}>
            <span className="bdot" />
            Trusted Home Care · Silver Spring, MD
          </div>
          <h1 style={S.h1}>
            Your loved one deserves to{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--g-bd)' }}>stay home</em>{' '}
            — and feel safe there.
          </h1>
          <p style={S.heroSub}>
            We know how hard it is to find someone you can really trust with your parent or spouse. At Vitalis, we don&apos;t just send a caregiver. We send someone who truly cares — trained, supervised, and matched to your loved one&apos;s needs.
          </p>
          <div style={{ display: 'flex', gap: '14px', marginBottom: '30px', flexWrap: 'wrap' }}>
            <a href="https://getcare.vitalishealthcare.com" className="btn-primary">
              Talk to Us Today — It&apos;s Free
            </a>
            <a href="#services" className="btn-secondary">
              See Our Services
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['Joint Commission Gold Seal', 'OHCQ Licensed #3879R', 'VA & Medicaid Accepted', 'CareScout Approved', 'BCHD Contracted', 'Available 24/7'].map((c) => (
              <span key={c} className="chip"><span className="cdot" />{c}</span>
            ))}
          </div>
        </div>
        <div style={S.heroImgBox}>
          {/* Replace with <Image> once photos arrive */}
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--g-lt)', border: '2px dashed #97c459', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#3b6d11" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="18" cy="12" r="7" /><path d="M3 34c0-8.284 6.716-15 15-15s15 6.716 15 15" />
            </svg>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--g-bd)', fontWeight: 500, textAlign: 'center' }}>Hero photo goes here</p>
          <p style={{ fontSize: '12px', color: '#97c459', textAlign: 'center', padding: '0 30px', lineHeight: 1.5 }}>Warm, natural caregiver & client photo</p>
        </div>
      </section>

      <TrustBar />

      {/* ── HOW WE WORK ── */}
      <section className="sec" id="how">
        <div className="inner">
          <p className="sec-label">How we work</p>
          <h2 className="sec-h" style={{ maxWidth: '680px' }}>
            Making this decision is one of the hardest things a family goes through. We make the next step easy.
          </h2>
          <p className="sec-p" style={{ maxWidth: '580px', marginBottom: '44px' }}>
            You want your mom to stay in her own home. You want your dad to feel comfortable. You want to stop worrying every time the phone rings. That&apos;s exactly what we&apos;re here for — and we&apos;ve been doing it for families across Montgomery County for years.
          </p>
          <div className="three-col">
            {[
              { n: '01', h: 'We listen first', p: 'Every family is different. We start with a free care consultation to understand exactly what you need — your loved one\'s condition, your schedule, your budget. No rush. No pressure.' },
              { n: '02', h: 'We find the right fit', p: 'We don\'t just assign whoever is next on the list. We take time to match your loved one with a caregiver who has the right skills — and the right heart for the job.' },
              { n: '03', h: 'We stay involved', p: 'Your dedicated case manager checks in regularly — not just to tick boxes, but to make sure everything is truly working for your whole family. You\'re never left to figure it out alone.' },
            ].map(({ n, h, p }) => (
              <div key={n} className="card-green">
                <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '42px', fontWeight: 500, color: '#c0dd97', lineHeight: 1, marginBottom: '10px' }}>{n}</div>
                <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{h}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="sec sec-alt" id="services">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <p className="sec-label">What we do</p>
            <h2 className="sec-h">Home care that covers every need</h2>
            <p className="sec-p" style={{ maxWidth: '580px', marginInline: 'auto' }}>
              Whether your loved one needs a friendly face, help with daily tasks, or skilled medical care at home, we have a trained and supervised team ready to help.
            </p>
          </div>
          <div className="three-col">
            {[
              { pill: 'Companion Care', h: 'Someone to be there', p: 'Loneliness is one of the biggest health risks for seniors. Our companions offer real conversation, shared meals, light errands, and the kind of consistent presence that keeps your loved one engaged — and not forgotten.' },
              { pill: 'Personal Care', h: 'Help with daily life, done with dignity', p: 'Bathing, dressing, grooming, and getting around the house — our aides provide respectful, professional help with the things that matter most to your loved one\'s comfort and self-esteem, every single day.' },
              { pill: 'Skilled Nursing', h: 'Hospital-quality care, at home', p: 'Our registered nurses manage medications, wound care, health monitoring, and complex medical needs — bringing the expertise of a clinical setting right into your loved one\'s home, where they\'re most comfortable.' },
            ].map(({ pill, h, p }) => (
              <div key={pill} className="card">
                <span className="pill">{pill}</span>
                <div style={{ fontSize: '17px', fontWeight: 500, color: 'var(--text)', marginBottom: '10px' }}>{h}</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONDITIONS ── */}
      <section className="sec" id="conditions" style={{ background: '#f5f9f0' }}>
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <p className="sec-label">Specialized care</p>
            <h2 className="sec-h">We&apos;re trained for the situations families worry about most</h2>
            <p className="sec-p" style={{ maxWidth: '580px', marginInline: 'auto' }}>
              Our caregivers go through specialized training for memory loss, recovery after illness or surgery, and fall risk — the four areas where Maryland families need the most support.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {[
              { n: '01', h: 'Dementia & Memory Care', p: 'Our caregivers understand that dementia is not just forgetfulness — it changes a person\'s world in ways that require patience, routine, and a lot of kindness. We\'re trained to step into that world with them, not fight against it.', href: '/conditions/dementia', tag: 'Silver Spring · Montgomery County' },
              { n: '02', h: 'Post-Surgery Recovery', p: 'Coming home after surgery can be scary. We help your loved one heal safely — managing medications, supporting movement, watching for complications, and handling all the daily tasks so recovery can stay on track.', href: '/conditions/post-surgery', tag: 'Post-Hospital Discharge · Home Recovery' },
              { n: '03', h: 'Stroke Recovery Support', p: 'Recovery after a stroke is a long road that needs consistency and encouragement every day. We work alongside your family and medical team to help rebuild routines, support therapy exercises, and provide the steady presence that makes progress possible.', href: '/conditions/stroke', tag: 'Neurological Recovery · Rehab Support' },
              { n: '04', h: 'Fall Prevention', p: 'Falls are the leading cause of serious injury for seniors — and most of them happen at home. We assess your loved one\'s environment, build safer daily routines, and provide the attentive support that prevents falls before they happen.', href: '/conditions/fall-prevention', tag: 'Senior Safety · Mobility Support' },
            ].map(({ n, h, p, href, tag }) => (
              <div key={n} className="card" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '40px', fontWeight: 500, color: '#c0dd97', lineHeight: 1, flexShrink: 0, minWidth: '48px' }}>{n}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text)', marginBottom: '8px' }}>{h}</div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)', marginBottom: '10px' }}>{p}</p>
                  <span style={{ display: 'inline-block', marginRight: '8px', marginBottom: '8px', background: 'var(--g-lt)', color: 'var(--g-bd)', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                  <a href={href} style={{ fontSize: '13px', fontWeight: 500, color: 'var(--g-bd)', display: 'inline-block' }}>Learn more →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="sec" id="team">
        <div className="inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '56px', alignItems: 'center', marginBottom: '48px' }}>
            <div>
              <p className="sec-label">Meet the team</p>
              <h2 className="sec-h">Real people.<br />Real commitment.</h2>
              <p className="sec-p" style={{ marginTop: '14px' }}>We believe you should know exactly who is involved in your loved one&apos;s care — and the people behind the scenes who make sure everything runs the way it should. We&apos;re not a call center. We&apos;re your family&apos;s care team.</p>
            </div>
            <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '20px', fontStyle: 'italic', lineHeight: 1.6, color: 'var(--g-bd)', borderLeft: '3px solid var(--g-md)', paddingLeft: '24px' }}>
              &ldquo;At Vitalis, caregiving isn&apos;t a job description. It&apos;s a calling — and we only build teams with people who feel it that way.&rdquo;
              <br /><small style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontStyle: 'normal', color: '#639922', marginTop: '8px', display: 'block' }}>— Okezie Ofoegbu (&ldquo;Mr. O&rdquo;), Administrator</small>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '20px' }}>
            {[
              { initials: 'OO', name: 'Okezie Ofoegbu', nick: '"Mr. O"', role: 'Administrator', tag: 'Founder' },
              { initials: 'SE', name: 'Samiya Edwards', nick: '"Sam"', role: 'Client Services Director', tag: 'Client Relations' },
              { initials: 'ME', name: 'Marie Epah', nick: '', role: 'Clinical Manager', tag: 'Clinical Lead' },
              { initials: 'HS', name: 'Happiness Samuel', nick: '"Happi"', role: 'Client Care Supervisor', tag: 'Client Support' },
              { initials: 'PE', name: 'Peace Enoch', nick: '', role: 'Senior Care Advocate', tag: 'Care Quality' },
            ].map(({ initials, name, nick, role, tag }) => (
              <div key={initials} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ aspectRatio: '3/4', background: 'repeating-linear-gradient(45deg,#eaf3de,#eaf3de 10px,#e2f0d4 10px,#e2f0d4 20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: '10px' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', border: '2px dashed #97c459', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '18px', fontWeight: 500, color: 'var(--g-bd)' }}>{initials}</div>
                  <div style={{ background: 'var(--g-dk)', color: '#c0dd97', fontSize: '10px', fontWeight: 500, padding: '5px 10px', borderRadius: '6px', position: 'absolute', bottom: '12px' }}>📷 Photo needed</div>
                </div>
                <div style={{ padding: '14px 16px', background: '#fff' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', marginBottom: '2px' }}>
                    {name}{nick && <span style={{ color: '#97c459', fontSize: '11px', fontWeight: 400 }}> {nick}</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px' }}>{role}</div>
                  <span style={{ display: 'inline-block', background: 'var(--g-lt)', color: 'var(--g-bd)', borderRadius: '20px', padding: '3px 11px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="sec sec-alt">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <p className="sec-label">What families say</p>
            <h2 className="sec-h">Don&apos;t take our word for it</h2>
            <p className="sec-p" style={{ maxWidth: '520px', marginInline: 'auto' }}>These are real words from real clients and caregivers who have been part of the Vitalis family.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '20px' }}>
            {[
              { stars: '★★★★★', q: '"After a poor experience with our previous agency, we settled with Vitalis because of the attention to detail and professionalism. Our health situation has improved dramatically. We strongly recommend Vitalis to anyone needing high-quality, affordable home care."', who: 'E. Adaku', role: 'Active Client, Silver Spring MD' },
              { stars: '★★★★★', q: '"They care about us and the clients. I have had the same client for a long time. I go there every time and she is waiting for me to help her. She loves it — and so do I."', who: 'A. Ayala', role: 'Caregiver' },
              { stars: '★★★★★', q: '"I like that they have good caregivers. They\'ve helped me with little things like making the bed. I like that they are understanding when I call in. They always listen."', who: 'B. Davis', role: 'Active Client, Silver Spring MD' },
              { stars: '★★★★★', q: '"They are always responsive to our needs. They tell you about the client and ask if you\'d like to work with them. They send out refresher training which is very helpful."', who: 'M. Armelle', role: 'Caregiver' },
            ].map(({ stars, q, who, role }) => (
              <div key={who} className="testi-card">
                <div className="stars">{stars}</div>
                <p style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '15px', lineHeight: 1.7, color: 'var(--text)', marginBottom: '14px', fontStyle: 'italic' }}>{q}</p>
                <p style={{ fontSize: '12px', color: 'var(--muted)' }}><strong style={{ color: 'var(--g-bd)' }}>{who}</strong> · {role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAYMENT ── */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p className="sec-label">Paying for care</p>
            <h2 className="sec-h">We work with most payment types — including VA and Medicaid</h2>
            <p className="sec-p" style={{ maxWidth: '540px', marginInline: 'auto' }}>Not sure how to pay for home care? Don&apos;t let that stop you from calling. We&apos;ll help you figure out what you qualify for and how to make it work for your family&apos;s budget.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '14px' }}>
            {[['🏥', 'Maryland Medicaid Waiver'], ['🎖️', 'VA Assistance Program'], ['📋', 'Long-Term Care Insurance'], ['💳', 'Private Pay'], ['🩺', 'Medicare (PT / OT / ST)']].map(([icon, label]) => (
              <div key={label} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--g-bd)' }}>{label}</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'var(--muted)' }}>
            Veterans and veteran spouses may qualify for up to <strong style={{ color: 'var(--g-bd)' }}>$2,000/month</strong> through our VA Homemaker &amp; Aide program. Call us to learn more.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec">
        <div className="inner">
          <div className="two-col">
            <div>
              <p className="sec-label">Common questions</p>
              <h2 className="sec-h">You have questions. We have honest answers.</h2>
              <p className="sec-p" style={{ marginTop: '14px' }}>If you don&apos;t see what you&apos;re looking for, just call us. Our team is available every day and will take the time to help you understand your options.</p>
              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="tel:2407166874" className="btn-primary" style={{ maxWidth: '260px', textAlign: 'center' }}>Call 240.716.6874</a>
                <a href="https://wa.me/12027796027" className="btn-wa" style={{ maxWidth: '260px' }}>WhatsApp Us</a>
              </div>
            </div>
            <div className="faq-list">
              {[
                { q: 'How quickly can care start?', a: 'In most cases, we can have a caregiver in place within 24–48 hours of your initial consultation. For urgent hospital discharge situations, we work even faster. Just call us and we\'ll make it happen.' },
                { q: 'What areas do you serve?', a: 'We serve Silver Spring, Rockville, Gaithersburg, Germantown, Takoma Park, Towson, Pikesville, Owings Mills, Annapolis, and surrounding communities throughout Maryland.' },
                { q: 'What if we\'re not happy with our caregiver?', a: 'Just tell us. We take this seriously and will find a better match quickly. We also offer a full refund if you cancel within 14 days of starting service.' },
                { q: 'Do you accept VA benefits for veterans?', a: 'Yes. Veterans and veteran spouses may qualify for up to $2,000/month toward home care through the VA Homemaker and Home Health Aide program. Contact us and we\'ll walk you through the process.' },
                { q: 'Are your caregivers background-checked and trained?', a: 'Absolutely. Every caregiver goes through a full background check, professional certification, and our in-house refresher training program before they ever enter a client\'s home. Our Clinical Manager oversees all care delivery.' },
              ].map(({ q, a }) => (
                <div key={q} className="faq-item">
                  <div className="faq-q">{q}</div>
                  <p className="faq-a">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  )
}
