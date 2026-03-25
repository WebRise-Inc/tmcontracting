import Link from "next/link"

const displayFont = { fontFamily: "'Vogue', serif" } as const

const offices = [
  {
    label: "Head Office",
    value: "247 Maloney Est, Gatineau, QC J8P 1C2",
  },
  {
    label: "Montreal Hub",
    value: "Avenue Rothesay Saint-Lambert, QC J4R 2H5",
  },
  {
    label: "Ottawa Hub",
    value: "Walkley Rd, Ottawa, ON K1V 2J6",
  },
] as const

const emails = [
  "info@tmforcontracting.com",
  "Admin@tmforcontracting.com",
  "Payment@tmforcontracting.com",
  "hr@tmforcontracting.com",
] as const

const compliance = [
  { label: "RBQ", value: "5859-9481" },
  { label: "Canada Inc.", value: "1646071-2" },
  { label: "NEQ (Quebec)", value: "1180362890" },
  { label: "HST", value: "704356955 RC 0001" },
  { label: "GST (TPS)", value: "70435 6955 RT 0001" },
  { label: "QST (TVQ)", value: "12 3224 0781 IC 0001" },
] as const

export function Footer() {
  return (
    <footer className="border-t border-[#0A7A44] bg-[#24342C] text-[#F7F6F1]">
      <div className="h-1 w-full bg-[#0A7A44]" />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 border-b border-white/12 pb-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.28em] text-[#8FD4A9]" style={displayFont}>
              TM Contracting
            </p>
            <h2 className="mt-4 text-3xl text-[#F7F6F1] md:text-4xl" style={displayFont}>
              TMcontrc Inc.
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.22em] text-[#CFE6D6]" style={displayFont}>
              Canada inc.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#8FD4A9]" style={displayFont}>
              Locations
            </p>
            <div className="mt-5 space-y-4">
              {offices.map((office) => (
                <div key={office.label} className="border-l border-[#0A7A44] pl-4">
                  <p className="text-sm uppercase tracking-[0.18em] text-[#F7F6F1]" style={displayFont}>
                    {office.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#D7DED9]">{office.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#8FD4A9]" style={displayFont}>
                Email
              </p>
              <div className="mt-5 space-y-3 text-sm text-[#D7DED9]">
                {emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="block transition-colors hover:text-[#8FD4A9]"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#8FD4A9]" style={displayFont}>
                Contact
              </p>
              <div className="mt-5 space-y-4 text-sm text-[#D7DED9]">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">For Call</p>
                  <a href="tel:+18004300555" className="mt-1 block text-base text-[#F7F6F1] transition-colors hover:text-[#8FD4A9]">
                    +1 (800) 430-0555
                  </a>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">For Text</p>
                  <a href="sms:+16139148543" className="mt-1 block text-base text-[#F7F6F1] transition-colors hover:text-[#8FD4A9]">
                    +1 (613) 914-8543
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#8FD4A9]" style={displayFont}>
              Registration
            </p>
            <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
              {compliance.map((item) => (
                <div key={item.label}>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">{item.label}</p>
                  <p className="mt-1 text-sm text-[#F7F6F1]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 pt-6 text-sm text-[#D7DED9] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © 2026 TM Contracting.
          </p>
          <p>
            Built by{" "}
            <Link
              href="https://webrise.ca"
              target="_blank"
              rel="noreferrer"
              className="text-[#8FD4A9] transition-colors hover:text-white"
              style={displayFont}
            >
              Webrise
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
