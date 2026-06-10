import * as React from "react"

import { cn } from "@/lib/utils"

type ShimmerButtonProps = React.ComponentProps<"button"> & {
  shimmerColor?: string
  shimmerSize?: string
  borderRadius?: string
  shimmerDuration?: string
  background?: string
}

export function ShimmerButton({
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  shimmerDuration = "3s",
  borderRadius = "0.625rem",
  background = "oklch(0.45 0.16 250)",
  className,
  children,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as React.CSSProperties
      }
      className={cn(
        "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden [border-radius:var(--radius)] border border-white/10 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white [background:var(--bg)]",
        "transform-gpu transition-all duration-300 ease-in-out active:translate-y-px",
        className
      )}
      {...props}
    >
      <div className="[container-type:size] absolute inset-0 -z-30 overflow-visible blur-[2px]">
        <div className="absolute inset-0 [aspect-ratio:1] h-[100cqh] animate-shimmer-slide [border-radius:0]">
          <div className="absolute -inset-full w-auto [translate:0_0] rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      {children}
      <div className="absolute inset-0 size-full transform-gpu rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 ease-in-out group-hover:shadow-[inset_0_-6px_10px_#ffffff3f] group-active:shadow-[inset_0_-10px_10px_#ffffff3f]" />
      <div className="absolute [inset:var(--cut)] -z-20 [border-radius:var(--radius)] [background:var(--bg)]" />
    </button>
  )
}
