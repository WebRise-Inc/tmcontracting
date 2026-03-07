"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ShieldCheck, Clock, ArrowRight } from "lucide-react"

const slides = [
  { src: "/images/about-site-1.jpg", alt: "Crew pouring concrete foundation on site" },
  { src: "/images/about-site-2.jpg", alt: "Completed kitchen renovation project" },
  { src: "/images/about-site-3.jpg", alt: "Excavation work with heavy machinery" },
  { src: "/images/about-site-4.jpg", alt: "New construction framing phase" },
  { src: "/images/about-site-5.jpg", alt: "Finished custom home exterior" },
]

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "3-Year", label: "Risk-Free Warranty" },
  { value: "A to Z", label: "One Team, Every Phase" },
]

export function AboutSection() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
      }, 400)
    },
    [animating, current]
  )

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [current, goTo])

  return (
    <section className="bg-[#E9E5DA] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <p
          className="text-xs tracking-[0.3em] uppercase text-[#7F8F57] mb-3"
          style={{ fontFamily: "'Vogue', serif" }}
        >
          About Us
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Slideshow */}
          <div className="flex flex-col gap-4">
            {/* Main slide */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#24342C]/10">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}

              {/* Counter badge */}
              <div
                className="absolute bottom-4 right-4 px-3 py-1 bg-[#24342C]/70 text-[#F7F6F1] text-xs tracking-widest"
                style={{ fontFamily: "'Vogue', serif" }}
              >
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="relative flex-1 aspect-video overflow-hidden focus:outline-none"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover transition-opacity duration-300"
                    style={{ opacity: i === current ? 1 : 0.45 }}
                  />
                  {/* Active underline */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] bg-[#7F8F57] transition-all duration-500"
                    style={{ width: i === current ? "100%" : "0%" }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-8">
            <h2
              className="text-4xl md:text-5xl text-[#24342C] leading-tight text-balance"
              style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
            >
              Built on Trust.<br />Backed by Results.
            </h2>

            <div className="flex flex-col gap-5 text-[#5E685F] leading-relaxed font-sans text-base">
              <p>
                <span className="text-[#24342C] font-semibold">TM Contracting</span> has been a trusted name in construction since 1991 — over 15 years of hands-on experience transforming properties across Quebec and Ontario.
              </p>
              <p>
                We handle everything from excavation to final keys as one unified team. No revolving door of subcontractors, no miscommunication, no finger-pointing. One accountable team manages every phase — planning, trades, materials, scheduling, and site coordination.
              </p>
              <p>
                What sets us apart is simple: we treat your project like our own. That means showing up on time, being transparent at every step, and standing firmly behind our work.
              </p>
            </div>

            {/* Warranty highlight */}
            <div className="flex items-start gap-4 bg-[#F7F6F1] border-l-4 border-[#7F8F57] px-5 py-4">
              <ShieldCheck className="w-6 h-6 text-[#7F8F57] mt-0.5 shrink-0" />
              <div>
                <p
                  className="text-sm text-[#24342C] mb-1"
                  style={{ fontFamily: "'Vogue', serif" }}
                >
                  3-Year Risk-Free Warranty
                </p>
                <p className="text-sm text-[#5E685F] font-sans leading-relaxed">
                  Every project we complete is covered 100%. If anything we did isn't right, we fix it — no debates, no excuses. Real peace of mind, backed by real accountability.
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span
                    className="text-2xl text-[#24342C]"
                    style={{ fontFamily: "'Vogue', serif" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-[#5E685F] font-sans leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#"
              className="inline-flex items-center gap-2 self-start px-6 py-3 bg-[#314B3E] text-[#F7F6F1] text-sm tracking-widest uppercase hover:bg-[#7F8F57] transition-colors duration-300"
              style={{ fontFamily: "'Vogue', serif" }}
            >
              Our Story
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
