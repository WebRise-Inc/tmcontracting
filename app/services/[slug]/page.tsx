import type { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

import { ServiceDetailPage } from "@/components/service-detail-page"
import {
  getServicePageEntry,
  isServiceSlug,
  serviceSlugs,
  type ServiceSlug,
} from "@/lib/service-pages"
import { defaultLocale, isLocale, localeCookieName, type Locale } from "@/lib/site-copy"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const cookieLocale = cookieStore.get(localeCookieName)?.value

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale
}

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  if (!isServiceSlug(slug)) {
    return {}
  }

  const locale = await getRequestLocale()
  const page = getServicePageEntry(locale, slug)

  return {
    title: page.metadata.title,
    description: page.metadata.description,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params

  if (!isServiceSlug(slug)) {
    notFound()
  }

  return <ServiceDetailPage slug={slug as ServiceSlug} />
}
