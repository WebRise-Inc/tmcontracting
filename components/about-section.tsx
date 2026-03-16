"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react"

import { ProjectLocationChip } from "@/components/project-location-chip"
import { getAboutGallerySlides } from "@/lib/about-gallery"
import { useLocale } from "@/components/locale-provider"

export function AboutSection() {
  const { copy, locale } = useLocale()
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const slides = getAboutGallerySlides(locale, copy.about.slides)
  const stats = copy.about.stats
  const aboutSections = copy.about.sections
  const note = copy.about.note
  const noteSegments = note
    ? note
        .split(/\n+/)
        .map((segment) => segment.trim())
        .filter(Boolean)
    : []
  const noteLead = noteSegments[0] ?? note ?? ""
  const noteDetail = noteSegments[1] ?? null
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

  const previewIndices = Array.from({ length: Math.min(4, totalSlides) }, (_, offset) => getWrappedIndex(current + offset))
  const activeSlides = previous === null ? [current] : [previous, current]

  useEffect(() => {
    if (previous === null) return

    const timer = window.setTimeout(() => {
      setPrevious(null)
    }, 700)

    return () => window.clearTimeout(timer)
  }, [previous])

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % totalSlides)
    }, 4500)
    return () => clearInterval(timer)
  }, [current, goTo, totalSlides])

  return (
    <section className="bg-[#E9E5DA] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#7F8F57] mb-3"
          style={{ fontFamily: "'Vogue', serif" }}
        >
          {copy.about.eyebrow}
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-stretch">

          {/* LEFT — Slideshow */}
          <div className="flex flex-col gap-4 lg:h-full">
            {/* Main slide */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#24342C]/10">
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

              <div className="absolute left-4 top-4">
                <ProjectLocationChip label={slides[current].locationLabel} />
              </div>

              {/* Counter badge */}
              <div
                className="absolute bottom-4 right-4 px-3 py-1 bg-[#24342C]/70 text-[#F7F6F1] text-xs tracking-widest"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#D6D1C4] bg-[#F7F6F1]/80 p-4 shadow-[0_24px_48px_rgba(36,52,44,0.08)] backdrop-blur-sm sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-end gap-3">
                  <span className="text-3xl leading-none text-[#24342C]" style={{ fontFamily: "'Vogue', serif" }}>
                    {String(current + 1).padStart(2, "0")}
                  </span>
                  <span className="pb-1 text-[11px] uppercase tracking-[0.32em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                    / {String(totalSlides).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goTo(current - 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6D1C4] bg-white/70 text-[#24342C] transition-colors hover:border-[#314B3E] hover:bg-[#314B3E] hover:text-[#F7F6F1]"
                    aria-label={`${copy.about.goToSlide} ${getWrappedIndex(current - 1) + 1}`}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => goTo(current + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D6D1C4] bg-white/70 text-[#24342C] transition-colors hover:border-[#314B3E] hover:bg-[#314B3E] hover:text-[#F7F6F1]"
                    aria-label={`${copy.about.goToSlide} ${getWrappedIndex(current + 1) + 1}`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {previewIndices.map((slideIndex) => {
                  const slide = slides[slideIndex]
                  const isActive = slideIndex === current

                  return (
                    <button
                      key={`${slide.src}-${slideIndex}`}
                      onClick={() => goTo(slideIndex)}
                      className={`group relative aspect-[5/4] overflow-hidden border text-left transition-all duration-300 focus:outline-none ${
                        isActive
                          ? "border-[#24342C] shadow-[0_18px_36px_rgba(36,52,44,0.16)]"
                          : "border-[#D6D1C4] hover:-translate-y-0.5 hover:border-[#7F8F57]"
                      }`}
                      aria-label={`${copy.about.goToSlide} ${slideIndex + 1}`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className={`object-cover transition-transform duration-700 ${isActive ? "scale-100" : "group-hover:scale-105"}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? "from-[#24342C]/80 via-[#24342C]/15 to-transparent" : "from-[#24342C]/72 via-[#24342C]/12 to-transparent"}`} />
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] uppercase tracking-[0.32em] text-[#F7F6F1]" style={{ fontFamily: "'Vogue', serif" }}>
                            {String(slideIndex + 1).padStart(2, "0")}
                          </span>
                          <span className={`h-2.5 w-2.5 rounded-full transition-colors ${isActive ? "bg-[#C8D87A]" : "bg-white/35 group-hover:bg-white/60"}`} />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {note ? (
              <div className="relative overflow-hidden rounded-[28px] border border-[#D6D1C4] bg-[#F7F6F1]/88 px-6 py-6 shadow-[0_24px_48px_rgba(36,52,44,0.08)] backdrop-blur-sm sm:px-7 sm:py-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7F8F57]/75 to-transparent" />
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#C8D87A] via-[#A7BA73] to-transparent" />
                <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-[#C8D87A]/10 blur-2xl" />

                <div className="relative flex flex-col gap-5 pl-2 sm:pl-3">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-14 bg-gradient-to-r from-[#7F8F57] to-transparent" />
                    <span
                      className="text-[0.65rem] uppercase tracking-[0.34em] text-[#7F8F57]"
                      style={{ fontFamily: "'Vogue', serif" }}
                    >
                      Built To Deliver
                    </span>
                  </div>

                  <p
                    className="max-w-2xl text-[1.55rem] leading-[1.04] text-[#24342C] sm:text-[1.8rem] md:text-[2rem]"
                    style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
                  >
                    {noteLead}
                  </p>

                  {noteDetail ? (
                    <p className="max-w-2xl text-[1.02rem] font-semibold leading-[1.72] text-[#314B3E] sm:text-[1.08rem]">
                      {noteDetail}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="overflow-hidden rounded-[28px] border border-[#D6D1C4] bg-[#F7F6F1]/90 shadow-[0_24px_48px_rgba(36,52,44,0.08)] backdrop-blur-sm lg:flex-1 lg:flex lg:flex-col">
              <div className="relative border-b border-[#DDD7C9] px-6 py-6 sm:px-7">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7F8F57]/60 to-transparent" />
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#7F8F57] via-[#C8D87A] to-transparent" />

                <div className="flex items-start gap-4 pl-2 sm:pl-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#D6D1C4] bg-white/75 text-[#7F8F57] shadow-[0_14px_30px_rgba(36,52,44,0.08)]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <p
                      className="text-[0.72rem] uppercase tracking-[0.3em] text-[#7F8F57]"
                      style={{ fontFamily: "'Vogue', serif" }}
                    >
                      Protected Workmanship
                    </p>
                    <p
                      className="text-[1.2rem] leading-tight text-[#24342C] sm:text-[1.35rem]"
                      style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
                    >
                      {copy.about.warranty.title}
                    </p>
                    <p className="max-w-xl text-sm leading-relaxed text-[#5E685F] sm:text-[0.97rem]">
                      {copy.about.warranty.body}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-[#D6D1C4] lg:flex-1">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex min-h-[132px] flex-col justify-end gap-2 bg-[#F7F6F1]/96 px-6 py-5 sm:px-7"
                  >
                    <span
                      className="text-[2rem] leading-none text-[#24342C] sm:text-[2.25rem]"
                      style={{ fontFamily: "'Vogue', serif" }}
                    >
                      {stat.value}
                    </span>
                    <span className="max-w-[12rem] text-sm leading-snug text-[#5E685F]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-8 lg:h-full lg:justify-between">
            {aboutSections && aboutSections.length > 0 ? (
              <div className="flex flex-col gap-7 text-[#5E685F]">
                {aboutSections.map((section) => (
                  <div key={section.heading} className="border-l-[3px] border-[#C8D87A] pl-5 sm:pl-6">
                    <h3
                      className="mb-4 text-[1.75rem] leading-none text-[#24342C] sm:text-[2rem] md:text-[2.2rem]"
                      style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
                    >
                      {section.heading}
                    </h3>
                    <ul className="flex flex-col gap-3 font-sans text-base leading-relaxed">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#7F8F57] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-5 text-[#5E685F] leading-relaxed font-sans text-base">
                {copy.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            )}

            {/* CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 self-start px-6 py-3 bg-[#314B3E] text-[#F7F6F1] text-sm tracking-widest uppercase hover:bg-[#7F8F57] transition-colors duration-300"
              style={{ fontFamily: "'Vogue', serif" }}
            >
              {copy.about.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
