import { NextRequest, NextResponse } from "next/server"

import { sendNotificationEmail } from "@/lib/notification-email"
import { onlineEstimatePage } from "@/lib/online-estimate-page"
import { defaultLocale, isLocale } from "@/lib/site-copy"

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

    await sendNotificationEmail({
      fields: [
        { label: copy.fullName, value: fullName },
        { label: copy.phone, value: phone },
        { label: copy.email, value: email },
        { label: copy.date, value: formatMeetingDate(preferredDate, locale) },
        { label: copy.time, value: preferredTime },
      ],
      locale,
      preview: `${copy.subjectPrefix} - ${fullName}`,
      replyTo: email,
      subject: `${copy.subjectPrefix} - ${fullName}`,
      title: copy.heading,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[tm] Online estimate form error:", error)
    return NextResponse.json({ error: "Failed to submit online estimate request" }, { status: 500 })
  }
}
