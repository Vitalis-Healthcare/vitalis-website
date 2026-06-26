-- ============================================================================
-- Vitalis Website  ·  migration 003_blog_drafts
-- Staging table for generated articles, before the veto window / publish.
-- Run in the STANDALONE vitalis-website Supabase project. Statements in order.
-- ============================================================================

-- ── Statement 1: drafts table ───────────────────────────────────────────────
create table if not exists blog_drafts (
  id                 bigint generated always as identity primary key,
  position           integer not null references blog_queue(position) on delete cascade,
  title              text not null,
  slug               text not null,
  excerpt            text,
  category           text not null,
  body               text not null,
  meta_title         text,
  meta_description   text,
  focus_keyword      text,
  secondary_keywords text,
  validation         jsonb,
  valid              boolean not null default false,
  model              text,
  status             text not null default 'draft'
                       check (status in ('draft','approved','held','published')),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now(),
  unique (position)
);

-- ── Statement 2: lock to the service role (no public access) ────────────────
alter table blog_drafts enable row level security;

-- ── Statement 3: reload PostgREST schema cache ──────────────────────────────
notify pgrst, 'reload schema';
