"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Hammer,
  HousePlus,
  Layers3,
  MoveRight,
  ShieldCheck,
  Shovel,
  type LucideIcon,
} from "lucide-react"

import { ContactSection } from "@/components/contact-section"
import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import {
  getServiceGalleryPaths,
  getServiceGalleryEntries,
  getServicePageEntry,
  servicePages,
  serviceSlugs,
  type ServiceSlug,
} from "@/lib/service-pages"

const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  renovation: Hammer,
  concrete: Layers3,
  "excavation-lifting": Shovel,
  "new-construction": HousePlus,
}

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const { locale, copy } = useLocale()
  const chrome = servicePages[locale].chrome
  const page = getServicePageEntry(locale, slug)
  const gallery = getServiceGalleryEntries(slug)
  const Icon = serviceIcons[slug]

  useEffect(() => {
    document.title = page.metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", page.metadata.description)
    }
  }, [page.metadata.description, page.metadata.title])

  return (
    <main className="bg-[#F7F6F1] min-h-screen">
      <Navbar />
      <article className="bg-[#F7F6F1]">
        <section className="relative overflow-hidden bg-[#24342C] px-6 pb-18 pt-28 text-[#F7F6F1]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,216,122,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(127,143,87,0.2),_transparent_40%)]" />
          <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-white/8" />
          <div className="pointer-events-none absolute inset-y-0 right-[14%] w-px bg-white/6" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                <Link href="/" className="transition-colors hover:text-[#F7F6F1]">
                  {chrome.breadcrumbHome}
                </Link>
                <span className="h-px w-6 bg-white/25" />
                <Link href="/#services" className="transition-colors hover:text-[#F7F6F1]">
                  {chrome.breadcrumbServices}
                </Link>
                <span className="h-px w-6 bg-white/25" />
                <span>{page.title}</span>
              </div>

              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.34em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                  {chrome.heroLabel}
                </p>
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

              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 overflow-hidden border border-[#C8D87A] bg-[#C8D87A] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#24342C] transition-colors hover:bg-transparent hover:text-[#F7F6F1]"
                  style={{ fontFamily: "'Vogue', serif" }}
                >
                  {chrome.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="tel:+18004300555"
                  className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:border-[#C8D87A] hover:text-[#C8D87A]"
                  style={{ fontFamily: "'Vogue', serif" }}
                >
                  {chrome.secondaryCta}
                </a>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {page.highlights.map((highlight) => (
                  <div key={highlight.label} className="border border-white/10 bg-white/5 px-5 py-5 backdrop-blur-sm">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                      {highlight.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#D8D4CC]">
                      {highlight.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-10 hidden h-40 w-40 rounded-full border border-white/10 lg:block" />
              <div className="absolute -right-3 bottom-16 hidden h-24 w-24 rounded-full bg-[#C8D87A]/15 blur-3xl lg:block" />

              <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[420px] overflow-hidden border border-white/10 bg-[#314B3E] shadow-[0_40px_80px_rgba(0,0,0,0.28)]">
                  <Image
                    src={gallery[0].src}
                    alt={`${page.title} ${chrome.galleryPhotoLabel} 1`}
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#24342C]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#C8D87A]" style={{ fontFamily: "'Vogue', serif" }}>
                        {page.eyebrow}
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#F7F6F1]">
                        {page.galleryIntro}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#24342C]/60">
                      <Icon className="h-6 w-6 text-[#C8D87A]" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {gallery.slice(1, 3).map((image, index) => (
                    <div key={image.src} className="relative min-h-[200px] overflow-hidden border border-white/10 bg-[#314B3E]">
                      <Image
                        src={image.src}
                        alt={`${page.title} ${chrome.galleryPhotoLabel} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#24342C]/55 via-transparent to-transparent" />
                    </div>
                  ))}
                  <div className="border border-white/10 bg-[#1E2B25] p-6">
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
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#F7F6F1] px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                {chrome.scopeTitle}
              </p>
              <h2 className="text-3xl text-[#24342C] md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {page.summary}
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-[#5E685F]">
                {page.description}
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
                  <p className="text-sm uppercase tracking-[0.24em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#5E685F]">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7F8F57]" />
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
              <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                {chrome.processTitle}
              </p>
              <h2 className="mt-4 text-3xl text-[#24342C] md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {page.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5E685F]">
                {page.processIntro}
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-4">
              {page.process.map((step, index) => (
                <div key={step.title} className="relative border border-[#D6D1C4] bg-[#F7F6F1] p-6">
                  <span className="text-[11px] uppercase tracking-[0.32em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
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

        <section className="bg-[#F7F6F1] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
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
                  <div className="relative min-h-[220px]">
                    <Image
                      src={image.src}
                      alt={`${page.title} ${chrome.galleryPhotoLabel} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
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
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#C8D87A] px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#24342C] transition-colors hover:bg-[#F7F6F1]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {chrome.primaryCta}
                <MoveRight className="h-4 w-4" />
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:border-[#C8D87A] hover:text-[#C8D87A]"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                <ArrowLeft className="h-4 w-4" />
                {chrome.breadcrumbHome}
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#E9E5DA] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                {chrome.relatedTitle}
              </p>
              <h2 className="mt-4 text-3xl text-[#24342C] md:text-4xl" style={DISPLAY_HEADING_STYLE}>
                {chrome.relatedBody}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {serviceSlugs
                .filter((serviceSlug) => serviceSlug !== slug)
                .map((serviceSlug) => {
                  const relatedPage = getServicePageEntry(locale, serviceSlug)
                  const relatedImage = getServiceGalleryEntries(serviceSlug)[0]

                  return (
                    <Link
                      key={serviceSlug}
                      href={`/services/${serviceSlug}`}
                      className="group overflow-hidden border border-[#D6D1C4] bg-[#F7F6F1] transition-transform duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={relatedImage.src}
                          alt={`${relatedPage.title} ${chrome.galleryPhotoLabel} 1`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#24342C]/70 via-transparent to-transparent" />
                      </div>
                      <div className="p-6">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#7F8F57]" style={{ fontFamily: "'Vogue', serif" }}>
                          {relatedPage.eyebrow}
                        </p>
                        <h3 className="mt-3 text-2xl text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                          {relatedPage.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                          {relatedPage.summary}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#314B3E]" style={{ fontFamily: "'Vogue', serif" }}>
                          {relatedPage.title}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </section>

        <ContactSection />
      </article>
    </main>
  )
}
