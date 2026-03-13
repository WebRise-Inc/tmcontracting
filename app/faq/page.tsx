import type { Metadata } from "next"
import { cookies } from "next/headers"

import { FaqPage } from "@/components/faq-page"
import { faqPage } from "@/lib/faq-page"
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/site-copy"

async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(localeCookieName)?.value

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const page = faqPage[locale]

  return {
    title: page.metadata.title,
    description: page.metadata.description,
  }
}

export default function Page() {
  return <FaqPage />
}
