"use client"

import Script from "next/script"

import { useLocale } from "@/components/locale-provider"

export function ReviewsSection() {
  const { copy } = useLocale()

  return (
    <section id="reviews" className="scroll-mt-28 bg-[#F7F6F1] px-6 py-20">
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p
            className="text-xs tracking-[0.28em] uppercase mb-3"
            style={{ fontFamily: "'Vogue', serif", color: "#7F8F57" }}
          >
            {copy.reviews.eyebrow}
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#24342C]"
            style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
          >
            {copy.reviews.title}
          </h2>
          <div className="mt-4 mx-auto w-16 h-px bg-[#7F8F57]" />
        </div>

        {/* Elfsight widget */}
        <div className="min-h-[300px]">
          <div
            className="elfsight-app-08239ee0-5994-4604-95f9-db13bd21eb59"
            data-elfsight-app-lazy
          />
        </div>
      </div>
    </section>
  )
}
