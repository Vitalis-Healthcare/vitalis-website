import { NextRequest, NextResponse } from 'next/server'

const GITHUB_OWNER = 'Vitalis-Healthcare'
const GITHUB_REPO  = 'vitalis-website'
const GITHUB_BRANCH = 'main'

export async function POST(req: NextRequest) {
  try {
    const { title, date, dateFormatted, excerpt, category, content, slug, pin } = await req.json()

    // ── 1. Verify PIN server-side ────────────────────────────────────────────
    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── 2. Validate required fields ──────────────────────────────────────────
    if (!title || !date || !dateFormatted || !excerpt || !category || !content || !slug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN environment variable is not set.' }, { status: 500 })
    }

    // ── 3. Build markdown file content ───────────────────────────────────────
    const safeTitle   = title.replace(/"/g, '\\"')
    const safeExcerpt = excerpt.replace(/"/g, '\\"')

    const markdown = `---
title: "${safeTitle}"
date: "${date}"
dateFormatted: "${dateFormatted}"
excerpt: "${safeExcerpt}"
category: "${category}"
author: "Vitalis HealthCare"
---

${content.trim()}
`

    const filePath = `content/blog/${slug}.md`
    const encoded  = Buffer.from(markdown).toString('base64')

    // ── 4. Check if file already exists (get SHA for update) ────────────────
    let existingSha: string | undefined
    const checkRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )
    if (checkRes.ok) {
      const checkData = await checkRes.json()
      existingSha = checkData.sha
    }

    // ── 5. Create or update file via GitHub API ──────────────────────────────
    const body: Record<string, string> = {
      message: `blog: add "${title}"`,
      content: encoded,
      branch:  GITHUB_BRANCH,
    }
    if (existingSha) body.sha = existingSha

    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )

    if (!ghRes.ok) {
      const ghErr = await ghRes.json().catch(() => ({}))
      console.error('GitHub API error:', ghErr)
      return NextResponse.json(
        { error: ghErr.message || 'GitHub API error — check your GITHUB_TOKEN permissions.' },
        { status: 500 }
      )
    }

    // ── 6. Trigger Vercel deploy hook (if configured) ────────────────────────
    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    if (deployHook) {
      await fetch(deployHook, { method: 'POST' }).catch(() => {
        // Non-fatal — GitHub push alone may trigger deploy via integration
        console.warn('Vercel deploy hook failed — relying on GitHub integration instead')
      })
    }

    return NextResponse.json({ ok: true, slug })

  } catch (err) {
    console.error('Blog create error:', err)
    return NextResponse.json({ error: 'Server error — please try again.' }, { status: 500 })
  }
}
