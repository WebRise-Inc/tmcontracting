import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'

import { Footer } from '@/components/footer'
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
          <Footer />
          <Analytics />
        </LocaleProvider>
        <Script id="tawk-to-chat" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69c2f974ffb4f81c353b5452/1jkgpsrvl';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
