import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'

import { LocaleProvider } from '@/components/locale-provider'
import { defaultLocale, isLocale, localeCookieName, siteCopy, type Locale } from '@/lib/site-copy'

import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(localeCookieName)?.value

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return {
    title: siteCopy[locale].metadata.title,
    description: siteCopy[locale].metadata.description,
    generator: 'v0.app',
    icons: {
      icon: [
        {
          url: '/favicon-triangle.png',
          type: 'image/png',
          sizes: '512x512',
        },
      ],
      shortcut: '/favicon-triangle.png',
      apple: '/logo_LQ.png',
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getRequestLocale()

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <LocaleProvider initialLocale={locale}>
          {children}
          <div
            className="elfsight-app-1a9a7b7d-ca85-4230-8c9f-24ca0e45ff67"
            data-elfsight-app-lazy
          />
          <Analytics />
        </LocaleProvider>
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
