import { NextRequest, NextResponse } from 'next/server'

const GITHUB_OWNER = 'Vitalis-Healthcare'
const GITHUB_REPO  = 'vitalis-website'
const GITHUB_BRANCH = 'main'

export async function POST(req: NextRequest) {
  try {
    const { slug, pin } = await req.json()

    // ── Verify PIN ──────────────────────────────────────────────────────
    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    }

    let mdDeleted = false
    let tsDeleted = false

    // ── 1. Delete markdown file from content/blog/ ──────────────────────
    const mdPath = `content/blog/${slug}.md`
    const mdRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${mdPath}?ref=${GITHUB_BRANCH}`,
      { headers }
    )

    if (mdRes.ok) {
      const mdData = await mdRes.json()
      const delRes = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${mdPath}`,
        {
          method: 'DELETE',
          headers,
          body: JSON.stringify({
            message: `blog: delete "${slug}"`,
            sha: mdData.sha,
            branch: GITHUB_BRANCH,
          }),
        }
      )
      mdDeleted = delRes.ok
    }

    // ── 2. Remove entry from blog-posts.ts (if it exists there) ─────────
    const tsPath = 'lib/data/blog-posts.ts'
    const tsRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${tsPath}?ref=${GITHUB_BRANCH}`,
      { headers }
    )

    if (tsRes.ok) {
      const tsData = await tsRes.json()
      const tsContent = Buffer.from(tsData.content, 'base64').toString('utf8')

      // Check if this slug exists in the file
      if (tsContent.includes(`slug: '${slug}'`)) {
        // Remove the entire post object for this slug
        // Handles both single-line { slug: '...', ... }, and multi-line format
        const slugEscaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

        // Multi-line format: {\n    slug: '...', \n    ...\n  },
        const multiLinePattern = new RegExp(
          `\\s*\\{\\s*\\n\\s*slug:\\s*'${slugEscaped}'[\\s\\S]*?\\},?`,
          'm'
        )

        // Single-line format: { slug: '...', ... },
        const singleLinePattern = new RegExp(
          `\\s*\\{[^}]*slug:\\s*'${slugEscaped}'[^}]*\\},?`,
          'm'
        )

        let updated = tsContent
        if (multiLinePattern.test(updated)) {
          updated = updated.replace(multiLinePattern, '')
        } else if (singleLinePattern.test(updated)) {
          updated = updated.replace(singleLinePattern, '')
        }

        if (updated !== tsContent) {
          const encoded = Buffer.from(updated).toString('base64')
          const putRes = await fetch(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${tsPath}`,
            {
              method: 'PUT',
              headers,
              body: JSON.stringify({
                message: `blog: remove "${slug}" from blog-posts.ts`,
                content: encoded,
                sha: tsData.sha,
                branch: GITHUB_BRANCH,
              }),
            }
          )
          tsDeleted = putRes.ok
        }
      }
    }

    if (!mdDeleted && !tsDeleted) {
      return NextResponse.json({ error: 'Post not found or could not be deleted' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, mdDeleted, tsDeleted })

  } catch (err) {
    console.error('Delete error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
