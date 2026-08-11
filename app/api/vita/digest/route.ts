import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

/* ─────────────────────────────────────────────
   Vita chat digest — weekly, Monday morning.

   What families ask the chat widget before they decide, and where they give
   up. The leads already email on capture; the value here is the
   conversations that went nowhere, which are otherwise invisible unless
   somebody opens /admin/vita.

   IT SENDS EVERY MONDAY, INCLUDING WEEKS WITH NOTHING IN THEM. A silent
   cron and a quiet week look identical from an inbox, and the whole point
   of this route is watching whether traffic work moves the number. One line
   saying nothing happened is the proof the pipeline is alive.

   EXCHANGE COUNTS ARE COUNTED FROM vita_messages ROWS, NEVER READ FROM THE
   CACHED COUNT COLUMN ON vita_sessions. That column is wrong on 3 of the 4
   sessions that have messages, because the write that maintains it has
   never had its error checked. Counting the rows is the truth; the column
   is a cache that nobody validated.
   ───────────────────────────────────────────── */

const SITE_URL = process.env.SITE_URL || 'https://vitalishealthcare.com'
const DIGEST_FROM = process.env.VITA_DIGEST_FROM || 'Vitalis Vita <team@vitalishealthcare.com>'
const DIGEST_TO = process.env.VITA_DIGEST_TO || 'operations@vitalishealthcare.com'

/* Volumes are tiny today, but PostgREST silently caps an unbounded select at
   1,000 rows, so every read here is explicitly limited and the email says so
   if a limit was actually reached. A bigger number is the same bug with a
   later expiry date. */
const MAX_SESSIONS = 500
const MAX_MESSAGES = 5000

const TRAIL_UNTRUNCATED = 320

function esc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/* ── Eastern-time week boundaries ─────────────────────────────
   Maryland runs on EDT for part of the year and EST for the rest, so the
   offset is read from the date rather than assumed. */

function etFieldsOf(d: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour12: false,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    weekday: 'short',
  }).formatToParts(d)
  const pick = (t: string) => parts.find((p) => p.type === t)?.value || ''
  return {
    year: Number(pick('year')),
    month: Number(pick('month')),
    day: Number(pick('day')),
    hour: Number(pick('hour')) % 24,
    minute: Number(pick('minute')),
    second: Number(pick('second')),
    weekday: pick('weekday'), // Mon, Tue, ...
  }
}

function etOffsetMinutes(d: Date): number {
  const f = etFieldsOf(d)
  const asIfUTC = Date.UTC(f.year, f.month - 1, f.day, f.hour, f.minute, f.second)
  return (asIfUTC - d.getTime()) / 60000
}

/* An Eastern wall-clock time -> the UTC instant it refers to. Two passes, so
   a boundary that lands on a clock change still resolves. */
function etWallToUtc(y: number, m: number, d: number, h: number): Date {
  let guess = new Date(Date.UTC(y, m - 1, d, h, 0, 0))
  for (let i = 0; i < 2; i++) {
    const off = etOffsetMinutes(guess)
    guess = new Date(Date.UTC(y, m - 1, d, h, 0, 0) - off * 60000)
  }
  return guess
}

const DAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
}

/* The completed week: Monday 00:00 ET through the following Monday 00:00 ET,
   exclusive. Run on a Monday morning, that is the week just finished. */
function lastWeekWindow(now: Date) {
  const f = etFieldsOf(now)
  const dow = DAY_INDEX[f.weekday] ?? 1
  const daysSinceMonday = (dow + 6) % 7
  const thisMondayMs = Date.UTC(f.year, f.month - 1, f.day) - daysSinceMonday * 86400000
  const tm = new Date(thisMondayMs)
  const startMs = Date.UTC(tm.getUTCFullYear(), tm.getUTCMonth(), tm.getUTCDate()) - 7 * 86400000
  const sd = new Date(startMs)
  const start = etWallToUtc(sd.getUTCFullYear(), sd.getUTCMonth() + 1, sd.getUTCDate(), 0)
  const end = etWallToUtc(tm.getUTCFullYear(), tm.getUTCMonth() + 1, tm.getUTCDate(), 0)
  return { start, end }
}

function fmtET(iso: string | null): string {
  if (!iso) return 'unknown'
  return new Date(iso).toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
  }) + ' ET'
}

function fmtDayET(d: Date): string {
  return d.toLocaleDateString('en-US', {
    timeZone: 'America/New_York', month: 'short', day: 'numeric',
  })
}

function truncate(s: string, n: number): string {
  const t = s.replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, n).trim() + '\u2026'
}

/* ── types ─────────────────────────────────────────────────── */

type SessionRow = {
  session_id: string
  page_url: string | null
  started_at: string | null
  created_at: string | null
  lead_captured: boolean | null
}
type MessageRow = {
  session_id: string
  role: string
  content: string
  created_at: string
}
type LeadRow = { session_id: string | null; name: string | null; phone: string | null }

/* ── the digest ────────────────────────────────────────────── */

async function buildDigest(now: Date) {
  const sb = createServiceClient()
  const { start, end } = lastWeekWindow(now)
  const priorStart = new Date(start.getTime() - 7 * 86400000)
  const fourWeekStart = new Date(end.getTime() - 28 * 86400000)

  const { data: sData, error: sErr } = await sb
    .from('vita_sessions')
    .select('session_id, page_url, started_at, created_at, lead_captured')
    .gte('created_at', start.toISOString())
    .lt('created_at', end.toISOString())
    .order('created_at', { ascending: true })
    .limit(MAX_SESSIONS)
  if (sErr) throw new Error(`sessions read failed: ${sErr.message}`)
  const sessions: SessionRow[] = sData || []

  const ids = sessions.map((s) => s.session_id).filter(Boolean)

  let messages: MessageRow[] = []
  let messagesTruncated = false
  if (ids.length > 0) {
    const { data: mData, error: mErr } = await sb
      .from('vita_messages')
      .select('session_id, role, content, created_at')
      .in('session_id', ids)
      .order('created_at', { ascending: true })
      .limit(MAX_MESSAGES)
    if (mErr) throw new Error(`messages read failed: ${mErr.message}`)
    messages = mData || []
    messagesTruncated = messages.length >= MAX_MESSAGES
  }

  let leads: LeadRow[] = []
  if (ids.length > 0) {
    const { data: lData, error: lErr } = await sb
      .from('vita_leads')
      .select('session_id, name, phone')
      .in('session_id', ids)
      .limit(MAX_SESSIONS)
    if (lErr) throw new Error(`leads read failed: ${lErr.message}`)
    leads = lData || []
  }

  const priorCount = await countSessions(sb, priorStart, start)
  const fourWeekCount = await countSessions(sb, fourWeekStart, end)

  const byId: Record<string, MessageRow[]> = {}
  for (const m of messages) {
    if (!byId[m.session_id]) byId[m.session_id] = []
    byId[m.session_id].push(m)
  }
  const leadById: Record<string, LeadRow> = {}
  for (const l of leads) if (l.session_id) leadById[l.session_id] = l

  const blocks = sessions.map((s) => {
    const msgs = byId[s.session_id] || []
    const questions = msgs.filter((m) => m.role === 'user').map((m) => m.content)
    const replies = msgs.filter((m) => m.role === 'assistant')
    const captured = !!s.lead_captured
    return {
      session: s,
      questions,
      exchanges: replies.length,
      captured,
      lead: leadById[s.session_id],
      lastReply: !captured && replies.length > 0 ? replies[replies.length - 1].content : '',
      silent: msgs.length === 0,
    }
  })

  const total = blocks.length
  const withDetails = blocks.filter((b) => b.captured).length
  const askedAndLeft = blocks.filter((b) => !b.captured && b.questions.length > 0).length
  const silent = blocks.filter((b) => b.silent).length

  return {
    start, end, priorCount, fourWeekCount, blocks,
    total, withDetails, askedAndLeft, silent, messagesTruncated,
  }
}

async function countSessions(
  sb: ReturnType<typeof createServiceClient>,
  from: Date,
  to: Date,
): Promise<number> {
  const { count, error } = await sb
    .from('vita_sessions')
    .select('session_id', { count: 'exact', head: true })
    .gte('created_at', from.toISOString())
    .lt('created_at', to.toISOString())
  if (error) throw new Error(`count failed: ${error.message}`)
  return count ?? 0
}

type Digest = Awaited<ReturnType<typeof buildDigest>>

function renderHtml(d: Digest): string {
  const range = `${fmtDayET(d.start)} \u2013 ${fmtDayET(new Date(d.end.getTime() - 86400000))}`

  const delta =
    d.priorCount === d.total
      ? 'the same as the week before'
      : d.total > d.priorCount
        ? `up from ${d.priorCount} the week before`
        : `down from ${d.priorCount} the week before`

  const headline =
    d.total === 0
      ? `<p style="font-size:15px;color:#111827;margin:0 0 6px;line-height:1.55;">
           <strong>Nobody used the chat widget last week.</strong> The week before had ${d.priorCount}.
         </p>`
      : `<p style="font-size:15px;color:#111827;margin:0 0 6px;line-height:1.55;">
           <strong>${d.total} conversation${d.total === 1 ? '' : 's'}</strong> &mdash; ${delta}.
           ${d.withDetails} left contact details, ${d.askedAndLeft} asked and left without.
         </p>`

  const trend = `<p style="font-size:13px;color:#6b7280;margin:0 0 18px;">
      ${d.fourWeekCount} conversation${d.fourWeekCount === 1 ? '' : 's'} in the last four weeks.
    </p>`

  const silentNote = d.silent > 0
    ? `<p style="font-size:13px;color:#92400e;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;margin:0 0 18px;line-height:1.5;">
         ${d.silent} of these opened the widget and typed, but no message was recorded.
         That is a recording failure, not a quiet visitor &mdash; check the Vercel logs for this route's window.
       </p>`
    : ''

  const truncNote = d.messagesTruncated
    ? `<p style="font-size:13px;color:#92400e;margin:0 0 18px;">Message read hit its ${MAX_MESSAGES}-row limit; some conversations below may be incomplete.</p>`
    : ''

  const blocks = d.blocks.map((b) => {
    const when = fmtET(b.session.started_at || b.session.created_at)
    const page = b.session.page_url || '/'

    const badge = b.captured
      ? `<span style="display:inline-block;font-size:11px;font-weight:700;color:#14532d;background:#dcfce7;border-radius:999px;padding:3px 10px;">left details</span>`
      : `<span style="display:inline-block;font-size:11px;font-weight:700;color:#7c2d12;background:#ffedd5;border-radius:999px;padding:3px 10px;">no details</span>`

    const leadLine = b.captured && b.lead
      ? `<p style="font-size:13px;color:#111827;margin:8px 0 0;">${esc(b.lead.name || 'name not recorded')} &middot; ${esc(b.lead.phone || 'no phone')}</p>`
      : ''

    const qs = b.questions.length > 0
      ? `<ul style="margin:10px 0 0;padding-left:18px;">${b.questions
          .map((q) => `<li style="font-size:14px;color:#111827;line-height:1.5;margin-bottom:6px;">${esc(truncate(q, 400))}</li>`)
          .join('')}</ul>`
      : `<p style="font-size:14px;color:#9ca3af;margin:10px 0 0;font-style:italic;">No message was recorded for this session.</p>`

    const tail = b.lastReply
      ? `<p style="font-size:12px;color:#6b7280;margin:10px 0 0;line-height:1.5;border-left:3px solid #e5e7eb;padding-left:10px;">
           Vita's last answer before they left: ${esc(truncate(b.lastReply, TRAIL_UNTRUNCATED))}
         </p>`
      : ''

    return `
      <div style="border:1px solid #e5e7eb;border-radius:10px;padding:14px 16px;margin-bottom:12px;">
        <div style="font-size:12px;color:#6b7280;">${when} &middot; opened on <span style="color:#2D5A1B;">${esc(page)}</span> &middot; ${b.exchanges} repl${b.exchanges === 1 ? 'y' : 'ies'} &nbsp; ${badge}</div>
        ${qs}
        ${tail}
        ${leadLine}
      </div>`
  }).join('')

  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;max-width:620px;margin:0 auto;">
    <div style="background:#2D5A1B;padding:18px 22px;border-radius:10px 10px 0 0;">
      <span style="color:#ffffff;font-size:18px;font-weight:700;">What families asked Vita last week</span>
      <div style="color:#c0dd97;font-size:13px;margin-top:3px;">${range}</div>
    </div>
    <div style="border:1px solid #e5e7eb;border-top:none;border-radius:0 0 10px 10px;padding:20px 22px;">
      ${headline}
      ${trend}
      ${silentNote}
      ${truncNote}
      ${blocks}
      <p style="font-size:12px;color:#9ca3af;margin:18px 0 0;line-height:1.5;">
        Full transcripts: <a href="${SITE_URL}/admin/vita" style="color:#2D5A1B;">${SITE_URL}/admin/vita</a>.
        Leads are emailed separately the moment they are captured &mdash; this digest is for the
        conversations that went nowhere.
      </p>
    </div>
    <p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:14px;">
      Vitalis HealthCare Services &middot; Silver Spring, MD &middot; automated weekly digest
    </p>
  </div>`
}

/* Soft-fail send. Returns a status string; never throws. A non-2xx from
   Resend resolves the fetch, so res.ok is read. Same shape as the blog cron
   and the lead route. */
async function sendDigest(subject: string, html: string): Promise<string> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('Vita digest: no RESEND_API_KEY, nothing sent')
    return 'no RESEND_API_KEY'
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: DIGEST_FROM, to: [DIGEST_TO], subject, html }),
    })
    const txt = await res.text()
    if (!res.ok) {
      const msg = `error ${res.status} ${txt.slice(0, 180).replace(/\s+/g, ' ').trim()}`
      console.error('Vita digest rejected:', DIGEST_FROM, '->', DIGEST_TO, msg)
      return msg
    }
    return 'sent'
  } catch (e) {
    const msg = `threw ${(e instanceof Error ? e.message : 'error').slice(0, 120)}`
    console.error('Vita digest threw:', DIGEST_FROM, '->', DIGEST_TO, msg)
    return msg
  }
}

/* Vercel cron hits GET with the CRON_SECRET bearer.
   ?pin= is the manual escape hatch, checked only after the bearer, so the
   digest can be run and read on demand instead of waiting for a Monday.
   ?send=0 renders it without emailing anybody. */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const pin = process.env.VITA_ADMIN_PIN
  const auth = req.headers.get('authorization') || ''
  const givenPin = req.nextUrl.searchParams.get('pin') || ''

  const bearerOk = !!secret && auth === `Bearer ${secret}`
  const pinOk = !!pin && givenPin === pin
  const openCron = !secret

  if (!bearerOk && !pinOk && !openCron) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const digest = await buildDigest(new Date())
    const html = renderHtml(digest)
    const range = `${fmtDayET(digest.start)}-${fmtDayET(new Date(digest.end.getTime() - 86400000))}`
    const subject = digest.total === 0
      ? `Vita chat: no conversations last week (${range})`
      : `Vita chat: ${digest.total} conversation${digest.total === 1 ? '' : 's'} last week (${range})`

    const wantSend = req.nextUrl.searchParams.get('send') !== '0'
    const status = wantSend ? await sendDigest(subject, html) : 'not sent (send=0)'

    return NextResponse.json({
      ok: true,
      window: { start: digest.start.toISOString(), end: digest.end.toISOString() },
      conversations: digest.total,
      left_details: digest.withDetails,
      asked_and_left: digest.askedAndLeft,
      no_messages_recorded: digest.silent,
      prior_week: digest.priorCount,
      four_week_total: digest.fourWeekCount,
      email: status,
    })
  } catch (err) {
    console.error('Vita digest failed:', err)
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'digest failed' },
      { status: 500 },
    )
  }
}
