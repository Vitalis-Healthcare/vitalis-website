#!/bin/bash
set -e

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   Vitalis HealthCare Website — v1.0.0 Deploy Script         ║"
echo "║   Next.js 15 · Vercel · vitalishealthcare.com               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# ── Step 1: Check prerequisites ──────────────────────────────────────
echo "▶ Checking prerequisites..."

if ! command -v node &> /dev/null; then
  echo "✗ Node.js not found. Install from https://nodejs.org (v18+ required)"
  exit 1
fi

NODE_VER=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VER" -lt 18 ]; then
  echo "✗ Node.js v18+ required. Current: $(node -v)"
  exit 1
fi
echo "  ✓ Node.js $(node -v)"

if ! command -v npm &> /dev/null; then
  echo "✗ npm not found."
  exit 1
fi
echo "  ✓ npm $(npm -v)"

if ! command -v git &> /dev/null; then
  echo "✗ git not found. Install git before continuing."
  exit 1
fi
echo "  ✓ git $(git --version | cut -d' ' -f3)"

# ── Step 2: Install Vercel CLI if needed ────────────────────────────
if ! command -v vercel &> /dev/null; then
  echo ""
  echo "▶ Installing Vercel CLI..."
  npm install -g vercel
  echo "  ✓ Vercel CLI installed"
else
  echo "  ✓ Vercel CLI $(vercel --version)"
fi

# ── Step 3: Install dependencies ────────────────────────────────────
echo ""
echo "▶ Installing dependencies..."
npm install
echo "  ✓ Dependencies installed"

# ── Step 4: Build ────────────────────────────────────────────────────
echo ""
echo "▶ Building production bundle..."
npm run build
echo "  ✓ Build complete"

# ── Step 5: Deploy to Vercel ─────────────────────────────────────────
echo ""
echo "▶ Deploying to Vercel..."
echo ""
echo "  You'll be prompted to:"
echo "  • Log in to Vercel (if not already logged in)"
echo "  • Link to an existing project OR create a new one"
echo "  • For a new project, name it: vitalis-website"
echo ""

read -p "  Ready to deploy? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
  echo "  Deploy cancelled."
  exit 0
fi

vercel --prod

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║   ✓ Deployed successfully!                                  ║"
echo "╠══════════════════════════════════════════════════════════════╣"
echo "║                                                              ║"
echo "║  NEXT STEPS — read before closing this window               ║"
echo "║                                                              ║"
echo "║  1. ADD YOUR DOMAIN                                          ║"
echo "║     Vercel Dashboard → Project → Settings → Domains         ║"
echo "║     Add: vitalishealthcare.com  AND  www.vitalishealthcare.com"
echo "║     Then update your DNS (at your registrar):               ║"
echo "║       A record:    @   →  76.76.21.21                       ║"
echo "║       CNAME:       www →  cname.vercel-dns.com              ║"
echo "║                                                              ║"
echo "║  2. SET UP GOOGLE SEARCH CONSOLE (takes 10 min)             ║"
echo "║     → Go to search.google.com/search-console                ║"
echo "║     → Add property: vitalishealthcare.com                   ║"
echo "║     → Verify via DNS TXT record (Vercel makes this easy)    ║"
echo "║     → Submit sitemap: vitalishealthcare.com/sitemap.xml     ║"
echo "║                                                              ║"
echo "║  3. CONNECT GITHUB (recommended for future updates)         ║"
echo "║     → Push this folder to a new GitHub repo                 ║"
echo "║     → Vercel Dashboard → Project → Settings → Git           ║"
echo "║     → Connect the repo for automatic deploys on push        ║"
echo "║                                                              ║"
echo "║  4. KEEP WORDPRESS LIVE until DNS fully propagates          ║"
echo "║     DNS changes take up to 48 hours globally                ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
