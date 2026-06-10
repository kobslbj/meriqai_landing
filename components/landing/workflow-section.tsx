"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowDown, CheckCircle2, XCircle } from "lucide-react"

import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/analytics"
import { workflowAfter, workflowBefore } from "@/lib/landing-data"
import { cn } from "@/lib/utils"

import { scrollToSection } from "./pain-context"
import { Reveal } from "./reveal"

export function WorkflowSection() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const beforeRef = React.useRef<HTMLDivElement>(null)
  const midRef = React.useRef<HTMLDivElement>(null)
  const afterRef = React.useRef<HTMLDivElement>(null)

  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            From email chaos to shipment readiness.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Meriq sits before filing, where shipment context is scattered across
            documents, emails, supplier threads, PDFs, and customer questions.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={containerRef}
            className="relative mt-12 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-10"
          >
            <WorkflowCard
              ref={beforeRef}
              title="Before Meriq"
              items={workflowBefore}
              icon={<XCircle className="size-4 text-red-500" />}
              className="border-border bg-card"
            />

            <div className="flex justify-center">
              <div
                ref={midRef}
                className="z-10 flex size-14 items-center justify-center rounded-full border border-brand/30 bg-background shadow-[0_8px_30px_-8px_oklch(0.45_0.16_250_/_0.4)]"
              >
                <Image
                  src="/meriq-ai-mark.svg"
                  alt=""
                  width={34}
                  height={26}
                  className="h-7 w-auto"
                  aria-hidden="true"
                />
              </div>
              <ArrowDown className="absolute -bottom-4 left-1/2 size-4 -translate-x-1/2 text-muted-foreground lg:hidden" />
            </div>

            <WorkflowCard
              ref={afterRef}
              title="With Meriq"
              items={workflowAfter}
              icon={<CheckCircle2 className="size-4 text-emerald-500" />}
              className="border-brand/30 bg-card ring-1 ring-brand/15"
            />

            <div className="hidden lg:block">
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={beforeRef}
                toRef={midRef}
                curvature={60}
                duration={5}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={midRef}
                toRef={afterRef}
                curvature={60}
                duration={5}
                delay={1.5}
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            className="bg-background"
            onClick={() => {
              captureEvent("workflow_example_opened", {
                workflow: "shipment_readiness",
              })
              scrollToSection("example-shipment")
            }}
          >
            Show workflow example
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

const WorkflowCard = React.forwardRef<
  HTMLDivElement,
  {
    title: string
    items: string[]
    icon: React.ReactNode
    className?: string
  }
>(function WorkflowCard({ title, items, icon, className }, ref) {
  return (
    <div ref={ref} className={cn("z-10 rounded-xl border p-6", className)}>
      <h3 className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 shrink-0">{icon}</span>
            <span className="leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
})
