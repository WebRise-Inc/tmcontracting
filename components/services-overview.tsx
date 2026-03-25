"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import { getHomepageServiceGallerySlides, isServiceSlug } from "@/lib/service-pages"
import { getSampleProjectLocation } from "@/lib/sample-project-locations"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function ServicesOverview() {
  const { copy } = useLocale()
  const [activeFrame, setActiveFrame] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFrame((currentFrame) => currentFrame + 1)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section id="services" className="bg-[#F7F6F1] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#036738] mb-3"
            style={{ fontFamily: "'Vogue', serif" }}
          >
            {copy.services.eyebrow}
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#24342C] text-balance leading-tight"
            style={DISPLAY_HEADING_STYLE}
          >
            {copy.services.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {copy.services.items.map((service) => {
            const slides = isServiceSlug(service.slug)
              ? getHomepageServiceGallerySlides(service.slug)
              : [{ src: service.image, locationLabel: getSampleProjectLocation(0) }]
            const activeSlideIndex = activeFrame % slides.length

            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid h-full overflow-hidden rounded-sm bg-[#E9E5DA] md:grid-cols-[1.02fr_0.98fr]"
              >
                {/* Content */}
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3
                    className={`mb-2 text-[#24342C] group-hover:text-[#036738] transition-colors duration-300 ${
                      service.slug === "concrete"
                        ? "text-[1rem] tracking-[-0.02em] lg:text-[1.02rem]"
                        : "text-xl"
                    }`}
                    style={DISPLAY_HEADING_STYLE}
                  >
                    {service.title}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[#5E685F] font-sans">
                    {service.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#314B3E] group-hover:text-[#036738] transition-colors duration-300"
                    style={{ fontFamily: "'Vogue', serif" }}
                  >
                    {copy.services.learnMore}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#24342C]/10 md:h-full md:min-h-[260px]">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.src}
                      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                      style={{ opacity: index === activeSlideIndex ? 1 : 0 }}
                    >
                      <Image
                        src={slide.src}
                        alt={`${service.title} image ${index + 1}`}
                        fill
                        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                        style={{ objectPosition: slide.objectPosition ?? "center" }}
                        priority={index === 0}
                      />
                    </div>
                  ))}

                  {slides.length > 1 ? (
                    <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
                      {slides.map((slide, index) => (
                        <span
                          key={`${slide.src}-indicator`}
                          aria-hidden="true"
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === activeSlideIndex ? "w-5 bg-[#F7F6F1]" : "w-1.5 bg-[#F7F6F1]/45"
                          }`}
                        />
                      ))}
                    </div>
                  ) : null}
                  <div className="absolute inset-0 bg-[#24342C]/0 group-hover:bg-[#24342C]/25 transition-colors duration-500" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
