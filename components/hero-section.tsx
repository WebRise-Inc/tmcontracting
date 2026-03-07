"use client"

import { useState, useEffect, useRef } from "react"

const phrases = [
  {
    label: "BECAUSE YOU DESERVE",
    heading: "3-YEARS RISK-FREE Warranty",
    body: "Our 3-YEARS RISK-FREE Warranty means zero risk for you: it covers 100% of our work, and if anything we did isn't right, we fix it—no debates, no excuses. It's simple: you get real peace of mind, backed by real accountability.",
  },
  {
    label: "BECAUSE YOU DESERVE",
    heading: "One Team, A to Z",
    body: "We handle your project A to Z — excavation to keys — with one accountable team managing every phase. We take care of planning, trades, materials, scheduling, and site coordination, so you get one point of contact and zero headache.",
  },
  {
    label: "BECAUSE YOU DESERVE",
    heading: "Fast Estimates, Zero Wait",
    body: "Fast online or in-person appointments, and once you book a time slot, you can often get a clear estimate and a practical game plan within minutes — usually from a short call or video plus a few photos.",
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<"visible" | "exit" | "enter">("visible")
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

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
    }, 5500)
  }

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {["Quebec", "Ontario"].map((province) => (
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

      {/* Layout: content centered-left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16 flex justify-start">
        <div className="w-full max-w-2xl pl-24">

          {/* Static "Book a call" + dots stay in place */}
          {/* Animated content block */}
          <div style={contentStyle}>
            {/* Label */}
            <p
              className="text-sm font-bold tracking-[0.28em] uppercase mb-4"
              style={{
                fontFamily: "'Vogue', serif",
                color: "#C8D87A",
                textShadow: "0 1px 8px rgba(0,0,0,0.55)",
                letterSpacing: "0.28em",
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
            <p className="text-[#D8D4CC] text-base md:text-lg leading-relaxed max-w-lg mb-0">
              {phrase.body}
            </p>
          </div>

          {/* CTA — stays pinned, does not animate */}
          <a
            href="#"
            className="group relative overflow-hidden inline-flex items-center gap-2 mt-8 px-8 py-3.5 border-2 border-[#F7F6F1] text-[#F7F6F1] text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ fontFamily: "'Vogue', serif" }}
          >
            <span className="relative z-10">Book a call</span>
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-[#F7F6F1] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            <span className="absolute inset-0 flex items-center justify-center gap-2 text-[#314B3E] text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" style={{ fontFamily: "'Vogue', serif" }}>
              Book a call →
            </span>
          </a>

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
                aria-label={`Go to phrase ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
