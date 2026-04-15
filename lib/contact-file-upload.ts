const MEGABYTE = 1024 * 1024

export const CONTACT_UPLOAD_ROUTE = "/api/contact/uploads"

export const CAREER_UPLOAD_LIMITS = {
  cv: 10 * MEGABYTE,
  coverLetter: 10 * MEGABYTE,
  photo: 15 * MEGABYTE,
} as const

export const QUOTE_UPLOAD_LIMITS = {
  photos: 15 * MEGABYTE,
} as const

export type CareerUploadField = keyof typeof CAREER_UPLOAD_LIMITS
export type QuoteUploadField = keyof typeof QUOTE_UPLOAD_LIMITS

export type ContactUploadPayload =
  | {
      kind: "career"
      fieldName: CareerUploadField
    }
  | {
      kind: "quote"
      fieldName: QuoteUploadField
    }

const CAREER_DOCUMENT_CONTENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const

const IMAGE_CONTENT_TYPES = ["image/*"] as const

export function isCareerUploadField(value: string): value is CareerUploadField {
  return value in CAREER_UPLOAD_LIMITS
}

export function isQuoteUploadField(value: string): value is QuoteUploadField {
  return value in QUOTE_UPLOAD_LIMITS
}

export function getCareerAllowedContentTypes(fieldName: CareerUploadField) {
  return fieldName === "photo" ? [...IMAGE_CONTENT_TYPES] : [...CAREER_DOCUMENT_CONTENT_TYPES]
}

export function getQuoteAllowedContentTypes() {
  return [...IMAGE_CONTENT_TYPES]
}

export function formatUploadLimit(limitInBytes: number) {
  const sizeInMegabytes = limitInBytes / MEGABYTE
  return Number.isInteger(sizeInMegabytes) ? `${sizeInMegabytes} MB` : `${sizeInMegabytes.toFixed(1)} MB`
}

export function sanitizeUploadFilename(filename: string) {
  const lastDotIndex = filename.lastIndexOf(".")
  const baseName = (lastDotIndex >= 0 ? filename.slice(0, lastDotIndex) : filename)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const extension = (lastDotIndex >= 0 ? filename.slice(lastDotIndex) : "")
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, "")

  return `${baseName || "file"}${extension}`
}
