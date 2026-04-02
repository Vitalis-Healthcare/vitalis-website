import type { Metadata } from 'next'
import BlogWriter from './BlogWriter'

export const metadata: Metadata = {
  title: 'Blog Admin — Vitalis HealthCare',
  robots: 'noindex, nofollow',
}

export default function BlogAdminPage() {
  return <BlogWriter />
}
