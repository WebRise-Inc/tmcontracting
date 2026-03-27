import type { Metadata } from "next"
import { cookies } from "next/headers"

import { OnlineEstimatePage } from "@/components/online-estimate-page"
import { onlineEstimatePage } from "@/lib/online-estimate-page"
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/site-copy"

async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(localeCookieName)?.value

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const page = onlineEstimatePage[locale]

  return {
    title: page.metadata.title,
    description: page.metadata.description,
  }
}

export default function Page() {
  return <OnlineEstimatePage />
}
