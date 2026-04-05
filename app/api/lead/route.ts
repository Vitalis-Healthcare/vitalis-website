import { NextRequest, NextResponse } from 'next/server'

/* ─────────────────────────────────────────────
   Vita Lead Capture Endpoint
   Receives contact info from the chat widget
   ───────────────────────────────────────────── */

interface LeadPayload {
  name: string
  phone: string
  context: string       // summary of what the visitor asked about
  timestamp: string
  page: string          // which page they were on
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json()

    // Validate required fields
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 },
      )
    }

    // Clean the phone number — keep digits only
    const cleanPhone = body.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number.' },
        { status: 400 },
      )
    }

    const lead = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      phoneCleaned: cleanPhone,
      context: body.context?.trim() || 'General inquiry via Vita chat',
      page: body.page || '/',
      timestamp: body.timestamp || new Date().toISOString(),
      source: 'vita-chat-widget',
    }

    // ── Log the lead (always) ──
    console.log('━━━ NEW VITA LEAD ━━━')
    console.log(JSON.stringify(lead, null, 2))
    console.log('━━━━━━━━━━━━━━━━━━━━')

    // ── Option 1: Send email notification via Resend ──
    // Uncomment and configure if you have Resend set up:
    //
    // const resendKey = process.env.RESEND_API_KEY
    // if (resendKey) {
    //   await fetch('https://api.resend.com/emails', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${resendKey}`,
    //     },
    //     body: JSON.stringify({
    //       from: 'Vita Care Advisor <vita@vitalishealthcare.com>',
    //       to: ['info@vitalishealthcare.com'],
    //       subject: `🌿 New Care Inquiry from ${lead.name}`,
    //       html: `
    //         <h2>New Lead from Vita Chat Widget</h2>
    //         <p><strong>Name:</strong> ${lead.name}</p>
    //         <p><strong>Phone:</strong> ${lead.phone}</p>
    //         <p><strong>What they asked about:</strong> ${lead.context}</p>
    //         <p><strong>Page:</strong> ${lead.page}</p>
    //         <p><strong>Time:</strong> ${lead.timestamp}</p>
    //         <hr />
    //         <p style="color: #666; font-size: 13px;">
    //           This lead came from the Vita AI care advisor on vitalishealthcare.com.
    //           Please follow up within 24 hours with a text message or call.
    //         </p>
    //       `,
    //     }),
    //   })
    // }

    // ── Option 2: Post to a webhook (Zapier, Make, Slack, etc.) ──
    // Uncomment and set LEAD_WEBHOOK_URL in your Vercel env vars:
    //
    // const webhookUrl = process.env.LEAD_WEBHOOK_URL
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(lead),
    //   })
    // }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json(
      { error: 'Something went wrong saving your information. Please call us at 240.716.6874.' },
      { status: 500 },
    )
  }
}
