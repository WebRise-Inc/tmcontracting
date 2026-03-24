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
          <Analytics />
        </LocaleProvider>
        <Script id="crisp-chat" strategy="afterInteractive">
          {`
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "201bb0ce-a919-487d-a2a9-a9faebecca0f";
            (function() {
              var d = document;
              var s = d.createElement("script");
              s.src = "https://client.crisp.chat/l.js";
              s.async = 1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
