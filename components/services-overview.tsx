"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { useLocale } from "@/components/locale-provider"

export function ServicesOverview() {
  const { copy } = useLocale()

  return (
    <section id="services" className="bg-[#F7F6F1] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#7F8F57] mb-3"
            style={{ fontFamily: "'Vogue', serif" }}
          >
            {copy.services.eyebrow}
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#24342C] text-balance leading-tight"
            style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
          >
            {copy.services.title}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {copy.services.items.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-sm bg-[#E9E5DA]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                />
                {/* Dark tint on hover */}
                <div className="absolute inset-0 bg-[#24342C]/0 group-hover:bg-[#24342C]/25 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3
                  className="text-lg text-[#24342C] mb-2 group-hover:text-[#7F8F57] transition-colors duration-300"
                  style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
                >
                  {service.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-[#5E685F] font-sans">
                  {service.description}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#314B3E] group-hover:text-[#7F8F57] transition-colors duration-300"
                  style={{ fontFamily: "'Vogue', serif" }}
                >
                  {copy.services.learnMore}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
