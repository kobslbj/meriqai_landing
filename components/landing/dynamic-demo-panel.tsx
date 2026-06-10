"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { BorderBeam } from "@/components/magicui/border-beam"
import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/analytics"
import { painCards } from "@/lib/landing-data"

import { scrollToSection, usePain } from "./pain-context"
import { StatusPill } from "./status-pill"

export function DynamicDemoPanel() {
  const { selectedPain } = usePain()
  const reduceMotion = useReducedMotion()
  const card = painCards.find((c) => c.id === selectedPain) ?? painCards[0]

  return (
    <div className="relative mt-8 overflow-hidden rounded-xl border border-border bg-card">
      <BorderBeam size={160} duration={14} colorTo="oklch(0.75 0.1 220)" />
      <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-5 py-3">
        <Sparkles className="size-4 text-brand" />
        <span className="font-mono text-xs text-muted-foreground">
          Live workflow preview
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={card.id}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="px-5 py-6 sm:px-6"
        >
          <h3 className="text-lg font-semibold tracking-tight">
            {card.demo.title}
          </h3>

          <ul className="mt-4 divide-y divide-border/60 rounded-lg border border-border/70 bg-background">
            {card.demo.lines.map((line, i) => (
              <li
                key={`${card.id}-${i}`}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 text-sm"
              >
                <span className="text-muted-foreground">{line.label}</span>
                {line.value &&
                  (line.tone ? (
                    <StatusPill tone={line.tone}>{line.value}</StatusPill>
                  ) : (
                    <span className="max-w-md text-right font-mono text-[0.8rem]">
                      {line.value}
                    </span>
                  ))}
                {!line.value && line.tone && (
                  <StatusPill tone={line.tone} withDot>
                    {line.tone === "ready"
                      ? "Done"
                      : line.tone === "warning"
                        ? "Open"
                        : line.tone === "blocking"
                          ? "Blocking"
                          : "Info"}
                  </StatusPill>
                )}
              </li>
            ))}
          </ul>

          {card.demo.note && (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {card.demo.note}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 bg-muted/40 px-5 py-4">
        <p className="text-sm text-muted-foreground">
          Is this the workflow slowing your team down?
        </p>
        <Button
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => {
            captureEvent("cta_clicked", {
              cta: "validate_selected_workflow",
              selected_pain: selectedPain,
            })
            scrollToSection("pilot")
          }}
        >
          Validate this workflow with us
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
