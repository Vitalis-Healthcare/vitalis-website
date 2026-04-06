# Vita Chat Widget — Setup & Deployment Guide

## What Was Added

Five changes to enable the AI care advisor with lead capture:

### 1. `/app/api/chat/route.ts`
Server-side API route that proxies visitor messages to Anthropic's Claude API. Contains the full Vitalis knowledge base as a system prompt. The AI responds as "Vita" and uses a `[OFFER_CALLBACK]` marker after 2-3 exchanges to trigger the lead capture card.

### 2. `/app/api/lead/route.ts`
Lead capture endpoint. Receives name, phone, conversation context, and page URL. Currently logs to Vercel console. Has ready-to-uncomment blocks for:
- **Resend email notification** — sends email to your team when a lead is captured
- **Webhook** — posts to Zapier, Make, Slack, or any webhook URL

### 3. `/components/ChatWidget.tsx`
Floating chat widget with integrated lead capture. Features:
- Pulsing green bubble → full chat panel
- 4 guided conversation starters
- Inline lead capture card (name + phone) that slides in naturally after Vita builds rapport
- "Not right now" dismiss option — respects the visitor's pace
- Success confirmation with personalized thank-you
- Auto-linking of phone numbers, URLs, and CareMatch360
- Mobile-responsive (full-screen on phones)
- Footer with call and care request links

### 4. `/app/layout.tsx`
Updated to include `<ChatWidget />` on every page.

### 5. `VITA-SETUP.md`
This file.

---

## Deployment Steps

### Step 1: Add Anthropic API Key to Vercel

In your Vercel project dashboard:

1. Go to **Settings → Environment Variables**
2. Add:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Your Anthropic API key (starts with `sk-ant-...`)
   - **Environment:** Production, Preview, Development
3. Click **Save**

Get a key at: https://console.anthropic.com/

### Step 2: Set Up Lead Notifications (Choose One)

**Option A: Email via Resend**
1. Add `RESEND_API_KEY` to Vercel environment variables
2. In `/app/api/lead/route.ts`, uncomment the Resend email block
3. Update the `to` email address to your team's address

**Option B: Webhook (Zapier, Make, Slack)**
1. Add `LEAD_WEBHOOK_URL` to Vercel environment variables
2. In `/app/api/lead/route.ts`, uncomment the webhook block

**Option C: Vercel Logs Only (default)**
Leads are logged to `console.log` and visible in Vercel → Deployments → Functions → Logs.

### Step 3: Push to GitHub

```bash
cd vitalis-website
git add .
git commit -m "feat: add Vita AI care advisor with lead capture"
git push origin main
```

Vercel will auto-deploy from the push.

### Step 4: Verify

1. Visit your live site
2. Click the green chat bubble (bottom-right)
3. Ask 2-3 questions to trigger the lead capture card
4. Submit test contact info
5. Check your notification channel (email, webhook, or Vercel logs)

---

## How the Lead Flow Works

1. Visitor opens chat → sees welcome message + 4 starter questions
2. Visitor asks 2-3 questions → Vita answers warmly, educates about services
3. After building rapport, Vita's response triggers the lead card: a gentle inline form with name + phone
4. Visitor can submit (→ care coordinator follows up by text/call) or dismiss ("Not right now")
5. Either way, the chat continues — Vita still answers questions and guides toward CareMatch360
6. Lead data includes: name, phone, what they asked about, which page they were on, timestamp

---

## Cost Estimate

Using Claude Sonnet 4 via the Anthropic API:
- ~$0.04 per conversation (5 exchanges)
- At 50 conversations/day: ~$60/month
- Monitor at https://console.anthropic.com/

---

## Customization

### Welcome message & starters
Edit `WELCOME` and `STARTERS` in `ChatWidget.tsx`.

### Knowledge base
Edit `SYSTEM_PROMPT` in `app/api/chat/route.ts`. Add services, locations, team, policies as needed.

### Lead card copy
Edit the card text in `ChatWidget.tsx` — search for "Get a personal follow-up".

### When the lead card appears
Controlled by the AI via the `[OFFER_CALLBACK]` marker. Adjust timing guidance in the `LEAD CAPTURE BEHAVIOR` section of the system prompt.

### Styling
All styles use `.vita-*` prefixes — no conflicts. Colors match the Vitalis green palette.
