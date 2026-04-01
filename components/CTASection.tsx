interface CTASectionProps {
  heading?: string
  body?: string
}

export default function CTASection({
  heading = "Ready to talk? We'll make the first call easy.",
  body = "Call us, WhatsApp us, or fill out a short form and we'll call you back. We'll answer your questions, explain your options, and arrange a free care consultation at a time that works for your family. No obligation.",
}: CTASectionProps) {
  return (
    <section className="cta-sec">
      <h2
        style={{
          fontFamily: 'var(--font-lora), Georgia, serif',
          fontSize: '38px',
          fontWeight: 500,
          color: '#eaf3de',
          marginBottom: '14px',
          lineHeight: 1.2,
        }}
      >
        {heading}
      </h2>
      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.8,
          color: '#97c459',
          maxWidth: '520px',
          marginInline: 'auto',
          marginBottom: '32px',
        }}
      >
        {body}
      </p>
      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href="https://getcare.vitalishealthcare.com" className="btn-primary">
          Request a Free Consultation
        </a>
        <a
          href="tel:2407166874"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', color: '#c0dd97', border: '2px solid #3b6d11',
            borderRadius: '8px', padding: '14px 28px', fontSize: '15px',
            fontWeight: 500, fontFamily: 'var(--font-sans)',
          }}
        >
          Call 240.716.6874
        </a>
        <a
          href="https://wa.me/12027796027"
          className="btn-wa"
        >
          WhatsApp Us
        </a>
      </div>
    </section>
  )
}
