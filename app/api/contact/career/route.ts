import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

import { sendNotificationEmail } from "@/lib/notification-email"
import { defaultLocale, isLocale, siteCopy } from "@/lib/site-copy"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const city = formData.get("city") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const workAuthorization = formData.get("workAuthorization") as string
    const driversLicense = formData.get("driversLicense") as string
    const languages = formData
      .getAll("languages")
      .filter((value): value is string => typeof value === "string" && value.length > 0)
      .join(", ")
    const cvUrlValue = formData.get("cvUrl")
    const coverLetterUrlValue = formData.get("coverLetterUrl")
    const photoUrlValue = formData.get("photoUrl")
    const cvFile = formData.get("cv") as File | null
    const coverLetterFile = formData.get("coverLetter") as File | null
    const photoFile = formData.get("photo") as File | null
    const localeValue = formData.get("locale")
    const locale = typeof localeValue === "string" && isLocale(localeValue) ? localeValue : defaultLocale
    const copy = siteCopy[locale].emails.career
    const cvUrlInput = typeof cvUrlValue === "string" ? cvUrlValue.trim() : ""
    const coverLetterUrlInput = typeof coverLetterUrlValue === "string" ? coverLetterUrlValue.trim() : ""
    const photoUrlInput = typeof photoUrlValue === "string" ? photoUrlValue.trim() : ""

    if (
      !fullName ||
      !city ||
      !phone ||
      !email ||
      !workAuthorization ||
      !driversLicense ||
      !languages ||
      (!cvUrlInput && !cvFile) ||
      (!coverLetterUrlInput && !coverLetterFile) ||
      (!photoUrlInput && !photoFile)
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Use direct-uploaded Blob URLs when available, otherwise fall back to server uploads.
    let cvUrl = cvUrlInput
    let coverLetterUrl = coverLetterUrlInput
    let photoUrl = photoUrlInput

    if (!cvUrl && cvFile && cvFile.size > 0) {
      const cvBlob = await put(`careers/${Date.now()}-${cvFile.name}`, cvFile, { access: "public" })
      cvUrl = cvBlob.url
    }
    if (!coverLetterUrl && coverLetterFile && coverLetterFile.size > 0) {
      const coverLetterBlob = await put(`careers/${Date.now()}-${coverLetterFile.name}`, coverLetterFile, { access: "public" })
      coverLetterUrl = coverLetterBlob.url
    }
    if (!photoUrl && photoFile && photoFile.size > 0) {
      const photoBlob = await put(`careers/${Date.now()}-${photoFile.name}`, photoFile, { access: "public" })
      photoUrl = photoBlob.url
    }

    await sendNotificationEmail({
      fields: [
        { label: copy.fullName, value: fullName },
        { label: copy.city, value: city },
        { label: copy.phone, value: phone },
        { label: copy.email, value: email },
        { label: copy.workAuthorization, value: workAuthorization },
        { label: copy.driversLicense, value: driversLicense },
        { label: copy.languages, value: languages },
        ...(cvUrl
          ? [
              {
                label: copy.cv,
                links: [{ href: cvUrl, label: copy.downloadCv }],
              },
            ]
          : []),
        ...(coverLetterUrl
          ? [
              {
                label: copy.coverLetter,
                links: [{ href: coverLetterUrl, label: copy.downloadCoverLetter }],
              },
            ]
          : []),
        ...(photoUrl
          ? [
              {
                label: copy.photo,
                links: [{ href: photoUrl, label: copy.viewPhoto }],
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
    console.error("[v0] Career form error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
