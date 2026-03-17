import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

import { defaultLocale, isLocale, siteCopy } from "@/lib/site-copy"

const FROM = "tm-contracting@notifications.webrise.ca"
const TO = "tm-contracting@notifications.webrise.ca"

function formatPreferredTime(value: string | null | undefined, locale: "en" | "fr") {
  if (!value) return ""

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/)

  if (!match) return value

  const [, year, month, day, hour, minute] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute)))

  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(date)
}

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
    const { name, phone, email, sector, preferredWindow, preferredTime, locale: localeValue } = await request.json()

    if (!name || !phone || !email || !sector) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const locale = isLocale(localeValue) ? localeValue : defaultLocale
    const copy = siteCopy[locale].emails.contact
    const formattedPreferredTime = formatPreferredTime(preferredTime, locale)

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `${copy.subjectPrefix} — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#24342C">${copy.heading}</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.name}</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.phone}</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.email}</td><td style="padding:8px">${email}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.sector}</td><td style="padding:8px">${sector}</td></tr>
          ${preferredWindow ? `<tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.preferredWindow}</td><td style="padding:8px">${preferredWindow}</td></tr>` : ""}
          ${formattedPreferredTime ? `<tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.preferredTime}</td><td style="padding:8px">${formattedPreferredTime}</td></tr>` : ""}
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 })
  }
}
