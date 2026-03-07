"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [lang, setLang] = useState<"EN" | "FR">("EN")

  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-[#F7F6F1]/90 backdrop-blur-sm border-b border-[#D6D1C4]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex-shrink-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CKmfA4i0Lqr5vMTUqZ4P98LEmP6FHz.png"
            alt="TM Contracting Since 1991"
            width={72}
            height={72}
            className="h-14 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors" style={{ fontFamily: "'Vogue', serif" }}>
            Home
          </a>
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors"
              style={{ fontFamily: "'Vogue', serif" }}
            >
              Services <ChevronDown className="w-4 h-4" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full mt-2 left-0 w-56 bg-[#F7F6F1] border border-[#D6D1C4] shadow-md rounded-sm py-1">
                {[
                  { label: "Renovation", slug: "renovation" },
                  { label: "Concrete", slug: "concrete" },
                  { label: "Excavation & Lifting", slug: "excavation-lifting" },
                  { label: "New Construction", slug: "new-construction" },
                ].map((s) => (
                  <a key={s.slug} href={`/services/${s.slug}`} className="block px-4 py-2.5 text-sm text-[#5E685F] hover:bg-[#E9E5DA] hover:text-[#24342C] transition-colors font-sans">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a href="#" className="text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors" style={{ fontFamily: "'Vogue', serif" }}>
            Career
          </a>
          <a href="#" className="text-base tracking-widest uppercase text-[#24342C] hover:text-[#7F8F57] transition-colors" style={{ fontFamily: "'Vogue', serif" }}>
            FAQ
          </a>
        </nav>

        {/* Right side: lang switcher + CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language switcher */}
          <div className="flex items-center border border-[#D6D1C4] overflow-hidden" style={{ fontFamily: "'Vogue', serif" }}>
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors duration-200 ${
                lang === "EN"
                  ? "bg-[#314B3E] text-[#F7F6F1]"
                  : "text-[#5E685F] hover:text-[#24342C] hover:bg-[#E9E5DA]"
              }`}
            >
              EN
            </button>
            <span className="w-px h-5 bg-[#D6D1C4]" />
            <button
              onClick={() => setLang("FR")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors duration-200 ${
                lang === "FR"
                  ? "bg-[#314B3E] text-[#F7F6F1]"
                  : "text-[#5E685F] hover:text-[#24342C] hover:bg-[#E9E5DA]"
              }`}
            >
              FR
            </button>
          </div>

          {/* CTA */}
          <a
            href="#"
            className="group relative overflow-hidden px-6 py-2.5 bg-[#314B3E] text-[#F7F6F1] text-base tracking-widest uppercase transition-colors duration-300 hover:text-[#F7F6F1] flex items-center gap-2"
            style={{ fontFamily: "'Vogue', serif" }}
          >
            <span className="relative z-10">Contact us</span>
            <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-[#7F8F57] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#24342C]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F7F6F1] border-t border-[#D6D1C4] px-6 py-4 flex flex-col gap-4">
          {["Home", "Services", "Career", "FAQ"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium text-[#24342C] hover:text-[#7F8F57] transition-colors">
              {item}
            </a>
          ))}
          {/* Mobile lang switcher */}
          <div className="flex items-center border border-[#D6D1C4] self-start overflow-hidden" style={{ fontFamily: "'Vogue', serif" }}>
            <button
              onClick={() => setLang("EN")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors ${lang === "EN" ? "bg-[#314B3E] text-[#F7F6F1]" : "text-[#5E685F]"}`}
            >
              EN
            </button>
            <span className="w-px h-5 bg-[#D6D1C4]" />
            <button
              onClick={() => setLang("FR")}
              className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-colors ${lang === "FR" ? "bg-[#314B3E] text-[#F7F6F1]" : "text-[#5E685F]"}`}
            >
              FR
            </button>
          </div>
          <a href="#" className="px-5 py-2 text-sm font-semibold border-2 border-[#314B3E] text-[#314B3E] text-center hover:bg-[#314B3E] hover:text-[#F7F6F1] transition-colors">
            Contact us
          </a>
        </div>
      )}
    </header>
  )
}

