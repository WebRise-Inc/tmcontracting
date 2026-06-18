"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowUp, FileCheck2, ShieldCheck } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { Navbar } from "@/components/navbar"
import { warrantyTerms } from "@/lib/warranty-terms"

const displayFont = { fontFamily: "'Vogue', serif" } as const

export function WarrantyTermsPage() {
  const { locale } = useLocale()
  const page = warrantyTerms[locale]

  useEffect(() => {
    const updateMetadata = window.setTimeout(() => {
      document.title = page.metadata.title

      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute("content", page.metadata.description)
      }
    })

    return () => window.clearTimeout(updateMetadata)
  }, [page.metadata.description, page.metadata.title])

  return (
    <main id="top" className="min-h-screen bg-[#F7F6F1] text-[#24342C]">
      <Navbar />

      <header className="relative overflow-hidden bg-[#24342C] px-6 pb-20 pt-36 text-[#F7F6F1] sm:pb-24 sm:pt-40 lg:px-8 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(rgba(247,246,241,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(247,246,241,.22) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(to right, black, transparent 78%)",
          }}
        />
        <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rotate-45 border border-[#8FD4A9]/18 sm:right-10 sm:h-[28rem] sm:w-[28rem]" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#8FD4A9]" style={displayFont}>
              <FileCheck2 className="h-4 w-4" />
              {page.eyebrow}
            </p>
            <p className="mt-8 max-w-2xl text-sm uppercase leading-relaxed tracking-[0.2em] text-[#CFE6D6]" style={displayFont}>
              {page.companyName}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] tracking-[0.01em] text-balance sm:text-6xl lg:text-7xl" style={displayFont}>
              {page.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-[#D7DED9] sm:text-lg">
              {page.introduction}
            </p>
          </div>

          <div className="mt-12 grid max-w-2xl grid-cols-[auto_1fr] border border-[#8FD4A9]/35 bg-[#1D2B24]/70 backdrop-blur-sm sm:grid-cols-[auto_1fr_auto]">
            <div className="flex items-center justify-center border-r border-[#8FD4A9]/25 p-5 sm:p-6">
              <ShieldCheck className="h-8 w-8 text-[#8FD4A9]" />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8FD4A9]" style={displayFont}>{page.warrantyLabel}</p>
              <p className="mt-2 text-sm leading-6 text-[#D7DED9]">{page.warrantyNote}</p>
            </div>
            <p className="col-span-2 border-t border-[#8FD4A9]/25 px-5 py-4 text-3xl text-[#F7F6F1] sm:col-span-1 sm:border-l sm:border-t-0 sm:px-8 sm:py-6" style={displayFont}>
              {page.warrantyValue}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20 lg:px-8 lg:py-24">
        <aside className="hidden lg:block">
          <nav aria-label={page.contentsLabel} className="sticky top-28 border-l border-[#CFC7B6] pl-6">
            <p className="mb-5 text-xs uppercase tracking-[0.24em] text-[#036738]" style={displayFont}>{page.contentsLabel}</p>
            <ol className="space-y-3">
              {page.sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#section-${index + 1}`} className="group grid grid-cols-[1.75rem_1fr] text-sm leading-5 text-[#5E685F] transition-colors hover:text-[#036738]">
                    <span className="font-mono text-[11px] text-[#899187] group-hover:text-[#036738]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          {page.sections.map((section, index) => (
            <section
              id={`section-${index + 1}`}
              key={section.title}
              className="scroll-mt-28 border-t border-[#CFC7B6] py-10 first:border-t-0 first:pt-0 sm:py-12"
            >
              <div className="grid gap-4 sm:grid-cols-[3.25rem_1fr] sm:gap-6">
                <p className="font-mono text-sm tracking-[0.12em] text-[#0A7A44]">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h2 className="text-2xl leading-tight text-[#24342C] sm:text-3xl" style={displayFont}>{section.title}</h2>
                  {section.paragraphs && (
                    <div className="mt-6 space-y-5 text-[15px] leading-7 text-[#4F5B53] sm:text-base sm:leading-8">
                      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  )}
                  {section.bullets && (
                    <ul className="mt-6 space-y-3 text-[15px] leading-7 text-[#4F5B53] sm:text-base">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="grid grid-cols-[0.6rem_1fr] gap-3">
                          <span className="mt-[0.7rem] h-1.5 w-1.5 bg-[#0A7A44]" aria-hidden="true" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.closingParagraphs && (
                    <div className="mt-6 space-y-5 text-[15px] leading-7 text-[#4F5B53] sm:text-base sm:leading-8">
                      {section.closingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}

          <div className="mt-4 border border-[#CFC7B6] bg-[#E9E5DA] p-7 sm:p-9">
            <p className="text-xs uppercase leading-6 tracking-[0.2em] text-[#036738]" style={displayFont}>{page.closingName}</p>
            <Link href="#top" className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#24342C] transition-colors hover:text-[#036738]" style={displayFont}>
              {page.backToTop}
              <ArrowUp className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
