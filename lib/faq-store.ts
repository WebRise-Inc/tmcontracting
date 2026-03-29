import { unstable_noStore as noStore } from "next/cache"
import postgres from "postgres"
import { z } from "zod"

import { faqPage, type FaqPageContent } from "@/lib/faq-page"
import { locales, type Locale } from "@/lib/site-copy"

const faqItemSchema = z.object({
  question: z.string().trim(),
  answer: z.string().trim(),
})

const faqCategorySchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  items: z.array(faqItemSchema),
})

export const faqPageContentSchema = z.object({
  metadata: z.object({
    title: z.string().trim(),
    description: z.string().trim(),
  }),
  breadcrumbHome: z.string().trim(),
  breadcrumbFaq: z.string().trim(),
  eyebrow: z.string().trim(),
  title: z.string().trim(),
  intro: z.string().trim(),
  highlights: z.array(
    z.object({
      value: z.string().trim(),
      label: z.string().trim(),
    }),
  ),
  categoryLabel: z.string().trim(),
  categories: z.array(faqCategorySchema),
  contactTitle: z.string().trim(),
  contactBody: z.string().trim(),
  primaryCta: z.string().trim(),
  secondaryCta: z.string().trim(),
})

const faqEntriesSchema = z.object({
  en: faqPageContentSchema,
  fr: faqPageContentSchema,
})

const databaseUrl =
  process.env.FAQ_DATABASE_URL ??
  process.env.NEON_DATABASE_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_URL ??
  ""

let sql: postgres.Sql | null = null
let ensured: Promise<void> | null = null

export const isFaqDatabaseConfigured = databaseUrl.length > 0

function getSql() {
  if (!isFaqDatabaseConfigured) {
    throw new Error("FAQ database is not configured.")
  }

  sql ??= postgres(databaseUrl, {
    prepare: false,
  })

  return sql
}

async function ensureFaqTable() {
  if (!isFaqDatabaseConfigured) {
    return
  }

  ensured ??= (async () => {
    await getSql()`
      create table if not exists faq_pages (
        locale text primary key,
        content jsonb not null,
        updated_at timestamptz not null default now()
      )
    `
  })()

  await ensured
}

function normalizeFaqContent(input: FaqPageContent): FaqPageContent {
  return faqPageContentSchema.parse({
    ...input,
    highlights: input.highlights.filter((item) => item.value || item.label),
    categories: input.categories
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => item.question || item.answer),
      }))
      .filter((category) => category.title || category.description || category.items.length > 0),
  })
}

export async function loadFaqEntries(): Promise<Record<Locale, FaqPageContent>> {
  noStore()

  if (!isFaqDatabaseConfigured) {
    return faqPage
  }

  await ensureFaqTable()

  try {
    const rows = await getSql()<{
      locale: Locale
      content: FaqPageContent
    }[]>`
      select locale, content
      from faq_pages
    `

    const byLocale = Object.fromEntries(rows.map((row) => [row.locale, faqPageContentSchema.parse(row.content)])) as Partial<
      Record<Locale, FaqPageContent>
    >

    return {
      en: byLocale.en ?? faqPage.en,
      fr: byLocale.fr ?? faqPage.fr,
    }
  } catch (error) {
    console.error("Failed to load FAQ content from database.", error)
    return faqPage
  }
}

export async function saveFaqEntries(input: Record<Locale, FaqPageContent>) {
  if (!isFaqDatabaseConfigured) {
    throw new Error("FAQ database is not configured.")
  }

  await ensureFaqTable()

  const entries = faqEntriesSchema.parse({
    en: normalizeFaqContent(input.en),
    fr: normalizeFaqContent(input.fr),
  })

  const db = getSql()

  for (const locale of locales) {
    await db`
      insert into faq_pages (locale, content, updated_at)
      values (${locale}, ${db.json(entries[locale])}, now())
      on conflict (locale)
      do update set
        content = excluded.content,
        updated_at = now()
    `
  }
}
