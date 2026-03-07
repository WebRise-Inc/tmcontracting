import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Renovation",
    slug: "renovation",
    image: "/images/service-renovation.jpg",
    description:
      "From kitchen and bathroom upgrades to full interior transformations — we modernize your space with precision craftsmanship and minimal disruption to your daily life.",
  },
  {
    title: "Concrete",
    slug: "concrete",
    image: "/images/service-concrete.jpg",
    description:
      "Foundations, slabs, driveways, and decorative finishes. Our concrete work is built to last, with expert forming, pouring, and finishing on every project.",
  },
  {
    title: "Excavation & Lifting",
    slug: "excavation-lifting",
    image: "/images/service-excavation.jpg",
    description:
      "Site preparation, grading, foundation excavation, and structural lifting handled by our experienced operators and heavy equipment fleet.",
  },
  {
    title: "New Construction",
    slug: "new-construction",
    image: "/images/service-construction.jpg",
    description:
      "Full builds from the ground up — we manage every phase from excavation to final keys, with one accountable team and zero subcontractor confusion.",
  },
]

export function ServicesOverview() {
  return (
    <section className="bg-[#F7F6F1] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p
            className="text-xs tracking-[0.3em] uppercase text-[#7F8F57] mb-3"
            style={{ fontFamily: "'Vogue', serif" }}
          >
            What We Do
          </p>
          <h2
            className="text-4xl md:text-5xl text-[#24342C] text-balance leading-tight"
            style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
          >
            Our Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block bg-[#E9E5DA] overflow-hidden rounded-sm"
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
              <div className="p-5">
                <h3
                  className="text-lg text-[#24342C] mb-2 group-hover:text-[#7F8F57] transition-colors duration-300"
                  style={{ fontFamily: "'Vogue', serif", fontWeight: "normal" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-[#5E685F] leading-relaxed mb-4 font-sans">
                  {service.description}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-[#314B3E] group-hover:text-[#7F8F57] transition-colors duration-300"
                  style={{ fontFamily: "'Vogue', serif" }}
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
