-- ═══════════════════════════════════════════════════════════════
--  Vita Chat Widget — Database Schema
--  Run this in your new Supabase project's SQL Editor
--  Project: vitalis-website (standalone)
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Sessions ──────────────────────────────────────────────
-- One row per chat widget open. Tracks engagement metadata.
create table vita_sessions (
  id           uuid primary key default gen_random_uuid(),
  session_id   text unique not null,
  page_url     text,
  started_at   timestamptz default now(),
  last_msg_at  timestamptz default now(),
  msg_count    int default 0,
  lead_captured boolean default false,
  created_at   timestamptz default now()
);

create index idx_vita_sessions_started on vita_sessions(started_at desc);
create index idx_vita_sessions_lead on vita_sessions(lead_captured, started_at desc);

-- ── 2. Messages ──────────────────────────────────────────────
-- Full conversation transcript. Every user and assistant message.
create table vita_messages (
  id           uuid primary key default gen_random_uuid(),
  session_id   text not null references vita_sessions(session_id) on delete cascade,
  role         text not null check (role in ('user', 'assistant')),
  content      text not null,
  created_at   timestamptz default now()
);

create index idx_vita_messages_session on vita_messages(session_id, created_at);

-- ── 3. Leads ─────────────────────────────────────────────────
-- Contact info captured from the inline lead card.
create table vita_leads (
  id             uuid primary key default gen_random_uuid(),
  session_id     text references vita_sessions(session_id) on delete set null,
  name           text not null,
  phone          text not null,
  phone_cleaned  text,
  context        text,
  page_url       text,
  followed_up    boolean default false,
  followed_up_at timestamptz,
  followed_up_by text,
  notes          text,
  created_at     timestamptz default now()
);

create index idx_vita_leads_created on vita_leads(created_at desc);
create index idx_vita_leads_pending on vita_leads(followed_up, created_at desc);

-- ── 4. RLS — service-role only (no public access) ────────────
alter table vita_sessions enable row level security;
alter table vita_messages enable row level security;
alter table vita_leads enable row level security;

-- No RLS policies = no public access. All queries use service role key.

-- ═══════════════════════════════════════════════════════════════
--  Done. Add these env vars to Vercel:
--    NEXT_PUBLIC_SUPABASE_URL     → your project URL
--    SUPABASE_SERVICE_ROLE_KEY    → service role key (not anon)
-- ═══════════════════════════════════════════════════════════════
