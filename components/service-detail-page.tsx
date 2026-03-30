"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Building2,
  ChevronLeft,
  ChevronRight,
  MoveRight,
  ShieldCheck,
  X,
} from "lucide-react"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import {
  getServiceGalleryEntries,
  getServicePageEntry,
  servicePages,
  type ServiceSlug,
} from "@/lib/service-pages"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const { locale, copy } = useLocale()
  const [activeFrame, setActiveFrame] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const chrome = servicePages[locale].chrome
  const page = getServicePageEntry(locale, slug)
  const gallery = getServiceGalleryEntries(slug)
  const heroGallery = gallery.slice(0, 5)
  const highlights = page.highlights.filter(
    (highlight) => highlight.value !== "One Team" && highlight.value !== "Une équipe",
  )
  const scopeTitle = page.scopeTitle ?? page.summary
  const scopeDescription = page.scopeDescription ?? page.description

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFrame((currentFrame) => currentFrame + 1)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    document.title = page.metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", page.metadata.description)
    }
  }, [page.metadata.description, page.metadata.title])

  useEffect(() => {
    if (lightboxIndex === null) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current === null ? current : (current + 1) % gallery.length))
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current === null ? current : (current - 1 + gallery.length) % gallery.length))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gallery.length, lightboxIndex])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const showPreviousImage = () => {
    setLightboxIndex((current) => (current === null ? current : (current - 1 + gallery.length) % gallery.length))
  }
  const showNextImage = () => {
    setLightboxIndex((current) => (current === null ? current : (current + 1) % gallery.length))
  }

  return (
    <main className="bg-[#F7F6F1] min-h-screen">
      <Navbar />
      <article className="bg-[#F7F6F1]">
        <section className="relative overflow-hidden bg-[#24342C] px-6 pb-18 pt-28 text-[#F7F6F1]">
          <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-white/8" />
          <div className="pointer-events-none absolute inset-y-0 right-[14%] w-px bg-white/6" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
              <div className="flex flex-col gap-8">
                <div className="space-y-5">
                  <h1 className="max-w-3xl text-4xl leading-tight text-balance md:text-5xl lg:text-6xl" style={DISPLAY_HEADING_STYLE}>
                    {page.title}
                  </h1>
                  <p className="max-w-2xl text-lg leading-relaxed text-[#E7E2D8]">
                    {page.summary}
                  </p>
                  <p className="max-w-2xl text-base leading-relaxed text-[#D8D4CC]">
                    {page.description}
                  </p>
                </div>

                {highlights.length > 0 ? (
                  <div className={`grid gap-4 ${highlights.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                    {highlights.map((highlight) => (
                      <div
                        key={highlight.label}
                        className="border border-white/10 bg-white/5 px-5 py-5 transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_18px_36px_rgba(0,0,0,0.24)]"
                      >
                        <p className="text-sm uppercase tracking-[0.24em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                          {highlight.value}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-[#D8D4CC]">
                          {highlight.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className="max-w-2xl border border-white/10 bg-[#1E2B25] p-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-[#C8D87A]" />
                    <p className="text-sm uppercase tracking-[0.22em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                      {copy.about.warranty.title}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#D8D4CC]">
                    {copy.about.warranty.body}
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden border border-white/10 bg-[#1E2B25]">
                <div className="relative h-[320px] md:h-[420px]">
                  {heroGallery.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{ opacity: index === activeFrame % heroGallery.length ? 1 : 0 }}
                      onClick={() => openLightbox(index)}
                      aria-label={`${chrome.galleryTitle} ${index + 1}`}
                    >
                      <Image
                        src={image.src}
                        alt={`${page.title} ${chrome.galleryPhotoLabel} ${index + 1}`}
                        fill
                        priority={index === 0}
                        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </button>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24342C]/40 via-transparent to-transparent" />
                </div>

                {heroGallery.length > 1 ? (
                  <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
                    {heroGallery.map((image, index) => (
                      <span
                        key={`${image.src}-indicator`}
                        aria-hidden="true"
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === activeFrame % heroGallery.length ? "w-5 bg-[#F7F6F1]" : "w-1.5 bg-[#F7F6F1]/45"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}

                <div className="absolute left-4 top-4 border border-white/15 bg-[#24342C]/70 px-3 py-2 backdrop-blur-sm">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                    {page.eyebrow}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F1] px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                {chrome.scopeTitle}
              </p>
              <h2 className="text-3xl text-[#24342C] md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {scopeTitle}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[#5E685F]">
                {scopeDescription}
              </p>

              <div className="border border-[#D6D1C4] bg-[#E9E5DA] p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#314B3E]" />
                  <p className="text-sm uppercase tracking-[0.22em] text-[#24342C]" style={{ fontFamily: "'Vogue', serif" }}>
                    TM Contracting
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                  {copy.contact.serving}
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {page.groups.map((group) => (
                <div key={group.title} className="border border-[#D6D1C4] bg-white/80 p-6 shadow-[0_20px_40px_rgba(36,52,44,0.06)]">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5E685F]">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#036738]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#E9E5DA] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                {chrome.processTitle}
              </p>
              <h2 className="mt-4 text-3xl text-[#24342C] md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {page.title}
              </h2>
              {page.processIntro ? (
                <p className="mt-4 text-base leading-relaxed text-[#5E685F]">
                  {page.processIntro}
                </p>
              ) : null}
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <div key={step.title} className="relative border border-[#D6D1C4] bg-[#F7F6F1] p-6">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#24342C] px-6 py-16 text-[#F7F6F1]">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                {page.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {page.ctaTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#D8D4CC]">
                {page.ctaBody}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-[#036738] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:bg-[#314C3E]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {chrome.primaryCta}
                <MoveRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+18004300555"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:border-[#036738] hover:text-[#036738]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                <ArrowLeft className="h-4 w-4" />
                {chrome.secondaryCta}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F1] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                  {chrome.galleryTitle}
                </p>
                <h2 className="mt-4 text-3xl text-[#24342C] md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                  {page.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[#5E685F]">
                {page.galleryIntro}
              </p>
            </div>

            <div className="mt-10 columns-1 gap-4 md:columns-2 xl:columns-3">
              {gallery.map((image, index) => (
                <div key={image.src} className="mb-4 break-inside-avoid overflow-hidden border border-[#D6D1C4] bg-[#E9E5DA]">
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative block min-h-[220px] w-full overflow-hidden text-left"
                    aria-label={`${chrome.galleryTitle} ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={`${page.title} ${chrome.galleryPhotoLabel} ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
          <DialogContent
            showCloseButton={false}
            className="max-w-[min(96vw,1200px)] border border-[#D6D1C4] bg-[#F7F6F1] p-0 text-[#24342C] shadow-[0_24px_60px_rgba(36,52,44,0.14)]"
          >
            <DialogTitle className="sr-only">
              {page.title} {chrome.galleryTitle}
            </DialogTitle>

            {lightboxIndex !== null ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F6F1]/95 text-[#24342C] transition-colors hover:bg-white"
                  aria-label="Close gallery"
                >
                  <X className="h-5 w-5" />
                </button>

                {gallery.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      className="absolute left-4 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#F7F6F1]/95 text-[#24342C] transition-colors hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className="absolute right-4 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#F7F6F1]/95 text-[#24342C] transition-colors hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                ) : null}

                <div className="relative h-[78vh] min-h-[360px] bg-[#F2EFE6]">
                  <Image
                    src={gallery[lightboxIndex].src}
                    alt={`${page.title} ${chrome.galleryPhotoLabel} ${lightboxIndex + 1}`}
                    fill
                    sizes="96vw"
                    className="object-contain"
                    priority
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-[#D6D1C4] bg-[#F7F6F1] px-5 py-4">
                  <p className="text-sm uppercase tracking-[0.22em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
                    {page.title}
                  </p>
                  <p className="text-sm text-[#5E685F]">
                    {lightboxIndex + 1} / {gallery.length}
                  </p>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </article>
    </main>
  )
}
