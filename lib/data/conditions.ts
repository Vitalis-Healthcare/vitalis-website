export interface FAQ { q: string; a: string }

export interface ConditionData {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  badge: string
  h1: string
  lead: string
  whatItIs: string
  signs: { heading: string; body: string }[]
  howWeHelp: { heading: string; body: string }[]
  faqs: FAQ[]
  testimonial: { name: string; location: string; quote: string }
  relatedConditions: { name: string; slug: string }[]
}

export const conditions: ConditionData[] = [
  {
    slug: 'dementia',
    name: 'Dementia & Memory Care',
    metaTitle: 'Dementia Care & Memory Care at Home | Silver Spring, MD | Vitalis HealthCare',
    metaDescription: 'Specialized dementia & memory care at home in Silver Spring and Montgomery County, MD. Trained caregivers, RN supervision, Medicaid & VA accepted. Call 240.716.6874.',
    badge: 'Memory Care · Silver Spring, MD · Montgomery County',
    h1: 'Dementia care at home in Silver Spring, MD — for families navigating memory loss together.',
    lead: 'When a parent or spouse is living with dementia or Alzheimer\'s, every day brings new challenges — and new decisions. At Vitalis HealthCare, we support families through every stage of memory loss, with trained caregivers who understand that this is not just a medical condition. It\'s a shift in someone\'s whole world.',
    whatItIs: 'Dementia is not simply forgetfulness. It changes how a person experiences time, recognizes familiar faces, communicates, and moves through daily life. Our caregivers are trained to meet people where they are — not where we think they should be — with patience, consistency, and genuine warmth.',
    signs: [
      { heading: 'Repeated questions or confusion', body: 'Your loved one asks the same question many times, seems disoriented at home, or gets confused about dates and people.' },
      { heading: 'Difficulty with daily tasks', body: 'Things like dressing, eating, or following a familiar routine have become frustrating or unsafe without help.' },
      { heading: 'Wandering or safety concerns', body: 'Your loved one sometimes leaves the house without telling anyone, or gets lost in familiar places — a serious fall and injury risk.' },
      { heading: 'Caregiver exhaustion', body: 'You or another family member is the primary caregiver and you\'re running out of steam. That\'s not failure — it\'s human. Let us help.' },
      { heading: 'Hospital or facility discharge', body: 'A doctor has recommended professional home care following a diagnosis or a recent hospital stay.' },
    ],
    howWeHelp: [
      { heading: 'Consistent daily routines', body: 'People with dementia do best with predictable structure. Our caregivers build and maintain routines that reduce anxiety and confusion throughout the day.' },
      { heading: 'Safe home environment', body: 'We identify fall risks, manage wandering safety, and make sure your loved one\'s environment is as secure and familiar as possible.' },
      { heading: 'Meaningful engagement', body: 'We don\'t just supervise — we engage. Music, reminiscence, gentle activity, and real conversation all support cognitive wellbeing.' },
      { heading: 'Family coordination', body: 'We keep you informed and involved. Your case manager connects regularly so you\'re never left wondering how things are going.' },
      { heading: 'RN oversight on every case', body: 'Our Clinical Manager reviews all memory care cases. You have clinical expertise watching over your loved one\'s care at all times.' },
    ],
    faqs: [
      { q: 'What stage of dementia do you support?', a: 'We support all stages — from early-stage mild cognitive impairment through moderate and advanced dementia. The level of care adjusts as needs change over time.' },
      { q: 'How do you train caregivers for dementia?', a: 'Our caregivers receive specialized training in dementia communication, behavioral responses, redirection techniques, and safety protocols. Our Clinical Manager provides ongoing supervision and guidance.' },
      { q: 'Can a caregiver help with sundowning and nighttime confusion?', a: 'Yes. We can arrange evening and overnight care specifically to manage the increased confusion and agitation many people with dementia experience in the later hours.' },
      { q: 'Does Maryland Medicaid cover dementia home care?', a: 'The Maryland Medicaid Waiver program may cover home care services for qualifying individuals with dementia. We can help you understand eligibility and navigate the process.' },
      { q: 'What if my family member refuses help?', a: 'Resistance to care is very common in dementia. Our caregivers are trained in gentle, non-confrontational approaches that build trust over time. We work patiently with your loved one — and with you.' },
    ],
    testimonial: { name: 'E. Adaku', location: 'Silver Spring, MD', quote: 'When our situation became complex, Vitalis stepped in with real understanding and professionalism. They didn\'t just send a caregiver — they sent the right person. Our family finally feels like we can breathe again.' },
    relatedConditions: [{ name: 'Post-Surgery Recovery', slug: 'post-surgery' }, { name: 'Stroke Recovery', slug: 'stroke' }, { name: 'Fall Prevention', slug: 'fall-prevention' }],
  },
  {
    slug: 'post-surgery',
    name: 'Post-Surgery Recovery Care',
    metaTitle: 'Post-Surgery Home Care in Silver Spring & Montgomery County, MD | Vitalis',
    metaDescription: 'Post-surgery home care in Silver Spring, Rockville & Montgomery County, MD. Medication management, wound care & recovery support. Licensed, certified. Call 240.716.6874.',
    badge: 'Post-Surgery Recovery · Silver Spring, MD · Montgomery County',
    h1: 'Recovering from surgery at home in Maryland — with the professional support you need.',
    lead: 'Coming home after surgery is a vulnerable moment. You\'re relieved to be out of the hospital, but suddenly the routine of recovery — medications, movement, wound care, follow-up appointments — falls on you and your family. Vitalis HealthCare takes that weight off. We give your loved one the clinical support and daily help they need to heal safely and fully at home.',
    whatItIs: 'Post-surgery recovery care is professional, structured support provided in your home during the critical weeks after an operation. It bridges the gap between hospital discharge and full independence — reducing the risk of readmission, complications, or falls that can set recovery back significantly.',
    signs: [
      { heading: 'Hospital discharge without full independence', body: 'Your surgeon or discharge team has recommended professional home support following an operation — hip replacement, cardiac surgery, abdominal surgery, or other procedures.' },
      { heading: 'Medication management concerns', body: 'Multiple medications on a new schedule, especially with pain management, are hard to manage alone. Mistakes can be dangerous.' },
      { heading: 'Wound or incision care needs', body: 'Proper wound care at home is essential to prevent infection. Our skilled nursing team can manage dressings, monitor for complications, and coordinate with your surgeon.' },
      { heading: 'Limited mobility during recovery', body: 'Getting in and out of bed, using the bathroom safely, or navigating stairs is difficult and risky without assistance during early recovery.' },
      { heading: 'Family caregiver overwhelm', body: 'A spouse or adult child is trying to manage post-surgical care on top of their own life and responsibilities — and needs real relief.' },
    ],
    howWeHelp: [
      { heading: 'Medication management', body: 'Our skilled nursing staff ensures medications are taken correctly and on schedule — including pain management, antibiotics, and blood thinners.' },
      { heading: 'Wound care & monitoring', body: 'We manage surgical incisions and dressings, watch for signs of infection, and communicate directly with your medical team if anything needs attention.' },
      { heading: 'Safe mobility assistance', body: 'We help your loved one move safely — getting in and out of bed, using the bathroom, managing stairs, and building strength gradually.' },
      { heading: 'Nutrition & hydration support', body: 'Good nutrition accelerates healing. We help with meal preparation, monitor appetite, and ensure your loved one is eating and drinking adequately.' },
      { heading: 'Recovery coordination', body: 'We liaise with surgeons, physical therapists, and follow-up care providers so nothing falls through the cracks during the recovery period.' },
    ],
    faqs: [
      { q: 'When can post-surgery care start?', a: 'We can often arrange care to begin on the day of hospital discharge or the following morning. Contact us before the planned discharge date if possible so we can plan ahead.' },
      { q: 'What surgeries do you typically support?', a: 'We support recovery from a wide range of procedures including joint replacement (hip, knee), cardiac surgery, abdominal surgery, cancer-related surgery, spinal procedures, and general orthopedic operations.' },
      { q: 'Does Medicare cover post-surgery home care?', a: 'Medicare may cover skilled services — including skilled nursing, physical therapy, and occupational therapy — when ordered by a physician after a qualifying hospital stay. Non-medical support like personal care may be covered by Medicaid Waiver or Long-Term Care Insurance. We\'ll help you work through what applies.' },
      { q: 'How long does post-surgery care typically last?', a: 'It varies by procedure and individual recovery. Some clients need intensive support for 2–4 weeks. Others benefit from more moderate help for 1–3 months. We reassess regularly and adjust care as your loved one improves.' },
      { q: 'Can your nurses communicate with my loved one\'s surgeon?', a: 'Yes. Our clinical team can coordinate with your surgeon\'s office and any rehab or physical therapy providers. We believe good recovery care is collaborative.' },
    ],
    testimonial: { name: 'S. McCoy', location: 'Montgomery County', quote: 'After my mother\'s surgery we didn\'t know what we were doing. Vitalis stepped in, took charge of the routine, and gave us all peace of mind. She recovered faster than her surgeon expected. Professional home care made all the difference.' },
    relatedConditions: [{ name: 'Stroke Recovery', slug: 'stroke' }, { name: 'Dementia Care', slug: 'dementia' }, { name: 'Fall Prevention', slug: 'fall-prevention' }],
  },
  {
    slug: 'stroke',
    name: 'Stroke Recovery Support',
    metaTitle: 'Stroke Recovery Home Care in Silver Spring & Montgomery County, MD | Vitalis',
    metaDescription: 'Stroke recovery home care in Silver Spring, Rockville & Montgomery County, MD. Daily routines, therapy support, and RN supervision. Licensed & certified. Call 240.716.6874.',
    badge: 'Stroke Recovery · Silver Spring, MD · Montgomery County',
    h1: 'Stroke recovery home care in Maryland — consistent, compassionate, and built around your loved one.',
    lead: 'A stroke changes everything — sometimes in an instant. The road back is long, and it requires the kind of steady, patient support that families alone can rarely sustain. At Vitalis HealthCare, we work alongside your medical team and your family to help your loved one make the most of their recovery — day by day, step by step, at home.',
    whatItIs: 'Stroke recovery home care provides daily support for people returning home after a stroke — helping with physical tasks, reinforcing therapy routines, providing emotional encouragement, and keeping the family connected and informed. Research consistently shows that recovery outcomes improve when patients have consistent, professional support at home.',
    signs: [
      { heading: 'Recent stroke or hospital discharge', body: 'Your loved one has just come home from a hospital or rehabilitation facility following a stroke and needs ongoing support to continue their recovery safely.' },
      { heading: 'Physical limitations from stroke', body: 'Weakness, balance problems, difficulty walking, or limited use of one side of the body requires daily assistance and fall prevention support.' },
      { heading: 'Communication or speech challenges', body: 'Aphasia or other communication changes can be frustrating and isolating — our caregivers are trained to communicate with patience and without rushing.' },
      { heading: 'Cognitive or memory changes', body: 'Strokes often affect memory and cognitive processing. Our team supports daily routines that compensate for these changes and reduce frustration.' },
      { heading: 'Family caregiver fatigue', body: 'Stroke recovery can take months or years. Family members providing primary care often experience burnout — dangerous for everyone. We provide real relief.' },
    ],
    howWeHelp: [
      { heading: 'Daily routine reinforcement', body: 'Consistency is critical in stroke recovery. We build and maintain structured daily routines that support neurological re-learning and build confidence.' },
      { heading: 'Therapy exercise support', body: 'We reinforce the exercises prescribed by physical and occupational therapists — helping your loved one practice between formal therapy sessions to accelerate progress.' },
      { heading: 'Fall prevention & safety', body: 'Stroke survivors are at high fall risk. We provide steady physical assistance, monitor the home environment, and respond quickly to any safety concerns.' },
      { heading: 'Communication support', body: 'We work patiently with clients experiencing aphasia or speech challenges — never rushing, always encouraging, and reporting any changes to the clinical team.' },
      { heading: 'Emotional and social support', body: 'Depression is common after stroke. Our caregivers provide genuine companionship and positive engagement — which research shows meaningfully supports recovery.' },
    ],
    faqs: [
      { q: 'How soon after a stroke can home care start?', a: 'We can begin care as soon as your loved one is discharged from hospital or rehabilitation. Many families contact us while their loved one is still in rehab so we can plan for a seamless transition home.' },
      { q: 'Do your caregivers work alongside physical and occupational therapists?', a: 'Yes. We coordinate with your therapy team and reinforce prescribed exercises and routines in between formal therapy sessions. Good home care and good therapy work together.' },
      { q: 'How long does stroke recovery home care typically last?', a: 'It varies significantly by the severity of the stroke and individual progress. Some clients need intensive support for a few months; others benefit from ongoing moderate support for a year or more. We reassess regularly.' },
      { q: 'Does Maryland Medicaid cover home care for stroke survivors?', a: 'Depending on eligibility, the Maryland Medicaid Waiver program may cover home care for stroke survivors. VA benefits may also apply for veteran stroke survivors. We\'ll help you explore all options.' },
      { q: 'What if my loved one is depressed or resistant to help after their stroke?', a: 'This is very common. Our caregivers are experienced with the emotional side of stroke recovery — they\'re patient, encouraging, and skilled at building trust with clients who are frustrated or withdrawn.' },
    ],
    testimonial: { name: 'B. Sampson', location: 'Montgomery County', quote: 'After my husband\'s stroke I was completely overwhelmed. The Vitalis team came in and it felt like a family — they genuinely cared. His recovery has been remarkable. I don\'t know how we would have managed without them.' },
    relatedConditions: [{ name: 'Dementia Care', slug: 'dementia' }, { name: 'Post-Surgery Recovery', slug: 'post-surgery' }, { name: 'Fall Prevention', slug: 'fall-prevention' }],
  },
  {
    slug: 'fall-prevention',
    name: 'Fall Prevention for Seniors',
    metaTitle: 'Senior Fall Prevention Home Care in Silver Spring & Montgomery County, MD | Vitalis',
    metaDescription: 'Senior fall prevention home care in Silver Spring, Rockville & Montgomery County, MD. In-home safety assessment, trained caregivers, 24/7 support. Call 240.716.6874.',
    badge: 'Fall Prevention · Silver Spring, MD · Montgomery County',
    h1: 'Keeping seniors safe at home in Maryland — before a fall changes everything.',
    lead: 'Falls are the number one cause of serious injury for adults over 65 — and most of them happen at home, in familiar places, during routine moments. A fall can end independence in an instant. At Vitalis HealthCare, we take fall prevention seriously: not just with tips, but with trained caregivers who are physically present to make sure your loved one moves safely every single day.',
    whatItIs: 'Fall prevention care combines home safety assessment, daily physical assistance, mobility support, and consistent caregiver presence to dramatically reduce the risk of falls for seniors living at home. It\'s proactive, not reactive — and it\'s far less costly than the aftermath of a serious fall.',
    signs: [
      { heading: 'A recent fall or near-miss', body: 'Your loved one has already fallen once — and statistically, that makes another fall much more likely. This is the strongest signal that professional support is needed.' },
      { heading: 'Balance or gait problems', body: 'Shuffling walk, difficulty rising from chairs, unsteady movement, or a tendency to hold walls and furniture are all warning signs of high fall risk.' },
      { heading: 'Fear of falling', body: 'Seniors who are afraid of falling often become less active — which weakens muscles and actually increases fall risk. Breaking this cycle requires both support and encouragement.' },
      { heading: 'Cluttered or unsafe home environment', body: 'Loose rugs, poor lighting, stairs without railings, and bathroom hazards contribute significantly to fall risk — and most are fixable.' },
      { heading: 'Medication side effects', body: 'Many common medications — blood pressure drugs, sleep aids, pain medications — affect balance and reaction time, especially in combination.' },
    ],
    howWeHelp: [
      { heading: 'Home safety assessment', body: 'Our team evaluates your loved one\'s home for fall hazards — rugs, lighting, bathroom grab bars, stairway safety — and makes practical recommendations to reduce risk.' },
      { heading: 'Daily mobility assistance', body: 'We provide steady physical support for getting in and out of bed, using the bathroom, navigating stairs, and all the routine moments where falls most often happen.' },
      { heading: 'Exercise and strength support', body: 'Gentle movement and strength routines — recommended by your loved one\'s doctor or therapist — help maintain the muscle strength and balance that prevent falls.' },
      { heading: 'Medication awareness', body: 'We monitor for medications that increase dizziness or unsteadiness, and coordinate with your medical team when concerns arise.' },
      { heading: 'Emergency response planning', body: 'We help families put a clear plan in place for what happens if a fall does occur — so panic doesn\'t make a difficult situation worse.' },
    ],
    faqs: [
      { q: 'What is a fall risk assessment?', a: 'It\'s an evaluation of your loved one\'s physical condition, home environment, medications, and daily routines to identify specific fall risks — and to create a practical plan to address them. We do this as part of our initial care consultation.' },
      { q: 'My mother fell but wasn\'t seriously hurt. Do we still need professional care?', a: 'Yes — a single fall is the strongest predictor of future falls. The time to act is immediately after a first fall, before a more serious injury occurs. We\'d strongly encourage you to call us.' },
      { q: 'Can you help with bathroom safety specifically?', a: 'Absolutely. The bathroom is where a disproportionate number of falls happen. We assist with transfers, monitor for hazards, and can recommend grab bars and other modifications that make a real difference.' },
      { q: 'Do fall prevention services work with physical therapy?', a: 'Yes — and they work best together. If your loved one is working with a physical therapist on balance and strength, our caregivers reinforce those exercises daily between formal sessions.' },
      { q: 'What if my loved one refuses help because they don\'t want to feel dependent?', a: 'This is one of the most common challenges we face — and our caregivers are very good at navigating it. We introduce support gradually, build trust, and frame our role as partnership rather than supervision.' },
    ],
    testimonial: { name: 'A. Ayala', location: 'Montgomery County', quote: 'My client was afraid to move around her own home after a fall. Within weeks of consistent Vitalis care she was more confident and more active than she had been in years. She told me she felt like herself again. That\'s why I do this work.' },
    relatedConditions: [{ name: 'Dementia Care', slug: 'dementia' }, { name: 'Stroke Recovery', slug: 'stroke' }, { name: 'Post-Surgery Recovery', slug: 'post-surgery' }],
  },
]

export function getCondition(slug: string): ConditionData | undefined {
  return conditions.find((c) => c.slug === slug)
}
