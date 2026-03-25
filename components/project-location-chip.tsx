import { MapPin } from "lucide-react"

type ProjectLocationChipProps = {
  label: string
  compact?: boolean
}

export function ProjectLocationChip({ label, compact = false }: ProjectLocationChipProps) {
  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-white/16 bg-[#1A2721]/82 text-[#F7F6F1] shadow-[0_10px_24px_rgba(0,0,0,0.16)] backdrop-blur-md ${
        compact ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-[13px]"
      }`}
    >
      <MapPin className={`${compact ? "h-3 w-3" : "h-3.5 w-3.5"} shrink-0 text-[#D7E88C]`} />
      <span
        className={`truncate font-sans font-medium leading-none ${compact ? "max-w-[12rem]" : "max-w-[16rem]"}`}
        style={{ textShadow: "0 1px 10px rgba(0,0,0,0.35)" }}
      >
        {label}
      </span>
    </div>
  )
}
