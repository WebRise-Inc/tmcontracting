import type { Locale } from "@/lib/site-copy"

type AboutGallerySlide = {
  src: string
  alt: string
  locationLabel: string
}

const aboutProjectLocations = [
  "Longueuil, QC J4H 3N7",
  "Longueuil, QC J4H 3N7",
  "Longueuil, QC J4H 3N7",
  "Gatineau, QC J8T 2M1",
  "Cantley, QC J8V 3M5",
  "Chelsea, QC J8V 1G1",
  "Orleans, ON K4A 0W2",
  "Montreal, QC H4N 2Y5",
  "Wakefield, QC J0X 3G0",
  "Wakefield, QC J0X 3G0",
  "Buckingham, QC J8M 1T7",
  "Buckingham, QC J8M 1T7",
  "Buckingham, QC J8M 1T7",
  "Orleans, ON K4A 1H2",
  "Orleans, ON K4A 1H2",
  "Aylmer, QC J9J 2K9",
  "Cantley, QC J8V 3M5",
  "Greenboro, ON K1T 3Y2",
  "Orleans, ON K4A 1H2",
  "Gatineau, QC J8P 1C2",
  "Gatineau, QC J8P 1C2",
  "Nepean, ON K2G 3K8",
  "Cornwall, ON K6J 3R8",
  "Rigaud, QC J0P 1B0",
  "Walkley, ON K1V 7G7",
  "Gatineau, QC J8R 2H5",
  "Buckingham, QC J8M 1T7",
  "Montreal, QC J6J 2A3",
  "Montreal, QC H3Y 1R2",
  "Montreal, QC H3Y 1R2",
  "Wakefield, QC J0X 3G0",
  "Montreal, QC H4N 2Y5",
  "Buckingham, QC J8M 1T7",
  "Stittsville, ON K2S 1B6",
  "Greenboro, ON K1T 3Y2",
  "Cantley, QC J8V 3M5",
  "Cantley, QC J8V 3M5",
  "Dollard-des-Ormeaux, QC H9G 1S7",
  "Gatineau, QC J8T 2M1",
  "Saint-Calixte, QC J0K 1Z0",
  "Saint-Calixte, QC J0K 1Z0",
  "Laval, QC H7R 4C4",
  "Cantley, QC J8V 3M5",
  "Dollard-des-Ormeaux, QC H9G 1S7",
  "Montreal, QC H4N 2Y5",
  "Montreal, QC H4N 2Y5",
  "Montreal, QC H4N 2Y5",
] as const

function getAboutProjectLocation(index: number) {
  return aboutProjectLocations[index % aboutProjectLocations.length]
}

const extraAboutSlidePaths = Array.from({ length: 28 }, (_, index) => {
  const imageNumber = String(index + 20).padStart(2, "0")
  return `/images/about-real/about-${imageNumber}.jpeg`
})

const extraAboutSlides: Record<Locale, AboutGallerySlide[]> = {
  en: extraAboutSlidePaths.map((src, index) => ({
    src,
    alt: `TM Contracting project photo ${index + 20}`,
    locationLabel: getAboutProjectLocation(index + 19),
  })),
  fr: extraAboutSlidePaths.map((src, index) => ({
    src,
    alt: `Photo de projet TM Contracting ${index + 20}`,
    locationLabel: getAboutProjectLocation(index + 19),
  })),
}

export function getAboutGallerySlides(locale: Locale, baseSlides: { src: string; alt: string }[]) {
  return [
    ...baseSlides.map((slide, index) => ({
      ...slide,
      locationLabel: getAboutProjectLocation(index),
    })),
    ...extraAboutSlides[locale],
  ]
}
