import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div>
          <div style={{ marginBottom: '14px' }}>
            <Image src="/logo-full.png" alt="Vitalis HealthCare Services" width={220} height={70} style={{ objectFit: 'contain', objectPosition: 'left' }} />
          </div>
          <p style={{ fontSize: '13px', color: '#639922', lineHeight: 1.8 }}>
            A family-owned, Maryland-licensed home care agency serving Silver Spring and communities across Montgomery County, Baltimore County, and Anne Arundel County. Our mission: improve quality of life for our clients in the comfort of their homes.
          </p>
          <p style={{ fontSize: '12px', color: '#3b6d11', marginTop: '14px', lineHeight: 1.8 }}>
            8757 Georgia Avenue, Suite 440<br />
            Silver Spring, MD 20910<br />
            team@vitalishealthcare.com · 240.716.6874
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
            {['OHCQ #3879R', 'MDH Regulated', 'CareScout', 'BCHD'].map((b) => (
              <span className="cert-badge" key={b}>{b}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.09em', color: '#97c459', marginBottom: '14px' }}>
            Services
          </h4>
          {[
            ['Companion Care', '/services/companion-care'],
            ['Personal Care', '/services/personal-care'],
            ['Skilled Nursing', '/services/skilled-nursing'],
            ['Dementia Care', '/conditions/dementia'],
            ['Post-Surgery Recovery', '/conditions/post-surgery'],
            ['Stroke Recovery', '/conditions/stroke'],
            ['Fall Prevention', '/conditions/fall-prevention'],
          ].map(([label, href]) => (
            <Link key={label} href={href} style={{ display: 'block', fontSize: '13px', color: '#639922', marginBottom: '8px' }}>
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.09em', color: '#97c459', marginBottom: '14px' }}>
            Locations
          </h4>
          {[
            ['Silver Spring, MD', '/home-care/silver-spring'],
            ['Rockville, MD', '/home-care/rockville'],
            ['Gaithersburg, MD', '/home-care/gaithersburg'],
            ['Germantown, MD', '/home-care/germantown'],
            ['Takoma Park, MD', '/home-care/takoma-park'],
            ['Towson, MD', '/home-care/towson'],
            ['Pikesville, MD', '/home-care/pikesville'],
            ['Owings Mills, MD', '/home-care/owings-mills'],
            ['Annapolis, MD', '/home-care/annapolis'],
          ].map(([label, href]) => (
            <Link key={label} href={href} style={{ display: 'block', fontSize: '13px', color: '#639922', marginBottom: '8px' }}>
              {label}
            </Link>
          ))}
        </div>

        <div>
          <h4 style={{ fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.09em', color: '#97c459', marginBottom: '14px' }}>
            Company
          </h4>
          {[
            ['About Us', '/about'],
            ['Meet the Team', '/about#team'],
            ['Blog & Resources', '/blog'],
            ['Careers', '/careers'],
            ['Testimonials', '/testimonials'],
            ['Contact Us', '/contact'],
            ['Patient Forms', '/forms'],
          ].map(([label, href]) => (
            <Link key={label} href={href} style={{ display: 'block', fontSize: '13px', color: '#639922', marginBottom: '8px' }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="foot-bot">
        © {new Date().getFullYear()} Vitalis Healthcare Services, LLC &nbsp;·&nbsp;
        OHCQ License #3879R &nbsp;·&nbsp; MDH OHCQ Regulated &nbsp;·&nbsp;
        CareScout Approved &nbsp;·&nbsp; All rights reserved.
      </div>
    </footer>
  )
}
