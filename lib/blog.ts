import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'content/blog')

export interface PostFrontmatter {
  title: string
  date: string
  dateFormatted: string
  excerpt: string
  category: string
  author?: string
  image?: string
}

export interface Post extends PostFrontmatter {
  slug: string
  contentHtml: string
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return []
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    dateFormatted: data.dateFormatted ?? data.date ?? '',
    excerpt: data.excerpt ?? '',
    category: data.category ?? 'General',
    author: data.author ?? 'Vitalis HealthCare',
    image: data.image ?? null,
    contentHtml: processed.toString(),
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(slugs.map(getPost))
  return (posts.filter(Boolean) as Post[]).sort((a, b) =>
    b.date.localeCompare(a.date)
  )
}
