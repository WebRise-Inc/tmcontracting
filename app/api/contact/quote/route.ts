import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

import { sendNotificationEmail } from "@/lib/notification-email"
import { defaultLocale, isLocale, siteCopy } from "@/lib/site-copy"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string
    const description = formData.get("description") as string
    const photos = formData
      .getAll("photos")
      .filter((value): value is File => value instanceof File && value.size > 0)
    const uploadedPhotoUrls = formData
      .getAll("photoUrls")
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
      .map((value) => value.trim())
    const localeValue = formData.get("locale")
    const locale = typeof localeValue === "string" && isLocale(localeValue) ? localeValue : defaultLocale
    const copy = siteCopy[locale].emails.quote

    if (!fullName || !phone || !email || !address || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Use direct-uploaded Blob URLs when available, otherwise fall back to server uploads.
    const photoUrls = [...uploadedPhotoUrls]
    for (const photo of photos) {
      const blob = await put(`quotes/${Date.now()}-${photo.name}`, photo, { access: "public" })
      photoUrls.push(blob.url)
    }

    await sendNotificationEmail({
      fields: [
        { label: copy.fullName, value: fullName },
        { label: copy.phone, value: phone },
        { label: copy.email, value: email },
        { label: copy.address, value: address },
        { label: copy.description, value: description },
        ...(photoUrls.length > 0
          ? [
              {
                label: copy.photos,
                links: photoUrls.map((url, index) => ({
                  href: url,
                  label: `${copy.photoLabel} ${index + 1}`,
                })),
              },
            ]
          : []),
      ],
      locale,
      preview: `${copy.subjectPrefix} - ${fullName}`,
      replyTo: email,
      subject: `${copy.subjectPrefix} - ${fullName}`,
      title: copy.heading,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Quote form error:", error)
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 })
  }
}
