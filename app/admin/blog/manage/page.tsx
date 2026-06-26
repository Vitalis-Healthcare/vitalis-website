import { getAllPosts } from '@/lib/blog'
import { blogCategories } from '@/lib/data/blog-posts'
import BlogManager from './BlogManager'

export const dynamic = 'force-dynamic'

export default async function ManagePage() {
  const allPosts = await getAllPosts()

  const posts = allPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
    excerpt: p.excerpt || '',
  }))

  return <BlogManager posts={posts} categories={blogCategories as string[]} />
}
