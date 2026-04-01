import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import CTASection from '@/components/CTASection'

export const metadata: Metadata = {
  title: 'About Us | Vitalis HealthCare Services',
  description: 'Learn why Vitalis HealthCare was founded, who leads our team, and what drives us to provide compassionate, professional home care in Silver Spring and across Maryland.',
  openGraph: {
    title: 'About Vitalis HealthCare Services',
    description: 'Founded in honor of the caregivers who cared for our founder\'s mother as if she were their own family. Meet the team behind Vitalis.',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About Vitalis HealthCare Services',
  url: 'https://www.vitalishealthcare.com/about',
  description: 'Vitalis HealthCare Services is a family-owned, Maryland-licensed home care agency founded in 2014 in Silver Spring, MD.',
  mainEntity: {
    '@type': 'HomeAndConstructionBusiness',
    name: 'Vitalis HealthCare Services',
    foundingDate: '2014',
    founder: { '@type': 'Person', name: 'Okezie Ofoegbu' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8757 Georgia Avenue, Suite 440',
      addressLocality: 'Silver Spring',
      addressRegion: 'MD',
      postalCode: '20910',
    },
  },
}

const stats = [
  { n: '10+', l: 'Years serving Maryland families' },
  { n: '500+', l: 'Clients cared for since founding' },
  { n: '200+', l: 'Active trained caregivers' },
  { n: '5,000+', l: 'Hours of care delivered monthly' },
  { n: '3×', l: 'Best of Home Care Employer of Choice\n2022 · 2023 · 2024' },
  { n: '80+', l: 'Active clients across Maryland' },
]

const team = [
  {
    initials: 'OO',
    name: 'Okezie Ofoegbu',
    nick: '"Mr. O"',
    role: 'Administrator & Founder',
    tag: 'Founder',
    bio: `Okezie founded Vitalis HealthCare in 2014, one year after losing his mother — in honor of the caregivers who cared for her not as a patient, but as family. That experience became the mission. Under his leadership, Vitalis has grown to serve over 500 clients, employs more than 200 caregivers, and delivers nearly 5,000 hours of care every month across Maryland.

Before founding Vitalis, Okezie served as Vice President at Emerging Capital Partners, a $1.8 billion private equity firm focused on African development, where he led over $300 million in healthcare and infrastructure investments. He holds an MBA in Finance & Entrepreneurial Management from the Wharton School, University of Pennsylvania, and a B.Sc. in Computer Engineering from Obafemi Awolowo University, Nigeria.

Okezie leads Vitalis's operational policies, emergency preparedness, and clinical oversight — and remains closely involved in the care of every client.`,
  },
  {
    initials: 'SE',
    name: 'Samiya Edwards',
    nick: '"Sam"',
    role: 'Client Services Director',
    tag: 'Client Relations',
    bio: `Sam is a native Marylander and Baltimorean who has worked alongside Okezie for nearly 20 years — their partnership dates back to their time as colleagues at Emerging Capital Partners, where both focused on healthcare, financial services, and social impact investments across the US, Asia, and Africa.

She brings to Vitalis a rare combination of analytical rigor and genuine warmth — ensuring that every family who calls us feels heard, understood, and matched to the right care from the very first conversation. Sam holds a Master's in International Economics and International Development from the Johns Hopkins School of Advanced International Studies and is a Chartered Financial Analyst (CFA).`,
  },
  {
    initials: 'ME',
    name: 'Marie Epah',
    nick: '',
    role: 'Clinical Manager',
    tag: 'Clinical Lead',
    bio: `Marie is the clinical backbone of Vitalis. As Clinical Manager, she oversees every care plan, conducts client assessments, supervises our caregiver team, and leads our annual in-service training — setting and holding the clinical standard that families trust us to maintain.

What distinguishes Marie is the quality of her leadership as much as her clinical expertise. She bridges the gap between frontline caregivers and organizational leadership with skill and grace — mentoring with patience, building a team culture rooted in accountability and compassion, and ensuring that every caregiver who enters a client's home is prepared, confident, and ready to deliver excellent care.`,
  },
  {
    initials: 'HS',
    name: 'Happiness Samuel',
    nick: '"Happi"',
    role: 'Client Care Supervisor',
    tag: 'Client Support',
    bio: `Happi's story at Vitalis is one we're proud of. She joined us as a caregiver herself — spending time in clients' homes, learning firsthand what families need and what caregivers face. That experience is irreplaceable. She has since risen to Client Care Supervisor, bringing to that role an understanding of home care that only comes from having lived it.

Today Happi oversees client scheduling, caregiver coordination, supervisory visits, and the day-to-day quality of care delivery. When families have a concern, Happi is the person who picks up the phone — and she knows exactly what she's talking about, because she's been there.`,
  },
  {
    initials: 'PE',
    name: 'Peace Enoch',
    nick: '',
    role: 'Senior Care Advocate',
    tag: 'Care Advocacy',
    bio: `Peace joined Vitalis as our Senior Care Advocate — the person responsible for building relationships with the hospitals, facilities, physicians, and community organizations that refer clients to us. She brings to this role an impressive academic background: a Master of Science in Business Analytics from the Cox School of Business at Southern Methodist University, and a track record of using data and strategy to drive real results.

But beyond the credentials, Peace is a connector. She genuinely cares about the families she meets in the field — and she's often the first Vitalis person a family encounters, setting the tone for the trust we work hard to earn every day.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Nav />

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> &rsaquo; <span>About Us</span>
      </div>

      {/* Hero */}
      <section className="hero-lp">
        <div className="hero-lp-inner">
          <div className="lp-badge">
            <span className="bdot" />
            Our Story · Silver Spring, MD · Founded 2014
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-lora),Georgia,serif',
              fontSize: '42px',
              fontWeight: 500,
              lineHeight: 1.2,
              color: 'var(--text)',
              marginBottom: '20px',
            }}
          >
            We exist because of{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--g-bd)' }}>
              the caregivers who loved our mother
            </em>{' '}
            like family.
          </h1>
          <p
            style={{
              fontSize: '17px',
              lineHeight: 1.85,
              color: 'var(--muted)',
              maxWidth: '700px',
              marginBottom: '28px',
            }}
          >
            Vitalis HealthCare was founded in 2014 — one year after our founder
            lost his mother. Not in grief alone, but in gratitude. Because the
            caregivers who were with her at the end didn&apos;t treat her like a
            patient. They treated her like their own family.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              'Founded 2014',
              'OHCQ Licensed #3879R',
              'Joint Commission Gold Seal',
              '3× Best of Home Care Employer',
              'CareScout Approved',
            ].map((c) => (
              <span key={c} className="chip">
                <span className="cdot" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Origin Story */}
      <section className="sec">
        <div className="inner">
          <div className="two-col" style={{ gap: '64px' }}>
            <div>
              <p className="sec-label">Why we exist</p>
              <h2 className="sec-h">
                Professional care. Family heart. That&apos;s the gap we set out
                to close.
              </h2>
              <p
                className="sec-p"
                style={{ marginBottom: '20px' }}
              >
                When our founder Okezie Ofoegbu watched the caregivers tend to
                his mother in her final months, he noticed something. In
                hospitals and nursing facilities, you get professionals — people
                who know what they&apos;re doing — but often without the warmth,
                the empathy, the sense that your loved one truly matters to them.
                And with family caregivers, you get the love and the compassion —
                but often without the training, the systems, or the clinical
                knowledge to do the job well.
              </p>
              <p className="sec-p" style={{ marginBottom: '20px' }}>
                The caregivers who were with his mother were different. They had
                both. They were professional and they were present — genuinely,
                warmly, humanly present. They treated her as if she were their
                own mother. That combination — professionalism and family-level
                love — was what he decided to build an agency around.
              </p>
              <p className="sec-p">
                That&apos;s still exactly what we hire for, train for, and hold
                ourselves accountable to at Vitalis — every shift, every client,
                every day.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-lora),Georgia,serif',
                  fontSize: '22px',
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'var(--g-bd)',
                  borderLeft: '4px solid var(--g-md)',
                  paddingLeft: '24px',
                  marginBottom: '8px',
                }}
              >
                &ldquo;We exist to provide professional home care to seniors as
                if we are family members. That is our mission. That is our
                standard.&rdquo;
                <small
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontStyle: 'normal',
                    color: '#639922',
                    marginTop: '14px',
                  }}
                >
                  — Okezie Ofoegbu (&ldquo;Mr. O&rdquo;), Founder &amp; Administrator
                </small>
              </div>
              <div
                className="card-green"
                style={{ borderRadius: '12px', padding: '22px' }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.75,
                    color: 'var(--muted)',
                  }}
                >
                  Vitalis was founded in 2014 and has grown steadily to become
                  one of Maryland&apos;s most trusted home care agencies — winning{' '}
                  <strong style={{ color: 'var(--g-bd)' }}>
                    Home Care Pulse&apos;s Best of Home Care Employer of Choice
                  </strong>{' '}
                  award three years in a row (2022, 2023, and 2024), maintaining a
                  clean Better Business Bureau rating, and earning Joint Commission
                  Gold Seal certification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="sec sec-alt">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="sec-label">By the numbers</p>
            <h2 className="sec-h">A decade of care — in Maryland</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: '18px',
            }}
          >
            {stats.map(({ n, l }) => (
              <div
                key={n}
                className="card"
                style={{ textAlign: 'center', padding: '28px 20px' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-lora),Georgia,serif',
                    fontSize: '40px',
                    fontWeight: 500,
                    color: 'var(--g-bd)',
                    lineHeight: 1,
                    marginBottom: '10px',
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--muted)',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="sec-label">What we believe</p>
            <h2 className="sec-h">Our values aren&apos;t on a poster. They&apos;re in every shift.</h2>
          </div>
          <div className="three-col">
            {[
              {
                n: '01',
                h: 'Professionalism is not enough',
                p: 'Training, certification, and clinical skills are the baseline — not the goal. The goal is a caregiver who brings all of that and also treats your loved one with the warmth and dignity of a family member.',
              },
              {
                n: '02',
                h: 'Love without skill is also not enough',
                p: 'Family members provide the most loving care in the world — but caregiving is also a discipline. Our job is to combine both: the heart of family and the competence of a professional.',
              },
              {
                n: '03',
                h: 'Consistency builds trust',
                p: 'The same caregiver, the same routine, the same faces — this is what allows a senior to relax, to feel safe, and to truly thrive at home rather than just survive there.',
              },
            ].map(({ n, h, p }) => (
              <div
                key={n}
                style={{
                  background: '#fff',
                  borderRadius: '14px',
                  border: '1px solid #c0dd97',
                  padding: '28px 22px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-lora),Georgia,serif',
                    fontSize: '38px',
                    fontWeight: 500,
                    color: '#c0dd97',
                    lineHeight: 1,
                    marginBottom: '10px',
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'var(--text)',
                    marginBottom: '10px',
                  }}
                >
                  {h}
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--muted)' }}>
                  {p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="sec" id="team">
        <div className="inner-wide">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p className="sec-label">Meet the team</p>
            <h2 className="sec-h">The people behind every care plan</h2>
            <p
              className="sec-p"
              style={{ maxWidth: '580px', marginInline: 'auto' }}
            >
              At Vitalis, you always know who is responsible for your loved
              one&apos;s care — and why they&apos;re the right person for it.
            </p>
          </div>

          {/* Full-width bio cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {team.map(({ initials, name, nick, role, tag, bio }, i) => (
              <div
                key={initials}
                style={{
                  background: i % 2 === 0 ? '#fff' : 'var(--g-lt)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                  padding: '36px',
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: '36px',
                  alignItems: 'start',
                }}
              >
                {/* Avatar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      background: 'repeating-linear-gradient(45deg,#eaf3de,#eaf3de 8px,#e2f0d4 8px,#e2f0d4 16px)',
                      border: '3px dashed #97c459',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-lora),Georgia,serif',
                      fontSize: '22px',
                      fontWeight: 500,
                      color: 'var(--g-bd)',
                    }}
                  >
                    {initials}
                  </div>
                  <div
                    style={{
                      background: 'var(--g-dk)',
                      color: '#c0dd97',
                      fontSize: '10px',
                      fontWeight: 500,
                      padding: '5px 12px',
                      borderRadius: '6px',
                      textAlign: 'center',
                    }}
                  >
                    📷 Photo coming
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'var(--g-lt)',
                      color: 'var(--g-bd)',
                      borderRadius: '20px',
                      padding: '4px 14px',
                      fontSize: '11px',
                      fontWeight: 500,
                      border: '1px solid #c0dd97',
                    }}
                  >
                    {tag}
                  </span>
                </div>

                {/* Bio */}
                <div>
                  <div style={{ marginBottom: '4px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-lora),Georgia,serif',
                        fontSize: '22px',
                        fontWeight: 500,
                        color: 'var(--text)',
                      }}
                    >
                      {name}
                    </span>
                    {nick && (
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#97c459',
                          fontWeight: 400,
                          marginLeft: '8px',
                        }}
                      >
                        {nick}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--g-bd)',
                      fontWeight: 500,
                      marginBottom: '16px',
                      textTransform: 'uppercase',
                      letterSpacing: '.05em',
                    }}
                  >
                    {role}
                  </div>
                  {bio.split('\n\n').map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: '15px',
                        lineHeight: 1.8,
                        color: 'var(--muted)',
                        marginBottom: j < bio.split('\n\n').length - 1 ? '14px' : 0,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="sec sec-alt">
        <div className="inner">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <p className="sec-label">Our credentials</p>
            <h2 className="sec-h">Accountability you can verify</h2>
            <p
              className="sec-p"
              style={{ maxWidth: '560px', marginInline: 'auto' }}
            >
              We don&apos;t ask families to take our word for it. Every credential
              below is independently verified — and publicly on record.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              gap: '18px',
            }}
          >
            {[
              {
                badge: 'OHCQ License #3879R',
                h: 'Maryland OHCQ Licensed',
                p: 'Vitalis is licensed by the Maryland Office of Health Care Quality as a Residential Service Agency at Level 3 — the highest level of home care licensure in Maryland. License #3879R.',
              },
              {
                badge: 'Joint Commission',
                h: 'Joint Commission Gold Seal Certified',
                p: 'We hold the Joint Commission Gold Seal of Approval — the most widely recognized symbol of quality in healthcare. Joint Commission certification is earned through rigorous evaluation and ongoing standards compliance.',
              },
              {
                badge: 'CareScout Approved',
                h: 'CareScout Verified Provider',
                p: 'Vitalis is an approved CareScout provider — meaning we meet the network standards for quality, reliability, and client satisfaction used by long-term care insurance carriers nationwide.',
              },
              {
                badge: 'BCHD Contracted',
                h: 'Baltimore County Health Department Recognized',
                p: 'We are a recognized provider serving Baltimore County through the BCHD network — held to the same accountability standards that govern our work throughout Maryland.',
              },
              {
                badge: 'Best of Home Care 2022–2024',
                h: 'Home Care Pulse Employer of Choice — 3 Years',
                p: 'Awarded Best of Home Care Employer of Choice by Home Care Pulse for three consecutive years (2022, 2023, 2024) — an independent rating based on caregiver satisfaction surveys.',
              },
              {
                badge: 'BBB',
                h: 'Clean Better Business Bureau Rating',
                p: 'Vitalis has maintained a clean Better Business Bureau rating for five consecutive years — reflecting consistent client satisfaction and ethical business practices.',
              },
            ].map(({ badge, h, p }) => (
              <div key={h} className="card" style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                <div>
                  <span className="pill" style={{ marginBottom: '8px' }}>{badge}</span>
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--text)',
                      marginBottom: '8px',
                    }}
                  >
                    {h}
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="sec" style={{ background: 'var(--g-lt)' }}>
        <div className="inner">
          <div className="testi-card" style={{ maxWidth: '700px', marginInline: 'auto' }}>
            <div className="stars">★★★★★</div>
            <p
              style={{
                fontFamily: 'var(--font-lora),Georgia,serif',
                fontSize: '18px',
                lineHeight: 1.75,
                color: 'var(--text)',
                marginBottom: '18px',
                fontStyle: 'italic',
              }}
            >
              &ldquo;Following a poor experience with our previous agency, we
              reviewed multiple proposals before settling with Vitalis — because
              of the attention to detail and professionalism with which they
              handled our assessment. All our expectations have been exceeded and
              we have seen our health situation improve dramatically. We strongly
              recommend Vitalis to anyone needing high-quality, affordable home
              care.&rdquo;
            </p>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
              <strong style={{ color: 'var(--g-bd)' }}>E. Adaku</strong> · Active Client, Silver Spring MD
            </p>
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to meet the team in person?"
        body="We offer a free care consultation — a real conversation with a real member of our team who will listen, answer your questions, and help you understand your options. No pressure. No obligation."
      />

      <Footer />
    </>
  )
}
