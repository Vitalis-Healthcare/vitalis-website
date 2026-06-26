import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 300
export const dynamic = 'force-dynamic'

const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'

// Pinned, swappable generation model. Defaults to the current Sonnet
// (claude-sonnet-4-6). Override with BLOG_GEN_MODEL in Vercel to upgrade (e.g.
// claude-opus-4-8) without a code change. NOTE: claude-sonnet-4-20250514 was
// retired 2026-04-20 — do not use it. (Pitfall: model strings age silently.)
const MODEL = process.env.BLOG_GEN_MODEL || 'claude-sonnet-4-6'
const USE_WEBSEARCH = (process.env.BLOG_GEN_WEBSEARCH || '1') === '1'

const CATEGORIES = [
  'Family Resources',
  'Senior Health',
  'Caregiver Tips',
  'Maryland Home Care',
  'Dementia & Memory Care',
  'Post-Surgery & Recovery',
  'Company News',
]

// Real, existing URLs the article may link to (no hallucinated slugs).
const SERVICE_URLS = [
  '/services/companion-care',
  '/services/personal-care',
  '/services/skilled-nursing',
]
const CONDITION_URLS = [
  '/conditions/dementia',
  '/conditions/post-surgery',
  '/conditions/stroke',
  '/conditions/fall-prevention',
]
const LOCATION_URLS = [
  '/home-care/silver-spring',
  '/home-care/rockville',
  '/home-care/gaithersburg',
  '/home-care/germantown',
  '/home-care/takoma-park',
  '/home-care/annapolis',
]
const EVERGREEN_BLOG_SLUGS = [
  'how-to-prevent-falls-in-your-home',
  'benefits-of-companion-care-for-the-elderly',
  'how-home-care-supports-recovery-after-surgery-or-hospitalization',
  'how-home-care-can-improve-quality-of-life-for-seniors-with-dementia',
  'a-guide-to-medicaid-and-medicare-coverage-for-home-care-in-maryland',
  'signs-its-time-to-hire-a-caregiver',
  'how-to-avoid-caregiver-burnout',
  'benefits-of-hiring-a-caregiver-from-a-home-care-agency',
]

const CTA_BLOCK =
  '**Call us at [240.716.6874](tel:2407166874) or [request a free consultation online](https://getcare.vitalishealthcare.com).**'

const TRUST_FOOTER =
  '*Vitalis HealthCare is a family-owned, Maryland-licensed home care agency based in Silver Spring, MD. We are licensed by the Maryland Department of Health Office of Health Care Quality (OHCQ License #3879R), CareScout Approved, and a 3× Best of Home Care Employer of Choice recipient. We serve Silver Spring, Rockville, Gaithersburg, Germantown, Takoma Park, Towson, Pikesville, Owings Mills, Annapolis, and surrounding communities.*'

// ── slug helper ─────────────────────────────────────────────────────────────
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’"]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// ── prompts ─────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the staff writer for Vitalis HealthCare, a family-owned, Maryland-licensed home care agency in Silver Spring, MD. You write SEO blog articles for vitalishealthcare.com.

VOICE: Warm, direct, family-first. No jargon, no clinical coldness. Written for real families and caregivers navigating hard decisions. Use "you" and "your loved one" naturally. Avoid salesy language.

ABSOLUTE COMPLIANCE RULES (never break):
- Maryland-licensed ONLY. Never reference Virginia anywhere.
- You may say "operated to Joint Commission standards." NEVER claim Joint Commission certification or that the agency is "certified."
- Only state statistics you are confident are real; attribute them generally (e.g., "the CDC reports", "research shows"). Never invent precise figures.

SEO RULES:
- The article body is 1,200–1,800 words of markdown.
- Use ## for main sections and ### for subsections. Bold key phrases with **bold**. Use - bullet lists.
- The focus keyword must appear as an exact continuous phrase in: the post title, the meta title, the meta description, the first 100 words of the body, and elsewhere in the body.
- Meta title ≤ 60 characters and contains the exact focus keyword.
- Meta description ≤ 160 characters and contains the exact focus keyword.
- Weave in local signals naturally: Silver Spring, Rockville, Gaithersburg, Germantown, Takoma Park, Montgomery County, Maryland.
- End the body with, in this order: (1) a "## Related Articles" section with 2–3 markdown links chosen ONLY from the provided blog URL list, (2) a "## Related Services" section with 2–3 links chosen ONLY from the provided service/condition/location URL list, (3) the exact CTA line provided, then (4) the exact trust footer provided. Reproduce the CTA and footer character-for-character.

OUTPUT: Return ONLY a single minified-or-pretty JSON object and nothing else — no markdown fences, no commentary. Schema:
{
  "postTitle": string,
  "excerpt": string,            // one sentence for the blog index
  "metaTitle": string,          // <=60 chars, includes focus keyword
  "metaDescription": string,    // <=160 chars, includes focus keyword
  "focusKeyword": string,       // 2-4 words
  "secondaryKeywords": string,  // comma-separated
  "body": string                // full markdown article
}`

function buildUserPrompt(row: {
  topic_title: string
  category: string
  audience: string
  notes: string | null
}) {
  const audienceLabel =
    row.audience === 'planners'
      ? 'discharge planners and social workers (a professional referral audience)'
      : row.audience === 'caregivers'
      ? 'professional and family caregivers'
      : 'prospective clients and their families'

  return `Write the next article.

TOPIC: ${row.topic_title}
CATEGORY (use exactly this, do not change): ${row.category}
PRIMARY AUDIENCE: ${audienceLabel}
${row.notes ? `EDITORIAL NOTE (follow this): ${row.notes}` : ''}

Choose a focus keyword (2–4 words) that a Maryland family or professional would actually search for this topic.

Blog URLs you may use for "Related Articles" (use the full path, e.g. /blog/<slug>):
${EVERGREEN_BLOG_SLUGS.map((s) => `/blog/${s}`).join('\n')}

Service/condition/location URLs you may use for "Related Services":
${[...SERVICE_URLS, ...CONDITION_URLS, ...LOCATION_URLS].join('\n')}

Use this exact CTA line (verbatim) as item 3 of the ending:
${CTA_BLOCK}

Use this exact trust footer (verbatim) as item 4 of the ending:
${TRUST_FOOTER}

Return ONLY the JSON object described in your instructions.`
}

// ── Anthropic call ──────────────────────────────────────────────────────────
type Draft = {
  postTitle: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeywords: string
  body: string
}

async function generate(
  apiKey: string,
  row: { topic_title: string; category: string; audience: string; notes: string | null },
  withSearch: boolean
): Promise<Draft> {
  const body: Record<string, unknown> = {
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(row) }],
  }
  if (withSearch) {
    body.tools = [{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 }]
  }

  const res = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Anthropic API ${res.status}: ${errText.slice(0, 400)}`)
  }

  const data = await res.json()
  const blocks: Array<{ type: string; text?: string }> = Array.isArray(data.content)
    ? data.content
    : []
  const text = blocks
    .filter((b) => b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text as string)
    .join('\n')
    .trim()

  // Extract the JSON object (model may add stray characters around it).
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in model output.')
  }
  const json = text.slice(start, end + 1)
  const parsed = JSON.parse(json) as Draft
  return parsed
}

// ── validator ───────────────────────────────────────────────────────────────
type Check = { check: string; pass: boolean; detail: string }

function validate(d: Draft, category: string): { checks: Check[]; valid: boolean } {
  const checks: Check[] = []
  const body = d.body || ''
  const fk = (d.focusKeyword || '').trim().toLowerCase()
  const firstWords = body.split(/\s+/).slice(0, 100).join(' ').toLowerCase()

  const add = (check: string, pass: boolean, detail: string) =>
    checks.push({ check, pass, detail })

  add('Meta title ≤ 60 chars', (d.metaTitle || '').length <= 60, `${(d.metaTitle || '').length} chars`)
  add(
    'Meta description ≤ 160 chars',
    (d.metaDescription || '').length <= 160,
    `${(d.metaDescription || '').length} chars`
  )
  add('Focus keyword present', fk.length > 0, fk || 'missing')
  add('Focus keyword in title', !!fk && (d.postTitle || '').toLowerCase().includes(fk), '')
  add('Focus keyword in meta title', !!fk && (d.metaTitle || '').toLowerCase().includes(fk), '')
  add('Focus keyword in meta description', !!fk && (d.metaDescription || '').toLowerCase().includes(fk), '')
  add('Focus keyword in first 100 words', !!fk && firstWords.includes(fk), '')
  add('Category is valid', CATEGORIES.includes(category), category)

  const words = body.split(/\s+/).filter(Boolean).length
  add('Word count ≥ 800', words >= 800, `${words} words`)
  add('Word count ≥ 1200 (ideal)', words >= 1200, `${words} words`)

  add('CTA present', body.includes('getcare.vitalishealthcare.com'), '')
  add('Trust footer present', body.includes('#3879R'), '')

  // Compliance red lines (must all be ABSENT)
  const haystack = `${d.postTitle} ${d.metaTitle} ${d.metaDescription} ${body}`
  const jcCert = /joint commission[\s-]?certified|certified by the joint commission/i.test(haystack)
  const virginia = /\bvirginia\b/i.test(haystack)
  add('No Joint Commission certification claim', !jcCert, jcCert ? 'FOUND — must rewrite' : 'clear')
  add('No Virginia reference', !virginia, virginia ? 'FOUND — must rewrite' : 'clear')

  const valid = checks.every((c) => c.pass)
  return { checks, valid }
}

// ── handler ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { pin, position } = await req.json()

    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set.' }, { status: 500 })
    }

    const supabase = createServiceClient()

    // Pick the target row: explicit position, else the next pending in order.
    let targetPos: number | null = null
    if (typeof position === 'number') {
      targetPos = position
    } else {
      const { data: nextRow, error: nextErr } = await supabase
        .from('blog_queue')
        .select('position')
        .eq('status', 'pending')
        .order('position', { ascending: true })
        .limit(1)
        .maybeSingle()
      if (nextErr) return NextResponse.json({ error: nextErr.message }, { status: 500 })
      if (!nextRow) return NextResponse.json({ error: 'No pending topics left in the queue.' }, { status: 400 })
      targetPos = nextRow.position
    }

    const { data: row, error: rowErr } = await supabase
      .from('blog_queue')
      .select('position, topic_title, category, audience, notes, status')
      .eq('position', targetPos)
      .maybeSingle()
    if (rowErr) return NextResponse.json({ error: rowErr.message }, { status: 500 })
    if (!row) return NextResponse.json({ error: `No queue row at position ${targetPos}.` }, { status: 404 })

    // Mark generating
    await supabase
      .from('blog_queue')
      .update({ status: 'generating', error: null, updated_at: new Date().toISOString() })
      .eq('position', targetPos)

    // Generate (with web search, falling back to no-tools on tool/model errors)
    let draft: Draft
    try {
      draft = await generate(apiKey, row, USE_WEBSEARCH)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'generation failed'
      if (USE_WEBSEARCH && /web_search|tool|model|400/i.test(msg)) {
        draft = await generate(apiKey, row, false)
      } else {
        throw e
      }
    }

    const slug = slugify(draft.postTitle)
    const { checks, valid } = validate(draft, row.category)

    // Upsert the staged draft
    const { error: upErr } = await supabase.from('blog_drafts').upsert(
      {
        position: targetPos,
        title: draft.postTitle,
        slug,
        excerpt: draft.excerpt,
        category: row.category,
        body: draft.body,
        meta_title: draft.metaTitle,
        meta_description: draft.metaDescription,
        focus_keyword: draft.focusKeyword,
        secondary_keywords: draft.secondaryKeywords,
        validation: checks,
        valid,
        model: MODEL,
        status: 'draft',
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'position' }
    )
    if (upErr) {
      await supabase
        .from('blog_queue')
        .update({ status: 'failed', error: upErr.message })
        .eq('position', targetPos)
      return NextResponse.json({ error: upErr.message }, { status: 500 })
    }

    // Move the queue row to review
    await supabase
      .from('blog_queue')
      .update({ status: 'review', slug, error: null, updated_at: new Date().toISOString() })
      .eq('position', targetPos)

    return NextResponse.json({
      ok: true,
      position: targetPos,
      valid,
      draft: {
        title: draft.postTitle,
        slug,
        excerpt: draft.excerpt,
        category: row.category,
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        focusKeyword: draft.focusKeyword,
        secondaryKeywords: draft.secondaryKeywords,
        body: draft.body,
      },
      validation: checks,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
