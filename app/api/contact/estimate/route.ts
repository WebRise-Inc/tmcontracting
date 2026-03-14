import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

import { onlineEstimatePage } from "@/lib/online-estimate-page"
import { defaultLocale, isLocale } from "@/lib/site-copy"

const FROM = "tm-contracting@notifications.webrise.ca"
const TO = "tm-contracting@notifications.webrise.ca"

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  return new Resend(apiKey)
}

function formatMeetingDate(value: string, locale: "en" | "fr") {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    return value
  }

  const [, year, month, day] = match
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12))

  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(date)
}

export async function POST(request: NextRequest) {
  try {
    const resend = getResendClient()
    const {
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      locale: localeValue,
    } = await request.json()

    const locale = isLocale(localeValue) ? localeValue : defaultLocale
    const copy = onlineEstimatePage[locale].emails

    if (!fullName || !phone || !email || !preferredDate || !preferredTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
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
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.date}</td><td style="padding:8px">${formatMeetingDate(preferredDate, locale)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">${copy.time}</td><td style="padding:8px">${preferredTime}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[tm] Online estimate form error:", error)
    return NextResponse.json({ error: "Failed to submit online estimate request" }, { status: 500 })
  }
}
