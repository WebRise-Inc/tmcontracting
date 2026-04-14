import type { FaqPageContent } from "@/lib/faq-page"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

function createCategoryAnchor(title: string, index: number) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return `${slug || "section"}-${index + 1}`
}

export function FaqContentView({ page }: { page: FaqPageContent }) {
  const categoryLinks = page.categories.map((category, index) => ({
    ...category,
    index,
    anchor: createCategoryAnchor(category.title, index),
  }))

  return (
    <article className="bg-[#F7F6F1]">
      <section className="bg-[#24342C] px-6 pb-12 pt-28 text-[#F7F6F1]">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl leading-tight text-balance text-[#F7F6F1] md:text-5xl" style={DISPLAY_HEADING_STYLE}>
              {page.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#D8D4CC]">
              {page.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F6F1] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="FAQ sections" className="mb-8 lg:hidden">
            <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
              {categoryLinks.map((category) => (
                <a
                  key={category.anchor}
                  href={`#${category.anchor}`}
                  className="whitespace-nowrap rounded-full border border-[#D6D1C4] bg-white px-4 py-2 text-sm text-[#24342C] transition-colors hover:border-[#8B846E] hover:bg-[#F1EEE4]"
                >
                  {category.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[1.75rem] border border-[#D6D1C4] bg-white/85 p-5 shadow-[0_20px_50px_rgba(36,52,44,0.08)] backdrop-blur">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#8B846E]">Sections</p>
                <nav aria-label="FAQ section list" className="mt-4">
                  <ul className="space-y-2">
                    {categoryLinks.map((category) => (
                      <li key={category.anchor}>
                        <a
                          href={`#${category.anchor}`}
                          className="group flex items-start gap-3 rounded-2xl px-3 py-3 text-sm text-[#5E685F] transition-colors hover:bg-[#F1EEE4] hover:text-[#24342C]"
                        >
                          <span className="mt-0.5 text-[0.65rem] uppercase tracking-[0.28em] text-[#8B846E] transition-colors group-hover:text-[#24342C]">
                            {(category.index + 1).toString().padStart(2, "0")}
                          </span>
                          <span className="leading-relaxed">{category.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            <div className="space-y-14">
              {categoryLinks.map((category) => (
                <section
                  key={category.anchor}
                  id={category.anchor}
                  className="scroll-mt-32 border-b border-[#D6D1C4] pb-14 last:border-b-0 last:pb-0"
                >
                  <div className="max-w-2xl">
                    <h2 className="text-3xl text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                      {category.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                      {category.description}
                    </p>
                  </div>

                  <div className="mt-8 border-y border-[#D6D1C4] bg-white">
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, itemIndex) => (
                        <AccordionItem
                          key={`${item.question}-${itemIndex}`}
                          value={`${category.title}-${itemIndex}`}
                          className="border-[#D6D1C4] px-6 md:px-8"
                        >
                          <AccordionTrigger
                            className="py-6 text-left text-xl leading-snug text-[#24342C] hover:no-underline [&>svg]:mt-1 [&>svg]:text-[#8B846E]"
                            style={DISPLAY_HEADING_STYLE}
                          >
                            <span className="pr-4">{item.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pb-6">
                            <p className="max-w-3xl text-base leading-relaxed text-[#5E685F]">
                              {item.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

    </article>
  )
}
