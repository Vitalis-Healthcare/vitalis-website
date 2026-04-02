import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="nav-sticky">
      <div
        className="nav-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 48px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <rect width="34" height="34" rx="9" fill="#eaf3de" />
            <text
              x="17" y="23"
              textAnchor="middle"
              fontFamily="Georgia,serif"
              fontSize="13"
              fontWeight="500"
              fill="#27500a"
            >
              V+
            </text>
          </svg>
          <span style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontSize: '17px', color: 'var(--text)' }}>
            Vitalis HealthCare
          </span>
        </Link>

        <div className="nav-links" style={{ display: 'flex', gap: '28px' }}>
          <Link href="/services/companion-care" style={{ fontSize: '14px', color: 'var(--muted)' }}>Services</Link>
          <Link href="/#conditions" style={{ fontSize: '14px', color: 'var(--muted)' }}>Conditions</Link>
          <Link href="/about" style={{ fontSize: '14px', color: 'var(--muted)' }}>About Us</Link>
          <Link href="/blog" style={{ fontSize: '14px', color: 'var(--muted)' }}>Blog</Link>
          <Link href="/careers" style={{ fontSize: '14px', color: 'var(--muted)' }}>Careers</Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="tel:2407166874"
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--g-bd)' }}
          >
            240.716.6874
          </a>
          <a href="https://getcare.vitalishealthcare.com" className="btn-nav">
            Get Care Today
          </a>
        </div>
      </div>
    </nav>
  )
}
