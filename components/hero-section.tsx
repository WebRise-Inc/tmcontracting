"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

import { useLocale } from "@/components/locale-provider"

const handwrittenFont = {
  fontFamily: "'Segoe Print', 'Bradley Hand', 'Chalkboard SE', 'Noteworthy', cursive",
} as const

export function HeroSection() {
  const { copy } = useLocale()
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible")
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const phrases = copy.hero.phrases

  const goTo = (index: number) => {
    if (index === current) return
    setPhase("exit")
    setTimeout(() => {
      setCurrent(index)
      setPhase("enter")
      setTimeout(() => setPhase("visible"), 50)
    }, 450)
  }

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setPhase("exit")
      setTimeout(() => {
        setCurrent((prev) => {
          const next = (prev + 1) % phrases.length
          return next
        })
        setPhase("enter")
        setTimeout(() => setPhase("visible"), 50)
      }, 450)
    }, 10000)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const syncPlaybackRate = () => {
      video.playbackRate = 0.72
    }

    syncPlaybackRate()
    video.addEventListener("loadeddata", syncPlaybackRate)

    return () => {
      video.removeEventListener("loadeddata", syncPlaybackRate)
    }
  }, [])

  const phrase = phrases[current]

  const contentStyle: React.CSSProperties =
    phase === "exit"
      ? { opacity: 0, transform: "translateY(-18px)", transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)" }
      : phase === "enter"
      ? { opacity: 0, transform: "translateY(18px)", transition: "none" }
      : { opacity: 1, transform: "translateY(0)", transition: "opacity 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)" }

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0307%20%281%29-1KIrAJJC7ATtGc3nieiOPQiuccBUUE.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#24342C]/60" />

      {/* Province tabs — left side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-0">
        {copy.hero.provinces.map((province) => (
          <button
            key={province}
            className="bg-[#F7F6F1] text-[#24342C] text-xs font-semibold tracking-widest border border-[#D6D1C4] hover:bg-[#7F8F57] hover:text-[#F7F6F1] transition-colors duration-200"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              padding: "14px 8px",
            }}
          >
            {province}
          </button>
        ))}
      </div>

      {/* Layout: content + brand visual */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(220px,300px)] lg:gap-0">
          <div className="w-full max-w-2xl pl-24">
            {/* Static "Book a call" + dots stay in place */}
            {/* Animated content block */}
            <div style={contentStyle}>
              {/* Label */}
              <p
                className="mb-5 text-[1.7rem] leading-none sm:text-[2rem] md:text-[2.35rem]"
                style={{
                  ...handwrittenFont,
                  color: "#C8D87A",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                  letterSpacing: "0.04em",
                }}
              >
                {phrase.label}
              </p>

              {/* Heading */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl text-[#F7F6F1] leading-tight text-balance mb-5 max-w-xl"
                style={{ fontFamily: "'Vogue', serif", fontWeight: "normal", letterSpacing: "0.02em" }}
              >
                {phrase.heading}
              </h1>

              {/* Body */}
              <p className="mb-0 max-w-xl text-lg leading-relaxed text-[#E1DDD5] md:text-xl">
                {phrase.body}
              </p>
            </div>

            {/* CTA — stays pinned, does not animate */}
            <Link
              href="/online-estimate"
              className="group relative overflow-hidden inline-flex items-center gap-2 mt-8 px-8 py-3.5 border-2 border-[#F7F6F1] text-[#F7F6F1] text-sm tracking-widest uppercase transition-colors duration-300"
              style={{ fontFamily: "'Vogue', serif" }}
            >
              <span className="relative z-10">{copy.hero.bookCall}</span>
              <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute inset-0 bg-[#F7F6F1] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
              <span className="absolute inset-0 flex items-center justify-center gap-2 text-[#314B3E] text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ fontFamily: "'Vogue', serif" }}>
                {copy.hero.bookCall} →
              </span>
            </Link>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {phrases.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    goTo(i)
                    startTimer()
                  }}
                  className={`h-[3px] rounded-full transition-all duration-500 ${
                    i === current ? "w-10 bg-[#7F8F57]" : "w-5 bg-[#F7F6F1]/35 hover:bg-[#F7F6F1]/60"
                  }`}
                  aria-label={`${copy.hero.goToPhrase} ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-start lg:-ml-20">
            <div className="absolute inset-[12%] rounded-full bg-[#C8D87A]/16 blur-3xl" />
            <Image
              src="/logo_LQ.png"
              alt={copy.navbar.logoAlt}
              width={500}
              height={500}
              priority
              className="relative h-auto w-[12.5rem] object-contain drop-shadow-[0_24px_42px_rgba(0,0,0,0.42)] sm:w-[15rem] lg:w-[18rem]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
