"use client"

import { useEffect } from "react"
import Script from "next/script"

import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import { onlineEstimatePage } from "@/lib/online-estimate-page"

const VOGUE = { fontFamily: "'Vogue', serif" } as const

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

        <section className="px-6 pb-20 pt-32 text-[#F7F6F1]">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl leading-tight md:text-5xl" style={{ ...VOGUE, fontWeight: "normal" }}>
                {page.title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[#D7D3CB] md:text-lg">{page.intro}</p>
            </div>

            <section className="mx-auto mt-12 max-w-5xl overflow-hidden border border-white/10 bg-[#F7F6F1] text-[#24342C] shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              <div className="border-b border-[#E3DED3] px-6 py-6 sm:px-8">
                <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={VOGUE}>
                  {locale === "fr" ? "Prise de rendez-vous" : "Appointment Booking"}
                </p>
                <h2 className="mt-3 text-2xl sm:text-3xl" style={{ ...VOGUE, fontWeight: "normal" }}>
                  {locale === "fr" ? "Réservez directement en ligne" : "Book directly online"}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5E685F] sm:text-base">
                  {locale === "fr"
                    ? "Utilisez le calendrier ci-dessous pour choisir le créneau qui vous convient pour votre rendez-vous avec TM Contracting."
                    : "Use the live booking calendar below to choose the appointment time that works best for you with TM Contracting."}
                </p>
              </div>

              <div className="px-4 py-5 sm:px-6 sm:py-6">
                <div className="min-h-[720px]">
                  <div
                    className="elfsight-app-6d0782de-e14e-4a0f-b967-e88e2dd4c7b4"
                    data-elfsight-app-lazy=""
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  )
}
