import { Resend } from "resend"

type NotificationLocale = "en" | "fr"

type NotificationLink = {
  href: string
  label: string
}

type NotificationField = {
  label: string
  links?: NotificationLink[]
  value?: string | null
}

type SendNotificationEmailInput = {
  fields: NotificationField[]
  locale: NotificationLocale
  preview?: string
  replyTo?: string | null
  subject: string
  title: string
}

const FALLBACK_NOTIFICATION_FROM = "TM Contracting <tm-contracting@notifications.webrise.ca>"
const FALLBACK_NOTIFICATION_TO = "payment@tmforcontracting.com"
const FALLBACK_NOTIFICATION_BCC = "info@webrise.ca"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function getNotificationFromAddress() {
  return process.env.TM_NOTIFICATION_FROM?.trim() || FALLBACK_NOTIFICATION_FROM
}

function getNotificationToAddress() {
  return process.env.TM_NOTIFICATION_TO?.trim() || FALLBACK_NOTIFICATION_TO
}

function getNotificationBccAddresses() {
  const configuredValue = process.env.TM_NOTIFICATION_BCC?.trim() || FALLBACK_NOTIFICATION_BCC

  return configuredValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  return new Resend(apiKey)
}

function getLocaleCopy(locale: NotificationLocale) {
  if (locale === "fr") {
    return {
      emptyValue: "Non fourni",
      footer: "Notification automatique envoyee depuis le site web de TM Contracting.",
      submittedAt: "Soumis le",
    }
  }

  return {
    emptyValue: "Not provided",
    footer: "Automatic notification sent from the TM Contracting website.",
    submittedAt: "Submitted",
  }
}

function normalizeReplyTo(value: string | null | undefined) {
  const trimmedValue = value?.trim()

  if (!trimmedValue) {
    return undefined
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue) ? trimmedValue : undefined
}

function formatSubmittedAt(locale: NotificationLocale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Toronto",
  }).format(new Date())
}

function renderTextValue(value: string | null | undefined, emptyValueLabel: string) {
  const trimmedValue = value?.trim()

  return trimmedValue ? escapeHtml(trimmedValue).replace(/\n/g, "<br />") : emptyValueLabel
}

function renderFieldValue(field: NotificationField, emptyValueLabel: string) {
  if (field.links && field.links.length > 0) {
    return `
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${field.links
          .map(
            (link) => `
              <a
                href="${escapeHtml(link.href)}"
                style="color:#314B3E;font-size:14px;font-weight:600;text-decoration:none;"
              >
                ${escapeHtml(link.label)}
              </a>
            `,
          )
          .join("")}
      </div>
    `
  }

  return `<div style="font-size:15px;line-height:1.65;color:#24342C;">${renderTextValue(field.value, emptyValueLabel)}</div>`
}

function buildHtmlEmail({
  fields,
  locale,
  preview,
  title,
}: Pick<SendNotificationEmailInput, "fields" | "locale" | "preview" | "title">) {
  const localeCopy = getLocaleCopy(locale)
  const previewText = preview?.trim() || title
  const submittedAt = formatSubmittedAt(locale)

  return `
    <!DOCTYPE html>
    <html lang="${locale}">
      <body style="margin:0;padding:0;background:#E9E5DA;color:#24342C;font-family:Arial,sans-serif;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
          ${escapeHtml(previewText)}
        </div>
        <table role="presentation" width="100%" style="border-collapse:collapse;background:#E9E5DA;">
          <tr>
            <td align="center" style="padding:28px 14px;">
              <table role="presentation" width="100%" style="max-width:680px;border-collapse:collapse;">
                <tr>
                  <td style="padding:28px 32px;background:#24342C;border-radius:24px 24px 0 0;">
                    <p style="margin:0 0 12px;font-size:11px;letter-spacing:0.28em;font-weight:700;color:#C8D87A;">
                      TM CONTRACTING
                    </p>
                    <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.15;font-weight:400;color:#F7F6F1;">
                      ${escapeHtml(title)}
                    </h1>
                    <p style="margin:14px 0 0;font-size:15px;line-height:1.6;color:#D7D3CB;">
                      ${escapeHtml(previewText)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 32px;background:#FFFFFF;border:1px solid #D6D1C4;border-top:4px solid #7F8F57;border-radius:0 0 24px 24px;">
                    <p style="margin:0 0 22px;font-size:13px;line-height:1.6;color:#5E685F;">
                      ${localeCopy.submittedAt}:
                      <span style="font-weight:700;color:#24342C;">${escapeHtml(submittedAt)}</span>
                    </p>
                    <table role="presentation" width="100%" style="border-collapse:collapse;">
                      ${fields
                        .map(
                          (field, index) => `
                            <tr>
                              <td style="padding:${index === 0 ? "0" : "12px 0 0"};">
                                <div style="padding:16px 18px;border:1px solid #E3DED3;border-radius:18px;background:${index % 2 === 0 ? "#F9F7F2" : "#F4F0E7"};">
                                  <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.18em;font-weight:700;text-transform:uppercase;color:#6A756F;">
                                    ${escapeHtml(field.label)}
                                  </p>
                                  ${renderFieldValue(field, localeCopy.emptyValue)}
                                </div>
                              </td>
                            </tr>
                          `,
                        )
                        .join("")}
                    </table>
                    <p style="margin:22px 0 0;font-size:12px;line-height:1.7;color:#5E685F;">
                      ${localeCopy.footer}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

function buildTextEmail({
  fields,
  locale,
  title,
}: Pick<SendNotificationEmailInput, "fields" | "locale" | "title">) {
  const localeCopy = getLocaleCopy(locale)
  const submittedAt = formatSubmittedAt(locale)

  const lines = fields.flatMap((field) => {
    if (field.links && field.links.length > 0) {
      return [field.label, ...field.links.map((link) => `- ${link.label}: ${link.href}`), ""]
    }

    const value = field.value?.trim() || localeCopy.emptyValue
    return [field.label, value, ""]
  })

  return ["TM Contracting", title, `${localeCopy.submittedAt}: ${submittedAt}`, "", ...lines, localeCopy.footer].join("\n")
}

export async function sendNotificationEmail(input: SendNotificationEmailInput) {
  const resend = getResendClient()

  return resend.emails.send({
    bcc: getNotificationBccAddresses(),
    from: getNotificationFromAddress(),
    html: buildHtmlEmail(input),
    replyTo: normalizeReplyTo(input.replyTo),
    subject: input.subject,
    text: buildTextEmail(input),
    to: getNotificationToAddress(),
  })
}
