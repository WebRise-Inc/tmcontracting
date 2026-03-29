"use client"

import { useEffect } from "react"

import { FaqContentView } from "@/components/faq-content-view"
import { Navbar } from "@/components/navbar"
import { faqPage, type FaqPageContent } from "@/lib/faq-page"
import { useLocale } from "@/components/locale-provider"
import type { Locale } from "@/lib/site-copy"

export function FaqPage({
  entries = faqPage,
}: {
  entries?: Record<Locale, FaqPageContent>
}) {
  const { locale } = useLocale()
  const page = entries[locale]

  useEffect(() => {
    document.title = page.metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", page.metadata.description)
    }
  }, [page.metadata.description, page.metadata.title])

  return (
    <main className="min-h-screen bg-[#F7F6F1]">
      <Navbar />
      <FaqContentView page={page} />
    </main>
  )
}
