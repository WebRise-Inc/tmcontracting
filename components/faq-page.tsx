"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight, HelpCircle, MessageSquareQuote, ShieldCheck } from "lucide-react"

import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqPage } from "@/lib/faq-page"

export function FaqPage() {
  const { locale, copy } = useLocale()
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,216,122,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(127,143,87,0.22),_transparent_42%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-white/8" />

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
              <Link href="/" className="transition-colors hover:text-[#F7F6F1]">
                {page.breadcrumbHome}
              </Link>
              <span className="h-px w-6 bg-white/25" />
              <span>{page.breadcrumbFaq}</span>
            </div>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.34em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                  {page.eyebrow}
                </p>
                <h1 className="max-w-3xl text-4xl leading-tight text-balance md:text-5xl lg:text-6xl" style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}>
                  {page.title}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-[#D8D4CC]">
                  {page.intro}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {page.highlights.map((item) => (
                  <div key={item.label} className="border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#D8D4CC]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F1] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {page.categories.map((category, index) => (
                <div key={category.title} className="border border-[#D6D1C4] bg-white/80 p-6 shadow-[0_20px_40px_rgba(36,52,44,0.06)]">
                  <div className="flex items-center gap-3">
                    {index === 0 ? (
                      <MessageSquareQuote className="h-5 w-5 text-[#7F8F57]" />
                    ) : index === 1 ? (
                      <HelpCircle className="h-5 w-5 text-[#7F8F57]" />
                    ) : (
                      <ShieldCheck className="h-5 w-5 text-[#7F8F57]" />
                    )}
                    <p className="text-xs uppercase tracking-[0.24em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                      {page.categoryLabel} {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <h2 className="mt-4 text-2xl text-[#24342C]" style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}>
                    {category.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {page.categories.map((category, index) => (
                <section key={category.title} className="border border-[#D6D1C4] bg-[#E9E5DA] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                    {page.categoryLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-2xl text-[#24342C]" style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}>
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                    {category.description}
                  </p>

                  <Accordion type="single" collapsible className="mt-6 space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={item.question}
                        value={`${category.title}-${itemIndex}`}
                        className="border border-[#D6D1C4] bg-[#F7F6F1] px-4"
                      >
                        <AccordionTrigger className="py-5 text-base text-[#24342C] hover:no-underline">
                          <span className="pr-4">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-5 text-sm leading-relaxed text-[#5E685F]">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#24342C] px-6 py-16 text-[#F7F6F1]">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                {page.breadcrumbFaq}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl" style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}>
                {page.contactTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#D8D4CC]">
                {page.contactBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#C8D87A] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#24342C] transition-colors hover:bg-[#F7F6F1]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {page.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#contact-contact"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:border-[#C8D87A] hover:text-[#C8D87A]"
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
