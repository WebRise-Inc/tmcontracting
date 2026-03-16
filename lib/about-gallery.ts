import type { Locale } from "@/lib/site-copy"

type AboutGallerySlide = {
  src: string
  alt: string
}

const extraAboutSlidePaths = Array.from({ length: 28 }, (_, index) => {
  const imageNumber = String(index + 20).padStart(2, "0")
  return `/images/about-real/about-${imageNumber}.jpeg`
})

const extraAboutSlides: Record<Locale, AboutGallerySlide[]> = {
  en: extraAboutSlidePaths.map((src, index) => ({
    src,
    alt: `TM Contracting project photo ${index + 20}`,
  })),
  fr: extraAboutSlidePaths.map((src, index) => ({
    src,
    alt: `Photo de projet TM Contracting ${index + 20}`,
  })),
}

export function getAboutGallerySlides(locale: Locale, baseSlides: AboutGallerySlide[]) {
  return [...baseSlides, ...extraAboutSlides[locale]]
}
