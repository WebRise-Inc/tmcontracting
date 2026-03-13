import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

import { defaultLocale, isLocale, siteCopy } from "@/lib/site-copy"

const FROM = "tm-contracting@notifications.webrise.ca"
const TO = "tm-contracting@notifications.webrise.ca"

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResendClient()
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const questionnaire = formData.get("questionnaire") as string
    const cvFile = formData.get("cv") as File | null
    const photoFile = formData.get("photo") as File | null
    const localeValue = formData.get("locale")
    const locale = typeof localeValue === "string" && isLocale(localeValue) ? localeValue : defaultLocale
    const copy = siteCopy[locale].emails.career

    // Upload files to Blob if provided
    let cvUrl = ""
    let photoUrl = ""

    if (cvFile && cvFile.size > 0) {
      const cvBlob = await put(`careers/${Date.now()}-${cvFile.name}`, cvFile, { access: "public" })
      cvUrl = cvBlob.url
    }
    if (photoFile && photoFile.size > 0) {
      const photoBlob = await put(`careers/${Date.now()}-${photoFile.name}`, photoFile, { access: "public" })
      photoUrl = photoBlob.url
    }

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `${copy.subjectPrefix} — ${fullName}`,
      html: `
        <h2 style="font-family:sans-serif;color:#24342C">${copy.heading}</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.fullName}</td><td style="padding:8px">${fullName}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.phone}</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.email}</td><td style="padding:8px">${email}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.questionnaire}</td><td style="padding:8px">${questionnaire}</td></tr>
          ${cvUrl ? `<tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.cv}</td><td style="padding:8px"><a href="${cvUrl}">${copy.downloadCv}</a></td></tr>` : ""}
          ${photoUrl ? `<tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.photo}</td><td style="padding:8px"><a href="${photoUrl}">${copy.viewPhoto}</a></td></tr>` : ""}
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Career form error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
