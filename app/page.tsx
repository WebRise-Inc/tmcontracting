import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ServicesOverview } from "@/components/services-overview"
import { AboutSection } from "@/components/about-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"

export default function Page() {
  return (
    <main className="bg-[#F7F6F1] min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
    </main>
  )
}
