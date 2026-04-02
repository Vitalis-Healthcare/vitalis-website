import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vitalis HealthCare | Home Care in Silver Spring, MD',
    template: '%s | Vitalis HealthCare',
  },
  description:
    'Licensed, certified home care in Silver Spring and Montgomery County, MD. Companion care, personal care & skilled nursing. MDH OHCQ licensed & regulated. VA & Medicaid accepted. Call 240.716.6874.',
  metadataBase: new URL('https://www.vitalishealthcare.com'),
  openGraph: {
    type: 'website',
    siteName: 'Vitalis HealthCare Services',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
