"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import { faqPage } from "@/lib/faq-page"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function FaqPage() {
  const { locale } = useLocale()
  const page = faqPage[locale]

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
      <article className="bg-[#F7F6F1]">
        <section className="relative overflow-hidden bg-[#24342C] px-6 pb-18 pt-28 text-[#F7F6F1]">
          <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-white/8" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
              <Link href="/" className="transition-colors hover:text-[#F7F6F1]">
                {page.breadcrumbHome}
              </Link>
              <span className="h-px w-6 bg-white/25" />
              <span>{page.breadcrumbFaq}</span>
            </div>

            <div className="mt-8 space-y-5">
              <p className="text-xs uppercase tracking-[0.34em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                {page.eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl leading-tight text-balance md:text-5xl lg:text-6xl" style={DISPLAY_HEADING_STYLE}>
                {page.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[#D8D4CC]">
                {page.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F1] px-6 py-20">
          <div className="mx-auto max-w-4xl space-y-14">
            {page.categories.map((category, index) => (
              <section key={category.title} className="border-b border-[#D6D1C4] pb-14 last:border-b-0 last:pb-0">
                <div className="max-w-2xl">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                    {page.categoryLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-3xl text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                    {category.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 divide-y divide-[#D6D1C4] border-y border-[#D6D1C4] bg-white">
                  {category.items.map((item) => (
                    <article key={item.question} className="px-6 py-6 md:px-8">
                      <h3 className="text-xl leading-snug text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                        {item.question}
                      </h3>
                      <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#5E685F]">
                        {item.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="bg-[#24342C] px-6 py-16 text-[#F7F6F1]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                {page.breadcrumbFaq}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {page.contactTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#D8D4CC]">
                {page.contactBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#036738] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:bg-[#314C3E]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {page.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact-contact"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:border-[#036738] hover:text-[#036738]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {page.secondaryCta}
              </Link>
            </div>
          </div>
        </section>

        <ContactSection />
      </article>
    </main>
  )
}
