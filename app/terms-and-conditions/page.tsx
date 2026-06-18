import type { Metadata } from "next"
import { cookies } from "next/headers"

import { WarrantyTermsPage } from "@/components/warranty-terms-page"
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/site-copy"
import { warrantyTerms } from "@/lib/warranty-terms"

async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(localeCookieName)?.value

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return warrantyTerms[locale].metadata
}

export default function Page() {
  return <WarrantyTermsPage />
}
