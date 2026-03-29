import { createHash, timingSafeEqual } from "node:crypto"

import { cookies } from "next/headers"

const faqAdminCookieName = "tm-faq-admin"
const faqAdminPassword = process.env.FAQ_ADMIN_PASSWORD ?? ""

function createToken(password: string) {
  return createHash("sha256").update(`tm-faq-admin:${password}`).digest("hex")
}

function safeEqual(a: string, b: string) {
  const first = Buffer.from(a)
  const second = Buffer.from(b)

  if (first.length !== second.length) {
    return false
  }

  return timingSafeEqual(first, second)
}

export function isFaqAdminConfigured() {
  return faqAdminPassword.length > 0
}

export async function isFaqAdminAuthenticated() {
  if (!isFaqAdminConfigured()) {
    return false
  }

  const token = (await cookies()).get(faqAdminCookieName)?.value

  if (!token) {
    return false
  }

  return safeEqual(token, createToken(faqAdminPassword))
}

export async function requireFaqAdminAuth() {
  if (!(await isFaqAdminAuthenticated())) {
    throw new Error("Unauthorized")
  }
}

export async function loginFaqAdmin(password: string) {
  if (!isFaqAdminConfigured()) {
    throw new Error("FAQ admin password is not configured.")
  }

  if (!safeEqual(password, faqAdminPassword)) {
    return false
  }

  ;(await cookies()).set(faqAdminCookieName, createToken(faqAdminPassword), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })

  return true
}

export async function logoutFaqAdmin() {
  ;(await cookies()).set(faqAdminCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  })
}
