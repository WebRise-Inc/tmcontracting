"use client"

import { useState, useRef } from "react"
import { Upload, CheckCircle, Loader2, MapPin, Phone, Mail } from "lucide-react"

type Tab = "career" | "quote" | "contact"

const VOGUE: React.CSSProperties = { fontFamily: "'Vogue', serif" }

function SuccessMessage({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <CheckCircle className="w-10 h-10 text-[#7F8F57]" />
      <p className="text-2xl text-[#24342C]" style={VOGUE}>Message Sent</p>
      <p className="text-[#5E685F] font-sans text-sm max-w-xs leading-relaxed">
        We received your submission and will get back to you shortly.
      </p>
      <button onClick={onReset} className="mt-2 text-sm text-[#314B3E] underline underline-offset-4 hover:text-[#7F8F57] transition-colors font-sans">
        Submit another
      </button>
    </div>
  )
}

function FileInput({ label, name, multiple = false, required = false }: { label: string; name: string; multiple?: boolean; required?: boolean }) {
  const [files, setFiles] = useState<FileList | null>(null)
  const ref = useRef<HTMLInputElement>(null)

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
              ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
              : files[0].name
            : `Choose file${multiple ? "s" : ""}…`}
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

function Field({ label, name, type = "text", as, rows, placeholder, required = true }: {
  label: string; name: string; type?: string; as?: "textarea" | "select"; rows?: number; placeholder?: string; required?: boolean
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
          <option value="">Select a time…</option>
          <option>Morning (8am – 12pm)</option>
          <option>Afternoon (12pm – 5pm)</option>
          <option>Evening (5pm – 8pm)</option>
        </select>
      ) : (
        <input id={name} name={name} type={type} placeholder={placeholder} required={required} className={inputClass} />
      )}
    </div>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative overflow-hidden w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#314B3E] text-[#F7F6F1] text-sm tracking-widest uppercase transition-colors duration-300 disabled:opacity-60"
      style={VOGUE}
    >
      <span className="relative z-10 flex items-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Sending…" : "Send Message →"}
      </span>
      {!loading && <span className="absolute inset-0 bg-[#7F8F57] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />}
    </button>
  )
}

function CareerForm() {
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

  if (done) return <SuccessMessage onReset={() => setDone(false)} />

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Full Name" name="fullName" placeholder="Jean Martin" />
      <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (514) 000-0000" />
      <div className="sm:col-span-2">
        <Field label="Email" name="email" type="email" placeholder="you@email.com" />
      </div>
      <div className="sm:col-span-2">
        <Field label="Why do you want to join TM Contracting?" name="questionnaire" as="textarea" rows={5} placeholder="Tell us about yourself and what drives you…" />
      </div>
      <FileInput label="CV (PDF or Word)" name="cv" required />
      <FileInput label="Photo" name="photo" />
      <div className="sm:col-span-2 pt-2">
        <SubmitButton loading={loading} />
      </div>
      <p className="sm:col-span-2 text-xs text-[#5E685F] font-sans">Fields marked <span className="text-[#7F8F57]">*</span> are required.</p>
    </form>
  )
}

function QuoteForm() {
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

  if (done) return <SuccessMessage onReset={() => setDone(false)} />

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Full Name" name="fullName" placeholder="Jean Martin" />
      <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (514) 000-0000" />
      <div className="sm:col-span-2">
        <Field label="Email" name="email" type="email" placeholder="you@email.com" />
      </div>
      <div className="sm:col-span-2">
        <Field label="Project Address" name="address" placeholder="123 Rue Principale, Montréal, QC" />
      </div>
      <div className="sm:col-span-2">
        <Field label="Project Description" name="description" as="textarea" rows={5} placeholder="Describe the scope of work, timeline, and any specific requirements…" />
      </div>
      <div className="sm:col-span-2">
        <FileInput label="Project Photos (multiple allowed)" name="photos" multiple />
      </div>
      <div className="sm:col-span-2 pt-2">
        <SubmitButton loading={loading} />
      </div>
      <p className="sm:col-span-2 text-xs text-[#5E685F] font-sans">Fields marked <span className="text-[#7F8F57]">*</span> are required.</p>
    </form>
  )
}

function ContactUsForm() {
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
      }),
    })
    setLoading(false)
    setDone(true)
  }

  if (done) return <SuccessMessage onReset={() => setDone(false)} />

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Name" name="name" placeholder="Jean Martin" />
      <Field label="Phone Number" name="phone" type="tel" placeholder="+1 (514) 000-0000" />
      <div className="sm:col-span-2">
        <Field label="Preferred Time to Call" name="preferredTime" as="select" />
      </div>
      <div className="sm:col-span-2 pt-2">
        <SubmitButton loading={loading} />
      </div>
      <p className="sm:col-span-2 text-xs text-[#5E685F] font-sans">Fields marked <span className="text-[#7F8F57]">*</span> are required.</p>
    </form>
  )
}

const TABS: { id: Tab; label: string }[] = [
  { id: "quote", label: "Get a Quote" },
  { id: "contact", label: "Contact Us" },
  { id: "career", label: "Career" },
]

export function ContactSection() {
  const [active, setActive] = useState<Tab>("quote")

  return (
    <section id="contact" className="bg-[#E9E5DA] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#7F8F57] mb-3 font-sans">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl text-[#24342C] text-balance" style={VOGUE}>
            Let's Start Your Project
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* LEFT — form */}
          <div className="bg-[#F7F6F1] p-8 md:p-10">
            {/* Tabs */}
            <div className="flex border-b border-[#D6D1C4] mb-8 gap-0 -mx-0 flex-wrap">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
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

            {active === "career" && <CareerForm />}
            {active === "quote" && <QuoteForm />}
            {active === "contact" && <ContactUsForm />}
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
                title="TM Contracting location"
              />
            </div>

            {/* Contact details */}
            <div className="bg-[#F7F6F1] border border-[#C8C3B8] p-6 flex flex-col gap-4">
              <h3 className="text-lg text-[#24342C]" style={VOGUE}>TM Contracting Inc.</h3>
              <div className="flex flex-col gap-3">
                <a href="https://maps.google.com/?q=TM+contracting+inc+Ottawa" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-[#5E685F] font-sans hover:text-[#314B3E] transition-colors group">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#7F8F57]" />
                  <span>Ottawa–Gatineau Region<br />Quebec &amp; Ontario</span>
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
                Serving Quebec &amp; Ontario since 1991.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
