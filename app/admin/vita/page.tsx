import type { Metadata } from 'next'
import VitaDashboard from './VitaDashboard'

export const metadata: Metadata = {
  title: 'Vita Dashboard — Vitalis HealthCare',
  robots: 'noindex, nofollow',
}

export default function VitaAdminPage() {
  return <VitaDashboard />
}
