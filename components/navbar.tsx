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
    contact: "/#contact-contact",
  } as const
  const mobileLinks = [
    { label: copy.navbar.home, href: "/" },
    { label: copy.navbar.services, href: "/#services" },
    { label: copy.navbar.onlineEstimate, href: contactLinks.estimate },
    { label: copy.navbar.faq, href: "/faq" },
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
    : "border-[#CFC7B6] bg-[#F3F0E7]/96 shadow-[0_16px_32px_rgba(15,24,18,0.08)] backdrop-blur-md"
  const textClass = overlayMode ? "text-[#F7F6F1]" : "text-[#24342C]"
  const mutedClass = overlayMode ? "text-[#E7E2D8]/86" : "text-[#5E685F]"
  const accentClass = overlayMode ? "text-[#C8D87A]" : "text-[#036738]"
  const hoverClass = overlayMode ? "hover:text-[#C8D87A]" : "hover:text-[#036738]"

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${shellClass}`}>
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3 justify-self-start">
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

        <nav className="hidden items-center justify-center gap-6 px-4 md:flex lg:gap-7">
          <Link
            href="/"
            className={`border-b border-transparent pb-1 text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass} ${pathname === "/" ? accentClass : ""}`}
            style={displayFont}
          >
            {copy.navbar.home}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              className={`flex items-center gap-1 border-b border-transparent pb-1 text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
              style={displayFont}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              type="button"
            >
              {copy.navbar.services}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div className="absolute left-0 top-full z-20 pt-4">
                <div className="w-64 overflow-hidden border border-[#CFC7B6] bg-[#F3F0E7] py-2 shadow-[0_18px_30px_rgba(16,22,18,0.12)]">
                  {copy.services.items.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="block px-5 py-3 text-sm text-[#5E685F] transition-colors hover:bg-[#E9E2D2] hover:text-[#24342C]"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/faq"
            className={`border-b border-transparent pb-1 text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass} ${pathname === "/faq" ? accentClass : ""}`}
            style={displayFont}
          >
            {copy.navbar.faq}
          </Link>

          <Link
            href={contactLinks.contact}
            className={`border-b border-transparent pb-1 text-sm uppercase tracking-[0.28em] transition-colors ${textClass} ${hoverClass}`}
            style={displayFont}
          >
            {copy.navbar.contactUs}
          </Link>
        </nav>

        <div className="hidden items-center justify-self-end gap-4 md:flex">
          <Link
            href={contactLinks.estimate}
            className="inline-flex items-center gap-2 whitespace-nowrap border border-[#0A7A44] bg-[#24342C] px-5 py-3 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors hover:bg-[#0F2B1E] lg:px-6"
            style={displayFont}
          >
            {copy.navbar.onlineEstimate}
          </Link>

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
          className={`flex h-11 w-11 items-center justify-center justify-self-end rounded-full border transition-colors md:hidden ${
            overlayMode
              ? "border-white/20 bg-[#24342C]/18 text-[#F7F6F1] hover:bg-[#24342C]/28"
              : "border-[#CFC7B6] bg-[#F3F0E7] text-[#24342C] hover:bg-[#E9E2D2]"
          }`}
          onClick={() => setMobileOpen((current) => !current)}
          aria-label={copy.navbar.toggleMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#CFC7B6] bg-[#F3F0E7]/98 px-4 pb-5 pt-0 backdrop-blur-md sm:px-6 md:hidden">
          <div className="border border-t-0 border-[#CFC7B6] bg-[#F3F0E7]">
            <div className="p-5">
              <div className="flex flex-col gap-4">
                {mobileLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-l-2 border-transparent pl-3 text-sm uppercase tracking-[0.24em] text-[#24342C] transition-colors hover:border-[#0A7A44] hover:text-[#036738]"
                    style={displayFont}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div
                className="mt-6 flex items-center justify-between gap-3 border-t border-[#CFC7B6] pt-4 text-sm uppercase tracking-[0.3em] text-[#5E685F]"
                style={displayFont}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLocale("en")}
                    className={`transition-colors ${locale === "en" ? "text-[#036738]" : "hover:text-[#24342C]"}`}
                    aria-pressed={locale === "en"}
                  >
                    EN
                  </button>
                  <span className="text-[#B7B1A3]">|</span>
                  <button
                    onClick={() => setLocale("fr")}
                    className={`transition-colors ${locale === "fr" ? "text-[#036738]" : "hover:text-[#24342C]"}`}
                    aria-pressed={locale === "fr"}
                  >
                    FR
                  </button>
                </div>

                <Link
                  href={contactLinks.estimate}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center whitespace-nowrap border border-[#0A7A44] bg-[#24342C] px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#F7F6F1] transition-colors hover:bg-[#0F2B1E]"
                  style={displayFont}
                >
                  {copy.navbar.onlineEstimate}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
