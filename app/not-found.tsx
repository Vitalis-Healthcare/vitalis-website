import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <section style={{ padding: '100px 48px', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '80px', fontWeight: 500, color: '#c0dd97', lineHeight: 1, marginBottom: '20px' }}>404</div>
        <h1 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: '30px', fontWeight: 500, color: 'var(--text)', marginBottom: '14px' }}>This page doesn&apos;t exist.</h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', marginBottom: '32px', maxWidth: '420px', lineHeight: 1.7 }}>
          But our care team does — and they&apos;re ready to help your family right now.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/" className="btn-primary">Back to Home</a>
          <a href="tel:2407166874" className="btn-secondary">Call 240.716.6874</a>
        </div>
      </section>
      <Footer />
    </>
  )
}
