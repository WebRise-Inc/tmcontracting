"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react"

import { ProjectLocationChip } from "@/components/project-location-chip"
import { getAboutGallerySlides } from "@/lib/about-gallery"
import { useLocale } from "@/components/locale-provider"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function AboutSection() {
  const { copy, locale } = useLocale()
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const slides = getAboutGallerySlides(locale, copy.about.slides)
  const stats = copy.about.stats
  const aboutSections = copy.about.sections ?? []
  const [whySection, whoSection, whereSection, ...remainingSections] = aboutSections
  const galleryLabel = locale === "fr" ? "Galerie de projets" : "Project Gallery"
  const warrantyLabel = locale === "fr" ? "Travaux garantis" : "Protected Workmanship"
  const totalSlides = slides.length
  const getWrappedIndex = (index: number) => (index + totalSlides) % totalSlides

  const goTo = useCallback(
    (index: number) => {
      const nextIndex = getWrappedIndex(index)
      if (nextIndex === current) return
      setPrevious(current)
      setCurrent(nextIndex)
    },
    [current, totalSlides]
  )

  const previewIndices = Array.from({ length: Math.min(4, totalSlides) }, (_, offset) =>
    getWrappedIndex(current + offset)
  )
  const activeSlides = previous === null ? [current] : [previous, current]

  const renderSectionCard = (
    section: { heading: string; items: string[] },
    index: number,
    className = ""
  ) => {
    const [leadItem, ...detailItems] = section.items

    return (
      <article
        key={section.heading}
        className={`relative overflow-hidden rounded-[30px] border border-[#D7D1C3] bg-[#F7F6F1] px-6 py-6 shadow-[0_24px_50px_rgba(36,52,44,0.08)] sm:px-7 ${className}`}
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-[#036738]" />

        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#036738]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-9 w-9 rounded-full border border-[#D7D1C3] bg-white/75" />
          </div>

          <div className="mt-5 flex flex-col gap-4">
            <h3
              className="text-[1.6rem] leading-[0.98] text-[#24342C] sm:text-[1.85rem]"
              style={DISPLAY_HEADING_STYLE}
            >
              {section.heading}
            </h3>

            {leadItem ? <p className="text-[1rem] leading-7 text-[#314B3E]">{leadItem}</p> : null}

            {detailItems.length > 0 ? (
              <ul className="space-y-3 text-[0.95rem] leading-6 text-[#5E685F]">
                {detailItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2.5 h-[5px] w-[5px] shrink-0 rounded-full bg-[#036738]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </article>
    )
  }

  useEffect(() => {
    if (previous === null) return

    const timer = window.setTimeout(() => {
      setPrevious(null)
    }, 700)

    return () => window.clearTimeout(timer)
  }, [previous])

  useEffect(() => {
    if (isPaused || totalSlides < 2) return

    const timer = window.setInterval(() => {
      goTo((current + 1) % totalSlides)
    }, 10000)

    return () => window.clearInterval(timer)
  }, [current, goTo, isPaused, totalSlides])

  return (
    <section id="about" className="relative overflow-hidden bg-[#E9E5DA] px-6 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10rem] top-16 h-[22rem] w-[22rem] rounded-full bg-[#C8D87A]/12 blur-3xl" />
        <div className="absolute right-[-8rem] top-[-2rem] h-[20rem] w-[20rem] rounded-full bg-[#314B3E]/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/3 h-[18rem] w-[18rem] rounded-full bg-white/22 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#036738]">
            {copy.about.eyebrow}
          </p>

          <div className="mt-5 space-y-3">
            {copy.about.titleLineOne ? (
              <h2
                className="text-[2rem] leading-[1.02] text-[#24342C] sm:text-[2.55rem] xl:text-[3.15rem]"
                style={DISPLAY_HEADING_STYLE}
              >
                {copy.about.titleLineOne}
              </h2>
            ) : null}

            {copy.about.titleLineTwo ? (
              <p
                className="mx-auto max-w-3xl text-[1.2rem] leading-[1.12] text-[#314B3E] sm:text-[1.45rem] xl:text-[1.75rem]"
                style={DISPLAY_HEADING_STYLE}
              >
                {copy.about.titleLineTwo}
              </p>
            ) : null}
          </div>
        </div>

        {aboutSections.length > 0 ? (
          <>
            {whySection && whoSection && whereSection ? (
              <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-stretch">
                <div className="flex flex-col gap-5">
                  {renderSectionCard(whySection, 0)}

                  <div className="overflow-hidden rounded-[30px] border border-[#D7D1C3] bg-[#F7F6F1]/94 px-6 py-6 shadow-[0_22px_60px_rgba(36,52,44,0.08)] backdrop-blur-sm sm:px-7 sm:py-7">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D6D1C4] bg-white text-[#036738] shadow-[0_12px_24px_rgba(36,52,44,0.06)]">
                        <ShieldCheck className="h-5 w-5" />
                      </div>

                      <div className="space-y-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#036738]">
                          {warrantyLabel}
                        </p>
                        <p
                          className="text-[1.38rem] leading-tight text-[#24342C] sm:text-[1.55rem]"
                          style={DISPLAY_HEADING_STYLE}
                        >
                          {copy.about.warranty.title}
                        </p>
                        <p className="max-w-2xl text-[1rem] leading-7 text-[#4F5951]">
                          {copy.about.warranty.body}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-[20px] border border-[#D8D2C4] bg-white px-4 py-4"
                        >
                          <span
                            className="block text-[1.55rem] leading-none text-[#24342C]"
                            style={DISPLAY_HEADING_STYLE}
                          >
                            {stat.value}
                          </span>
                          <span className="mt-2 block text-[0.94rem] leading-6 text-[#5E685F]">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-5 lg:h-full">
                  {renderSectionCard(whoSection, 1, "lg:flex-1")}
                  {renderSectionCard(whereSection, 2, "lg:flex-1")}
                </div>
              </div>
            ) : (
              <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-start">
                {aboutSections.map((section, index) => renderSectionCard(section, index))}
              </div>
            )}

            {remainingSections.length > 0 ? (
              <div className="mt-5 grid gap-5 lg:grid-cols-3 lg:items-start">
                {remainingSections.map((section, index) => renderSectionCard(section, index + 3))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="mx-auto mt-12 max-w-4xl rounded-[30px] border border-[#D7D1C3] bg-[#F7F6F1]/94 px-6 py-6 shadow-[0_24px_50px_rgba(36,52,44,0.08)] sm:px-7 sm:py-7">
            <div className="flex flex-col gap-5 text-[1.02rem] leading-8 text-[#5E685F]">
              {copy.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        <div
          className="mt-8 overflow-hidden rounded-[34px] border border-[#D7D1C3] bg-[#24342C] shadow-[0_36px_90px_rgba(36,52,44,0.18)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative aspect-[11/9] sm:aspect-[16/10]">
            {activeSlides.map((slideIndex) => {
              const slide = slides[slideIndex]
              const isCurrent = slideIndex === current

              return (
                <div
                  key={slide.src}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: isCurrent ? 1 : 0, pointerEvents: isCurrent ? "auto" : "none" }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={slideIndex === 0}
                  />
                </div>
              )
            })}

            <div className="pointer-events-none absolute inset-0 bg-[#121A16]/28" />

            <div className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-12 sm:px-6 sm:pb-6">
              <ProjectLocationChip label={slides[current].locationLabel} compact />
            </div>
          </div>

          <div className="border-t border-[#D7D1C3] bg-[#F7F6F1]/96 px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1.5">
                <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#036738]">
                  {galleryLabel}
                </p>
                <p
                  className="text-[1.75rem] leading-none text-[#24342C] sm:text-[2rem]"
                  style={DISPLAY_HEADING_STYLE}
                >
                  {String(current + 1).padStart(2, "0")}
                  <span className="ml-2 text-sm text-[#036738] sm:text-base">
                    / {String(totalSlides).padStart(2, "0")}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => goTo(current - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6D1C4] bg-white text-[#24342C] transition-colors hover:border-[#314B3E] hover:bg-[#314B3E] hover:text-[#F7F6F1]"
                  aria-label={`${copy.about.goToSlide} ${getWrappedIndex(current - 1) + 1}`}
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => goTo(current + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6D1C4] bg-white text-[#24342C] transition-colors hover:border-[#314B3E] hover:bg-[#314B3E] hover:text-[#F7F6F1]"
                  aria-label={`${copy.about.goToSlide} ${getWrappedIndex(current + 1) + 1}`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {previewIndices.map((slideIndex) => {
                const slide = slides[slideIndex]
                const isActive = slideIndex === current

                return (
                  <button
                    key={`${slide.src}-${slideIndex}`}
                    onClick={() => goTo(slideIndex)}
                    className={`group relative aspect-square overflow-hidden rounded-[14px] border transition duration-200 ${
                      isActive
                        ? "border-[#24342C] shadow-[0_10px_24px_rgba(36,52,44,0.16)]"
                        : "border-[#D6D1C4] hover:-translate-y-0.5 hover:border-[#036738]"
                    }`}
                    aria-label={`${copy.about.goToSlide} ${slideIndex + 1}`}
                    aria-pressed={isActive}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className={`object-cover transition-transform duration-500 ${
                        isActive ? "scale-100" : "group-hover:scale-105"
                      }`}
                    />
                    <div className="absolute inset-0 bg-[#101612]/22" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
