import type { FaqPageContent } from "@/lib/faq-page"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

export function FaqContentView({ page }: { page: FaqPageContent }) {
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
        <div className="mx-auto max-w-4xl space-y-14">
          {page.categories.map((category, index) => (
            <section key={`${category.title}-${index}`} className="border-b border-[#D6D1C4] pb-14 last:border-b-0 last:pb-0">
              <div className="max-w-2xl">
                <h2 className="text-3xl text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                  {category.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#5E685F]">
                  {category.description}
                </p>
              </div>

              <div className="mt-8 divide-y divide-[#D6D1C4] border-y border-[#D6D1C4] bg-white">
                {category.items.map((item, itemIndex) => (
                  <article key={`${item.question}-${itemIndex}`} className="px-6 py-6 md:px-8">
                    <h3 className="text-xl leading-snug text-[#24342C]" style={DISPLAY_HEADING_STYLE}>
                      {item.question}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#5E685F]">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

    </article>
  )
}
