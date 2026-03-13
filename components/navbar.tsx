"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"

import { useLocale } from "@/components/locale-provider"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { locale, setLocale, copy } = useLocale()
  const contactLinks = {
    quote: "/#contact",
    career: "/#contact-career",
    contact: "/#contact-contact",
  } as const
  const mobileLinks = [
    { label: copy.navbar.home, href: "/" },
    { label: copy.navbar.services, href: "/#services" },
    { label: copy.navbar.career, href: contactLinks.career },
    { label: copy.navbar.faq, href: "/faq" },
  ]

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-[#F7F6F1]/90 backdrop-blur-sm border-b border-[#D6D1C4]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo_LQ.png"
            alt={copy.navbar.logoAlt}
            width={500}
            height={500}
            className="h-14 w-14 object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors" style={{ fontFamily: "'Vogue', serif" }}>
            {copy.navbar.home}
          </Link>
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors"
              style={{ fontFamily: "'Vogue', serif" }}
            >
              {copy.navbar.services} <ChevronDown className="w-4 h-4" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-[#F7F6F1] border border-[#D6D1C4] shadow-md rounded-sm py-1">
                {copy.services.items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block px-4 py-2.5 text-sm text-[#5E685F] hover:bg-[#E9E5DA] hover:text-[#24342C] transition-colors font-sans"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href={contactLinks.career} className="text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors" style={{ fontFamily: "'Vogue', serif" }}>
            {copy.navbar.career}
          </Link>
          <Link href="/faq" className="text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors" style={{ fontFamily: "'Vogue', serif" }}>
            {copy.navbar.faq}
          </Link>
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center border border-[#D6D1C4] overflow-hidden" style={{ fontFamily: "'Vogue', serif" }}>
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors duration-200 ${
                locale === "en"
                  ? "bg-[#314B3E] text-[#F7F6F1]"
                  : "text-[#5E685F] hover:text-[#24342C] hover:bg-[#E9E5DA]"
              }`}
            >
              EN
            </button>
            <span className="w-px h-5 bg-[#D6D1C4]" />
            <button
              onClick={() => setLocale("fr")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors duration-200 ${
                locale === "fr"
                  ? "bg-[#314B3E] text-[#F7F6F1]"
                  : "text-[#5E685F] hover:text-[#24342C] hover:bg-[#E9E5DA]"
              }`}
            >
              FR
            </button>
          </div>

          {/* CTA */}
          <Link
            href={contactLinks.contact}
            className="group relative overflow-hidden px-6 py-2.5 bg-[#314B3E] text-[#F7F6F1] text-base tracking-widest uppercase transition-colors duration-300 hover:text-[#F7F6F1] flex items-center gap-2"
            style={{ fontFamily: "'Vogue', serif" }}
          >
            <span className="relative z-10">{copy.navbar.contactUs}</span>
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-[#7F8F57] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#24342C]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={copy.navbar.toggleMenu}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F7F6F1] border-t border-[#D6D1C4] px-6 py-4 flex flex-col gap-4">
          {mobileLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-[#24342C] hover:text-[#7F8F57] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile lang switcher */}
          <div className="flex items-center border border-[#D6D1C4] self-start overflow-hidden" style={{ fontFamily: "'Vogue', serif" }}>
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors ${locale === "en" ? "bg-[#314B3E] text-[#F7F6F1]" : "text-[#5E685F]"}`}
            >
              EN
            </button>
            <span className="w-px h-5 bg-[#D6D1C4]" />
            <button
              onClick={() => setLocale("fr")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors ${locale === "fr" ? "bg-[#314B3E] text-[#F7F6F1]" : "text-[#5E685F]"}`}
            >
              FR
            </button>
          </div>
          <Link
            href={contactLinks.contact}
            onClick={() => setMobileOpen(false)}
            className="px-5 py-2 text-sm font-semibold border-2 border-[#314B3E] text-[#314B3E] text-center hover:bg-[#314B3E] hover:text-[#F7F6F1] transition-colors"
          >
            {copy.navbar.contactUs}
          </Link>
        </div>
      )}
    </header>
  )
}
