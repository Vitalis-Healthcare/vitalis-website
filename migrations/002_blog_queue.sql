-- ============================================================================
-- Vitalis Website  ·  migration 002_blog_queue
-- Creates the blog automation queue and seeds the de-duplicated 60-topic plan.
-- Run in the STANDALONE vitalis-website Supabase project (NOT CareMatch360,
-- NOT the internal workspace). Run each statement below in order.
-- ============================================================================

-- ── Statement 1: table ──────────────────────────────────────────────────────
create table if not exists blog_queue (
  id           bigint generated always as identity primary key,
  position     integer not null unique,
  week_number  integer not null,
  slot         integer not null,
  audience     text    not null check (audience in ('clients','caregivers','planners')),
  category     text    not null,
  topic_title  text    not null,
  status       text    not null default 'pending'
                 check (status in ('pending','generating','review','published','skipped','failed')),
  publish_date date,
  slug         text,
  notes        text,
  error        text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Statement 2: lock to the service role (no public access) ────────────────
alter table blog_queue enable row level security;

-- ── Statement 3: seed the 60 topics in publish order ────────────────────────
insert into blog_queue (position, week_number, slot, audience, category, topic_title, notes) values
  (1, 1, 1, 'clients', 'Maryland Home Care', 'Understanding the Cost of Home Care in Maryland: What Are Your Options?', NULL),
  (2, 1, 2, 'caregivers', 'Caregiver Tips', 'The Importance of Ongoing Training in the Home Care Industry', NULL),
  (3, 2, 1, 'planners', 'Post-Surgery & Recovery', 'How Home Care Can Reduce Hospital Readmissions', 'Recovery cluster: lead with the readmissions/cost angle; keep distinct from the post-acute and follow-up pieces.'),
  (4, 2, 2, 'clients', 'Family Resources', 'What to Expect During Your First Week with a Home Care Provider', NULL),
  (5, 3, 1, 'caregivers', 'Caregiver Tips', 'Effective Communication Tips for Caregivers Working with Seniors', NULL),
  (6, 3, 2, 'planners', 'Maryland Home Care', 'Streamlining Discharge Planning: Collaborating with Home Care Agencies', NULL),
  (7, 4, 1, 'clients', 'Family Resources', 'Comparing Assisted Living and Home Care: Which Option Is Right for You?', NULL),
  (8, 4, 2, 'caregivers', 'Caregiver Tips', 'Understanding Cultural Sensitivity in Home Care Services', NULL),
  (9, 5, 1, 'planners', 'Family Resources', 'The Role of Social Workers in Ensuring Seniors Receive Quality Home Care', NULL),
  (10, 5, 2, 'clients', 'Family Resources', 'Questions to Ask When Interviewing a Home Care Agency', NULL),
  (11, 6, 1, 'caregivers', 'Caregiver Tips', 'Why Empathy Is Key in Home Care: Stories from Maryland Caregivers', NULL),
  (12, 6, 2, 'planners', 'Post-Surgery & Recovery', 'When Discharge to Home Is the Best Option: Coordinating Care Services', NULL),
  (13, 7, 1, 'clients', 'Family Resources', 'Personalized Care Plans: Why Customization Matters', NULL),
  (14, 7, 2, 'caregivers', 'Caregiver Tips', 'How to Build Trust with Clients and Their Families', NULL),
  (15, 8, 1, 'planners', 'Post-Surgery & Recovery', 'Post-Acute Care Planning: Why Home Care Matters in Recovery', 'Recovery cluster: planning lens for discharge teams; distinct from the readmissions and follow-up pieces.'),
  (16, 8, 2, 'clients', 'Family Resources', '5 Myths About Home Care Services You Need to Stop Believing', NULL),
  (17, 9, 1, 'caregivers', 'Caregiver Tips', 'Time Management Tips for Professional Caregivers', NULL),
  (18, 9, 2, 'planners', 'Maryland Home Care', 'Resources for Social Workers: Helping Clients Access Maryland Home Care Services', NULL),
  (19, 10, 1, 'clients', 'Family Resources', 'How to Recognize When Your Loved One Needs 24/7 Care', NULL),
  (20, 10, 2, 'caregivers', 'Caregiver Tips', 'Recognizing and Reporting Health Changes in Your Clients', NULL),
  (21, 11, 1, 'planners', 'Maryland Home Care', 'Creating a Continuum of Care: How Home Care Fits into the Bigger Picture', 'Coordination cluster: the ''big picture'' framing; keep distinct from team-approach and complex-needs pieces.'),
  (22, 11, 2, 'clients', 'Family Resources', 'Transportation and Mobility Assistance Through Home Care Services', NULL),
  (23, 12, 1, 'caregivers', 'Senior Health', 'Nutrition Tips for Caregivers Supporting Senior Clients', NULL),
  (24, 12, 2, 'planners', 'Maryland Home Care', 'Partnering with Home Care Agencies: Building Strong Referral Relationships', NULL),
  (25, 13, 1, 'clients', 'Senior Health', 'How Home Care Supports Independent Living for Seniors', NULL),
  (26, 13, 2, 'caregivers', 'Dementia & Memory Care', 'Caring for Clients with Alzheimer''s: Practical Strategies', 'Practical day-to-day caregiver strategies (routine, communication, sundowning, wandering); differentiate from the existing ''Providing Home Care to a Patient with Early Onset of Dementia'' post.'),
  (27, 14, 1, 'planners', 'Senior Health', 'Addressing Social Isolation Through Home Care Services', NULL),
  (28, 14, 2, 'clients', 'Family Resources', 'Home Care and Hospice: Understanding the Differences and Benefits', NULL),
  (29, 15, 1, 'caregivers', 'Caregiver Tips', 'How to Stay Motivated as a Home Care Professional', NULL),
  (30, 15, 2, 'planners', 'Senior Health', 'Home Care for Patients with Chronic Conditions: A Team Approach', NULL),
  (31, 16, 1, 'clients', 'Maryland Home Care', 'Why Maryland Is One of the Best States for Home Care Services', NULL),
  (32, 16, 2, 'caregivers', 'Caregiver Tips', 'Navigating Emotional Challenges as a Family Caregiver', NULL),
  (33, 17, 1, 'planners', 'Post-Surgery & Recovery', 'The Importance of Follow-Up Care After Hospital Discharge', 'Recovery cluster: the post-discharge follow-up angle specifically.'),
  (34, 17, 2, 'clients', 'Maryland Home Care', 'Veterans Aid & Attendance: Using VA Benefits to Pay for Home Care in Maryland', 'Replacement topic.'),
  (35, 18, 1, 'caregivers', 'Caregiver Tips', 'How Caregivers Can Support Clients with Chronic Pain Management', NULL),
  (36, 18, 2, 'planners', 'Maryland Home Care', 'How Discharge Planners Can Identify Clients Who Need Home Care', NULL),
  (37, 19, 1, 'clients', 'Maryland Home Care', 'How the Maryland Medicaid Waiver Works for In-Home Care', 'Replacement. Write narrowly on CFC / Community Options waiver programs and Supports Planners; do NOT overlap the existing general ''How Can One Pay for Home Health Care in Maryland'' post.'),
  (38, 19, 2, 'caregivers', 'Caregiver Tips', 'The Role of Professional Boundaries in Home Care', 'Focus narrowly on boundaries (gifts, dual relationships, over-attachment); not general ethics, already covered by existing posts.'),
  (39, 20, 1, 'planners', 'Maryland Home Care', 'Coordinating Care for Seniors with Complex Medical Needs', 'Coordination cluster: complex-needs lens.'),
  (40, 20, 2, 'clients', 'Family Resources', 'What Does a Home Care Aide Actually Do? A Day in the Life', 'Replacement topic.'),
  (41, 21, 1, 'caregivers', 'Caregiver Tips', 'Documentation and Charting Best Practices for Home Care Aides', 'Replacement topic.'),
  (42, 21, 2, 'planners', 'Maryland Home Care', 'Improving Client Outcomes Through Collaboration with Home Care Providers', NULL),
  (43, 22, 1, 'clients', 'Family Resources', 'Hourly vs. Live-In vs. 24-Hour Home Care: Choosing the Right Level', 'Replacement. Option comparison; distinct from the ''needs 24/7 care'' detection piece.'),
  (44, 22, 2, 'caregivers', 'Caregiver Tips', 'How to Handle Difficult Family Members as a Professional Caregiver', 'Replacement topic.'),
  (45, 23, 1, 'planners', 'Maryland Home Care', 'How to Address Barriers to Home Care Access in Maryland', NULL),
  (46, 23, 2, 'clients', 'Maryland Home Care', 'Long-Term Care Insurance and Home Care: What Maryland Families Should Know', 'Replacement topic.'),
  (47, 24, 1, 'caregivers', 'Caregiver Tips', 'Safe Transfers and Lifting: Body Mechanics That Prevent Injury', 'Replacement topic.'),
  (48, 24, 2, 'planners', 'Maryland Home Care', 'Legal and Ethical Considerations When Referring Patients to Home Care', NULL),
  (49, 25, 1, 'clients', 'Family Resources', 'Respite Care Explained: Short-Term Relief for Family Caregivers in Maryland', 'Replacement topic.'),
  (50, 25, 2, 'caregivers', 'Caregiver Tips', 'Medication Reminders and Safety: What Caregivers Can and Can''t Do', 'Replacement. Scope-of-practice angle for an RSA agency; reminders vs. administration.'),
  (51, 26, 1, 'planners', 'Maryland Home Care', 'How Home Care Agencies Ensure Compliance with Health Standards', 'Use approved phrasing ''operated to Joint Commission standards''; never claim certification.'),
  (52, 26, 2, 'clients', 'Family Resources', 'How Home Care Helps Seniors Avoid Premature Nursing Home Placement', 'Replacement topic.'),
  (53, 27, 1, 'caregivers', 'Caregiver Tips', 'Caring for Clients with Hearing and Vision Loss', 'Replacement topic.'),
  (54, 27, 2, 'planners', 'Family Resources', 'Using Home Care Services to Support Palliative Care Plans', 'Palliative planning for professionals; distinct from the client-facing hospice piece.'),
  (55, 28, 1, 'clients', 'Family Resources', 'Caring for Two Aging Parents at Once: A Maryland Family''s Guide', 'Replacement topic.'),
  (56, 28, 2, 'caregivers', 'Caregiver Tips', 'Building a Daily Care Routine That Works for Your Client', 'Replacement topic.'),
  (57, 29, 1, 'planners', 'Maryland Home Care', 'The Social Worker''s Guide to Maryland Home Care Regulations', 'Maryland (OHCQ) scope only; never reference Virginia.'),
  (58, 29, 2, 'clients', 'Family Resources', 'Personal Care vs. Companion Care vs. Skilled Nursing: Which Does Your Loved One Need?', 'Replacement. Map cleanly to /services/personal-care, /services/companion-care, /services/skilled-nursing for internal links.'),
  (59, 30, 1, 'caregivers', 'Caregiver Tips', 'Building a Long-Term Career in Home Care', 'Replacement topic.'),
  (60, 30, 2, 'planners', 'Maryland Home Care', 'Why Strong Communication Between Discharge Teams and Home Care Providers Matters', 'Coordination cluster: the communication angle specifically.');

-- ── Statement 4: reload PostgREST schema cache so supabase-js sees the table ─
notify pgrst, 'reload schema';
