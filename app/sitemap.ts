import { MetadataRoute } from 'next'
import { locations } from '@/lib/data/locations'
import { conditions } from '@/lib/data/conditions'
import { services } from '@/lib/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.vitalishealthcare.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/careers`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
    url: `${base}/home-care/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const conditionRoutes: MetadataRoute.Sitemap = conditions.map((c) => ({
    url: `${base}/conditions/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...conditionRoutes]
}
