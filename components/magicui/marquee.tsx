import * as React from "react"

import { cn } from "@/lib/utils"

type MarqueeProps = React.ComponentProps<"div"> & {
  reverse?: boolean
  pauseOnHover?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        className
      )}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
