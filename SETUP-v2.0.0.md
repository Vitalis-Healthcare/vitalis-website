# Vitalis Website v2.0.0 — Setup Guide

## What's new in this version

1. **Blog Writing Engine** — A web interface at `/admin/blog/new` where your blogger
   can write and publish posts without any GitHub or terminal access.
   Posts go live in ~2 minutes automatically.

2. **Google Ads conversion tracking fix** — Instructions below to fix the
   form submission tracking so Google Ads correctly counts every getcare inquiry.

---

## Part 1: Blog Writing Engine Setup

You need to do 3 things in Vercel before the blog writer will work.
This takes about 10 minutes total. Do it once — never again.

---

### Step 1: Create a GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Vitalis Blog Publisher`
4. Set expiration: **No expiration** (so you don't have to repeat this)
5. Under **Select scopes**, check the box next to **`repo`** (the top one —
   this gives read/write access to the repository)
6. Click **"Generate token"** at the bottom
7. **COPY THE TOKEN IMMEDIATELY** — GitHub only shows it once.
   It looks like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

### Step 2: Add Environment Variables in Vercel

1. Go to: https://vercel.com/okezie-ofoegbus-projects/vitalis-website/settings/environment-variables
2. Add the following variables one at a time:

**Variable 1:**
- Name: `GITHUB_TOKEN`
- Value: (paste the token you copied in Step 1)
- Environment: Production ✓, Preview ✓, Development ✓

**Variable 2:**
- Name: `BLOG_ADMIN_PIN`
- Value: (choose any PIN — e.g., `vitalis2026` or a 6-digit number)
  → Write this PIN down. Give it to your blogger. Keep it private.
- Environment: Production ✓, Preview ✓, Development ✓

3. Click **Save** after each one.

---

### Step 3 (Recommended): Add a Vercel Deploy Hook

This ensures the site rebuilds instantly every time a post is published,
even if the GitHub → Vercel auto-deploy is not yet connected.

1. In Vercel → Settings → **Git** → scroll to **"Deploy Hooks"**
2. Click **"Create Hook"**
3. Name: `Blog Publisher`
4. Branch: `main`
5. Click **Create Hook** — copy the URL it gives you
   (looks like: `https://api.vercel.com/v1/integrations/deploy/...`)
6. Back in Environment Variables, add:

**Variable 3:**
- Name: `VERCEL_DEPLOY_HOOK`
- Value: (paste the deploy hook URL)
- Environment: Production ✓

---

### Step 4: Deploy this update

In Terminal:
```bash
cd ~/Downloads && unzip -o vitalis-website-v2.0.0-blog-writer.zip && cd vitalis-website && vercel --prod
```

---

### How to use the Blog Writer

1. Go to: **https://www.vitalishealthcare.com/admin/blog/new**
2. Enter the PIN you set in Step 2
3. Fill in:
   - **Title** — Clear, descriptive headline
   - **Category** — Choose from the 5 options
   - **Date** — Auto-fills to today
   - **Excerpt** — One sentence summary (appears on blog index cards)
   - **Content** — Write in the left pane, see preview on the right
4. Click **Publish Post**
5. Done — post is live in ~2 minutes

**Give your blogger this URL and the PIN.** That's all they need.

---

## Part 2: Google Ads — Fix Conversion Tracking

These changes are made in the Google Ads interface, not in code.
Do these AFTER fixing the payment method.

---

### Fix A: Update the form submission conversion URL (5 minutes)

The conversion tag is currently watching the wrong URL.

1. Go to: https://ads.google.com
2. Left menu → **Tools** → **Conversions**
3. Click **"Contact Form submissions"**
4. Click the **"Webpages"** tab
5. You will see: `https://www.vitalishealthcare.com/thankyou` — this is WRONG
6. Click **Edit** (or click the URL itself)
7. Change it to: `https://getcare.vitalishealthcare.com/thank-you`
8. Save

This is the single most important fix. Every form submission from
your ads was previously uncounted. This fixes that permanently.

---

### Fix B: Install Google Ads tag on getcare subdomain

The global site tag needs to be on the getcare landing page so Google
can track conversions. Get your Google Ads tag from:

1. Google Ads → Tools → Conversions → click "Contact Form submissions"
2. Click **"Tag setup"** → **"Install the tag yourself"**
3. Copy both code snippets (global site tag + event snippet)

Then add them to the `<head>` of the `getcare.vitalishealthcare.com` pages.
The getcare site also needs GA4 tag ID `G-LPWTD5L870` in its `<head>`.

If you need help with this step, share the getcare codebase details
and the next Claude session can build this as a code addition.

---

### Fix C: Clean up broken conversion actions

1. Go to Tools → Conversions
2. **"Email link click"** → checkbox → Actions → Remove (delete it)
3. **"Call from website"** → click Edit goal → change from Primary to Secondary
4. **"Local actions - Clicks to call"** → click Edit goal → change to Secondary
5. Keep **"Calls from ads"** and **"Contact Form submissions"** as Primary

---

### Fix D: Fix the payment method

1. Google Ads → left menu → **Billing** → **Payment methods**
2. Click **"Add payment method"** → add a current credit card
3. Once added, click **"Set as primary"**

Nothing can run until this is done.

---

## Summary checklist

### Blog writer:
- [ ] Created GitHub Personal Access Token (repo scope, no expiration)
- [ ] Added GITHUB_TOKEN to Vercel environment variables
- [ ] Added BLOG_ADMIN_PIN to Vercel environment variables  
- [ ] Added VERCEL_DEPLOY_HOOK to Vercel environment variables
- [ ] Deployed v2.0.0 via Terminal
- [ ] Tested: visited /admin/blog/new, entered PIN, published test post
- [ ] Gave blogger the URL and PIN

### Google Ads:
- [ ] Fixed payment method
- [ ] Updated form conversion URL to getcare.vitalishealthcare.com/thank-you
- [ ] Installed Google Ads tag on getcare subdomain
- [ ] Deleted "Email link click" conversion
- [ ] Changed "Call from website" and "Local actions" to Secondary
- [ ] Verified "Calls from ads" is still Primary, 60 seconds, active

---

Version: v2.0.0
Previous: v1.9.5
