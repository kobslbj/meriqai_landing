import * as React from "react"

import { cn } from "@/lib/utils"

type GridPatternProps = React.ComponentProps<"svg"> & {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: string
}

export function GridPattern({
  width = 48,
  height = 48,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  className,
  ...props
}: GridPatternProps) {
  const id = React.useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full fill-neutral-400/15 stroke-neutral-400/25",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  )
}
