import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────
   Vita Lead Capture Endpoint
   Saves to Supabase + sends email notification
   ───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   THE SENDER IS AN ENV VAR, NOT A LITERAL.

   This route sent from Resend's SANDBOX sender address (the onboarding
   mailbox on their own sandbox domain) until 11 August 2026. That sender
   only delivers to the Resend account owner's own address and rejects
   every other recipient with a 4xx. Pitfall #21.

   Two things kept it invisible. The literal meant only a code deploy could
   change it. And the send below never checked res.ok — a rejected send is
   a SUCCESSFUL fetch, so the promise resolved, the catch never fired, and
   nothing reached the Vercel logs either. It was not merely misconfigured;
   it was unobservable.

   Both halves are fixed here. LEAD_FROM_EMAIL follows the BLOG_FROM_EMAIL
   pattern the blog cron already uses, so the next change is a Vercel
   setting rather than a ship. The default is the verified domain.
   ───────────────────────────────────────────── */
const LEAD_FROM = process.env.LEAD_FROM_EMAIL || 'Vita Care Advisor <team@vitalishealthcare.com>'

interface LeadPayload {
  name: string
  phone: string
  context: string
  timestamp: string
  page: string
  sessionId: string
}

/* Visitor-supplied text goes into the notification HTML. Escape it.
   Same helper as app/api/blog/cron/route.ts. */
function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/* Soft-fail notification — never throws. Returns true only on a 2xx from
   Resend, so the caller can report whether anybody was actually emailed. */
async function sendLeadEmail(
  lead: { name: string; phone: string; context: string; page_url: string },
  cleanPhone: string,
  sessionId: string,
): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) {
    console.error('Lead email skipped: no RESEND_API_KEY')
    return false
  }

  const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || 'team@vitalishealthcare.com'

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto;">
      <div style="background: #27500a; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h2 style="color: #c0dd97; font-size: 16px; margin: 0;">🌿 New Lead from Vita Chat</h2>
      </div>
      <div style="background: #fff; padding: 24px; border: 1px solid #e2efd0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; width: 120px;">Name</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${esc(lead.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Phone</td>
            <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">
              <a href="tel:${cleanPhone}" style="color: #3b6d11;">${esc(lead.phone)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; vertical-align: top;">Asked about</td>
            <td style="padding: 8px 0; color: #1a1a1a;">${esc(lead.context)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Page</td>
            <td style="padding: 8px 0; color: #666;">${esc(lead.page_url)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888;">Time</td>
            <td style="padding: 8px 0; color: #666;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee;">
          <a href="tel:${cleanPhone}" style="display: inline-block; background: #5a9e2f; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Call ${esc(lead.name)} Now</a>
        </div>
        <p style="margin-top: 16px; font-size: 12px; color: #999;">
          This lead came from the Vita AI care advisor on vitalishealthcare.com.
          Please follow up within 24 hours with a text message or call.
          ${sessionId ? `View full transcript in the admin dashboard: /admin/vita` : ''}
        </p>
      </div>
    </div>
  `

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: LEAD_FROM,
        to: [notifyEmail],
        subject: `🌿 New Care Inquiry — ${lead.name}`,
        html,
      }),
    })

    /* A non-2xx from Resend resolves the fetch. Read it, or the send fails
       silently exactly as it did before 11 August 2026. */
    const txt = await res.text()
    if (!res.ok) {
      console.error(
        'Resend lead email rejected:',
        res.status,
        LEAD_FROM,
        '->',
        notifyEmail,
        txt.slice(0, 200).replace(/\s+/g, ' ').trim(),
      )
      return false
    }
    return true
  } catch (emailErr) {
    console.error('Resend lead email threw:', LEAD_FROM, '->', notifyEmail, emailErr)
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json()

    // Validate
    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: 'Name and phone number are required.' },
        { status: 400 },
      )
    }

    const cleanPhone = body.phone.replace(/\D/g, '')
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number.' },
        { status: 400 },
      )
    }

    const lead = {
      session_id: body.sessionId || null,
      name: body.name.trim(),
      phone: body.phone.trim(),
      phone_cleaned: cleanPhone,
      context: body.context?.trim() || 'General inquiry via Vita chat',
      page_url: body.page || '/',
    }

    // ── Save to Supabase ──
    try {
      const sb = createServiceClient()

      // Insert the lead
      const { error: leadErr } = await sb.from('vita_leads').insert(lead)
      if (leadErr) {
        console.error('Failed to save lead to Supabase:', leadErr.message)
      }

      // Mark the session as lead_captured
      if (body.sessionId) {
        await sb
          .from('vita_sessions')
          .update({ lead_captured: true })
          .eq('session_id', body.sessionId)
      }
    } catch (dbErr) {
      console.error('Supabase not configured or error:', dbErr)
      // Continue — still send notification even if DB fails
    }

    // ── Send email notification via Resend ──
    const emailed = await sendLeadEmail(lead, cleanPhone, body.sessionId || '')

    // ── Webhook (optional — for Zapier, Make, Slack) ──
    const webhookUrl = process.env.LEAD_WEBHOOK_URL
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...lead,
            timestamp: body.timestamp || new Date().toISOString(),
            source: 'vita-chat-widget',
          }),
        })
      } catch (whErr) {
        console.error('Webhook error:', whErr)
      }
    }

    // ── Always log ──
    console.log('━━━ NEW VITA LEAD ━━━', JSON.stringify({ ...lead, emailed }))

    /* `emailed` is reported back so a test capture can be verified from the
       browser network tab without Vercel log access. The visitor never sees
       it — the widget reads `success` only. */
    return NextResponse.json({ success: true, emailed })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json(
      { error: 'Something went wrong saving your information. Please call us at 240.716.6874.' },
      { status: 500 },
    )
  }
}
