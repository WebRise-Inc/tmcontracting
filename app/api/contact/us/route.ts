import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "tm-contracting@notifications.webrise.ca"
const TO = "tm-contracting@notifications.webrise.ca"

export async function POST(request: NextRequest) {
  try {
    const { name, phone, preferredTime } = await request.json()

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Contact Request — ${name}`,
      html: `
        <h2 style="font-family:sans-serif;color:#24342C">New Contact Request</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Name</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Phone</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Preferred Call Time</td><td style="padding:8px">${preferredTime}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 })
  }
}
