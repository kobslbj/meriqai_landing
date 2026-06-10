import { cn } from "@/lib/utils"

export type StatusTone = "blocking" | "warning" | "ready" | "neutral"

const toneStyles: Record<StatusTone, string> = {
  blocking: "bg-red-50 text-red-700 ring-red-600/20",
  warning: "bg-amber-50 text-amber-700 ring-amber-600/25",
  ready: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  neutral: "bg-muted text-muted-foreground ring-border",
}

const toneDot: Record<StatusTone, string> = {
  blocking: "bg-red-500",
  warning: "bg-amber-500",
  ready: "bg-emerald-500",
  neutral: "bg-neutral-400",
}

export function StatusPill({
  tone = "neutral",
  children,
  className,
  withDot = true,
}: {
  tone?: StatusTone
  children: React.ReactNode
  className?: string
  withDot?: boolean
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[0.7rem] font-medium ring-1 ring-inset",
        toneStyles[tone],
        className
      )}
    >
      {withDot && (
        <span className={cn("size-1.5 rounded-full", toneDot[tone])} />
      )}
      {children}
    </span>
  )
}
