export interface ServiceFeature {
  heading: string
  body: string
}

export interface FAQ {
  q: string
  a: string
}

export interface ServiceData {
  slug: string
  name: string
  shortName: string
  metaTitle: string
  metaDescription: string
  badge: string
  h1: string
  lead: string
  whatItIs: string
  heroImage: string | null
  heroImageAlt: string
  heroPrompt: string | null
  whoNeedsIt: { heading: string; body: string }[]
  whatIncludes: ServiceFeature[]
  howWeDeliver: ServiceFeature[]
  faqs: FAQ[]
  testimonial: { name: string; location: string; quote: string }
  relatedServices: { name: string; slug: string }[]
  relatedConditions: { name: string; slug: string }[]
}

export const services: ServiceData[] = [
  {
    slug: 'companion-care',
    name: 'Companion Care Services',
    shortName: 'Companion Care',
    metaTitle: 'Companion Care Services in Silver Spring & Maryland | Vitalis HealthCare',
    metaDescription: 'Professional companion care services in Silver Spring, Rockville & Montgomery County, MD. Friendly, reliable companionship for seniors. MDH OHCQ licensed. Call 240.716.6874.',
    badge: 'Companion Care · Silver Spring, MD · Montgomery County',
    h1: 'Companion care in Maryland — because no one should feel alone at home.',
    lead: 'Loneliness is one of the most serious health risks for older adults — more dangerous than smoking, according to research. At Vitalis HealthCare, our companion care services bring consistent, friendly, professional presence into your loved one\'s daily life. We don\'t just show up. We show up and genuinely connect.',
    whatItIs: 'Companion care is non-medical home care focused on the social, emotional, and everyday practical needs of seniors and adults living at home. It\'s the service that keeps your loved one engaged, safe, and connected — and gives family members the peace of mind that comes from knowing someone reliable is there.',
    heroImage: '/hero-companion-care.png',
    heroImageAlt: 'Vitalis caregiver and senior client sharing a warm moment looking through a photo album at home',
    heroPrompt: null,
    whoNeedsIt: [
      { heading: 'Living alone and becoming isolated', body: 'Your loved one used to be social and engaged, but increasingly spends days alone. Isolation accelerates cognitive decline and depression in seniors — consistent companionship is a proven intervention.' },
      { heading: 'Family caregiver needs relief', body: 'You\'re the primary support for a parent or spouse and you\'re stretched thin. Companion care gives you scheduled, reliable relief so you can work, rest, and be present when you are there.' },
      { heading: 'Early-stage memory concerns', body: 'Your loved one is still largely independent but is showing early signs of forgetfulness or confusion. A familiar, consistent companion provides gentle structure and watchful presence without being intrusive.' },
      { heading: 'Recently lost a spouse or close friend', body: 'Grief and social loss are significant risk factors for rapid health decline in seniors. Regular companionship helps maintain connection, routine, and a reason to engage with each day.' },
      { heading: 'Needs help with daily tasks but not personal care', body: 'Your loved one manages their personal hygiene independently but struggles with errands, meal prep, or keeping up with household tasks. Companion care covers exactly that gap.' },
    ],
    whatIncludes: [
      { heading: 'Genuine conversation & engagement', body: 'More than just presence — our companions talk, listen, play games, share meals, look at photos, and connect around whatever your loved one cares about.' },
      { heading: 'Meal preparation & nutrition', body: 'Planning and preparing nutritious meals, monitoring appetite, and making sure your loved one is eating well and staying hydrated every day.' },
      { heading: 'Light housekeeping', body: 'Keeping the home tidy and safe — dishes, laundry, vacuuming, and the everyday upkeep that keeps the environment comfortable and hazard-free.' },
      { heading: 'Errands & transportation', body: 'Grocery shopping, pharmacy pickups, medical appointments, and social outings — keeping your loved one connected to their community and commitments.' },
      { heading: 'Medication reminders', body: 'Gentle, consistent reminders to take medications at the right time. Our companions do not administer medications — skilled nursing handles that — but reminders alone dramatically improve adherence.' },
      { heading: 'Activity & hobby support', body: 'Gardening, reading, puzzles, crafts, walks — whatever keeps your loved one active and purposeful. We match companions to clients partly on shared interests.' },
    ],
    howWeDeliver: [
      { heading: 'Careful matching — not just availability', body: 'We take time to understand your loved one\'s personality, history, and interests before we assign anyone. The goal is a companion they actually look forward to seeing — not just someone who shows up.' },
      { heading: 'Consistent caregiver assignment', body: 'The same companion, on the same schedule. Consistency is not a luxury in companion care — it\'s the whole point. Familiar faces and predictable routines are what allow trust and real connection to develop.' },
      { heading: 'Regular case manager check-ins', body: 'Your dedicated case manager contacts you regularly to make sure the match is working, address any concerns, and adjust the care plan as your loved one\'s needs evolve.' },
      { heading: 'MDH OHCQ licensed & regulated', body: 'Vitalis is licensed by the Maryland Department of Health Office of Health Care Quality at RSA Level 3. Our companion care aides are background-checked, trained, and supervised by our Clinical Manager.' },
    ],
    faqs: [
      { q: 'What\'s the difference between companion care and personal care?', a: 'Companion care focuses on social engagement, emotional support, and everyday practical tasks — conversation, errands, meal prep, light housekeeping. Personal care adds hands-on physical assistance with bathing, dressing, grooming, and mobility. Many clients start with companion care and add personal care as needs change.' },
      { q: 'How many hours a week can a companion caregiver provide?', a: 'We offer flexible scheduling — from a few hours a week to full-time daily visits. Many families start with 3–4 visits per week and adjust from there. We work around your schedule and your loved one\'s routine.' },
      { q: 'Does Medicaid or insurance cover companion care?', a: 'Maryland Medicaid Waiver may cover companion care services for qualifying clients. Long-Term Care Insurance and VA benefits may also apply depending on your loved one\'s policy. Private pay is available for all services. Call us and we\'ll help you understand what you qualify for.' },
      { q: 'What if my loved one doesn\'t want a stranger in their home?', a: 'This is very common — especially for seniors who value their independence. We approach this gradually. Our case manager will do an introductory visit, and we encourage the first few companion visits to be low-key. Most clients who were initially resistant become genuinely close to their companion within a few weeks.' },
      { q: 'Can the same companion cover multiple days and different tasks each visit?', a: 'Yes. Companion care visits are flexible by design. One day might be errands and a walk; another might be meal prep and conversation. We build a care plan around your loved one\'s weekly routine and the companion adapts accordingly.' },
    ],
    testimonial: { name: 'E. Adaku', location: 'Silver Spring, MD', quote: 'The companion they sent became like a member of our family. She brought warmth and routine back into my mother\'s days. I cannot overstate how much that changed things for all of us.' },
    relatedServices: [
      { name: 'Personal Care', slug: 'personal-care' },
      { name: 'Skilled Nursing', slug: 'skilled-nursing' },
    ],
    relatedConditions: [
      { name: 'Dementia & Memory Care', slug: 'dementia' },
      { name: 'Fall Prevention', slug: 'fall-prevention' },
    ],
  },
  {
    slug: 'personal-care',
    name: 'Personal Care Services',
    shortName: 'Personal Care',
    metaTitle: 'Personal Care Services in Silver Spring & Maryland | Vitalis HealthCare',
    metaDescription: 'Professional personal care services in Silver Spring, Rockville & Montgomery County, MD. Dignified help with bathing, dressing & daily living. MDH OHCQ licensed. Call 240.716.6874.',
    badge: 'Personal Care · Silver Spring, MD · Montgomery County',
    h1: 'Personal care at home in Maryland — professional, dignified, and always respectful.',
    lead: 'When a parent or spouse needs help with bathing, dressing, or getting around the house, it\'s a transition that touches on dignity, privacy, and trust in ways that few other care decisions do. At Vitalis HealthCare, we handle personal care with the professionalism, discretion, and genuine respect that your loved one deserves — every single day.',
    whatItIs: 'Personal care is hands-on, daily assistance with the activities of living — bathing, grooming, dressing, mobility, and all the physical tasks that become difficult or unsafe for seniors and adults with health challenges. It\'s delivered by trained, background-checked home health aides under the supervision of our Clinical Manager.',
    heroImage: null,
    heroImageAlt: 'Vitalis personal care aide assisting an elderly client with morning routine at home',
    heroPrompt: 'Photorealistic image of a professional female caregiver in scrubs gently helping an elderly woman get ready in a bright, comfortable bedroom. Both are calm and smiling. Warm morning light. Dignified, respectful atmosphere. No text. Documentary style.',
    whoNeedsIt: [
      { heading: 'Needs help with bathing or showering safely', body: 'Bathing is one of the highest fall-risk moments of the day for seniors. A trained aide provides safe, dignified bathing assistance that prevents accidents while preserving your loved one\'s sense of self.' },
      { heading: 'Dressing has become difficult or unsafe', body: 'Arthritis, weakness, balance issues, or cognitive decline can make dressing a frustrating and risky task. Our aides help efficiently and with patience — keeping the morning routine manageable and on track.' },
      { heading: 'Mobility and transfers need support', body: 'Getting in and out of bed, using the toilet, moving between rooms — these moments require steady, trained assistance to prevent falls. Our aides are trained in safe transfer techniques.' },
      { heading: 'Recovering from surgery or illness', body: 'Post-surgical recovery often requires temporary personal care support during the healing period. Our aides work with your medical team to support safe recovery at home.' },
      { heading: 'Managing incontinence with dignity', body: 'Incontinence care is one of the most sensitive aspects of personal care. Our aides approach this with professionalism and genuine respect — making it as routine and comfortable as possible for your loved one.' },
    ],
    whatIncludes: [
      { heading: 'Bathing & personal hygiene', body: 'Full bathing assistance — shower, bath, or bed bath depending on your loved one\'s needs and preferences. Oral hygiene, hair care, and skin care included.' },
      { heading: 'Dressing & grooming', body: 'Help selecting and putting on clothing, shaving, nail care, and all the grooming tasks that are part of feeling presentable and dignified each day.' },
      { heading: 'Mobility & transfer assistance', body: 'Safe assistance getting in and out of bed, chairs, and vehicles. Trained in proper body mechanics and transfer techniques to protect both client and caregiver.' },
      { heading: 'Toileting & continence care', body: 'Compassionate, professional assistance with toileting, incontinence care, and catheter management — handled with complete discretion and respect.' },
      { heading: 'Nutrition & hydration support', body: 'Meal preparation and feeding assistance as needed, plus monitoring to ensure adequate nutrition and hydration — a key factor in recovery and long-term health.' },
      { heading: 'Exercise & range of motion', body: 'Gentle movement support, prescribed exercise routines, and range-of-motion activities that maintain strength, flexibility, and overall wellbeing.' },
    ],
    howWeDeliver: [
      { heading: 'Trained & certified home health aides', body: 'Every Vitalis personal care aide holds their Maryland HHA or CNA certification, has completed a full background check, and goes through our in-house training program before their first assignment.' },
      { heading: 'Supervised by our Clinical Manager', body: 'Personal care at Vitalis is not just aide-to-client. Our Clinical Manager oversees every care plan, conducts supervisory visits, and is always available to address clinical concerns.' },
      { heading: 'Customized care plan from day one', body: 'We build a written care plan for every client before the first visit — covering specific tasks, preferences, safety considerations, and the client\'s daily routine. Nothing is left to chance.' },
      { heading: 'Reliable, consistent scheduling', body: 'The same aide, the same days, the same routine. Consistency in personal care isn\'t just convenient — it builds the trust that makes the care work.' },
    ],
    faqs: [
      { q: 'Are your personal care aides certified?', a: 'Yes. All Vitalis personal care aides hold Maryland Home Health Aide (HHA) or Certified Nursing Assistant (CNA) certification. They also go through a full background check and our in-house orientation and training program before starting with any client.' },
      { q: 'How is personal care different from skilled nursing?', a: 'Personal care covers hands-on assistance with daily living activities — bathing, dressing, grooming, mobility. Skilled nursing covers clinical medical tasks — wound care, medication administration, IV management, health assessments. Many clients receive both. We coordinate them seamlessly.' },
      { q: 'Can personal care be provided every day?', a: 'Yes. We offer daily personal care — seven days a week including weekends and holidays. For clients who need morning and evening assistance, we can schedule two visits per day.' },
      { q: 'Does Maryland Medicaid cover personal care services?', a: 'Yes. The Maryland Medicaid Waiver program may cover personal care services for qualifying individuals. VA benefits and Long-Term Care Insurance may also apply. We\'ll help you determine eligibility and navigate the process.' },
      { q: 'What if my loved one is uncomfortable with a particular aide?', a: 'Just tell us. We take this seriously and will find a replacement quickly. Your loved one\'s comfort and trust in their caregiver is non-negotiable. We also offer a full refund if you cancel service within 14 days of starting.' },
    ],
    testimonial: { name: 'B. Davis', location: 'Silver Spring, MD', quote: 'They\'ve helped me with the things I couldn\'t manage alone — always respectfully, never making me feel like a burden. That matters more than I can say.' },
    relatedServices: [
      { name: 'Companion Care', slug: 'companion-care' },
      { name: 'Skilled Nursing', slug: 'skilled-nursing' },
    ],
    relatedConditions: [
      { name: 'Post-Surgery Recovery', slug: 'post-surgery' },
      { name: 'Stroke Recovery', slug: 'stroke' },
    ],
  },
  {
    slug: 'skilled-nursing',
    name: 'Skilled Nursing Services',
    shortName: 'Skilled Nursing',
    metaTitle: 'Skilled Nursing Services at Home in Silver Spring & Maryland | Vitalis HealthCare',
    metaDescription: 'In-home skilled nursing services in Silver Spring, Rockville & Montgomery County, MD. RN wound care, medication management & clinical monitoring. MDH OHCQ licensed. Call 240.716.6874.',
    badge: 'Skilled Nursing · Silver Spring, MD · Montgomery County',
    h1: 'Skilled nursing at home in Maryland — hospital-quality clinical care, in your loved one\'s own space.',
    lead: 'There are clinical needs that require a registered nurse — wound care, medication management, post-surgical monitoring, IV therapy. For many families, the alternative to skilled nursing at home is a nursing facility or extended hospital stay. At Vitalis HealthCare, our registered nurses bring the clinical expertise of a healthcare facility directly into the home — so your loved one can heal and be monitored in the place where they\'re most comfortable.',
    whatItIs: 'Skilled nursing is clinical care delivered in the home by a licensed Registered Nurse (RN). It covers medical tasks that go beyond the scope of a home health aide — tasks that require clinical training, licensure, and ongoing professional judgment. Vitalis skilled nursing is supervised by our Clinical Manager and coordinated directly with your loved one\'s physician.',
    heroImage: null,
    heroImageAlt: 'Vitalis registered nurse conducting a home health assessment with an elderly patient',
    heroPrompt: 'Photorealistic image of a professional female registered nurse in scrubs checking blood pressure of an elderly man at his home kitchen table. She is focused and caring. Medical bag visible. Warm, clean home environment. No text. Documentary photography style.',
    whoNeedsIt: [
      { heading: 'Post-surgical wound care & monitoring', body: 'Surgical wounds need professional assessment, dressing changes, and monitoring for infection — tasks that are dangerous to leave to untrained family members. Our RNs manage this with clinical precision.' },
      { heading: 'Complex medication management', body: 'Multiple medications, including injectables, blood thinners, or controlled substances, require professional oversight. Our nurses ensure correct dosing, timing, and monitoring for adverse effects.' },
      { heading: 'Chronic disease management at home', body: 'Diabetes, heart failure, COPD, and other chronic conditions require regular clinical monitoring — vital signs, lab coordination, symptom assessment — to stay ahead of complications and prevent hospitalization.' },
      { heading: 'Post-hospitalization transition', body: 'The period immediately after a hospital discharge is statistically the highest-risk window for readmission. Skilled nursing at home during this transition significantly reduces that risk.' },
      { heading: 'IV therapy & infusion management', body: 'Intravenous antibiotics, hydration, or nutritional therapy can often be managed at home by a skilled nurse — eliminating the need for an extended inpatient stay.' },
    ],
    whatIncludes: [
      { heading: 'Wound care & dressing changes', body: 'Professional assessment, cleaning, and dressing of surgical wounds, pressure injuries, diabetic ulcers, and other skin conditions — with infection monitoring and coordination with the treating physician.' },
      { heading: 'Medication administration & management', body: 'Administering oral, injectable, and IV medications. Managing complex medication regimens, monitoring for side effects, and coordinating with prescribing physicians on any changes.' },
      { heading: 'Vital signs & health monitoring', body: 'Regular measurement and documentation of blood pressure, heart rate, oxygen saturation, temperature, and weight — with clinical interpretation and physician notification when values are concerning.' },
      { heading: 'Catheter & ostomy care', body: 'Skilled insertion, maintenance, and change of urinary catheters and ostomy appliances — managed with the clinical expertise and infection-control protocols this care requires.' },
      { heading: 'Client & family education', body: 'Teaching clients and family members about medications, wound care, disease management, and warning signs — building the knowledge to manage safely between nursing visits.' },
      { heading: 'Physician coordination & care planning', body: 'Our nurses communicate directly with your loved one\'s physicians, report changes in condition, and ensure the home care plan aligns with the overall medical treatment plan.' },
    ],
    howWeDeliver: [
      { heading: 'Registered Nurses only', body: 'All Vitalis skilled nursing is performed by licensed Registered Nurses (RNs). No unlicensed personnel handle clinical tasks. Our RNs hold current Maryland licensure and ongoing continuing education.' },
      { heading: 'Overseen by our Clinical Manager', body: 'Every skilled nursing case is supervised by Marie Epah, our Clinical Manager, who reviews care plans, conducts oversight visits, and ensures clinical standards are maintained across all cases.' },
      { heading: 'Direct physician communication', body: 'We don\'t leave families to relay information between nurses and doctors. Our clinical team communicates directly with your loved one\'s physicians — reporting changes, receiving orders, and coordinating follow-up care.' },
      { heading: 'MDH OHCQ licensed at RSA Level 3', body: 'Vitalis skilled nursing operates under our Maryland Department of Health OHCQ license #3879R at RSA Level 3 — the highest level of home care licensure in Maryland, subject to ongoing state regulatory oversight.' },
    ],
    faqs: [
      { q: 'Does Medicare cover skilled nursing at home?', a: 'Yes — Medicare Part A may cover skilled nursing services when ordered by a physician following a qualifying hospital stay of three or more days, provided the client meets homebound criteria. Our clinical team can help determine your loved one\'s eligibility and coordinate with Medicare on your behalf.' },
      { q: 'What\'s the difference between skilled nursing and personal care?', a: 'Skilled nursing covers clinical medical tasks that require a licensed RN — wound care, medication administration, IV therapy, health assessments. Personal care covers daily living assistance — bathing, dressing, mobility. Many clients receive both, and we coordinate them as a unified care team.' },
      { q: 'How frequently do your nurses visit?', a: 'Visit frequency depends entirely on clinical need and physician orders. Some clients need daily nursing visits; others need two or three per week. We build the schedule around the clinical requirements of the specific case.' },
      { q: 'Can your nurses work alongside home health agencies or hospital teams?', a: 'Yes. We regularly coordinate with home health agencies, hospital discharge teams, hospice providers, and specialist physicians. We believe the best outcomes come from integrated, communicative care teams.' },
      { q: 'What happens if a client\'s condition changes between nursing visits?', a: 'Our nurses provide education to family members on what to watch for and when to call. We also have a 24/7 coordination line. If a family notices a concerning change, they can reach our team at any time — we will assess and escalate to the physician if needed.' },
    ],
    testimonial: { name: 'S. McCoy', location: 'Montgomery County', quote: 'The nurse who cared for my mother after her surgery was exceptional. She caught a potential infection early, called the doctor herself, and prevented what could have been a serious setback. That\'s the difference professional nursing makes.' },
    relatedServices: [
      { name: 'Personal Care', slug: 'personal-care' },
      { name: 'Companion Care', slug: 'companion-care' },
    ],
    relatedConditions: [
      { name: 'Post-Surgery Recovery', slug: 'post-surgery' },
      { name: 'Stroke Recovery', slug: 'stroke' },
    ],
  },
]

export function getService(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug)
}
