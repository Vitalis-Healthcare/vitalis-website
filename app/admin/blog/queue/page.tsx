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

export default async function QueuePage() {
  let rows: QueueRow[] = []
  let loadError = ''

  try {
    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('blog_queue')
      .select(
        'position, week_number, slot, audience, category, topic_title, status, publish_date, slug, notes'
      )
      .order('position', { ascending: true })

    if (error) {
      loadError = error.message
    } else {
      rows = (data || []) as QueueRow[]
    }
  } catch (e) {
    loadError = e instanceof Error ? e.message : 'Failed to load the queue.'
  }

  return <QueueViewer rows={rows} loadError={loadError} />
}
