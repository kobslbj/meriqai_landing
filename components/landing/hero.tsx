"use client"

import { ArrowRight, FileSearch, Mail, MessageSquareText } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { GridPattern } from "@/components/magicui/grid-pattern"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/analytics"
import type { Dictionary } from "@/lib/dictionaries/types"

import { useDict } from "./locale-context"
import { scrollToSection } from "./pain-context"
import { StatusPill } from "./status-pill"

const actionIcons = [Mail, FileSearch, MessageSquareText]

export function Hero() {
  const dict = useDict()
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <GridPattern className="[mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-20 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-28 lg:pb-24">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand" />
            {dict.hero.badge}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            {dict.hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {dict.hero.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShimmerButton
              onClick={() => {
                captureEvent("cta_clicked", { cta: "hero_find_bottleneck" })
                scrollToSection("workflows")
              }}
            >
              {dict.hero.primaryCta}
              <ArrowRight className="ml-2 size-4" />
            </ShimmerButton>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                captureEvent("cta_clicked", {
                  cta: "hero_view_example_shipment",
                })
                scrollToSection("example-shipment")
              }}
            >
              {dict.hero.secondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          <HeroShipmentCard card={dict.hero.card} actions={dict.hero.actions} />
        </motion.div>
      </div>
    </section>
  )
}

function HeroShipmentCard({
  card,
  actions,
}: {
  card: Dictionary["hero"]["card"]
  actions: string[]
}) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-[0_20px_60px_-24px_oklch(0.45_0.16_250_/_0.25)]">
      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
        <div className="font-mono text-sm font-medium">{card.header}</div>
        <StatusPill tone="warning">{card.status}</StatusPill>
      </div>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-2.5 px-4 py-4 text-sm sm:grid-cols-2">
        <CardRow label={card.importerLabel} value={card.importerValue} mono />
        <CardRow label={card.supplierLabel} value={card.supplierValue} mono />
        <CardRow
          label={card.filingReadinessLabel}
          value={
            <StatusPill tone="blocking">{card.filingReadinessValue}</StatusPill>
          }
        />
        <CardRow label={card.ownerLabel} value={card.ownerValue} />
        <CardRow
          label={card.blockerLabel}
          value={card.blockerValue}
          className="sm:col-span-2"
        />
        <CardRow
          label={card.lastFollowUpLabel}
          value={card.lastFollowUpValue}
        />
        <CardRow
          label={card.riskLabel}
          value={<StatusPill tone="warning">{card.riskValue}</StatusPill>}
        />
      </dl>

      <div className="flex flex-wrap gap-2 border-t border-border/70 bg-muted/40 px-4 py-3">
        {actions.map((label, i) => {
          const Icon = actionIcons[i % actionIcons.length]
          return (
            <Button
              key={label}
              variant="outline"
              size="sm"
              className="bg-background"
              onClick={() =>
                captureEvent("feature_interest_clicked", {
                  feature: "hero_supplier_followup",
                  action: label,
                })
              }
            >
              <Icon className="size-3.5" />
              {label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

function CardRow({
  label,
  value,
  mono = false,
  className,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
  className?: string
}) {
  return (
    <div className={className}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono text-[0.8rem]" : "text-[0.85rem]"}>
        {value}
      </dd>
    </div>
  )
}
