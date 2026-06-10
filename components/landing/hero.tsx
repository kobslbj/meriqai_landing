"use client"

import { ArrowRight, FileSearch, Mail, MessageSquareText } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { BorderBeam } from "@/components/magicui/border-beam"
import { GridPattern } from "@/components/magicui/grid-pattern"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/analytics"
import { mockShipment } from "@/lib/landing-data"

import { scrollToSection } from "./pain-context"
import { StatusPill } from "./status-pill"

const heroActions = [
  { label: "Generate follow-up email", icon: Mail },
  { label: "Review shipment blockers", icon: FileSearch },
  { label: "Draft customer response", icon: MessageSquareText },
]

export function Hero() {
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
            Operational intelligence for trade teams
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
            Stop chasing suppliers for missing shipment documents.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            Meriq AI turns messy shipment emails, PDFs, supplier replies, and
            customer questions into ready-to-review shipment cases — with
            blockers, owners, follow-ups, filing readiness, and operational
            context in one place.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShimmerButton
              onClick={() => {
                captureEvent("cta_clicked", { cta: "hero_find_bottleneck" })
                scrollToSection("workflows")
              }}
            >
              Find my biggest workflow bottleneck
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
              View example shipment
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
          <HeroShipmentCard />
        </motion.div>
      </div>
    </section>
  )
}

function HeroShipmentCard() {
  return (
    <div className="relative rounded-xl border border-border bg-card shadow-[0_20px_60px_-24px_oklch(0.45_0.16_250_/_0.25)]">
      <BorderBeam size={180} duration={10} />

      <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
        <div className="font-mono text-sm font-medium">
          Shipment: {mockShipment.id} · {mockShipment.port}
        </div>
        <StatusPill tone="warning">{mockShipment.status}</StatusPill>
      </div>

      <dl className="grid grid-cols-1 gap-x-6 gap-y-2.5 px-4 py-4 text-sm sm:grid-cols-2">
        <CardRow label="Importer" value={mockShipment.importer} mono />
        <CardRow label="Supplier" value={mockShipment.supplier} mono />
        <CardRow
          label="Filing readiness"
          value={
            <StatusPill tone="blocking">
              {mockShipment.filingReadiness}
            </StatusPill>
          }
        />
        <CardRow label="Owner" value={mockShipment.owner} />
        <CardRow
          label="Current blocker"
          value={mockShipment.blocker}
          className="sm:col-span-2"
        />
        <CardRow label="Last follow-up" value={mockShipment.lastFollowUp} />
        <CardRow
          label="Risk"
          value={<StatusPill tone="warning">{mockShipment.risk}</StatusPill>}
        />
      </dl>

      <div className="flex flex-wrap gap-2 border-t border-border/70 bg-muted/40 px-4 py-3">
        {heroActions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            className="bg-background"
            onClick={() =>
              captureEvent("feature_interest_clicked", {
                feature: "hero_supplier_followup",
                action: action.label,
              })
            }
          >
            <action.icon className="size-3.5" />
            {action.label}
          </Button>
        ))}
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
