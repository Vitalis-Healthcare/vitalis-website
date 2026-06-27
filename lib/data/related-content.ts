// Maps each service and condition page to relevant blog guides, and each
// condition to the services we use to support it. Used to add internal links
// from the money pages back into the blog (and into services), strengthening
// the topical cluster in both directions.
//
// Every slug below is confirmed to exist in content/blog/ at time of writing.

export interface RelatedArticle {
  slug: string
  title: string
}

export interface RelatedServiceLink {
  slug: string
  name: string
}

// page slug (condition OR service) -> blog guides
export const relatedArticles: Record<string, RelatedArticle[]> = {
  // ---- Conditions ----
  dementia: [
    { slug: 'how-home-care-can-improve-quality-of-life-for-seniors-with-dementia', title: 'How Home Care Can Improve Quality of Life for Seniors with Dementia' },
    { slug: 'how-to-detect-early-signs-of-dementia', title: 'How to Detect Early Signs of Dementia' },
    { slug: 'providing-home-care-to-a-patient-with-early-onset-of-dementia', title: 'Providing Home Care to a Patient with Early-Onset Dementia' },
  ],
  'post-surgery': [
    { slug: 'how-home-care-supports-recovery-after-surgery-or-hospitalization', title: 'How Home Care Supports Recovery After Surgery or Hospitalization' },
    { slug: 'critical-elements-of-post-hospitalization-home-care', title: 'Critical Elements of Post-Hospitalization Home Care' },
    { slug: '5-practices-to-boost-your-post-hospital-recovery-process', title: '5 Practices to Boost Your Post-Hospital Recovery Process' },
  ],
  stroke: [
    { slug: 'how-home-care-supports-recovery-after-stroke', title: 'How Home Care Supports Recovery After Stroke' },
    { slug: '5-ways-caregiving-can-help-recovery-for-stroke-patients', title: '5 Ways Caregiving Can Help Recovery for Stroke Patients' },
  ],
  'fall-prevention': [
    { slug: 'how-to-prevent-falls-in-your-home', title: 'How to Prevent Falls in Your Home' },
    { slug: 'staying-safe-at-home-tips-for-seniors-in-maryland', title: 'Staying Safe at Home: Tips for Seniors in Maryland' },
  ],
  // ---- Services ----
  'companion-care': [
    { slug: 'benefits-of-companion-care-for-the-elderly', title: 'Benefits of Companion Care for the Elderly' },
    { slug: 'how-to-keep-the-seniors-active-engaged-at-home', title: 'How to Keep Seniors Active & Engaged at Home' },
  ],
  'personal-care': [
    { slug: 'personal-hygiene-tips-for-aging-persons', title: 'Personal Hygiene Tips for Aging Persons' },
    { slug: '5-reasons-to-hire-personal-care-assistance-services-in-silver-spring-maryland', title: '5 Reasons to Hire Personal Care Assistance in Silver Spring, MD' },
  ],
  'skilled-nursing': [
    { slug: 'how-to-manage-and-care-for-wounds-at-home', title: 'How to Manage and Care for Wounds at Home' },
    { slug: '5-practices-to-boost-your-post-hospital-recovery-process', title: '5 Practices to Boost Your Post-Hospital Recovery Process' },
  ],
}

// condition slug -> services we use to support it
export const relatedServicesByCondition: Record<string, RelatedServiceLink[]> = {
  dementia: [
    { slug: 'companion-care', name: 'Companion Care' },
    { slug: 'personal-care', name: 'Personal Care' },
    { slug: 'skilled-nursing', name: 'Skilled Nursing' },
  ],
  'post-surgery': [
    { slug: 'skilled-nursing', name: 'Skilled Nursing' },
    { slug: 'personal-care', name: 'Personal Care' },
  ],
  stroke: [
    { slug: 'skilled-nursing', name: 'Skilled Nursing' },
    { slug: 'personal-care', name: 'Personal Care' },
  ],
  'fall-prevention': [
    { slug: 'personal-care', name: 'Personal Care' },
    { slug: 'companion-care', name: 'Companion Care' },
  ],
}

export function getRelatedArticles(slug: string): RelatedArticle[] {
  return relatedArticles[slug] ?? []
}

export function getRelatedServices(slug: string): RelatedServiceLink[] {
  return relatedServicesByCondition[slug] ?? []
}
