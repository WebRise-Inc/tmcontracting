"use client"

import { useEffect, useState, useRef } from "react"
import { Upload, CheckCircle, Loader2, MapPin, Phone, Mail } from "lucide-react"

import { useLocale } from "@/components/locale-provider"
import type { Locale, SiteCopy } from "@/lib/site-copy"

const VOGUE: React.CSSProperties = { fontFamily: "'Vogue', serif" }

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
        accept={name === "cv" ? ".pdf,.doc,.docx" : "image/*"}
        className="hidden"
        onChange={(e) => setFiles(e.target.files)}
      />
    </div>
  )
}

function Field({ label, name, type = "text", as, rows, placeholder, required = true, selectOptions }: {
  label: string; name: string; type?: string; as?: "textarea" | "select"; rows?: number; placeholder?: string; required?: boolean; selectOptions?: string[]
}) {
  const inputClass = "w-full px-4 py-3 border border-[#C8C3B8] bg-[#F0EDE6] text-[#24342C] text-sm font-sans placeholder:text-[#A8A098] focus:outline-none focus:border-[#7F8F57] transition-colors"

  return (
    <div>
      <label htmlFor={name} className="block text-xs tracking-widest uppercase text-[#5E685F] mb-2 font-sans">
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
      <Field label={copy.forms.career.phone} name="phone" type="tel" placeholder="+1 (819) 000-0000" />
      <div className="sm:col-span-2">
        <Field label={copy.forms.career.email} name="email" type="email" placeholder="info@email.com" />
      </div>
      <div className="sm:col-span-2">
        <Field
          label={copy.forms.career.questionnaire}
          name="questionnaire"
          as="textarea"
          rows={5}
          placeholder={copy.forms.career.questionnairePlaceholder}
        />
      </div>
      <FileInput label={copy.forms.career.cv} name="cv" fileInputCopy={copy.forms.fileInput} required />
      <FileInput label={copy.forms.career.photo} name="photo" fileInputCopy={copy.forms.fileInput} />
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
        preferredTime: fd.get("preferredTime"),
        locale,
      }),
    })
    setLoading(false)
    setDone(true)
  }

  if (done) return <SuccessMessage copy={copy.success} onReset={() => setDone(false)} />

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label={copy.forms.contact.name} name="name" placeholder="Jean Martin" />
      <Field label={copy.forms.contact.phone} name="phone" type="tel" placeholder="+1 (819) 000-0000" />
      <div className="sm:col-span-2">
        <Field
          label={copy.forms.contact.preferredTime}
          name="preferredTime"
          as="select"
          placeholder={copy.forms.selectTimePlaceholder}
          selectOptions={copy.forms.timeOptions}
        />
      </div>
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

          {/* RIGHT — map + contact info */}
          <div className="flex flex-col gap-6">
            {/* Map */}
            <div className="overflow-hidden border border-[#C8C3B8]" style={{ aspectRatio: "4/3" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1238.1515502946477!2d-75.64801836239668!3d45.48444167615875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce11d040ced47d%3A0x6cf77d6309e5516d!2sTm%20contracting%20inc!5e0!3m2!1sen!2sca!4v1772903211603!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={copy.contact.mapTitle}
              />
            </div>

            {/* Contact details */}
            <div className="bg-[#F7F6F1] border border-[#C8C3B8] p-6 flex flex-col gap-4">
              <h3 className="text-lg text-[#24342C]" style={VOGUE}>{copy.contact.officeTitle}</h3>
              <div className="flex flex-col gap-3">
                <a href="https://maps.google.com/?q=TM+contracting+inc+Ottawa" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-[#5E685F] font-sans hover:text-[#314B3E] transition-colors group">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#7F8F57]" />
                  <span>{copy.contact.regionPrimary}<br />{copy.contact.regionSecondary}</span>
                </a>
                <a href="tel:+18004300555"
                  className="flex items-center gap-3 text-sm text-[#5E685F] font-sans hover:text-[#314B3E] transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0 text-[#7F8F57]" />
                  <span>+1 (800) 430-0555</span>
                </a>
                <a href="mailto:info@tmcontracting.ca"
                  className="flex items-center gap-3 text-sm text-[#5E685F] font-sans hover:text-[#314B3E] transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0 text-[#7F8F57]" />
                  <span>info@tmcontracting.ca</span>
                </a>
              </div>
              <p className="text-xs text-[#5E685F] font-sans pt-2 border-t border-[#D6D1C4]">
                {copy.contact.serving}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
