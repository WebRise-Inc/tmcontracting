"use client"

import { useActionState, useMemo, useState } from "react"
import { Minus, Plus } from "lucide-react"

import { saveFaqAction, type AdminFaqActionState } from "@/app/admin/faq/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { FaqCategory, FaqItem, FaqPageContent } from "@/lib/faq-page"
import type { Locale } from "@/lib/site-copy"

type EditorEntries = Record<Locale, FaqPageContent>

const initialActionState: AdminFaqActionState = {}

function cloneEntries(entries: EditorEntries): EditorEntries {
  return JSON.parse(JSON.stringify(entries)) as EditorEntries
}

function createEmptyItem(): FaqItem {
  return { question: "", answer: "" }
}

function createEmptyCategory(): FaqCategory {
  return {
    title: "",
    description: "",
    items: [createEmptyItem()],
  }
}

function alignEntries(entries: EditorEntries): EditorEntries {
  const next = cloneEntries(entries)
  const maxCategoryCount = Math.max(next.en.categories.length, next.fr.categories.length)

  while (next.en.categories.length < maxCategoryCount) {
    next.en.categories.push(createEmptyCategory())
  }

  while (next.fr.categories.length < maxCategoryCount) {
    next.fr.categories.push(createEmptyCategory())
  }

  for (let categoryIndex = 0; categoryIndex < maxCategoryCount; categoryIndex += 1) {
    const enItems = next.en.categories[categoryIndex].items
    const frItems = next.fr.categories[categoryIndex].items
    const maxItemCount = Math.max(enItems.length, frItems.length)

    while (enItems.length < maxItemCount) {
      enItems.push(createEmptyItem())
    }

    while (frItems.length < maxItemCount) {
      frItems.push(createEmptyItem())
    }
  }

  return next
}

export function AdminFaqEditor({ initialEntries }: { initialEntries: EditorEntries }) {
  const [entries, setEntries] = useState<EditorEntries>(() => alignEntries(initialEntries))
  const [state, formAction, pending] = useActionState(saveFaqAction, initialActionState)

  const alignedEntries = useMemo(() => alignEntries(entries), [entries])
  const payload = JSON.stringify(alignedEntries)

  function updateEntries(updater: (draft: EditorEntries) => void) {
    setEntries((current) => {
      const next = alignEntries(current)
      updater(next)
      return alignEntries(next)
    })
  }

  function updateCategoryField(locale: Locale, categoryIndex: number, field: "title" | "description", value: string) {
    updateEntries((draft) => {
      draft[locale].categories[categoryIndex][field] = value
    })
  }

  function updateItemField(
    locale: Locale,
    categoryIndex: number,
    itemIndex: number,
    field: "question" | "answer",
    value: string,
  ) {
    updateEntries((draft) => {
      draft[locale].categories[categoryIndex].items[itemIndex][field] = value
    })
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="payload" value={payload} />

      <div className="sticky top-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#D6D1C4] bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="space-y-1">
          <p className="text-sm font-medium text-[#24342C]">Bilingual FAQ editor</p>
          <p className="text-sm text-[#5E685F]">
            Add a block once, then fill English and French side by side in the same row.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {state.error ? <p className="text-sm text-red-700">{state.error}</p> : null}
          {state.success ? <p className="text-sm text-[#036738]">{state.success}</p> : null}
          <Button type="submit" className="bg-[#24342C] text-white hover:bg-[#0F2B1E]" disabled={pending}>
            {pending ? "Saving..." : "Save FAQ"}
          </Button>
        </div>
      </div>

      <section className="bg-[#F7F6F1] px-6 py-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-[#5E685F]">
              Edit categories, questions, and answers only. Hero and page chrome stay outside this editor.
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                updateEntries((draft) => {
                  draft.en.categories.push(createEmptyCategory())
                  draft.fr.categories.push(createEmptyCategory())
                })
              }
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </div>

          {alignedEntries.en.categories.map((_, categoryIndex) => {
            const enCategory = alignedEntries.en.categories[categoryIndex]
            const frCategory = alignedEntries.fr.categories[categoryIndex]

            return (
              <section key={`category-${categoryIndex}`} className="rounded-2xl border border-[#D6D1C4] bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#24342C]">Category {categoryIndex + 1}</p>
                    <p className="mt-1 text-sm text-[#5E685F]">Shared structure, separate translations.</p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() =>
                      updateEntries((draft) => {
                        draft.en.categories.splice(categoryIndex, 1)
                        draft.fr.categories.splice(categoryIndex, 1)
                      })
                    }
                  >
                    <Minus className="h-4 w-4" />
                    Remove Category
                  </Button>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="space-y-3 rounded-xl bg-[#F7F6F1] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#036738]">English</p>
                    <Input
                      value={enCategory.title}
                      placeholder="Category title"
                      onChange={(event) => updateCategoryField("en", categoryIndex, "title", event.target.value)}
                    />
                    <Textarea
                      rows={3}
                      value={enCategory.description}
                      placeholder="Category description"
                      onChange={(event) => updateCategoryField("en", categoryIndex, "description", event.target.value)}
                    />
                  </div>

                  <div className="space-y-3 rounded-xl bg-[#F7F6F1] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#036738]">French</p>
                    <Input
                      value={frCategory.title}
                      placeholder="Titre de categorie"
                      onChange={(event) => updateCategoryField("fr", categoryIndex, "title", event.target.value)}
                    />
                    <Textarea
                      rows={3}
                      value={frCategory.description}
                      placeholder="Description de categorie"
                      onChange={(event) => updateCategoryField("fr", categoryIndex, "description", event.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {enCategory.items.map((_, itemIndex) => {
                    const enItem = alignedEntries.en.categories[categoryIndex].items[itemIndex]
                    const frItem = alignedEntries.fr.categories[categoryIndex].items[itemIndex]

                    return (
                      <div key={`category-${categoryIndex}-item-${itemIndex}`} className="rounded-xl border border-[#E4DFD3] p-4">
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-medium text-[#24342C]">Question {itemIndex + 1}</p>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                              updateEntries((draft) => {
                                draft.en.categories[categoryIndex].items.splice(itemIndex, 1)
                                draft.fr.categories[categoryIndex].items.splice(itemIndex, 1)
                              })
                            }
                          >
                            <Minus className="h-4 w-4" />
                            Remove Question
                          </Button>
                        </div>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div className="space-y-3 rounded-xl bg-[#F7F6F1] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#036738]">English</p>
                            <Input
                              value={enItem.question}
                              placeholder="Question"
                              onChange={(event) =>
                                updateItemField("en", categoryIndex, itemIndex, "question", event.target.value)
                              }
                            />
                            <Textarea
                              rows={4}
                              value={enItem.answer}
                              placeholder="Answer"
                              onChange={(event) =>
                                updateItemField("en", categoryIndex, itemIndex, "answer", event.target.value)
                              }
                            />
                          </div>

                          <div className="space-y-3 rounded-xl bg-[#F7F6F1] p-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#036738]">French</p>
                            <Input
                              value={frItem.question}
                              placeholder="Question"
                              onChange={(event) =>
                                updateItemField("fr", categoryIndex, itemIndex, "question", event.target.value)
                              }
                            />
                            <Textarea
                              rows={4}
                              value={frItem.answer}
                              placeholder="Reponse"
                              onChange={(event) =>
                                updateItemField("fr", categoryIndex, itemIndex, "answer", event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      updateEntries((draft) => {
                        draft.en.categories[categoryIndex].items.push(createEmptyItem())
                        draft.fr.categories[categoryIndex].items.push(createEmptyItem())
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                    Add Question
                  </Button>
                </div>
              </section>
            )
          })}
        </div>
      </section>
    </form>
  )
}
