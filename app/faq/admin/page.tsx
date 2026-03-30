import type { Metadata } from "next"

import { loginFaqAction, logoutFaqAction } from "@/app/admin/faq/actions"
import { AdminFaqEditor } from "@/components/admin-faq-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isFaqAdminAuthenticated, isFaqAdminConfigured } from "@/lib/admin-faq-auth"
import { isFaqDatabaseConfigured, loadFaqEntries } from "@/lib/faq-store"

export const metadata: Metadata = {
  title: "FAQ Admin | TM Contracting",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function FaqAdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const error = resolvedSearchParams?.error
  const authConfigured = isFaqAdminConfigured()
  const databaseConfigured = isFaqDatabaseConfigured
  const authenticated = await isFaqAdminAuthenticated()

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#F7F6F1] px-6 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-[#D6D1C4] bg-white p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.28em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
            FAQ Admin
          </p>
          <h1 className="mt-3 text-3xl text-[#24342C]" style={{ fontFamily: "'Vogue', serif" }}>
            Sign In
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
            This page is private. Enter the FAQ password to edit the content stored in Neon.
          </p>

          {!authConfigured ? <p className="mt-4 text-sm text-red-700">Set `FAQ_ADMIN_PASSWORD` before using this page.</p> : null}
          {!databaseConfigured ? <p className="mt-2 text-sm text-red-700">Set `FAQ_DATABASE_URL` before saving FAQ content.</p> : null}
          {error === "invalid" ? <p className="mt-4 text-sm text-red-700">Incorrect password.</p> : null}

          <form action={loginFaqAction} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#24342C]">
                Password
              </Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>

            <Button type="submit" className="w-full bg-[#24342C] text-white hover:bg-[#0F2B1E]">
              Continue
            </Button>
          </form>
        </div>
      </main>
    )
  }

  const entries = await loadFaqEntries()

  return (
    <main className="min-h-screen bg-[#F7F6F1] px-6 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#D6D1C4] bg-white p-6 shadow-sm md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#036738]" style={{ fontFamily: "'Vogue', serif" }}>
              FAQ Admin
            </p>
            <h1 className="mt-3 text-3xl text-[#24342C]" style={{ fontFamily: "'Vogue', serif" }}>
              Edit FAQ Blocks
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5E685F]">
              Edit English and French together in one place. Each category and question is shared structurally, with side-by-side fields for translation.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href="/faq" target="_blank" rel="noreferrer">
                Open Public FAQ
              </a>
            </Button>
            <form action={logoutFaqAction}>
              <Button type="submit" variant="ghost">
                Log Out
              </Button>
            </form>
          </div>
        </div>

        <AdminFaqEditor initialEntries={entries} />
      </div>
    </main>
  )
}
