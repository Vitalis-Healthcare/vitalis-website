import { getAllPosts } from '@/lib/blog'
import { blogCategories } from '@/lib/data/blog-posts'
import CategoryManager from './CategoryManager'

export const dynamic = 'force-dynamic'

export default async function CategorizePage() {
  const allPosts = await getAllPosts()

  const posts = allPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    category: p.category,
  }))

  return <CategoryManager posts={posts} categories={blogCategories as string[]} />
}
