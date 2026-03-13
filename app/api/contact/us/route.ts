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
    const { name, phone, preferredTime, locale: localeValue } = await request.json()
    const locale = isLocale(localeValue) ? localeValue : defaultLocale
    const copy = siteCopy[locale].emails.contact

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `${copy.subjectPrefix} — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#24342C">${copy.heading}</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.name}</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.phone}</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.preferredTime}</td><td style="padding:8px">${preferredTime}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 })
  }
}
