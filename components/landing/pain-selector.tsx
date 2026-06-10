"use client"

import { Check } from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import type { PainId } from "@/lib/dictionaries/types"
import { cn } from "@/lib/utils"

import { useDict } from "./locale-context"
import { usePain } from "./pain-context"
import { Reveal } from "./reveal"
import { DynamicDemoPanel } from "./dynamic-demo-panel"

export function PainSelector() {
  const dict = useDict()
  const { selectedPain, setSelectedPain } = usePain()
  const cards = dict.painSection.cards

  const handleSelect = (pain: PainId) => {
    setSelectedPain(pain)
    captureEvent("pain_selected", { pain })
  }

  return (
    <section id="workflows" className="scroll-mt-20 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {dict.painSection.title}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {dict.painSection.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => {
              const selected = selectedPain === card.id
              return (
                <button
                  key={card.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => handleSelect(card.id)}
                  className={cn(
                    "group relative rounded-xl border bg-card p-5 text-left transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_8px_30px_-12px_oklch(0.45_0.16_250_/_0.3)]",
                    index === cards.length - 1 && "sm:col-span-2 lg:col-span-3",
                    selected
                      ? "border-brand/60 bg-brand-muted/60 shadow-[0_8px_30px_-12px_oklch(0.45_0.16_250_/_0.35)] ring-1 ring-brand/30"
                      : "border-border"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-4 right-4 flex size-5 items-center justify-center rounded-full border transition-colors",
                      selected
                        ? "border-brand bg-brand text-brand-foreground"
                        : "border-border bg-background text-transparent group-hover:border-brand/40"
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                  <h3 className="pr-8 text-sm font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              )
            })}
          </div>
        </Reveal>

        <DynamicDemoPanel />
      </div>
    </section>
  )
}
