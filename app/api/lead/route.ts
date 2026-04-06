import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

/* ─────────────────────────────────────────────
   Vita Lead Capture Endpoint
   Saves to Supabase + sends email notification
   ───────────────────────────────────────────── */

interface LeadPayload {
  name: string
  phone: string
  context: string
  timestamp: string
  page: string
  sessionId: string
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
    const resendKey = process.env.RESEND_API_KEY
    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL || 'info@vitalishealthcare.com'

    if (resendKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Vita Care Advisor <onboarding@resend.dev>',
            to: [notifyEmail],
            subject: `🌿 New Care Inquiry — ${lead.name}`,
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 520px; margin: 0 auto;">
                <div style="background: #27500a; padding: 20px 24px; border-radius: 12px 12px 0 0;">
                  <h2 style="color: #c0dd97; font-size: 16px; margin: 0;">🌿 New Lead from Vita Chat</h2>
                </div>
                <div style="background: #fff; padding: 24px; border: 1px solid #e2efd0; border-top: none; border-radius: 0 0 12px 12px;">
                  <table style="width: 100%; font-size: 15px; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #888; width: 120px;">Name</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">${lead.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #888;">Phone</td>
                      <td style="padding: 8px 0; font-weight: 600; color: #1a1a1a;">
                        <a href="tel:${cleanPhone}" style="color: #3b6d11;">${lead.phone}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #888; vertical-align: top;">Asked about</td>
                      <td style="padding: 8px 0; color: #1a1a1a;">${lead.context}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #888;">Page</td>
                      <td style="padding: 8px 0; color: #666;">${lead.page_url}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #888;">Time</td>
                      <td style="padding: 8px 0; color: #666;">${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</td>
                    </tr>
                  </table>
                  <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee;">
                    <a href="tel:${cleanPhone}" style="display: inline-block; background: #5a9e2f; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Call ${lead.name} Now</a>
                  </div>
                  <p style="margin-top: 16px; font-size: 12px; color: #999;">
                    This lead came from the Vita AI care advisor on vitalishealthcare.com.
                    Please follow up within 24 hours with a text message or call.
                    ${body.sessionId ? `View full transcript in the admin dashboard: /admin/vita` : ''}
                  </p>
                </div>
              </div>
            `,
          }),
        })
      } catch (emailErr) {
        console.error('Resend email error:', emailErr)
      }
    }

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
    console.log('━━━ NEW VITA LEAD ━━━', JSON.stringify(lead))

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json(
      { error: 'Something went wrong saving your information. Please call us at 240.716.6874.' },
      { status: 500 },
    )
  }
}
