'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { href: '/services/companion-care', label: 'Services' },
  { href: '/#conditions', label: 'Conditions' },
  { href: '/about', label: 'About Us' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className="nav-sticky">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 48px', maxWidth: '1280px', margin: '0 auto' }} className="nav-inner">
          <Link href="/" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image src="/logo-mark.png" alt="Vitalis HealthCare" title="Vitalis HealthCare — Home Care in Silver Spring, MD" width={44} height={40} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '17px', color: 'var(--text)' }}>Vitalis HealthCare</span>
          </Link>

          <div className="nav-links-desktop" style={{ display: 'flex', gap: '28px' }}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{ fontSize: '14px', color: 'var(--muted)' }}>{label}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a href="tel:2407166874" className="nav-phone-desktop" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--g-bd)' }}>240.716.6874</a>
            <a href="https://getcare.vitalishealthcare.com" className="btn-nav nav-cta-desktop">Get Care Today</a>
            <button onClick={() => setOpen(!open)} className="hamburger-btn" aria-label={open ? 'Close menu' : 'Open menu'}>
              <span className={`hb-line ${open ? 'hb-open-1' : ''}`} />
              <span className={`hb-line ${open ? 'hb-open-2' : ''}`} />
              <span className={`hb-line ${open ? 'hb-open-3' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {open && <div className="nav-overlay" onClick={() => setOpen(false)} />}

      <div className={`nav-drawer ${open ? 'nav-drawer-open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image src="/logo-mark.png" alt="Vitalis HealthCare" title="Vitalis HealthCare — Home Care in Silver Spring, MD" width={28} height={28} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '16px', color: 'var(--text)' }}>Vitalis HealthCare</span>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', fontSize: '20px', color: 'var(--muted)', lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '15px 24px', fontSize: '17px', fontWeight: 500, color: 'var(--text)', borderBottom: '1px solid #f5f5f3', textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>
        <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a href="https://getcare.vitalishealthcare.com" onClick={() => setOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}>Get Care Today</a>
          <a href="tel:2407166874" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--g-lt)', color: 'var(--g-bd)', border: '1.5px solid #97c459', borderRadius: '8px', padding: '13px 20px', fontSize: '15px', fontWeight: 500, textDecoration: 'none' }}>📞 240.716.6874</a>
          <a href="https://wa.me/12027796027" onClick={() => setOpen(false)} className="btn-wa" style={{ textAlign: 'center' }}>WhatsApp Us</a>
        </div>
      </div>
    </>
  )
}
