import { NextRequest, NextResponse } from 'next/server'

const GITHUB_OWNER = 'Vitalis-Healthcare'
const GITHUB_REPO  = 'vitalis-website'
const GITHUB_BRANCH = 'main'

const VALID_CATEGORIES = [
  'Family Resources', 'Senior Health', 'Caregiver Tips',
  'Maryland Home Care', 'Company News',
  'Dementia & Memory Care', 'Post-Surgery & Recovery',
]

async function ghFetch(path: string, token: string) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return { content: Buffer.from(data.content, 'base64').toString('utf8'), sha: data.sha }
}

async function ghPut(path: string, content: string, sha: string, message: string, token: string) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: Buffer.from(content).toString('base64'), sha, branch: GITHUB_BRANCH }),
    }
  )
  return res.ok
}

export async function POST(req: NextRequest) {
  try {
    const { changes, pin } = await req.json()

    // ── Verify PIN ──────────────────────────────────────────────────────
    const correctPin = process.env.BLOG_ADMIN_PIN
    if (!correctPin || String(pin) !== String(correctPin)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!changes || typeof changes !== 'object' || Object.keys(changes).length === 0) {
      return NextResponse.json({ error: 'No changes provided' }, { status: 400 })
    }

    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return NextResponse.json({ error: 'GITHUB_TOKEN not configured' }, { status: 500 })
    }

    let mdUpdated = 0
    let tsUpdated = 0
    const errors: string[] = []

    // ── 1. Update markdown files in content/blog/ ───────────────────────
    for (const [slug, newCategory] of Object.entries(changes)) {
      if (!VALID_CATEGORIES.includes(newCategory as string)) continue

      const mdPath = `content/blog/${slug}.md`
      const file = await ghFetch(mdPath, token)

      if (file) {
        // Replace category in frontmatter
        const updated = file.content.replace(
          /^(category:\s*)"[^"]*"/m,
          `$1"${newCategory}"`
        )

        if (updated !== file.content) {
          const ok = await ghPut(mdPath, updated, file.sha, `blog: recategorize "${slug}" → ${newCategory}`, token)
          if (ok) mdUpdated++
          else errors.push(`Failed to update ${slug}.md`)
        }
      }
    }

    // ── 2. Update blog-posts.ts for legacy entries ──────────────────────
    const tsPath = 'lib/data/blog-posts.ts'
    const tsFile = await ghFetch(tsPath, token)

    if (tsFile) {
      let tsContent = tsFile.content
      let tsChanged = false

      for (const [slug, newCategory] of Object.entries(changes)) {
        if (!VALID_CATEGORIES.includes(newCategory as string)) continue

        const slugEscaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const pattern = new RegExp(
          `(slug:\\s*'${slugEscaped}'[\\s\\S]*?category:\\s*')([^']+)(')`
        )

        if (pattern.test(tsContent)) {
          tsContent = tsContent.replace(pattern, `$1${newCategory}$3`)
          tsChanged = true
          tsUpdated++
        }
      }

      if (tsChanged) {
        const ok = await ghPut(tsPath, tsContent, tsFile.sha, `blog: recategorize ${tsUpdated} post(s) in blog-posts.ts`, token)
        if (!ok) errors.push('Failed to update blog-posts.ts')
      }
    }

    // ── 3. Trigger deploy ───────────────────────────────────────────────
    const deployHook = process.env.VERCEL_DEPLOY_HOOK
    if (deployHook) {
      await fetch(deployHook, { method: 'POST' }).catch(() => {})
    }

    const total = mdUpdated + (tsUpdated > 0 ? 1 : 0)
    return NextResponse.json({
      ok: true,
      mdUpdated,
      tsUpdated,
      errors: errors.length > 0 ? errors : undefined,
    })

  } catch (err) {
    console.error('Category update error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
