import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Fraunces } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['SOFT', 'WONK'],
})

export const metadata: Metadata = {
  title: 'ReWarm — AI Lead Reactivation for Real Estate Agents',
  description:
    'ReWarm calls your cold leads automatically, qualifies them in 90 seconds, and live-transfers the hot ones to your phone.',
  openGraph: {
    title: 'ReWarm — AI Lead Reactivation for Real Estate Agents',
    description:
      'ReWarm calls your cold leads automatically, qualifies them in 90 seconds, and live-transfers the hot ones to your phone.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, jetbrainsMono.variable, fraunces.variable)}
    >
      <body className="bg-[#0A0A0A] text-[#FAFAFA] font-sans antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
