"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Upload, CheckCircle, Loader2 } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import type { Locale, SiteCopy } from "@/lib/site-copy"

const VOGUE: React.CSSProperties = { fontFamily: "'Vogue', serif" }
const offerSlides = Array.from({ length: 11 }, (_, index) => ({
  src: `/images/offers/offer-${String(index + 1).padStart(2, "0")}.jpeg`,
  alt: `TM Contracting offer ${index + 1}`,
}))

type Tab = "career" | "quote" | "contact"
type ContactCopy = SiteCopy["contact"]

const hashToTab: Record<string, Tab> = {
  "#contact": "quote",
  "#contact-career": "career",
  "#contact-contact": "contact",
}

function getTabFromHash(hash: string): Tab {
  return hashToTab[hash] ?? "quote"
}

function getHashForTab(tab: Tab): string {
  if (tab === "career") return "#contact-career"
  if (tab === "contact") return "#contact-contact"
  return "#contact"
}

function SuccessMessage({ copy, onReset }: { copy: ContactCopy["success"]; onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <CheckCircle className="w-10 h-10 text-[#7F8F57]" />
      <p className="text-2xl text-[#24342C]" style={VOGUE}>{copy.title}</p>
      <p className="text-[#5E685F] font-sans text-sm max-w-xs leading-relaxed">
        {copy.body}
      </p>
      <button onClick={onReset} className="mt-2 text-sm text-[#314B3E] underline underline-offset-4 hover:text-[#7F8F57] transition-colors font-sans">
        {copy.reset}
      </button>
    </div>
  )
}

function FileInput({
  label,
  name,
  fileInputCopy,
  multiple = false,
  required = false,
}: {
  label: string
  name: string
  fileInputCopy: ContactCopy["forms"]["fileInput"]
  multiple?: boolean
  required?: boolean
}) {
  const [files, setFiles] = useState<FileList | null>(null)
  const ref = useRef<HTMLInputElement>(null)
  const selectedCount = files?.length ?? 0
  const selectedLabel =
    selectedCount === 1
      ? fileInputCopy.selectedSingle.replace("{count}", String(selectedCount))
      : fileInputCopy.selectedMultiple.replace("{count}", String(selectedCount))

  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-[#5E685F] mb-2 font-sans">
        {label}{required && <span className="text-[#7F8F57] ml-1">*</span>}
      </label>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="w-full flex items-center gap-3 px-4 py-3 border border-[#C8C3B8] bg-[#F0EDE6] text-[#5E685F] text-sm font-sans hover:border-[#7F8F57] transition-colors text-left"
      >
        <Upload className="w-4 h-4 flex-shrink-0 text-[#7F8F57]" />
        <span className="truncate">
          {files && files.length > 0
            ? multiple
              ? selectedLabel
              : files[0].name
            : multiple
            ? fileInputCopy.chooseMultiple
            : fileInputCopy.chooseSingle}
        </span>
      </button>
      <input
        ref={ref}
        type="file"
        name={name}
        multiple={multiple}
        required={required}
        accept={name === "cv" || name === "coverLetter" ? ".pdf,.doc,.docx" : "image/*"}
        className="hidden"
        onChange={(e) => setFiles(e.target.files)}
      />
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  as,
  rows,
  placeholder,
  required = true,
  selectOptions,
  labelClassName,
}: {
  label: string; name: string; type?: string; as?: "textarea" | "select"; rows?: number; placeholder?: string; required?: boolean; selectOptions?: string[]; labelClassName?: string
}) {
  const inputClass = "w-full px-4 py-3 border border-[#C8C3B8] bg-[#F0EDE6] text-[#24342C] text-sm font-sans placeholder:text-[#A8A098] focus:outline-none focus:border-[#7F8F57] transition-colors"

  return (
    <div>
      <label htmlFor={name} className={`block text-xs tracking-widest uppercase text-[#5E685F] mb-2 font-sans ${labelClassName ?? ""}`}>
        {label}{required && <span className="text-[#7F8F57] ml-1">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea id={name} name={name} rows={rows ?? 4} placeholder={placeholder} required={required} className={`${inputClass} resize-none`} />
      ) : as === "select" ? (
        <select id={name} name={name} required={required} className={inputClass}>
          <option value="">{placeholder}</option>
          {selectOptions?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input id={name} name={name} type={type} placeholder={placeholder} required={required} className={inputClass} />
      )}
    </div>
  )
}

function MultiSelectField({
  label,
  name,
  options,
  required = true,
}: {
  label: string
  name: string
  options: string[]
  required?: boolean
}) {
  const [selected, setSelected] = useState<string[]>([])

  const toggleOption = (option: string) => {
    setSelected((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    )
  }

  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-[#5E685F] mb-2 font-sans">
        {label}
        {required && <span className="text-[#7F8F57] ml-1">*</span>}
      </label>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((option) => {
          const active = selected.includes(option)

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className={`flex min-h-12 items-center justify-center border px-4 py-3 text-center text-sm transition-colors ${
                active
                  ? "border-[#314B3E] bg-[#314B3E] text-[#F7F6F1]"
                  : "border-[#C8C3B8] bg-[#F0EDE6] text-[#24342C] hover:border-[#7F8F57]"
              }`}
            >
              <span className="font-sans">{option}</span>
            </button>
          )
        })}
      </div>

      {selected.map((option) => (
        <input key={option} type="hidden" name={name} value={option} />
      ))}

      <input
        tabIndex={-1}
        aria-hidden="true"
        readOnly
        required={required}
        value={selected.join(", ")}
        className="sr-only"
      />
    </div>
  )
}

function SubmitButton({ loading, copy }: { loading: boolean; copy: ContactCopy["forms"] }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative overflow-hidden w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#314B3E] text-[#F7F6F1] text-sm tracking-widest uppercase transition-colors duration-300 disabled:opacity-60"
      style={VOGUE}
    >
      <span className="relative z-10 flex items-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? copy.submitLoading : copy.submitIdle}
      </span>
      {!loading && <span className="absolute inset-0 bg-[#7F8F57] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />}
    </button>
  )
}

function OfferShowcase() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((previous) => (previous + 1) % offerSlides.length)
    }, 4800)

    return () => window.clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setCurrent((index + offerSlides.length) % offerSlides.length)
  }

  return (
    <div className="relative overflow-hidden border border-[#C8C3B8] bg-[#24342C]" style={{ aspectRatio: "3 / 2" }}>
      {offerSlides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: index === current ? 1 : 0, pointerEvents: index === current ? "auto" : "none" }}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            aria-hidden="true"
            className="scale-110 object-cover blur-2xl opacity-25"
          />
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-contain p-3 sm:p-4"
          />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#162118]/78 via-[#162118]/20 to-transparent" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-end gap-4 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            aria-label="Previous offer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-[#24342C]/52 text-[#F7F6F1] backdrop-blur-sm transition-colors hover:border-[#C8D87A] hover:text-[#C8D87A]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            aria-label="Next offer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-[#24342C]/52 text-[#F7F6F1] backdrop-blur-sm transition-colors hover:border-[#C8D87A] hover:text-[#C8D87A]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <div className="mb-3 flex justify-end">
          <p className="border border-white/16 bg-[#24342C]/52 px-3 py-1.5 text-[11px] tracking-[0.28em] text-[#F7F6F1]/88 backdrop-blur-sm" style={VOGUE}>
            {String(current + 1).padStart(2, "0")} / {String(offerSlides.length).padStart(2, "0")}
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {offerSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to offer ${index + 1}`}
              className="group flex items-center gap-2"
            >
              <span
                className={`h-[3px] flex-1 transition-all duration-300 ${
                  index === current ? "bg-[#C8D87A]" : "bg-white/28 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CareerForm({ copy, locale }: { copy: ContactCopy; locale: Locale }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await fetch("/api/contact/career", { method: "POST", body: formData })
    setLoading(false)
    setDone(true)
  }

  if (done) return <SuccessMessage copy={copy.success} onReset={() => setDone(false)} />

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <input type="hidden" name="locale" value={locale} />
      <Field label={copy.forms.career.fullName} name="fullName" placeholder="Jean Martin" />
      <Field label={copy.forms.career.city} name="city" placeholder="Gatineau" />
      <Field label={copy.forms.career.phone} name="phone" type="tel" placeholder="+1 (819) 000-0000" />
      <div className="sm:col-span-2">
        <Field label={copy.forms.career.email} name="email" type="email" placeholder="info@email.com" />
      </div>
      <Field
        label={copy.forms.career.workAuthorization}
        name="workAuthorization"
        as="select"
        placeholder={copy.forms.career.workAuthorizationPlaceholder}
        selectOptions={copy.forms.career.workAuthorizationOptions}
        labelClassName="flex min-h-10 items-end"
      />
      <Field
        label={copy.forms.career.driversLicense}
        name="driversLicense"
        as="select"
        placeholder={copy.forms.career.workAuthorizationPlaceholder}
        selectOptions={copy.forms.career.driversLicenseOptions}
        labelClassName="flex min-h-10 items-end"
      />
      <div className="sm:col-span-2">
        <MultiSelectField
          label={copy.forms.career.languages}
          name="languages"
          options={copy.forms.career.languageOptions}
        />
      </div>
      <FileInput label={copy.forms.career.cv} name="cv" fileInputCopy={copy.forms.fileInput} required />
      <FileInput label={copy.forms.career.coverLetter} name="coverLetter" fileInputCopy={copy.forms.fileInput} required />
      <div className="sm:col-span-2">
        <FileInput label={copy.forms.career.photo} name="photo" fileInputCopy={copy.forms.fileInput} required />
      </div>
      <div className="sm:col-span-2 pt-2">
        <SubmitButton loading={loading} copy={copy.forms} />
      </div>
      <p className="sm:col-span-2 text-xs text-[#5E685F] font-sans">{copy.forms.requiredNotice}</p>
    </form>
  )
}

function QuoteForm({ copy, locale }: { copy: ContactCopy; locale: Locale }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await fetch("/api/contact/quote", { method: "POST", body: formData })
    setLoading(false)
    setDone(true)
  }

  if (done) return <SuccessMessage copy={copy.success} onReset={() => setDone(false)} />

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <input type="hidden" name="locale" value={locale} />
      <Field label={copy.forms.quote.fullName} name="fullName" placeholder="Jean Martin" />
      <Field label={copy.forms.quote.phone} name="phone" type="tel" placeholder="+1 (819) 000-0000" />
      <div className="sm:col-span-2">
        <Field label={copy.forms.quote.email} name="email" type="email" placeholder="info@email.com" />
      </div>
      <div className="sm:col-span-2">
        <Field label={copy.forms.quote.address} name="address" placeholder="123 Rue Principale, Gatineau, QC" />
      </div>
      <div className="sm:col-span-2">
        <Field
          label={copy.forms.quote.description}
          name="description"
          as="textarea"
          rows={5}
          placeholder={copy.forms.quote.descriptionPlaceholder}
        />
      </div>
      <div className="sm:col-span-2">
        <FileInput label={copy.forms.quote.photos} name="photos" fileInputCopy={copy.forms.fileInput} multiple />
      </div>
      <div className="sm:col-span-2 pt-2">
        <SubmitButton loading={loading} copy={copy.forms} />
      </div>
      <p className="sm:col-span-2 text-xs text-[#5E685F] font-sans">{copy.forms.requiredNotice}</p>
    </form>
  )
}

function ContactUsForm({ copy, locale }: { copy: ContactCopy; locale: Locale }) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [customTimeEnabled, setCustomTimeEnabled] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    await fetch("/api/contact/us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        phone: fd.get("phone"),
        preferredWindow: fd.get("preferredWindow"),
        preferredTime: fd.get("preferredTime"),
        locale,
      }),
    })
    setLoading(false)
    setDone(true)
  }

  if (done) {
    return (
      <SuccessMessage
        copy={copy.success}
        onReset={() => {
          setDone(false)
          setCustomTimeEnabled(false)
        }}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label={copy.forms.contact.name} name="name" placeholder="Jean Martin" />
      <Field label={copy.forms.contact.phone} name="phone" type="tel" placeholder="+1 (819) 000-0000" />
      <div className="sm:col-span-2">
        <Field
          label={copy.forms.contact.preferredWindow}
          name="preferredWindow"
          as="select"
          placeholder={copy.forms.selectTimePlaceholder}
          selectOptions={copy.forms.timeOptions}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 border border-[#C8C3B8] bg-[#F0EDE6] px-4 py-4 text-sm text-[#24342C] transition-colors hover:border-[#7F8F57]">
          <input
            type="checkbox"
            checked={customTimeEnabled}
            onChange={(event) => setCustomTimeEnabled(event.target.checked)}
            className="mt-1 h-4 w-4 accent-[#314B3E]"
          />
          <span className="flex flex-col gap-1">
            <span className="font-sans">{copy.forms.contact.preferredTimeToggle}</span>
            <span className="text-xs leading-relaxed text-[#5E685F] font-sans">{copy.forms.contact.preferredTimeHint}</span>
          </span>
        </label>
      </div>
      {customTimeEnabled && (
        <div className="sm:col-span-2">
          <Field
            label={copy.forms.contact.preferredTime}
            name="preferredTime"
            type="datetime-local"
            required
          />
        </div>
      )}
      {!customTimeEnabled ? <input type="hidden" name="preferredTime" value="" /> : null}
      <div className="sm:col-span-2 pt-2">
        <SubmitButton loading={loading} copy={copy.forms} />
      </div>
      <p className="sm:col-span-2 text-xs text-[#5E685F] font-sans">{copy.forms.requiredNotice}</p>
    </form>
  )
}

export function ContactSection() {
  const { copy, locale } = useLocale()
  const [active, setActive] = useState<Tab>("quote")
  const businessInfo = locale === "fr"
    ? {
        company: "TMcontrc Inc.",
        since: "Depuis 1991",
        addressLabel: "Adresse",
        tollFreeLabel: "Sans frais",
        emailLabel: "Courriel",
        websiteLabel: "Site Web",
        registrations: [
          ["Licence RBQ", "5859-9481"],
          ["No de société fédérale", "1646071-2"],
          ["NEQ (Québec)", "1180362890"],
          ["No TVH", "704356955 RC 0001"],
          ["No TPS", "70435 6955 RT 0001"],
          ["No TVQ", "12 3224 0781 IC 0001"],
        ] as const,
      }
    : {
        company: "TMcontrc Inc.",
        since: "Since 1991",
        addressLabel: "Address",
        tollFreeLabel: "Toll-Free",
        emailLabel: "Email",
        websiteLabel: "Website",
        registrations: [
          ["RBQ Licence", "5859-9481"],
          ["Federal Corporation No.", "1646071-2"],
          ["NEQ (Quebec)", "1180362890"],
          ["HST No.", "704356955 RC 0001"],
          ["GST (TPS) No.", "70435 6955 RT 0001"],
          ["QST (TVQ) No.", "12 3224 0781 IC 0001"],
        ] as const,
      }
  const tabs: { id: Tab; label: string }[] = [
    { id: "quote", label: copy.contact.tabs.quote },
    { id: "contact", label: copy.contact.tabs.contact },
    { id: "career", label: copy.contact.tabs.career },
  ]

  useEffect(() => {
    const syncActiveTab = () => setActive(getTabFromHash(window.location.hash))

    syncActiveTab()
    window.addEventListener("hashchange", syncActiveTab)

    return () => window.removeEventListener("hashchange", syncActiveTab)
  }, [])

  const handleTabChange = (tab: Tab) => {
    setActive(tab)
    const url = `${window.location.pathname}${window.location.search}${getHashForTab(tab)}`
    window.history.replaceState(window.history.state, "", url)
  }

  return (
    <section id="contact" className="relative bg-[#E9E5DA] py-24 px-6 scroll-mt-24">
      <div id="contact-career" aria-hidden="true" className="absolute top-0 h-px w-px -translate-y-24" />
      <div id="contact-contact" aria-hidden="true" className="absolute top-0 h-px w-px -translate-y-24" />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#7F8F57] mb-3 font-sans">{copy.contact.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl text-[#24342C] text-balance" style={VOGUE}>
            {copy.contact.title}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — form */}
          <div className="bg-[#F7F6F1] p-8 md:p-10">
            {/* Tabs */}
            <div className="flex border-b border-[#D6D1C4] mb-8 gap-0 -mx-0 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-5 py-3 text-xs tracking-widest uppercase transition-colors duration-200 border-b-2 -mb-px whitespace-nowrap ${
                    active === tab.id
                      ? "border-[#314B3E] text-[#24342C]"
                      : "border-transparent text-[#5E685F] hover:text-[#24342C]"
                  }`}
                  style={VOGUE}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {active === "career" && <CareerForm copy={copy.contact} locale={locale} />}
            {active === "quote" && <QuoteForm copy={copy.contact} locale={locale} />}
            {active === "contact" && <ContactUsForm copy={copy.contact} locale={locale} />}
          </div>

          {/* RIGHT — offers + contact info */}
          <div className="flex flex-col gap-6">
            <OfferShowcase />

            {/* Contact details */}
            <div className="border border-[#C8C3B8] bg-[#F7F6F1]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-4 p-6 md:p-7">
                  <div>
                    <h3 className="text-2xl text-[#24342C]" style={VOGUE}>{businessInfo.company}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#7F8F57]" style={VOGUE}>
                      {businessInfo.since}
                    </p>
                  </div>

                  <div className="space-y-3 text-sm leading-relaxed text-[#5E685F] font-sans">
                    <p>
                      <span className="text-[#24342C]">{businessInfo.addressLabel}:</span>{" "}
                      <a
                        href="https://maps.google.com/?q=247+Maloney+Est,+Gatineau,+QC+J8P+1C2,+Canada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[#314B3E]"
                      >
                        247 Maloney Est, Gatineau, QC J8P 1C2, Canada
                      </a>
                    </p>
                    <p>
                      <span className="text-[#24342C]">{businessInfo.tollFreeLabel}:</span>{" "}
                      <a href="tel:+18004300555" className="transition-colors hover:text-[#314B3E]">
                        +1 (800) 430-0555
                      </a>
                    </p>
                    <p>
                      <span className="text-[#24342C]">{businessInfo.emailLabel}:</span>{" "}
                      <a href="mailto:info@tmforcontracting.com" className="transition-colors hover:text-[#314B3E]">
                        info@tmforcontracting.com
                      </a>
                    </p>
                    <p>
                      <span className="text-[#24342C]">{businessInfo.websiteLabel}:</span>{" "}
                      <a
                        href="https://www.tmforcontracting.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-[#314B3E]"
                      >
                        www.tmforcontracting.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#D6D1C4] p-6 md:border-l md:border-t-0 md:p-7">
                  <div className="space-y-3 text-sm leading-relaxed text-[#5E685F] font-sans">
                    {businessInfo.registrations.map(([label, value]) => (
                      <p key={label}>
                        <span className="text-[#24342C]">{label}:</span>{" "}
                        <span>{value}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
