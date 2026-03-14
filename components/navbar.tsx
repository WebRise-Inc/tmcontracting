"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"

import { useLocale } from "@/components/locale-provider"

const displayFont = { fontFamily: "'Vogue', serif" } as const

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, copy } = useLocale()
  const contactLinks = {
    estimate: "/online-estimate",
    quote: "/#contact",
    career: "/#contact-career",
    contact: "/#contact-contact",
  } as const
  const mobileLinks = [
    { label: copy.navbar.home, href: "/" },
    { label: copy.navbar.services, href: "/#services" },
    { label: copy.navbar.onlineEstimate, href: contactLinks.estimate },
    { label: copy.navbar.faq, href: "/faq" },
    { label: copy.navbar.career, href: contactLinks.career },
    { label: copy.navbar.contactUs, href: contactLinks.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  const overlayMode = !scrolled && !mobileOpen
  const shellClass = overlayMode
    ? "border-transparent bg-transparent"
    : "border-[#D6D1C4]/80 bg-[#F7F6F1]/86 shadow-[0_20px_50px_rgba(15,24,18,0.16)] backdrop-blur-xl"
  const textClass = overlayMode ? "text-[#F7F6F1]" : "text-[#24342C]"
  const mutedClass = overlayMode ? "text-[#E7E2D8]/86" : "text-[#5E685F]"
  const accentClass = overlayMode ? "text-[#C8D87A]" : "text-[#7F8F57]"
  const hoverClass = overlayMode ? "hover:text-[#C8D87A]" : "hover:text-[#7F8F57]"

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${shellClass}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="-ml-24 flex min-w-0 items-center gap-3 pr-6 sm:-ml-28 lg:-ml-32">
          <Image
            src="/images/brand/navbar-logo-transparent.png"
            alt={copy.navbar.logoAlt}
            width={919}
            height={734}
            priority
            className="h-14 w-auto max-w-[4.8rem] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.14)] sm:h-16 sm:max-w-[5.4rem]"
          />

          <span
            className={`block truncate text-[1.2rem] leading-none tracking-[0.05em] sm:text-[1.45rem] ${textClass}`}
            style={displayFont}
          >
            TM Contracting
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          <Link
            href="/"
            className={`text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
            style={displayFont}
          >
            {copy.navbar.home}
          </Link>

          <div className="relative">
            <button
              onClick={() => setServicesOpen((current) => !current)}
              className={`flex items-center gap-1 text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
              style={displayFont}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
            >
              {copy.navbar.services}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full mt-4 w-64 border border-[#D6D1C4] bg-[#F7F6F1]/96 py-2 shadow-[0_28px_70px_rgba(16,22,18,0.18)] backdrop-blur-xl">
                {copy.services.items.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="block px-5 py-3 text-sm text-[#5E685F] transition-colors hover:bg-[#ECE7DC] hover:text-[#24342C]"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={contactLinks.estimate}
            className={`text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
            style={displayFont}
          >
            {copy.navbar.onlineEstimate}
          </Link>

          <Link
            href="/faq"
            className={`text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
            style={displayFont}
          >
            {copy.navbar.faq}
          </Link>

          <Link
            href={contactLinks.career}
            className={`text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
            style={displayFont}
          >
            {copy.navbar.career}
          </Link>

          <Link
            href={contactLinks.contact}
            className={`text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
            style={displayFont}
          >
            {copy.navbar.contactUs}
          </Link>
        </nav>

        <div className="ml-auto hidden min-w-[92px] items-center justify-end md:flex">
          <div className={`flex items-center gap-2 text-sm uppercase tracking-[0.3em] ${mutedClass}`} style={displayFont}>
            <button
              onClick={() => setLocale("en")}
              className={`transition-colors ${locale === "en" ? accentClass : hoverClass}`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <span className={overlayMode ? "text-white/28" : "text-[#B7B1A3]"}>|</span>
            <button
              onClick={() => setLocale("fr")}
              className={`transition-colors ${locale === "fr" ? accentClass : hoverClass}`}
              aria-pressed={locale === "fr"}
            >
              FR
            </button>
          </div>
        </div>

        <button
          className={`ml-auto md:hidden ${textClass}`}
          onClick={() => setMobileOpen((current) => !current)}
          aria-label={copy.navbar.toggleMenu}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#D6D1C4] bg-[#F7F6F1]/96 px-6 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {mobileLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm uppercase tracking-[0.24em] text-[#24342C] transition-colors hover:text-[#7F8F57]"
                style={displayFont}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-[#5E685F]" style={displayFont}>
            <button
              onClick={() => setLocale("en")}
              className={`transition-colors ${locale === "en" ? "text-[#7F8F57]" : "hover:text-[#24342C]"}`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <span className="text-[#B7B1A3]">|</span>
            <button
              onClick={() => setLocale("fr")}
              className={`transition-colors ${locale === "fr" ? "text-[#7F8F57]" : "hover:text-[#24342C]"}`}
              aria-pressed={locale === "fr"}
            >
              FR
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
