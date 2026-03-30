"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { type FaqPageContent } from "@/lib/faq-page"
import { loginFaqAdmin, logoutFaqAdmin, requireFaqAdminAuth } from "@/lib/admin-faq-auth"
import { saveFaqEntries } from "@/lib/faq-store"
import { isLocale, type Locale } from "@/lib/site-copy"

export type AdminFaqActionState = {
  error?: string
  success?: string
}

export async function loginFaqAction(formData: FormData) {
  const password = String(formData.get("password") ?? "")

  const success = await loginFaqAdmin(password)

  if (!success) {
    redirect("/faq/admin?error=invalid")
  }

  redirect("/faq/admin")
}

export async function logoutFaqAction() {
  await logoutFaqAdmin()
  redirect("/faq/admin")
}

export async function saveFaqAction(_: AdminFaqActionState, formData: FormData): Promise<AdminFaqActionState> {
  try {
    await requireFaqAdminAuth()

    const payload = String(formData.get("payload") ?? "")
    const parsed = JSON.parse(payload) as Record<string, FaqPageContent>

    const entries = Object.fromEntries(
      Object.entries(parsed).filter(([locale]) => isLocale(locale)),
    ) as Partial<Record<Locale, FaqPageContent>>

    if (!entries.en || !entries.fr) {
      return { error: "Both English and French FAQ content are required." }
    }

    await saveFaqEntries({
      en: entries.en,
      fr: entries.fr,
    })

    revalidatePath("/faq")
    revalidatePath("/faq/admin")
    revalidatePath("/admin/faq")

    return { success: "FAQ saved." }
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return { error: "Session expired. Refresh and log in again." }
    }

    if (error instanceof Error) {
      return { error: error.message }
    }

    return { error: "Failed to save FAQ." }
  }
}
