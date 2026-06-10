"use client"

import {
  Brain,
  FileCheck2,
  Inbox,
  ListChecks,
  MailPlus,
  MessageCircleQuestion,
  UserCheck,
} from "lucide-react"

import { captureEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"

import { useDict } from "./locale-context"
import { Reveal } from "./reveal"

const featureMeta: Record<string, { icon: React.ElementType; span: string }> = {
  ai_shipment_intake: { icon: Inbox, span: "lg:col-span-4" },
  blocker_ownership_tracking: { icon: ListChecks, span: "lg:col-span-2" },
  supplier_followup_drafting: { icon: MailPlus, span: "lg:col-span-2" },
  filing_readiness_review: { icon: FileCheck2, span: "lg:col-span-2" },
  operational_memory: { icon: Brain, span: "lg:col-span-2" },
  import_question_context_layer: {
    icon: MessageCircleQuestion,
    span: "lg:col-span-4",
  },
  human_in_the_loop_review: { icon: UserCheck, span: "lg:col-span-2" },
}

export function FeatureGrid() {
  const dict = useDict()

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {dict.features.title}
          </h2>
          <p className="mt-3 text-muted-foreground">{dict.features.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {dict.features.cards.map((feature) => {
              const meta = featureMeta[feature.id]
              const Icon = meta.icon
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() =>
                    captureEvent("feature_interest_clicked", {
                      feature: feature.id,
                    })
                  }
                  className={cn(
                    "group relative overflow-hidden rounded-xl border border-border bg-card p-5 text-left transition-all duration-200",
                    "hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_8px_30px_-12px_oklch(0.45_0.16_250_/_0.3)]",
                    meta.span
                  )}
                >
                  <div className="absolute -top-12 -right-12 size-32 rounded-full bg-brand/5 transition-transform duration-300 group-hover:scale-150" />
                  <span className="flex size-9 items-center justify-center rounded-lg border border-brand/20 bg-brand-muted text-brand">
                    <Icon className="size-4.5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                  {feature.details && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {feature.details.map((detail) => (
                        <span
                          key={detail}
                          className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[0.7rem] text-muted-foreground"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
