"use client"

import * as React from "react"
import { Building2, Ship, ShieldCheck, Check } from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

import { useDict } from "./locale-context"
import { Reveal } from "./reveal"

const personaIcons: Record<string, React.ElementType> = {
  customs_brokers: Building2,
  freight_forwarders: Ship,
  import_compliance_teams: ShieldCheck,
}

export function PersonaSelector() {
  const dict = useDict()
  const [selected, setSelected] = React.useState<string | null>(null)

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {dict.personas.title}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {dict.personas.cards.map((persona) => {
              const Icon = personaIcons[persona.id]
              const isSelected = selected === persona.id
              return (
                <button
                  key={persona.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => {
                    setSelected(persona.id)
                    captureEvent("persona_selected", { persona: persona.id })
                  }}
                  className={cn(
                    "group relative rounded-xl border bg-card p-6 text-left transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_8px_30px_-12px_oklch(0.45_0.16_250_/_0.3)]",
                    isSelected
                      ? "border-brand/60 bg-brand-muted/60 ring-1 ring-brand/30"
                      : "border-border"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-colors",
                      isSelected
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-background text-transparent"
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-lg border border-brand/20 bg-brand-muted text-brand">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold tracking-tight">
                    {persona.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                    {persona.copy}
                  </p>
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
