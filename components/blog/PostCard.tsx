import type { Post } from '@/lib/blog'

export const categories = [
  { key: 'Family Resources',        label: 'For Families',             desc: 'Guidance for families navigating home care decisions',                color: { bg: '#eaf3de', text: '#27500a', border: '#97c459' } },
  { key: 'Senior Health',           label: 'Senior Health',            desc: 'Health guidance, conditions, and wellness for older adults',           color: { bg: '#e6f1fb', text: '#185fa5', border: '#85b7eb' } },
  { key: 'Caregiver Tips',          label: 'Caregiver Tips',           desc: 'Professional advice for caregivers and home health aides',            color: { bg: '#faeeda', text: '#854f0b', border: '#fac775' } },
  { key: 'Maryland Home Care',      label: 'Maryland Home Care',       desc: 'Local resources, payment options, and Maryland-specific guides',      color: { bg: '#f3f9ec', text: '#3b6d11', border: '#c0dd97' } },
  { key: 'Dementia & Memory Care',  label: 'Dementia & Memory Care',   desc: 'Understanding dementia, Alzheimer\'s, and memory care at home',      color: { bg: '#f3eefa', text: '#5b3a8c', border: '#c4a8e6' } },
  { key: 'Post-Surgery & Recovery', label: 'Post-Surgery & Recovery',  desc: 'Recovering safely at home after surgery or hospitalization',          color: { bg: '#eef5f0', text: '#2d6e4f', border: '#8ec5a4' } },
  { key: 'Company News',            label: 'Company News',             desc: 'Awards, announcements, and updates from Vitalis HealthCare',          color: { bg: '#fbeaf0', text: '#993556', border: '#f4c0d1' } },
]

export function PostCard({ post, size = 'normal' }: { post: Post; size?: 'large' | 'normal' }) {
  const cat = categories.find(c => c.key === post.category)
  const color = cat?.color ?? { bg: '#eaf3de', text: '#27500a', border: '#97c459' }
  return (
    <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        border: '1px solid var(--border)',
        padding: size === 'large' ? '28px 26px' : '20px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        transition: 'border-color .15s',
      }}>
        <span style={{ display: 'inline-block', background: color.bg, color: color.text, border: `1px solid ${color.border}`, borderRadius: '20px', padding: '3px 12px', fontSize: '11px', fontWeight: 500, alignSelf: 'flex-start' }}>
          {post.category}
        </span>
        <h3 style={{ fontFamily: 'var(--font-lora),Georgia,serif', fontSize: size === 'large' ? '19px' : '15px', fontWeight: 500, color: 'var(--text)', lineHeight: 1.35, margin: 0 }}>
          {post.title}
        </h3>
        <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--muted)', flex: 1, margin: 0 }}>
          {post.excerpt.slice(0, size === 'large' ? 140 : 110)}{post.excerpt.length > (size === 'large' ? 140 : 110) ? '...' : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{post.dateFormatted}</span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--g-bd)' }}>Read →</span>
        </div>
      </div>
    </a>
  )
}
