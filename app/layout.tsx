import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { DM_Sans } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import ChatWidget from '@/components/ChatWidget'
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
    title: 'Vitalis HealthCare | Home Care in Silver Spring, MD',
    description:
      'Licensed, certified home care in Silver Spring and Montgomery County, MD. Companion care, personal care & skilled nursing. MDH OHCQ licensed. Call 240.716.6874.',
    images: [
      {
        url: '/logo-full.png',
        width: 600,
        height: 200,
        alt: 'Vitalis HealthCare Services — Home Care in Silver Spring, MD',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Vitalis HealthCare | Home Care in Silver Spring, MD',
    description:
      'Licensed, certified home care in Silver Spring & Montgomery County, MD. Companion care, personal care & skilled nursing. Call 240.716.6874.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <ChatWidget />
      </body>
      <GoogleAnalytics gaId="G-LPWTD5L870" />
    </html>
  )
}
