import { NextRequest, NextResponse } from "next/server"

import { sendNotificationEmail } from "@/lib/notification-email"
import { defaultLocale, isLocale, siteCopy } from "@/lib/site-copy"

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

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email, sector, preferredWindow, preferredTime, locale: localeValue } = await request.json()

    if (!name || !phone || !email || !sector || !preferredWindow) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const locale = isLocale(localeValue) ? localeValue : defaultLocale
    const copy = siteCopy[locale].emails.contact
    const formattedPreferredTime = formatPreferredTime(preferredTime, locale)

    await sendNotificationEmail({
      fields: [
        { label: copy.name, value: name },
        { label: copy.phone, value: phone },
        { label: copy.email, value: email },
        { label: copy.sector, value: sector },
        { label: copy.preferredWindow, value: preferredWindow },
        ...(formattedPreferredTime ? [{ label: copy.preferredTime, value: formattedPreferredTime }] : []),
      ],
      locale,
      preview: `${copy.subjectPrefix} - ${name}`,
      replyTo: email,
      subject: `${copy.subjectPrefix} - ${name}`,
      title: copy.heading,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 })
  }
}
