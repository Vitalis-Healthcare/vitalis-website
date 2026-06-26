import { createServiceClient } from '@/lib/supabase'
import QueueViewer from './QueueViewer'

export const dynamic = 'force-dynamic'
export const metadata = { robots: { index: false, follow: false } }

export type QueueRow = {
  position: number
  week_number: number
  slot: number
  audience: string
  category: string
  topic_title: string
  status: string
  publish_date: string | null
  slug: string | null
  notes: string | null
}

export type StoredDraft = {
  position: number
  valid: boolean
  validation: { check: string; pass: boolean; detail: string }[]
  draft: {
    title: string
    slug: string
    excerpt: string
    category: string
    metaTitle: string
    metaDescription: string
    focusKeyword: string
    secondaryKeywords: string
    body: string
  }
}

export default async function QueuePage() {
  let rows: QueueRow[] = []
  let drafts: StoredDraft[] = []
  let loadError = ''

  try {
    const supabase = createServiceClient()

    const { data: qData, error: qErr } = await supabase
      .from('blog_queue')
      .select(
        'position, week_number, slot, audience, category, topic_title, status, publish_date, slug, notes'
      )
      .order('position', { ascending: true })

    if (qErr) {
      loadError = qErr.message
    } else {
      rows = (qData || []) as QueueRow[]
    }

    // Drafts are optional — if the table is absent or empty, the page still works.
    const { data: dData, error: dErr } = await supabase
      .from('blog_drafts')
      .select(
        'position, title, slug, excerpt, category, body, meta_title, meta_description, focus_keyword, secondary_keywords, validation, valid'
      )

    if (!dErr && Array.isArray(dData)) {
      drafts = dData.map((d: Record<string, unknown>) => ({
        position: Number(d.position),
        valid: !!d.valid,
        validation: Array.isArray(d.validation)
          ? (d.validation as { check: string; pass: boolean; detail: string }[])
          : [],
        draft: {
          title: String(d.title || ''),
          slug: String(d.slug || ''),
          excerpt: String(d.excerpt || ''),
          category: String(d.category || ''),
          metaTitle: String(d.meta_title || ''),
          metaDescription: String(d.meta_description || ''),
          focusKeyword: String(d.focus_keyword || ''),
          secondaryKeywords: String(d.secondary_keywords || ''),
          body: String(d.body || ''),
        },
      }))
    }
  } catch (e) {
    loadError = e instanceof Error ? e.message : 'Failed to load the queue.'
  }

  return <QueueViewer rows={rows} drafts={drafts} loadError={loadError} />
}
