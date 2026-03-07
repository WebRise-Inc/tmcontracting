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
    const questionnaire = formData.get("questionnaire") as string
    const cvFile = formData.get("cv") as File | null
    const photoFile = formData.get("photo") as File | null

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
      subject: `New Career Application — ${fullName}`,
      html: `
        <h2 style="font-family:sans-serif;color:#24342C">New Career Application</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Full Name</td><td style="padding:8px">${fullName}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Phone</td><td style="padding:8px">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#5E685F">Email</td><td style="padding:8px">${email}</td></tr>
          <tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Questionnaire</td><td style="padding:8px">${questionnaire}</td></tr>
          ${cvUrl ? `<tr><td style="padding:8px;font-weight:bold;color:#5E685F">CV</td><td style="padding:8px"><a href="${cvUrl}">Download CV</a></td></tr>` : ""}
          ${photoUrl ? `<tr style="background:#f7f6f1"><td style="padding:8px;font-weight:bold;color:#5E685F">Photo</td><td style="padding:8px"><a href="${photoUrl}">View Photo</a></td></tr>` : ""}
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Career form error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
