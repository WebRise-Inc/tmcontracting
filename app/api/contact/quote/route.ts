import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = "tm-contracting@notifications.webrise.ca"
const TO = "tm-contracting@notifications.webrise.ca"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const email = formData.get("email") as string
    const address = formData.get("address") as string
    const description = formData.get("description") as string
    const photos = formData.getAll("photos") as File[]

    // Upload photos to Blob
    const photoUrls: string[] = []
    for (const photo of photos) {
      if (photo && photo.size > 0) {
        const blob = await put(`quotes/${Date.now()}-${photo.name}`, photo, { access: "public" })
        photoUrls.push(blob.url)
      }
    }

    const photoLinks = photoUrls
      .map((url, i) => `<a href="${url}" style="margin-right:8px">Photo ${i + 1}</a>`)
      .join("")

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `New Quote Request — ${fullName}`,
      html: `
        <h2 style="font-family:sans-serif;color:#24342C">New Quote Request</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Full Name</td><td style="padding:8px">${fullName}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Phone</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Email</td><td style="padding:8px">${email}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Address</td><td style="padding:8px">${address}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Project Description</td><td style="padding:8px">${description}</td></tr>
          ${photoLinks ? `<tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Photos</td><td style="padding:8px">${photoLinks}</td></tr>` : ""}
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Quote form error:", error)
    return NextResponse.json({ error: "Failed to submit quote request" }, { status: 500 })
  }
}
