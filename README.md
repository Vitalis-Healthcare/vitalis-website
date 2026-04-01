# Vitalis HealthCare Website — v1.0.0

**Stack:** Next.js 15 · TypeScript · Vercel  
**Live URL:** https://www.vitalishealthcare.com  
**Repo:** GitHub → Vitalis-Healthcare/vitalis-website

---

## Project Structure

```
vitalis-website/
├── app/
│   ├── layout.tsx              Root layout (fonts, metadata)
│   ├── page.tsx                Homepage
│   ├── globals.css             All shared styles & CSS variables
│   ├── sitemap.ts              Auto-generated sitemap.xml
│   ├── robots.ts               robots.txt
│   ├── not-found.tsx           404 page
│   ├── home-care/[slug]/
│   │   └── page.tsx            All 9 location pages (dynamic)
│   └── conditions/[slug]/
│       └── page.tsx            All 4 condition pages (dynamic)
├── components/
│   ├── Nav.tsx                 Sticky navigation bar
│   ├── Footer.tsx              Site footer
│   ├── TrustBar.tsx            Dark green credential bar
│   └── CTASection.tsx          Bottom CTA (reusable)
├── lib/data/
│   ├── locations.ts            All 9 city page content & SEO data
│   └── conditions.ts           All 4 condition page content & SEO data
├── public/                     Static assets (logos, photos go here)
├── vercel.json                 Vercel deployment config
├── next.config.ts              Next.js config
├── package.json
└── deploy_v1.sh                One-command deploy script
```

---

## Pages

### Homepage
- URL: `/`
- Full marketing page: hero, trust bar, how we work, services, conditions, team, testimonials, payment, FAQ, CTA

### Location Pages (9)
| City | URL | County | BCHD |
|------|-----|--------|------|
| Silver Spring | `/home-care/silver-spring` | Montgomery | ✅ |
| Rockville | `/home-care/rockville` | Montgomery | ✅ |
| Gaithersburg | `/home-care/gaithersburg` | Montgomery | ✅ |
| Germantown | `/home-care/germantown` | Montgomery | ✅ |
| Takoma Park | `/home-care/takoma-park` | Montgomery | ✅ |
| Towson | `/home-care/towson` | Baltimore | ✅ |
| Pikesville | `/home-care/pikesville` | Baltimore | ✅ |
| Owings Mills | `/home-care/owings-mills` | Baltimore | ✅ |
| Annapolis | `/home-care/annapolis` | Anne Arundel | — |

### Condition Pages (4)
| Condition | URL |
|-----------|-----|
| Dementia & Memory Care | `/conditions/dementia` |
| Post-Surgery Recovery | `/conditions/post-surgery` |
| Stroke Recovery | `/conditions/stroke` |
| Fall Prevention | `/conditions/fall-prevention` |

---

## SEO Features Built In

- Unique `<title>` and `<meta description>` per page
- Open Graph tags on every page
- JSON-LD structured data: `LocalBusiness`, `MedicalBusiness`, `MedicalWebPage`, `FAQPage`
- Auto-generated `sitemap.xml` at `/sitemap.xml`
- `robots.txt` pointing to sitemap
- Breadcrumb navigation on all interior pages
- BCHD trust signal on all Baltimore County pages
- Location-specific FAQ content on every page

---

## How to Update Content

### Add a new location page
1. Open `lib/data/locations.ts`
2. Add a new entry to the `locations` array following the existing pattern
3. Deploy — the new page auto-generates at `/home-care/[your-slug]`

### Add a new condition page
1. Open `lib/data/conditions.ts`
2. Add a new entry to the `conditions` array
3. Deploy — the new page auto-generates at `/conditions/[your-slug]`

### Update team photos
1. Add photo files to `public/team/` (e.g., `public/team/okezie.jpg`)
2. In `app/page.tsx`, replace the placeholder `<div>` in the team section with:
   ```tsx
   import Image from 'next/image'
   <Image src="/team/okezie.jpg" alt="Okezie Ofoegbu" fill style={{ objectFit: 'cover' }} />
   ```

### Update nav links
Edit `components/Nav.tsx`

### Update footer
Edit `components/Footer.tsx`

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy to Vercel

```bash
chmod +x deploy_v1.sh
./deploy_v1.sh
```

Or manually:
```bash
npm install
npm run build
vercel --prod
```

---

## After Deployment

1. **Add domain in Vercel Dashboard** → Settings → Domains → `vitalishealthcare.com`
2. **Update DNS at your registrar:**
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`
3. **Set up Google Search Console** → search.google.com/search-console
4. **Submit sitemap:** `https://www.vitalishealthcare.com/sitemap.xml`
5. **Keep WordPress live** until DNS propagates (up to 48 hours)

---

## Design System

All styles use CSS variables defined in `app/globals.css`:
- `--g` Primary green `#5a9e2f`
- `--g-lt` Light green `#eaf3de`
- `--g-dk` Dark green `#27500a`
- `--g-bd` Body green `#3b6d11`
- `--font-serif` Lora (Google Fonts)
- `--font-sans` DM Sans (Google Fonts)

No Tailwind. Inline `style` props + `globals.css` only.

---

*Built with Claude · Vitalis HealthCare Services, LLC · © 2026*
