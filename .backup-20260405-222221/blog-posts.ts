export interface BlogPost {
  slug: string
  title: string
  date: string
  dateFormatted: string
  excerpt: string
  category: BlogCategory
  externalUrl: string
  featured?: boolean
}

export type BlogCategory =
  | 'Family Resources'
  | 'Senior Health'
  | 'Caregiver Tips'
  | 'Maryland Home Care'
  | 'Company News'

export const blogCategories: BlogCategory[] = [
  'Family Resources',
  'Senior Health',
  'Caregiver Tips',
  'Maryland Home Care',
  'Company News',
]

const WP = 'https://blog.vitalishealthcare.com'

export const blogPosts: BlogPost[] = [
  // ── 2025 ──────────────────────────────────────────────────────────
  {
    slug: 'technology-tools-caregivers-job-easier',
    title: 'Technology Tools That Can Make a Caregiver\'s Job Easier',
    date: '2025-08-04',
    dateFormatted: 'August 4, 2025',
    excerpt: 'Caregiving is a hands-on, heart-driven profession — but that doesn\'t mean it has to be overwhelming. Smart, simple technology can make a real difference.',
    category: 'Caregiver Tips',
    externalUrl: `${WP}/technology-tools-that-can-make-a-caregivers-job-easier/`,
    featured: true,
  },
  {
    slug: 'staying-safe-at-home-tips-seniors-maryland',
    title: 'Staying Safe at Home: Tips for Seniors in Maryland',
    date: '2025-08-01',
    dateFormatted: 'August 1, 2025',
    excerpt: 'Aging at home offers comfort and independence — but it also requires careful attention to safety. Key tips for Maryland seniors to stay safe at home.',
    category: 'Maryland Home Care',
    externalUrl: `${WP}/staying-safe-at-home-tips-for-seniors-in-maryland/`,
    featured: true,
  },
  {
    slug: 'how-to-choose-homecare-agency-maryland',
    title: 'How to Choose the Right Homecare Agency to Work For in Maryland',
    date: '2025-07-31',
    dateFormatted: 'July 31, 2025',
    excerpt: 'Maryland is home to many caregiving agencies — but not all are created equal. What to look for if you\'re a caregiver or healthcare professional seeking meaningful work.',
    category: 'Caregiver Tips',
    externalUrl: `${WP}/how-to-choose-the-right-homecare-agency-to-work-for-in-maryland/`,
    featured: true,
  },
  {
    slug: 'spotting-signs-elder-abuse-neglect',
    title: 'Spotting the Signs of Elder Abuse and Neglect: A Guide for Families and Caregivers',
    date: '2025-07-28',
    dateFormatted: 'July 28, 2025',
    excerpt: 'Elder abuse and neglect are serious, yet often hidden issues. Know the warning signs and how to respond when you see them.',
    category: 'Family Resources',
    externalUrl: `${WP}/spotting-the-signs-of-elder-abuse-and-neglect-a-guide-for-care-patients-and-caregivers/`,
  },
  {
    slug: 'difference-between-home-care-and-home-health-care',
    title: 'The Difference Between Home Care and Home Health Care',
    date: '2025-05-06',
    dateFormatted: 'May 6, 2025',
    excerpt: 'Families often ask: what\'s the difference between home care and home health care? Although the terms are used interchangeably, they mean different things.',
    category: 'Family Resources',
    externalUrl: `${WP}/the-difference-between-home-care-and-home-health-care/`,
    featured: true,
  },
  {
    slug: 'medicaid-medicare-coverage-home-care-maryland',
    title: 'A Guide to Medicaid and Medicare Coverage for Home Care in Maryland',
    date: '2025-05-06',
    dateFormatted: 'May 6, 2025',
    excerpt: 'Navigating healthcare coverage can feel overwhelming. Here\'s what Medicaid and Medicare cover for home care services in Maryland.',
    category: 'Maryland Home Care',
    externalUrl: `${WP}/a-guide-to-medicaid-and-medicare-coverage-for-home-care-in-maryland/`,
    featured: true,
  },
  {
    slug: 'top-qualities-great-caregiver',
    title: 'Top Qualities of a Great Caregiver: Building Relationships with Clients',
    date: '2025-05-06',
    dateFormatted: 'May 6, 2025',
    excerpt: 'Caregiving is more than just a service — it\'s a relationship built on trust, empathy, and respect. What makes a great caregiver truly great.',
    category: 'Caregiver Tips',
    externalUrl: `${WP}/top-qualities-of-a-great-caregiver-building-relationships-with-clients/`,
  },
  {
    slug: 'self-care-family-caregivers',
    title: 'Self-Care for Family Caregivers – Finding Balance and Support',
    date: '2025-05-06',
    dateFormatted: 'May 6, 2025',
    excerpt: 'Being a family caregiver is an act of love — but it can also be emotionally and physically draining. How to find balance and protect your own wellbeing.',
    category: 'Family Resources',
    externalUrl: `${WP}/self-care-for-family-caregivers-finding-balance-and-support/`,
  },
  {
    slug: 'homecare-help-age-gracefully-maryland',
    title: 'How Homecare Can Help You Age Gracefully in Maryland',
    date: '2025-05-06',
    dateFormatted: 'May 6, 2025',
    excerpt: 'Aging gracefully is about maintaining independence, dignity, and quality of life. How home care services in Maryland support this goal.',
    category: 'Maryland Home Care',
    externalUrl: `${WP}/how-homecare-can-help-you-age-gracefully-in-maryland/`,
  },
  {
    slug: 'thyroid-symptoms-seniors',
    title: 'How to Spot Thyroid Symptoms in Seniors',
    date: '2025-01-20',
    dateFormatted: 'January 20, 2025',
    excerpt: 'Every year, millions of seniors experience unexplained changes in their health. Thyroid conditions are more common among adults over 60 than most people realize.',
    category: 'Senior Health',
    externalUrl: `${WP}/how-to-spot-thyroid-symptoms-in-seniors/`,
  },
  // ── 2024 (Jan) ────────────────────────────────────────────────────
  {
    slug: 'seniors-leprosy-symptoms-care',
    title: 'Symptoms, Care & Support Tips for Seniors with Leprosy',
    date: '2025-01-20',
    dateFormatted: 'January 20, 2025',
    excerpt: 'While treatment has made significant strides, the impact of leprosy on seniors remains a topic many caregivers need to understand.',
    category: 'Senior Health',
    externalUrl: `${WP}/symptoms-care-support-tips-for-seniors-with-leprosy/`,
  },
  {
    slug: 'new-year-wellness-resolutions-seniors',
    title: 'New Year Wellness Resolutions for Seniors',
    date: '2025-01-20',
    dateFormatted: 'January 20, 2025',
    excerpt: 'As we turn the page to a new year, seniors reflect on cherished memories and plan what lies ahead. Practical wellness resolutions that actually stick.',
    category: 'Senior Health',
    externalUrl: `${WP}/new-year-wellness-resolutions-for-seniors/`,
  },
  {
    slug: 'healthy-weight-tips-seniors-caregivers',
    title: 'Healthy Weight Goal Tips for Seniors and Caregivers',
    date: '2025-01-20',
    dateFormatted: 'January 20, 2025',
    excerpt: 'Seniors face unique challenges with weight management. Many factors — genes, age, medications — affect weight in ways that require specific approaches.',
    category: 'Senior Health',
    externalUrl: `${WP}/healthy-weight-goal-tips-for-seniors-and-caregivers/`,
  },
  {
    slug: 'eye-injuries-seniors-prevention',
    title: 'Common Causes of Eye Injuries in Seniors and How to Prevent Them',
    date: '2025-01-20',
    dateFormatted: 'January 20, 2025',
    excerpt: 'Good vision in seniors is critical to prevent vision loss and maintain independence. Understanding the most common causes of eye injuries and how to prevent them.',
    category: 'Senior Health',
    externalUrl: `${WP}/common-causes-of-eye-injuries-in-seniors-and-how-to-prevent-them/`,
  },
  {
    slug: 'cervical-cancer-screening-older-women',
    title: 'Why Cervical Cancer Screening Still Matters for Older Women',
    date: '2025-01-20',
    dateFormatted: 'January 20, 2025',
    excerpt: 'According to the WHO, cervical cancer is the fourth most common cancer in women globally. Why screening remains critical for older women.',
    category: 'Senior Health',
    externalUrl: `${WP}/why-cervical-cancer-screening-still-matters-for-older-women/`,
  },
  // ── 2024 (Dec) ────────────────────────────────────────────────────
  { slug: 'promoting-inclusivity-aids-treatment', title: 'Promoting Inclusivity in AIDS Treatment', date: '2024-12-09', dateFormatted: 'December 9, 2024', excerpt: 'World AIDS Day is observed every year on December 1st to raise awareness and show support for people living with HIV/AIDS.', category: 'Senior Health', externalUrl: `${WP}/promoting-inclusivity-in-aids-treatment/` },
  { slug: 'promoting-independence-disabilities', title: 'Promoting Independence for People Living with Disabilities', date: '2024-12-09', dateFormatted: 'December 9, 2024', excerpt: 'Living with a disability can present many challenges — but it doesn\'t mean a person has to lose their independence.', category: 'Family Resources', externalUrl: `${WP}/promoting-independence-for-people-living-with-disabilities/` },
  { slug: 'digestive-health-elderly', title: 'How to Manage Digestive Health in the Elderly', date: '2024-12-09', dateFormatted: 'December 9, 2024', excerpt: 'On November 30th, the world observes International Day of Constipation. Digestive health is a key but often overlooked aspect of senior wellness.', category: 'Senior Health', externalUrl: `${WP}/how-to-manage-digestive-health-in-the-elderly/` },
  { slug: 'crohns-disease-colitis-symptoms', title: 'Understanding Symptoms & Finding Relief for Crohn\'s Disease and Colitis', date: '2024-12-09', dateFormatted: 'December 9, 2024', excerpt: 'Crohn\'s disease and ulcerative colitis affect an estimated 3 million Americans. What families and caregivers need to know about IBD.', category: 'Senior Health', externalUrl: `${WP}/understanding-symptoms-finding-relief-for-crohns-disease-and-colitis/` },
  { slug: 'influenza-vaccination-elderly', title: 'Importance of Influenza Vaccination for the Elderly', date: '2024-12-09', dateFormatted: 'December 9, 2024', excerpt: 'Flu is a serious viral infection that can lead to life-threatening complications in older adults. Why vaccination is especially important for seniors.', category: 'Senior Health', externalUrl: `${WP}/importance-of-influenza-vaccination-for-the-elderly/` },
  { slug: 'protect-elderly-winter', title: 'How to Protect the Elderly in Winter', date: '2024-12-09', dateFormatted: 'December 9, 2024', excerpt: 'As winter sets in, cold weather brings unique challenges for older adults. Practical guidance on keeping seniors safe when temperatures drop.', category: 'Senior Health', externalUrl: `${WP}/how-to-protect-the-elderly-in-winter/` },
  // ── 2024 (Nov) ────────────────────────────────────────────────────
  { slug: 'radiography-cancer-detection-seniors', title: 'The Role of Radiography in Cancer Detection for Seniors', date: '2024-11-18', dateFormatted: 'November 18, 2024', excerpt: 'As we grow older, the likelihood of developing cancer increases. How imaging technology can benefit older adults through early detection.', category: 'Senior Health', externalUrl: `${WP}/the-role-of-radiography-in-cancer-detection-a-crucial-resource-for-seniors/` },
  { slug: 'vision-aids-seniors-keratoconus', title: 'Vision Aids for Seniors with Keratoconus', date: '2024-11-18', dateFormatted: 'November 18, 2024', excerpt: 'For seniors, conditions like keratoconus can significantly impact daily life. Understanding the options for maintaining good vision.', category: 'Senior Health', externalUrl: `${WP}/vision-aids-for-seniors-with-keratoconus/` },
  { slug: 'home-healthcare-epilepsy-management-seniors', title: 'How Home Healthcare Can Help Epilepsy Management in Seniors', date: '2024-11-18', dateFormatted: 'November 18, 2024', excerpt: 'As we approach National Epilepsy Day, it\'s crucial to raise awareness about epilepsy in seniors — and how home care can support management.', category: 'Senior Health', externalUrl: `${WP}/how-home-healthcare-can-help-epilepsy-management-in-seniors/` },
  { slug: 'copd-lifestyle-changes-seniors', title: 'Lifestyle Changes to Manage COPD in Seniors', date: '2024-11-18', dateFormatted: 'November 18, 2024', excerpt: 'COPD is a progressive lung disease that significantly impacts the lives of seniors. Practical lifestyle changes that can improve quality of life.', category: 'Senior Health', externalUrl: `${WP}/lifestyle-changes-to-manage-copd-in-seniors/` },
  { slug: 'managing-diabetes-seniors', title: 'Tips for Managing Diabetes in Seniors', date: '2024-11-18', dateFormatted: 'November 18, 2024', excerpt: 'Diabetes can significantly impact a senior\'s quality of life — but with the right approach, it can be managed effectively at home.', category: 'Senior Health', externalUrl: `${WP}/tips-for-managing-diabetes-in-seniors/` },
  { slug: 'pneumonia-prevention-seniors', title: 'Pneumonia Prevention for Seniors', date: '2024-11-18', dateFormatted: 'November 18, 2024', excerpt: 'Pneumonia is a serious lung infection that becomes especially dangerous as we age. What seniors and caregivers need to know about prevention.', category: 'Senior Health', externalUrl: `${WP}/pneumonia-prevention-for-seniors/` },
  // ── 2024 (Oct) ────────────────────────────────────────────────────
  { slug: 'health-literacy-preventing-chronic-conditions', title: 'The Role of Health Literacy in Preventing Chronic Conditions', date: '2024-10-07', dateFormatted: 'October 7, 2024', excerpt: 'October is Health Literacy Month. Accurate health education is one of the most powerful tools for preventing chronic disease.', category: 'Family Resources', externalUrl: `${WP}/the-role-of-health-literacy-in-preventing-chronic-conditions/` },
  { slug: 'dental-hygiene-seniors', title: 'Dental Hygiene for Seniors: Tips for Maintaining Oral Health in Later Life', date: '2024-10-07', dateFormatted: 'October 7, 2024', excerpt: 'As we age, dental hygiene becomes increasingly important. Poor oral health in seniors is linked to serious systemic conditions.', category: 'Senior Health', externalUrl: `${WP}/dental-hygiene-for-seniors-tips-for-maintaining-oral-health-in-later-life/` },
  { slug: 'cleaning-disinfection-preventing-infections', title: 'The Role of Cleaning and Disinfection in Preventing Infections', date: '2024-10-07', dateFormatted: 'October 7, 2024', excerpt: 'Infections spread directly and indirectly. How proper cleaning and disinfection in the home significantly reduces infection risk for seniors.', category: 'Caregiver Tips', externalUrl: `${WP}/the-role-of-cleaning-and-disinfection-in-preventing-infections/` },
  { slug: 'older-adults-higher-risk-flu-season', title: 'Why Older Adults Are at Higher Risk During Flu Season', date: '2024-10-07', dateFormatted: 'October 7, 2024', excerpt: 'Flu season brings serious risk for older adults. Understanding why seniors are more vulnerable — and what to do about it.', category: 'Senior Health', externalUrl: `${WP}/why-older-adults-are-at-higher-risk-during-flu-season/` },
  { slug: 'long-term-effects-meningitis', title: 'Long-Term Effects of Meningitis', date: '2024-10-01', dateFormatted: 'October 1, 2024', excerpt: 'Meningitis is a serious infection of the membranes covering the brain and spinal cord. Understanding the lasting impact on recovery and daily life.', category: 'Senior Health', externalUrl: `${WP}/long-term-effects-of-meningitis/` },
  // ── 2024 (Sep) ────────────────────────────────────────────────────
  { slug: 'organ-donation-myths-facts', title: 'Debunking the Myths and Sharing the Facts on Organ Donation', date: '2024-09-23', dateFormatted: 'September 23, 2024', excerpt: 'Organ Donation Week runs September 23–29. Clearing up misconceptions and sharing the facts that could save a life.', category: 'Family Resources', externalUrl: `${WP}/debunking-the-myths-and-sharing-the-facts-on-organ-donation/` },
  { slug: 'sepsis-awareness-symptoms-prevention', title: 'Sepsis Awareness: Symptoms, Diagnosis and Prevention', date: '2024-09-16', dateFormatted: 'September 16, 2024', excerpt: 'Sepsis is a life-threatening condition that can occur when the immune system overreacts to infection. Know the signs and how to respond fast.', category: 'Senior Health', externalUrl: `${WP}/sepsis-awareness-symptoms-diagnosis-and-prevention/` },
  { slug: 'first-aid-awareness-health-crisis-preparedness', title: 'Creating First Aid Awareness and Celebrating Health Crisis Preparedness', date: '2024-09-16', dateFormatted: 'September 16, 2024', excerpt: 'World First Aid Day promotes the importance of first aid in saving lives. What every caregiver and family member should know.', category: 'Caregiver Tips', externalUrl: `${WP}/creating-first-aid-awareness-and-celebrating-health-crisis-preparedness/` },
  { slug: 'world-rabies-day', title: 'World Rabies Day: Health for One, Health for All', date: '2024-09-16', dateFormatted: 'September 16, 2024', excerpt: 'World Rabies Day on September 28th raises awareness about rabies prevention — especially important for seniors and those who spend time outdoors.', category: 'Senior Health', externalUrl: `${WP}/world-rabies-day-health-for-one-health-for-all/` },
  { slug: 'home-exercises-pain-relief', title: '5 Simple At-Home Exercises for Pain Relief', date: '2024-09-08', dateFormatted: 'September 8, 2024', excerpt: 'Movement has proven to improve quality of life in many ways. Five gentle exercises seniors can do at home to manage pain and stay active.', category: 'Senior Health', externalUrl: `${WP}/5-simple-at-home-exercises-for-pain-relief/` },
  { slug: 'dangers-diagnostic-errors', title: 'Dangers of Diagnostic Errors and How to Stay Protected', date: '2024-09-01', dateFormatted: 'September 1, 2024', excerpt: 'September 17th is Patient Safety Day. Diagnostic errors affect millions of patients. How to advocate for yourself or your loved one in the healthcare system.', category: 'Family Resources', externalUrl: `${WP}/dangers-of-diagnostic-errors-and-how-to-stay-protected/` },
  // ── 2024 (Aug) ────────────────────────────────────────────────────
  { slug: 'cavernoma-symptoms-causes-treatment', title: 'Symptoms, Causes & Treatment for Cavernoma', date: '2024-08-12', dateFormatted: 'August 12, 2024', excerpt: 'A cavernoma is a type of vascular abnormality in the brain or spinal cord. What families and caregivers need to know about this condition.', category: 'Senior Health', externalUrl: `${WP}/symptoms-causes-treatment-for-cavernoma/` },
  { slug: 'navigating-loss-and-grief', title: 'Helpful Tips on Navigating Loss and Grief', date: '2024-08-12', dateFormatted: 'August 12, 2024', excerpt: 'August is National Grief Awareness Month. Understanding the profound impact of loss — and practical ways to support yourself and your loved ones through it.', category: 'Family Resources', externalUrl: `${WP}/helpful-tips-on-navigating-loss-and-grief/` },
  { slug: 'taking-action-psoriasis', title: 'Taking Action on Psoriasis', date: '2024-08-12', dateFormatted: 'August 12, 2024', excerpt: 'August is Psoriasis Awareness Month. Raising awareness to help those affected feel supported and understood.', category: 'Senior Health', externalUrl: `${WP}/taking-action-on-psoriasis/` },
  { slug: 'what-to-know-about-gastroparesis', title: 'What You Need to Know About Gastroparesis', date: '2024-08-07', dateFormatted: 'August 7, 2024', excerpt: 'Digestion is essential for breaking down food into nutrients. Understanding gastroparesis — a condition where the stomach cannot empty properly.', category: 'Senior Health', externalUrl: `${WP}/what-you-need-to-know-about-gastroparesis/` },
  { slug: 'honoring-aged-care-employees', title: 'Honoring Aged Care Employees on Their Special Day', date: '2024-08-02', dateFormatted: 'August 2, 2024', excerpt: 'August is the month we honor aged care employees. A moment to express our deepest gratitude for the dedication of caregivers everywhere.', category: 'Company News', externalUrl: `${WP}/honoring-aged-care-employees-on-their-special-day/` },
  // ── 2024 (Jul) ────────────────────────────────────────────────────
  { slug: 'reduce-risk-hepatitis', title: 'Six Ways to Reduce the Risk of Hepatitis', date: '2024-07-15', dateFormatted: 'July 15, 2024', excerpt: 'July 28 is World Hepatitis Day. Six practical steps seniors and caregivers can take to reduce hepatitis risk.', category: 'Senior Health', externalUrl: `${WP}/six-ways-to-reduce-the-risk-of-hepatitis/` },
  { slug: 'four-ways-care-for-eyes-as-we-age', title: 'Four Ways to Care for Our Eyes as We Age', date: '2024-07-15', dateFormatted: 'July 15, 2024', excerpt: 'July is Healthy Vision Month. Four evidence-based practices for protecting and preserving vision as we get older.', category: 'Senior Health', externalUrl: `${WP}/four-ways-to-care-for-our-eyes-as-we-age/` },
  { slug: 'effects-too-much-iron-body', title: 'Effects of Too Much Iron in the Body', date: '2024-07-15', dateFormatted: 'July 15, 2024', excerpt: 'Most people know about low iron — but excess iron can be equally harmful. What seniors and caregivers need to know about iron overload.', category: 'Senior Health', externalUrl: `${WP}/effects-of-too-much-iron-in-the-body/` },
  { slug: 'self-care-practices-burnout', title: 'Five Self-Care Practices That Could Help with Burnout', date: '2024-07-10', dateFormatted: 'July 10, 2024', excerpt: 'In today\'s fast-paced world, caregiver burnout is real and dangerous. Five practices that can help caregivers and families find balance.', category: 'Caregiver Tips', externalUrl: `${WP}/five-self-care-practices-that-could-help-with-burn-out/` },
  { slug: 'what-is-sarcoma', title: 'What Is Sarcoma & How Can I Reduce Its Risk?', date: '2024-07-08', dateFormatted: 'July 8, 2024', excerpt: 'Sarcoma is a general term for cancers in bones and soft tissues. Approximately 16,000 sarcoma diagnoses occur each year in the US.', category: 'Senior Health', externalUrl: `${WP}/what-is-sarcoma-how-can-i-reduce-its-risk/` },
  { slug: 'summer-survival-guide-seniors', title: 'Summer Survival Guide for Seniors', date: '2024-07-02', dateFormatted: 'July 2, 2024', excerpt: 'Summer brings heat, activity, and outdoor fun — but also serious risks for older adults. A practical guide to staying safe and healthy in the heat.', category: 'Senior Health', externalUrl: `${WP}/summer-survival-guide-for-seniors/` },
  // ── 2024 (Jun) ────────────────────────────────────────────────────
  { slug: 'kidney-cancer-awareness', title: 'The Power of Listening: Kidney Cancer Awareness', date: '2024-06-10', dateFormatted: 'June 10, 2024', excerpt: 'World Kidney Cancer Day 2024 theme is "listening" — highlighting shared decision making and helping patients feel empowered in their care.', category: 'Senior Health', externalUrl: `${WP}/the-power-of-listening-kidney-cancer-awareness/` },
  { slug: 'international-mens-health-week', title: 'International Men\'s Health Week', date: '2024-06-10', dateFormatted: 'June 10, 2024', excerpt: 'Men\'s Health Week was created to raise awareness of preventable diseases and encourage early detection among men and boys.', category: 'Senior Health', externalUrl: `${WP}/international-mens-health-week/` },
  { slug: 'alzheimers-brain-awareness', title: 'Alzheimer\'s and Brain Awareness', date: '2024-06-10', dateFormatted: 'June 10, 2024', excerpt: 'Alzheimer\'s is a form of dementia characterized by progressive memory loss and cognitive decline. What families need to know this awareness month.', category: 'Senior Health', externalUrl: `${WP}/alzheimers-and-brain-awareness/` },
  { slug: 'yoga-for-humanity', title: 'Yoga for Humanity', date: '2024-06-10', dateFormatted: 'June 10, 2024', excerpt: 'The International Day of Yoga is celebrated annually on June 21st. How yoga supports the physical and mental wellbeing of older adults.', category: 'Senior Health', externalUrl: `${WP}/yoga-for-humanity/` },
  { slug: 'mental-wellbeing-preventing-chronic-illness', title: 'Mental Well-Being for Preventing Chronic Illness', date: '2024-06-02', dateFormatted: 'June 2, 2024', excerpt: 'National Safety Month in June promotes safety and quality of life. The connection between mental health and chronic disease prevention.', category: 'Senior Health', externalUrl: `${WP}/mental-well-being-for-preventing-chronic-illness/` },
  { slug: 'brain-tumor-awareness-day', title: 'Brain Tumor Awareness Day', date: '2024-06-01', dateFormatted: 'June 1, 2024', excerpt: 'Over a million Americans are living with brain tumors. Understanding the types, survival rates, and how home care supports recovery.', category: 'Senior Health', externalUrl: `${WP}/brain-tumor-awareness-day/` },
  // ── 2024 (May) ────────────────────────────────────────────────────
  { slug: 'chit-chat-with-mr-o', title: 'A Captivating Chit-Chat with "Mr. O" — President & Founder of Vitalis HealthCare', date: '2024-05-20', dateFormatted: 'May 20, 2024', excerpt: 'We sat down with Okezie Ofoegbu ("Mr. O") to give you an insight into the heart and mind of the founder of Vitalis HealthCare Services.', category: 'Company News', externalUrl: `${WP}/a-captivating-chit-chat-with-mr-o-president-founder-of-vitalis-healthcare-services/`, featured: true },
  { slug: 'signs-its-time-to-hire-caregiver', title: 'Signs It\'s Time to Hire a Caregiver', date: '2024-05-13', dateFormatted: 'May 13, 2024', excerpt: 'About 40% of seniors need some form of assistive care. Five clear signs that it might be time to bring a professional caregiver into your loved one\'s life.', category: 'Family Resources', externalUrl: `${WP}/signs-its-time-to-hire-a-caregiver/`, featured: true },
  { slug: 'womens-health-week-menopause', title: 'National Women\'s Health Week: Let\'s Talk About Menopause', date: '2024-05-12', dateFormatted: 'May 12, 2024', excerpt: 'Celebrating the health and well-being of elderly women by discussing menopause — what it means, its symptoms, and tips for managing them.', category: 'Senior Health', externalUrl: `${WP}/national-womens-health-week-lets-talk-about-menopause/` },
  { slug: 'happy-nurses-week', title: 'Happy Nurses Week – May 6–12', date: '2024-05-06', dateFormatted: 'May 6, 2024', excerpt: 'Celebrating the nurses whose dedication, skill, and compassion make better care possible — at Vitalis and everywhere.', category: 'Company News', externalUrl: `${WP}/happy-nurses-week-may-6-may-12/` },
  { slug: 'spring-season-health-concerns-seniors', title: 'The Spring Season and Health Concerns for Seniors', date: '2024-05-05', dateFormatted: 'May 5, 2024', excerpt: 'For seniors, the transition to spring can bring about specific health concerns that require attention. What to watch for as the seasons change.', category: 'Senior Health', externalUrl: `${WP}/the-spring-season-and-health-concerns-for-seniors/` },
  { slug: 'ageing-gracefully-mental-health', title: 'Ageing Gracefully and Nurturing Mental Health', date: '2024-05-03', dateFormatted: 'May 3, 2024', excerpt: 'As you age, you may face life changes that impact mental health — losing a loved one, coping with illness. How to navigate them with resilience.', category: 'Senior Health', externalUrl: `${WP}/ageing-gracefully-and-nurturing-mental-health/` },
  { slug: 'celebrating-older-americans-month', title: 'Celebrating Older Americans Month: Social Connection for Health and Well-Being', date: '2024-05-01', dateFormatted: 'May 1, 2024', excerpt: 'Every May, the Administration of Community Living celebrates Older Americans Month. This year\'s theme: "Powered by Connection."', category: 'Senior Health', externalUrl: `${WP}/celebrating-older-americans-month-social-connection-for-the-health-and-well-being-of-older-adults/` },
  // ── 2024 (Mar) ────────────────────────────────────────────────────
  { slug: 'critical-elements-post-hospitalization-home-care', title: 'Critical Elements of Post-Hospitalization Home Care', date: '2024-03-29', dateFormatted: 'March 29, 2024', excerpt: 'Post-hospitalization home care involves a range of critical elements to ensure the patient\'s recovery. Key components every family should know.', category: 'Family Resources', externalUrl: `${WP}/critical-elements-of-post-hospitalization-home-care/` },
  { slug: 'infection-control-prevention-at-home', title: 'Infection Control and Prevention at Home', date: '2024-03-07', dateFormatted: 'March 7, 2024', excerpt: 'Infection control and prevention at home are essential for maintaining a healthy environment for seniors. Key practices to follow.', category: 'Caregiver Tips', externalUrl: `${WP}/infection-control-and-prevention-at-home/` },
  { slug: 'how-to-prevent-falls-in-your-home', title: 'How to Prevent Falls in Your Home', date: '2024-03-05', dateFormatted: 'March 5, 2024', excerpt: 'Preventing falls at home is crucial for the safety of older people. Practical tips to help prevent falls — the leading cause of serious injury in seniors.', category: 'Family Resources', externalUrl: `${WP}/how-to-prevent-falls-in-your-home/`, featured: true },
  { slug: 'manage-care-wounds-at-home', title: 'How to Manage and Care for Wounds at Home', date: '2024-03-03', dateFormatted: 'March 3, 2024', excerpt: 'Minor wounds like cuts or scrapes can be treated at home. When to treat at home and when to seek professional care.', category: 'Caregiver Tips', externalUrl: `${WP}/how-to-manage-and-care-for-wounds-at-home/` },
  // ── 2024 (Jan) ────────────────────────────────────────────────────
  { slug: 'caregiver-abuse-what-it-is', title: 'Caregiver Abuse – What It Is and How to Respond to It', date: '2024-01-31', dateFormatted: 'January 31, 2024', excerpt: 'Much attention is given to abuse of care recipients — but caregivers can also be abused by their clients. How to identify and address it.', category: 'Caregiver Tips', externalUrl: `${WP}/caregiver-abuse-what-it-is-and-how-to-respond-to-it/` },
  { slug: 'vitalis-bags-best-of-homecare-award', title: 'Vitalis HealthCare Bags Best of Home Care Award Third Year in a Row', date: '2024-01-31', dateFormatted: 'January 31, 2024', excerpt: 'We are pleased to announce that Vitalis HealthCare has won the Best of Home Care Employer of Choice Award for outstanding caregiver satisfaction ratings.', category: 'Company News', externalUrl: `${WP}/vitalis-healthcare-bags-best-of-homecare-award-third-year-in-a-row/`, featured: true },
  { slug: 'how-to-care-for-mental-health-as-you-age', title: 'How to Care for Your Mental Health as You Age', date: '2024-01-25', dateFormatted: 'January 25, 2024', excerpt: 'Mental health is a state of wellness that enables us to cope with stress and contribute to our community. How aging affects mental health and what to do about it.', category: 'Senior Health', externalUrl: `${WP}/how-to-care-for-your-mental-health-as-you-age/` },
  { slug: 'responsibilities-as-home-care-recipient', title: 'Your Responsibilities as a Home Care Recipient', date: '2024-01-18', dateFormatted: 'January 18, 2024', excerpt: 'Knowing your responsibilities as a homecare recipient is just as important as knowing your rights. The other side of the coin for a positive home care experience.', category: 'Family Resources', externalUrl: `${WP}/your-responsibilities-as-a-home-care-recipient/` },
  { slug: 'signs-of-elder-care-abuse', title: 'Signs of Elder Care Abuse', date: '2024-01-18', dateFormatted: 'January 18, 2024', excerpt: 'Elder care abuse is an intentional act of negligence or carelessness toward an older person under care. The signs to watch for and how to respond.', category: 'Family Resources', externalUrl: `${WP}/signs-of-elder-care-abuse/` },
  { slug: 'your-rights-as-homecare-recipient', title: 'Your Rights as a Homecare Recipient', date: '2024-01-18', dateFormatted: 'January 18, 2024', excerpt: 'As a home care patient or recipient, you have rights that ensure your wellbeing, dignity, and quality of care are preserved and up to standard.', category: 'Family Resources', externalUrl: `${WP}/your-rights-as-a-homecare-recipient/` },
  // ── 2023 ──────────────────────────────────────────────────────────
  { slug: '5-practices-post-hospital-recovery', title: '5 Practices to Boost Your Post-Hospital Recovery Process', date: '2023-12-11', dateFormatted: 'December 11, 2023', excerpt: 'Recovering after being discharged from hospital requires patience, compassion, and dedication. Five practices that can significantly boost recovery.', category: 'Family Resources', externalUrl: `${WP}/5-practices-to-boost-your-post-hospital-recovery-process/` },
  { slug: 'personal-hygiene-tips-aging-persons', title: 'Personal Hygiene Tips for Aging Persons', date: '2023-12-04', dateFormatted: 'December 4, 2023', excerpt: 'Good personal hygiene is about keeping the body clean to prevent germs and infections. Why it\'s especially important — and challenging — for aging adults.', category: 'Caregiver Tips', externalUrl: `${WP}/personal-hygiene-tips-for-aging-persons/` },
  { slug: 'consequences-of-unprofessionalism-caregivers', title: 'Consequences of Unprofessionalism for Caregivers', date: '2023-11-28', dateFormatted: 'November 28, 2023', excerpt: 'Not adhering to ethical standards has far-reaching consequences for clients, organizations, and caregivers themselves. Understanding why professionalism matters.', category: 'Caregiver Tips', externalUrl: `${WP}/consequences-of-unprofessionalism-for-caregivers/` },
  { slug: 'caregiving-needs-recovering-cancer-patients', title: 'Caregiving Needs for Recovering Cancer Patients', date: '2023-11-28', dateFormatted: 'November 28, 2023', excerpt: 'Providing care for recovering cancer patients involves addressing various physical, emotional, and practical needs. A guide for caregivers.', category: 'Caregiver Tips', externalUrl: `${WP}/caregiving-needs-for-recovering-cancer-patients/` },
  { slug: 'what-to-look-for-hiring-live-in-caregiver', title: 'What to Look Out for When Hiring a Live-In Caregiver', date: '2023-11-28', dateFormatted: 'November 28, 2023', excerpt: 'If you\'re considering hiring a live-in caregiver for yourself or a loved one, here are the most important things to look for in the process.', category: 'Family Resources', externalUrl: `${WP}/what-to-look-out-for-when-hiring-a-live-in-caregiver/` },
  { slug: 'benefits-hiring-caregiver-home-care-agency', title: 'Benefits of Hiring a Caregiver from a Home Care Agency', date: '2023-11-20', dateFormatted: 'November 20, 2023', excerpt: 'Choosing between a private caregiver and a home care agency? Understanding the meaningful advantages of going through an agency.', category: 'Family Resources', externalUrl: `${WP}/benefits-of-hiring-a-caregiver-from-a-home-care-agency/` },
  { slug: 'typical-needs-requiring-caregiver-services', title: 'Typical Needs That May Require Caregiver Services', date: '2023-11-15', dateFormatted: 'November 15, 2023', excerpt: 'Caregiving needs are diverse and can be tailored to fit unique needs based on specific conditions. Understanding what kinds of help home care provides.', category: 'Family Resources', externalUrl: `${WP}/typical-needs-that-may-require-caregiver-services/` },
  { slug: 'professional-ethics-caregiver', title: 'Essential Professional Ethics to Adopt as a Caregiver', date: '2023-11-09', dateFormatted: 'November 9, 2023', excerpt: 'Adherence to professional ethics is essential to providing care that ensures the dignity, safety and well-being of every client.', category: 'Caregiver Tips', externalUrl: `${WP}/essential-professional-ethics-to-adopt-as-a-caregiver/` },
  { slug: '5-types-of-care-for-elderly', title: '5 Types of Care for the Elderly', date: '2023-11-02', dateFormatted: 'November 2, 2023', excerpt: 'Elderly care is specialized care designed to meet the unique needs of older adults. The five main types and how to choose the right one.', category: 'Family Resources', externalUrl: `${WP}/5-types-of-care-for-the-elderly/` },
  { slug: 'tips-choosing-right-caregiver', title: 'Tips for Choosing the Right Caregiver for You', date: '2023-10-30', dateFormatted: 'October 30, 2023', excerpt: 'Choosing a caregiver who is the right fit is very important — it can greatly contribute to comfort, well-being, safety, and overall satisfaction.', category: 'Family Resources', externalUrl: `${WP}/tips-for-choosing-the-right-caregiver-for-you/` },
  { slug: 'benefits-companion-care-elderly', title: 'Benefits of Companion Care for the Elderly', date: '2023-10-29', dateFormatted: 'October 29, 2023', excerpt: 'Companion caregiving focuses on providing companionship for people who are lonely, ill, or disabled. The evidence-backed benefits for older adults.', category: 'Family Resources', externalUrl: `${WP}/benefits-of-companion-care-for-the-elderly/` },
  { slug: 'recognize-sexual-harassment-caregiver', title: 'How to Recognize Sexual Harassment as a Caregiver', date: '2023-10-23', dateFormatted: 'October 23, 2023', excerpt: 'Sexual harassment can be covert and difficult to identify. Helping caregivers recognize the warning signs and know their rights.', category: 'Caregiver Tips', externalUrl: `${WP}/how-to-recognize-sexual-harassment-as-a-caregiver/` },
  { slug: '5-ways-caregiving-helps-stroke-recovery', title: '5 Ways Caregiving Can Help Recovery for Stroke Patients', date: '2023-10-23', dateFormatted: 'October 23, 2023', excerpt: 'Stroke sufferers face physical, cognitive, and emotional challenges. Five specific ways professional caregiving contributes to stroke recovery.', category: 'Family Resources', externalUrl: `${WP}/5-ways-caregiving-can-help-recovery-for-stroke-patients/` },
  { slug: '7-warning-signs-diabetes-older-adults', title: '7 Warning Signs of Diabetes in Older Adults', date: '2023-10-16', dateFormatted: 'October 16, 2023', excerpt: 'Diabetes symptoms in older adults can be so mild they go undetected. Seven warning signs every family and caregiver should know.', category: 'Senior Health', externalUrl: `${WP}/7-warning-signs-of-diabetes-in-older-adults/` },
  { slug: '5-ways-protect-yourself-sexual-harassment-caregiver', title: '5 Ways to Protect Yourself from Sexual Harassment as a Caregiver', date: '2023-10-06', dateFormatted: 'October 6, 2023', excerpt: 'Every caregiver should know how to protect themselves in the event of harassment by clients. Five practical steps to take.', category: 'Caregiver Tips', externalUrl: `${WP}/5-ways-to-protect-yourself-from-sexual-harassment-as-a-caregiver/` },
  { slug: 'protect-elderly-covid-19', title: 'How to Protect the Elderly from the COVID-19 Virus', date: '2023-10-06', dateFormatted: 'October 6, 2023', excerpt: 'For older people with underlying and chronic health issues, protection from COVID-19 is especially critical. Practical guidance for seniors and caregivers.', category: 'Senior Health', externalUrl: `${WP}/how-to-protect-the-elderly-from-the-covid-19-virus/` },
  { slug: 'how-to-detect-early-signs-of-dementia', title: 'How to Detect Early Signs of Dementia', date: '2023-09-25', dateFormatted: 'September 25, 2023', excerpt: 'Dementia is characterized by memory loss, confusion, and cognitive decline. Recognizing the early signs can significantly change outcomes for your loved one.', category: 'Senior Health', externalUrl: `${WP}/how-to-detect-early-signs-of-dementia/`, featured: true },
  { slug: 'how-to-become-personal-caregiver-usa', title: 'How to Become a Personal Caregiver in the United States', date: '2023-09-25', dateFormatted: 'September 25, 2023', excerpt: 'Becoming a caregiver is a noble, lucrative, and high-demand profession. What you need to know to qualify as a caregiver in the United States.', category: 'Caregiver Tips', externalUrl: `${WP}/how-to-become-a-personal-caregiver-in-the-united-states-of-america/` },
  { slug: '6-signs-aging-parents-need-caregiver', title: '6 Signs Your Aging Parents Need a Professional Caregiver', date: '2023-09-22', dateFormatted: 'September 22, 2023', excerpt: 'Aging often brings health complications beyond what family members can manage. Six clear signs it\'s time to bring in a professional.', category: 'Family Resources', externalUrl: `${WP}/6-signs-your-aging-parents-need-a-professional-personal-caregiver/` },
  { slug: '5-ways-manage-uti-older-adults', title: '5 Ways to Manage Urinary Tract Infections (UTIs) in Older Adults', date: '2023-09-22', dateFormatted: 'September 22, 2023', excerpt: 'UTIs are very common in older adults and can lead to serious complications if untreated. Five effective approaches to prevention and management.', category: 'Senior Health', externalUrl: `${WP}/5-ways-to-manage-urinary-tract-infection-utis-in-older-adults/` },
  { slug: 'involvement-senior-care-loved-ones', title: 'Your Involvement in the Senior Care of Your Loved Ones', date: '2023-05-15', dateFormatted: 'May 15, 2023', excerpt: 'It can be mentally straining to handle all the responsibilities of caring for a loved one. Why staying involved in their home care matters.', category: 'Family Resources', externalUrl: `${WP}/your-involvement-in-the-senior-care-of-your-loved-ones/` },
  { slug: '5-reasons-hire-personal-care-assistance-silver-spring', title: '5 Reasons to Hire Personal Care Assistance Services in Silver Spring, Maryland', date: '2023-05-08', dateFormatted: 'May 8, 2023', excerpt: 'Do your parents need personal care assistance? Five compelling reasons to seek professional help for a loved one in Silver Spring, MD.', category: 'Maryland Home Care', externalUrl: `${WP}/5-reasons-to-hire-personal-care-assistance-services-in-silver-spring-maryland/` },
  { slug: 'convince-parents-receive-personal-care-assistance', title: 'How to Convince Your Parents to Receive Personal Care Assistance', date: '2023-05-01', dateFormatted: 'May 1, 2023', excerpt: 'Many families find that convincing a parent to accept home care is just as challenging as finding the right agency. Practical approaches that work.', category: 'Family Resources', externalUrl: `${WP}/how-to-convince-your-parents-to-receive-personal-care-assistance-services/` },
  { slug: 'convince-parents-personal-care-assistance-maryland', title: 'How to Convince Your Parents for Personal Care Assistance in Maryland', date: '2023-04-24', dateFormatted: 'April 24, 2023', excerpt: 'Once you find the right personal care assistance services, it\'s time to have the conversation with your parents. A guide for Maryland families.', category: 'Maryland Home Care', externalUrl: `${WP}/how-to-convince-your-parents-for-personal-care-assistance-services-in-maryland/` },
  { slug: 'how-to-keep-seniors-active-engaged-at-home', title: 'How to Keep Seniors Active & Engaged at Home', date: '2023-04-17', dateFormatted: 'April 17, 2023', excerpt: 'Staying engaged keeps seniors happy and healthy. Practical ideas for keeping your loved one active, stimulated, and connected to life at home.', category: 'Family Resources', externalUrl: `${WP}/how-to-keep-the-seniors-active-engaged-at-home/` },
  { slug: 'how-can-one-pay-for-home-health-care-maryland', title: 'How Can One Pay for Home Health Care in the State of Maryland?', date: '2023-04-10', dateFormatted: 'April 10, 2023', excerpt: 'Home health care can be a lifesaver for seniors who want to age in place. A guide to the payment options available in Maryland.', category: 'Maryland Home Care', externalUrl: `${WP}/how-can-one-pay-for-home-health-care-in-state-of-maryland/` },
  { slug: 'home-care-patient-early-onset-dementia', title: 'Providing Home Care to a Patient with Early Onset of Dementia', date: '2023-04-03', dateFormatted: 'April 3, 2023', excerpt: 'Providing home care to a patient with onset of dementia is challenging. With the right approach and support, it is possible to provide quality care.', category: 'Family Resources', externalUrl: `${WP}/providing-home-care-to-a-patient-with-early-onset-of-dementia/` },
  { slug: 'how-to-get-most-from-home-caregiver', title: 'How to Get the Most from Your Home Caregiver', date: '2023-03-27', dateFormatted: 'March 27, 2023', excerpt: 'Having a home caregiver can be a great way to ensure the best possible care. How families can build a productive, collaborative relationship with their caregiver.', category: 'Family Resources', externalUrl: `${WP}/how-to-get-the-most-from-your-home-caregiver/` },
  { slug: 'things-to-do-before-hiring-healthcare-aides', title: 'Things to Do Before Hiring Healthcare Residential Health Aides', date: '2023-03-20', dateFormatted: 'March 20, 2023', excerpt: 'Hiring a caregiver is a big decision. The important steps to take before signing any agreement to ensure your loved one receives proper care.', category: 'Family Resources', externalUrl: `${WP}/things-to-do-before-hiring-healthcare-residential-health-aides/` },
]

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured).slice(0, 6)
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((p) => p.category === category)
}

export function getRecentPosts(n = 9): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n)
}
