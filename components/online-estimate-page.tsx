"use client"

import { useEffect } from "react"
import Script from "next/script"

import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import { onlineEstimatePage } from "@/lib/online-estimate-page"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function OnlineEstimatePage() {
  const { locale } = useLocale()
  const page = onlineEstimatePage[locale]

  useEffect(() => {
    document.title = page.metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", page.metadata.description)
    }
  }, [page.metadata.description, page.metadata.title])

  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />

      <main className="min-h-screen bg-[#24342C]">
        <Navbar />

        <section className="px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto mb-10 max-w-4xl text-center">
              <h1
                className="text-4xl leading-tight text-balance text-[#F7F6F1] md:text-5xl lg:text-6xl"
                style={DISPLAY_HEADING_STYLE}
              >
                {page.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]">
                {page.intro}
              </p>
            </div>

            <div className="min-h-[720px] overflow-hidden">
              <div
                className="elfsight-app-6d0782de-e14e-4a0f-b967-e88e2dd4c7b4"
                data-elfsight-app-lazy=""
              />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
