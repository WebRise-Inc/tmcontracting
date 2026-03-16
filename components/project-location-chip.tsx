import { MapPin } from "lucide-react"

type ProjectLocationChipProps = {
  label: string
  compact?: boolean
}

export function ProjectLocationChip({ label, compact = false }: ProjectLocationChipProps) {
  return (
    <div
      className={`relative inline-flex max-w-full items-center gap-2 overflow-hidden rounded-[3px] border border-white/18 bg-[linear-gradient(135deg,rgba(18,27,22,0.94),rgba(36,52,44,0.88))] text-[#F7F6F1] shadow-[0_22px_42px_rgba(0,0,0,0.28)] backdrop-blur-xl ${
        compact ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-[13px]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
      <MapPin className={`${compact ? "h-3 w-3" : "h-3.5 w-3.5"} relative shrink-0 text-[#D7E88C]`} />
      <span
        className={`relative truncate font-sans font-medium leading-none ${compact ? "max-w-[12rem]" : "max-w-[16rem]"}`}
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
      >
        {label}
      </span>
    </div>
  )
}
