"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { addDays, eachDayOfInterval, endOfMonth, endOfWeek, format, isBefore, isSameDay, isSameMonth, isWeekend, startOfDay, startOfMonth, startOfWeek } from "date-fns"
import { enCA, frCA } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { useLocale } from "@/components/locale-provider"
import { onlineEstimatePage } from "@/lib/online-estimate-page"

const VOGUE = { fontFamily: "'Vogue', serif" } as const

function Field({
  label,
  name,
  type = "text",
}: {
  label: string
  name: string
  type?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-[0.24em] text-[#6D746C]">
        {label}
        <span className="ml-1 text-[#7F8F57]">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="w-full border border-[#D6D1C4] bg-[#F3F1EA] px-4 py-3 text-sm text-[#24342C] outline-none transition-colors placeholder:text-[#A8A098] focus:border-[#7F8F57]"
      />
    </div>
  )
}

export function OnlineEstimatePage() {
  const { locale } = useLocale()
  const page = onlineEstimatePage[locale]
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [today] = useState(() => startOfDay(new Date()))

  const calendarLocale = locale === "fr" ? frCA : enCA

  useEffect(() => {
    document.title = page.metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", page.metadata.description)
    }
  }, [page.metadata.description, page.metadata.title])

  useEffect(() => {
    setSuccess(false)
    setError("")
  }, [locale])

  const monthLabel = useMemo(
    () => format(currentMonth, "MMMM yyyy", { locale: calendarLocale }),
    [calendarLocale, currentMonth],
  )

  const weekdayLabels = useMemo(() => {
    const start = startOfWeek(today, { locale: calendarLocale })
    return eachDayOfInterval({
      start,
      end: addDays(start, 6),
    })
  }, [calendarLocale, today])

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { locale: calendarLocale })
    const end = endOfWeek(endOfMonth(currentMonth), { locale: calendarLocale })

    return eachDayOfInterval({ start, end })
  }, [calendarLocale, currentMonth])

  const formatSelectedDate = selectedDate
    ? new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", { dateStyle: "full" }).format(selectedDate)
    : page.booking.chooseDate

  const isDateDisabled = (date: Date) => isBefore(date, today) || isWeekend(date)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    if (!selectedDate) {
      setError(page.booking.missingDate)
      return
    }

    if (!selectedTime) {
      setError(page.booking.missingTime)
      return
    }

    const formData = new FormData(event.currentTarget)
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      preferredDate: format(selectedDate, "yyyy-MM-dd"),
      preferredTime: selectedTime,
      locale,
    }

    setSubmitting(true)

    try {
      const response = await fetch("/api/contact/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to submit booking request")
      }

      event.currentTarget.reset()
      setSelectedDate(null)
      setSelectedTime("")
      setSuccess(true)
    } catch (submitError) {
      console.error("[tm] Online estimate request failed:", submitError)
      setError(locale === "fr" ? "Impossible d'envoyer la demande pour le moment." : "Unable to send your request right now.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#24342C]">
      <Navbar />

      <section className="px-6 pb-20 pt-32 text-[#F7F6F1]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl leading-tight md:text-5xl" style={{ ...VOGUE, fontWeight: "normal" }}>
              {page.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#D7D3CB] md:text-lg">
              {page.intro}
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="overflow-hidden border border-white/10 bg-[#F7F6F1] text-[#24342C] shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              <div className="flex items-center justify-between border-b border-[#E3DED3] px-5 py-5 sm:px-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={VOGUE}>
                    {page.booking.availableDates}
                  </p>
                  <h2 className="mt-2 text-2xl capitalize sm:text-3xl" style={{ ...VOGUE, fontWeight: "normal" }}>
                    {monthLabel}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth((current) => addDays(startOfMonth(current), -1))}
                    className="flex h-11 w-11 items-center justify-center border border-[#D6D1C4] text-[#24342C] transition-colors hover:border-[#7F8F57] hover:text-[#7F8F57]"
                    aria-label={page.booking.previousMonth}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth((current) => addDays(endOfMonth(current), 1))}
                    className="flex h-11 w-11 items-center justify-center border border-[#D6D1C4] text-[#24342C] transition-colors hover:border-[#7F8F57] hover:text-[#7F8F57]"
                    aria-label={page.booking.nextMonth}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="px-4 py-5 sm:px-6">
                <div className="grid grid-cols-7 gap-2 border-b border-[#E3DED3] pb-3">
                  {weekdayLabels.map((day) => (
                    <div
                      key={day.toISOString()}
                      className="text-center text-[11px] uppercase tracking-[0.24em] text-[#7A827A]"
                      style={VOGUE}
                    >
                      {format(day, "EEE", { locale: calendarLocale })}
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-7 gap-2">
                  {days.map((day) => {
                    const disabled = isDateDisabled(day)
                    const outsideMonth = !isSameMonth(day, currentMonth)
                    const active = selectedDate ? isSameDay(day, selectedDate) : false

                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        disabled={disabled}
                        title={disabled ? page.booking.unavailableDate : format(day, "PPPP", { locale: calendarLocale })}
                        onClick={() => {
                          if (outsideMonth) {
                            setCurrentMonth(startOfMonth(day))
                          }
                          setSelectedDate(day)
                          setSelectedTime("")
                          setSuccess(false)
                          setError("")
                        }}
                        className={`aspect-square border text-sm transition-all sm:text-base ${
                          active
                            ? "border-[#314B3E] bg-[#314B3E] text-[#F7F6F1]"
                            : disabled
                              ? "border-[#ECE7DC] bg-[#F5F2EB] text-[#C0B9AA]"
                              : "border-[#D6D1C4] bg-white text-[#24342C] hover:border-[#7F8F57] hover:text-[#7F8F57]"
                        } ${outsideMonth ? "opacity-35" : ""}`}
                      >
                        <span className="block text-center">{format(day, "d")}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="overflow-hidden border border-white/10 bg-[#F7F6F1] text-[#24342C] shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              <div className="border-b border-[#E3DED3] px-6 py-6">
                <p className="text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={VOGUE}>
                  {page.booking.preferredTime}
                </p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm leading-relaxed text-[#5E685F]">
                    <span className="font-medium text-[#24342C]">{page.booking.selectedDate}:</span>{" "}
                    {formatSelectedDate}
                  </p>
                  <p className="text-sm leading-relaxed text-[#7A827A]">{page.booking.timezoneNote}</p>
                </div>
              </div>

              <div className="px-6 py-6">
                {success ? (
                  <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                    <p className="text-3xl text-[#24342C]" style={{ ...VOGUE, fontWeight: "normal" }}>
                      {page.booking.successTitle}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#5E685F]">
                      {page.booking.successBody}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSuccess(false)}
                      className="mt-6 text-sm text-[#314B3E] underline underline-offset-4 transition-colors hover:text-[#7F8F57]"
                    >
                      {page.booking.reset}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#6D746C]" style={VOGUE}>
                        {page.booking.preferredTime}
                      </p>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-3">
                          {page.booking.timeSlots.map((slot) => {
                            const active = slot === selectedTime

                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => {
                                  setSelectedTime(slot)
                                  setSuccess(false)
                                  setError("")
                                }}
                                className={`border px-4 py-3 text-sm transition-colors ${
                                  active
                                    ? "border-[#314B3E] bg-[#314B3E] text-[#F7F6F1]"
                                    : "border-[#D6D1C4] bg-[#F3F1EA] text-[#24342C] hover:border-[#7F8F57]"
                                }`}
                              >
                                {slot}
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="border border-dashed border-[#D6D1C4] bg-[#F3F1EA] px-4 py-5 text-sm text-[#7A827A]">
                          {page.booking.chooseDate}
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[#E3DED3] pt-6">
                      <div className="grid gap-5">
                        <Field label={page.booking.fullName} name="fullName" />
                        <Field label={page.booking.phone} name="phone" type="tel" />
                        <Field label={page.booking.email} name="email" type="email" />
                      </div>
                    </div>

                    <div className="border border-[#E3DED3] bg-[#F3F1EA] px-4 py-4 text-sm leading-relaxed text-[#5E685F]">
                      <p>
                        <span className="font-medium text-[#24342C]">{page.booking.selectedDate}:</span>{" "}
                        {formatSelectedDate}
                      </p>
                      <p className="mt-2">
                        <span className="font-medium text-[#24342C]">{page.booking.selectedTime}:</span>{" "}
                        {selectedTime || page.booking.chooseTime}
                      </p>
                    </div>

                    {error ? <p className="text-sm text-[#9D3C2E]">{error}</p> : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden bg-[#314B3E] px-8 py-4 text-sm uppercase tracking-[0.24em] text-[#F7F6F1] transition-colors duration-300 disabled:opacity-60"
                      style={VOGUE}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {submitting ? page.booking.submitLoading : page.booking.submitIdle}
                      </span>
                      <span className="absolute inset-0 -translate-x-[101%] bg-[#7F8F57] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
                    </button>
                  </form>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
