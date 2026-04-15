"use client"

import { useEffect, useState } from "react"

import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import { onlineEstimatePage } from "@/lib/online-estimate-page"

const DISPLAY_HEADING_STYLE = {
  fontFamily: "'Vogue', serif",
  fontWeight: 600,
  letterSpacing: "0.012em",
} as const

type CalNamespace = {
  (...args: unknown[]): void
  q?: unknown[]
}

type CalApi = {
  (...args: unknown[]): void
  ns?: Record<string, CalNamespace>
  q?: unknown[]
  loaded?: boolean
}

declare global {
  interface Window {
    Cal?: CalApi
  }
}

const CAL_EMBEDS = [
  {
    id: "online",
    namespace: "online-appointment",
    containerId: "my-cal-inline-online-appointment",
    calLink: "tmforcontracting/online-appointment",
    frameClassName: "h-[760px] md:h-[800px] lg:h-[720px]",
    containerClassName: "overflow-hidden",
    inlineConfig: {
      layout: "month_view",
      theme: "light",
      useSlotsViewOnSmallScreen: true,
    },
    uiConfig: {
      hideEventTypeDetails: false,
      layout: "month_view",
      theme: "light",
    },
  },
  {
    id: "physical",
    namespace: "on-site-consultation",
    containerId: "my-cal-inline-on-site-consultation",
    calLink: "tmforcontracting/on-site-consultation",
    frameClassName: "h-[860px] md:h-[900px] lg:h-[760px]",
    containerClassName: "overflow-scroll",
    inlineConfig: {
      layout: "month_view",
      useSlotsViewOnSmallScreen: "true",
    },
    uiConfig: {
      hideEventTypeDetails: false,
      layout: "month_view",
    },
  },
] as const

type MeetingType = (typeof CAL_EMBEDS)[number]["id"]

function bootstrapCal() {
  if (typeof window === "undefined" || window.Cal) return

  ;((C: Window, A: string, L: string) => {
    const p = (a: { q?: unknown[] }, ar: unknown[]) => {
      a.q = a.q || []
      a.q.push(ar)
    }
    const d = C.document

    C.Cal = C.Cal || function (...args: unknown[]) {
      const cal = C.Cal as CalApi
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        d.head.appendChild(d.createElement("script")).src = A
        cal.loaded = true
      }

      if (args[0] === L) {
        const api: CalNamespace = function (...apiArgs: unknown[]) {
          p(api, apiArgs)
        }
        const namespace = args[1]
        api.q = api.q || []

        if (typeof namespace === "string") {
          cal.ns = cal.ns || {}
          cal.ns[namespace] = cal.ns[namespace] || api
          p(cal.ns[namespace], args)
          p(cal, ["initNamespace", namespace])
        } else {
          p(cal, args)
        }
        return
      }

      p(cal, args)
    }
  })(window, "https://app.cal.com/embed/embed.js", "init")
}

export function OnlineEstimatePage() {
  const { locale } = useLocale()
  const page = onlineEstimatePage[locale]
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingType>("online")

  useEffect(() => {
    document.title = page.metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", page.metadata.description)
    }
  }, [page.metadata.description, page.metadata.title])

  useEffect(() => {
    const activeEmbed = CAL_EMBEDS.find((embed) => embed.id === selectedMeeting)
    if (!activeEmbed) return

    const mountEmbed = () => {
      bootstrapCal()

      const cal = window.Cal
      const container = document.getElementById(activeEmbed.containerId)
      if (!cal || !container) return false

      if (!cal.ns?.[activeEmbed.namespace]) {
        cal("init", activeEmbed.namespace, { origin: "https://app.cal.com" })
      }

      container.innerHTML = ""

      const namespaceApi = cal.ns?.[activeEmbed.namespace]
      if (!namespaceApi) return false

      namespaceApi("inline", {
        elementOrSelector: `#${activeEmbed.containerId}`,
        config: activeEmbed.inlineConfig,
        calLink: activeEmbed.calLink,
      })

      namespaceApi("ui", activeEmbed.uiConfig)

      return true
    }

    if (mountEmbed()) return

    const intervalId = window.setInterval(() => {
      if (mountEmbed()) {
        window.clearInterval(intervalId)
      }
    }, 250)

    return () => window.clearInterval(intervalId)
  }, [selectedMeeting])

  const activeEmbed = CAL_EMBEDS.find((embed) => embed.id === selectedMeeting) ?? CAL_EMBEDS[0]

  return (
    <main className="min-h-screen bg-[#24342C]">
      <Navbar />

      <section className="px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <h1
              className="text-4xl leading-tight text-balance text-[#F7F6F1] md:text-5xl lg:text-6xl"
              style={DISPLAY_HEADING_STYLE}
            >
              {page.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-[#D8D4CC]">
              {page.intro}
            </p>
          </div>

          <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-3 sm:flex-row sm:justify-center">
            {CAL_EMBEDS.map((embed) => {
              const isActive = embed.id === selectedMeeting

              return (
                <button
                  key={embed.id}
                  type="button"
                  onClick={() => setSelectedMeeting(embed.id)}
                  className={`border px-6 py-4 text-sm uppercase tracking-[0.24em] transition-colors ${
                    isActive
                      ? "border-[#0A7A44] bg-[#E9E5DA] text-[#24342C]"
                      : "border-[#4E6256] bg-transparent text-[#F7F6F1] hover:border-[#CFC7B6] hover:bg-[#2E4137]"
                  }`}
                  style={DISPLAY_HEADING_STYLE}
                >
                  {page.meetingLabels[embed.id]}
                </button>
              )
            })}
          </div>

          <div className="mx-auto w-full">
            <div
              id={activeEmbed.containerId}
              className={`${activeEmbed.frameClassName} ${activeEmbed.containerClassName} w-full`}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
