import { NextRequest, NextResponse } from 'next/server'

const GITHUB_OWNER = 'Vitalis-Healthcare'
const GITHUB_REPO  = 'vitalis-website'
const GITHUB_BRANCH = 'main'
const FILE_PATH = 'lib/data/blog-posts.ts'

export async function POST(req: NextRequest) {
  try {
    const { changes, pin } = await req.json()

    // ── 1. Verify PIN ──────────────────────────────────────────────────
    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── 2. Validate ────────────────────────────────────────────────────
    if (!changes || typeof changes !== 'object' || Object.keys(changes).length === 0) {
      return NextResponse.json({ error: 'No changes provided' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    // ── 3. Fetch current file from GitHub ──────────────────────────────
    const fileRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!fileRes.ok) {
      return NextResponse.json({ error: 'Could not fetch blog-posts.ts from GitHub' }, { status: 500 })
    }

    const fileData = await fileRes.json()
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf8')
    const fileSha = fileData.sha

    // ── 4. Apply category changes ──────────────────────────────────────
    let updatedContent = currentContent
    const validCategories = [
      'Family Resources', 'Senior Health', 'Caregiver Tips',
      'Maryland Home Care', 'Company News',
      'Dementia & Memory Care', 'Post-Surgery & Recovery',
    ]

    let appliedCount = 0
    for (const [slug, newCategory] of Object.entries(changes)) {
      if (!validCategories.includes(newCategory as string)) continue

      // Find the slug's post block and update its category
      // Pattern: slug: 'THE_SLUG' ... category: 'OLD_CATEGORY'
      const slugEscaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const pattern = new RegExp(
        `(slug:\\s*'${slugEscaped}'[\\s\\S]*?category:\\s*')([^']+)(')`
      )

      if (pattern.test(updatedContent)) {
        updatedContent = updatedContent.replace(pattern, `$1${newCategory}$3`)
        appliedCount++
      }
    }

    if (appliedCount === 0) {
      return NextResponse.json({ error: 'No matching posts found to update' }, { status: 400 })
    }

    // ── 5. Push updated file to GitHub ─────────────────────────────────
    const encoded = Buffer.from(updatedContent).toString('base64')

    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `blog: recategorize ${appliedCount} post${appliedCount > 1 ? 's' : ''}`,
          content: encoded,
          sha: fileSha,
          branch: GITHUB_BRANCH,
        }),
      }
    )

    if (!ghRes.ok) {
      const ghErr = await ghRes.json().catch(() => ({}))
      console.error('GitHub API error:', ghErr)
      return NextResponse.json(
        { error: ghErr.message || 'GitHub API error' },
        { status: 500 }
      )
    }

    // ── 6. Trigger deploy ──────────────────────────────────────────────
    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    if (deployHook) {
      await fetch(deployHook, { method: 'POST' }).catch(() => {
        console.warn('Deploy hook failed — relying on GitHub integration')
      })
    }

    return NextResponse.json({ ok: true, appliedCount })

  } catch (err) {
    console.error('Category update error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
