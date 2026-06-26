import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const GITHUB_OWNER = 'Vitalis-Healthcare'
const GITHUB_REPO = 'vitalis-website'
const GITHUB_BRANCH = 'main'

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github.v3+json',
  }
}

async function fileExists(token: string, path: string): Promise<boolean> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
    { headers: ghHeaders(token) }
  )
  return res.ok
}

// Ensure the slug doesn't collide with an existing post (never overwrite).
async function uniqueSlug(token: string, base: string): Promise<string> {
  let slug = base
  let n = 2
  while (await fileExists(token, `content/blog/${slug}.md`)) {
    slug = `${base}-${n}`
    n += 1
    if (n > 25) break
  }
  return slug
}

export async function POST(req: NextRequest) {
  try {
    const { pin, position } = await req.json()

    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (typeof position !== 'number') {
      return NextResponse.json({ error: 'A position is required.' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is not set.' }, { status: 500 })
    }

    const supabase = createServiceClient()

    // Queue row must be in review.
    const { data: qrow, error: qErr } = await supabase
      .from('blog_queue')
      .select('position, status, publish_date')
      .eq('position', position)
      .maybeSingle()
    if (qErr) return NextResponse.json({ error: qErr.message }, { status: 500 })
    if (!qrow) return NextResponse.json({ error: `No queue row at position ${position}.` }, { status: 404 })
    if (qrow.status !== 'review') {
      return NextResponse.json(
        { error: `Position ${position} is "${qrow.status}", not "review". Generate a draft first.` },
        { status: 400 }
      )
    }

    // Load the staged draft.
    const { data: draft, error: dErr } = await supabase
      .from('blog_drafts')
      .select('title, slug, excerpt, category, body, meta_title, meta_description, focus_keyword, secondary_keywords, valid')
      .eq('position', position)
      .maybeSingle()
    if (dErr) return NextResponse.json({ error: dErr.message }, { status: 500 })
    if (!draft) return NextResponse.json({ error: 'No staged draft found for this position.' }, { status: 404 })

    // Safety: never publish a draft that failed validation.
    if (!draft.valid) {
      return NextResponse.json(
        { error: 'This draft has failed validation checks. Regenerate it before publishing.' },
        { status: 400 }
      )
    }

    // Date fields: use the scheduled publish date if set, else today.
    const when = qrow.publish_date ? new Date(`${qrow.publish_date}T12:00:00Z`) : new Date()
    const date = when.toISOString().slice(0, 10)
    const dateFormatted = when.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    })

    // Guarantee a non-colliding slug.
    const baseSlug = (draft.slug || 'untitled').toString()
    const finalSlug = await uniqueSlug(token, baseSlug)

    // Build the markdown file (same frontmatter contract as /api/blog/create).
    const esc = (s: string) => (s || '').replace(/"/g, '\\"')
    const markdown = `---
title: "${esc(draft.title)}"
date: "${date}"
dateFormatted: "${dateFormatted}"
excerpt: "${esc(draft.excerpt)}"
category: "${esc(draft.category)}"
author: "Vitalis HealthCare"
metaTitle: "${esc(draft.meta_title)}"
metaDescription: "${esc(draft.meta_description)}"
focusKeyword: "${esc(draft.focus_keyword)}"
secondaryKeywords: "${esc(draft.secondary_keywords)}"
---

${(draft.body || '').trim()}
`

    const filePath = `content/blog/${finalSlug}.md`
    const encoded = Buffer.from(markdown).toString('base64')

    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: { ...ghHeaders(token), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `blog: publish "${draft.title}"`,
          content: encoded,
          branch: GITHUB_BRANCH,
        }),
      }
    )
    if (!ghRes.ok) {
      const ghErr = await ghRes.json().catch(() => ({}))
      return NextResponse.json(
        { error: ghErr.message || 'GitHub API error — check GITHUB_TOKEN permissions.' },
        { status: 500 }
      )
    }

    // Optional: nudge a Vercel deploy if a hook is configured.
    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    if (deployHook) {
      try {
        await fetch(deployHook, { method: 'POST' })
      } catch {
        // Non-fatal — the GitHub push should trigger a deploy on its own.
      }
    }

    // Mark published.
    const nowIso = new Date().toISOString()
    await supabase
      .from('blog_drafts')
      .update({ status: 'published', slug: finalSlug, updated_at: nowIso })
      .eq('position', position)
    await supabase
      .from('blog_queue')
      .update({ status: 'published', slug: finalSlug, publish_date: date, error: null, updated_at: nowIso })
      .eq('position', position)

    return NextResponse.json({
      ok: true,
      position,
      slug: finalSlug,
      url: `https://vitalishealthcare.com/blog/${finalSlug}`,
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
