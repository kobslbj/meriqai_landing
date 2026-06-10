"use client"

import * as React from "react"
import { Check, Copy, History, RefreshCw } from "lucide-react"

import { BorderBeam } from "@/components/magicui/border-beam"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { captureEvent } from "@/lib/analytics"
import type { Dictionary } from "@/lib/dictionaries/types"

import { useDict } from "./locale-context"
import { Reveal } from "./reveal"
import { StatusPill } from "./status-pill"

export function MockShipmentDashboard() {
  const dict = useDict()
  const d = dict.dashboard

  return (
    <section
      id="example-shipment"
      className="scroll-mt-20 border-b border-border/60 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {d.title}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">{d.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-[0_20px_60px_-24px_oklch(0.45_0.16_250_/_0.2)]">
            <BorderBeam size={200} duration={14} />

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 px-5 py-4">
              <div>
                <div className="font-mono text-sm font-medium">
                  {d.headerShipment}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {d.headerParties}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone="warning">{d.statusPill}</StatusPill>
                <StatusPill tone="blocking">{d.readinessPill}</StatusPill>
              </div>
            </div>
            <div className="border-b border-border/70 bg-muted/40 px-5 py-2 font-mono text-xs text-muted-foreground">
              {d.reason}
            </div>

            <Tabs
              defaultValue="extracted_fields"
              onValueChange={(tab) => captureEvent("demo_tab_clicked", { tab })}
              className="gap-0"
            >
              <div className="overflow-x-auto border-b border-border/70 px-5 pt-3 pb-2">
                <TabsList variant="line">
                  {d.tabs.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id} className="px-3">
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="px-5 py-6 sm:px-6">
                <TabsContent value="extracted_fields">
                  <ul className="divide-y divide-border/60 rounded-lg border border-border/70 bg-background">
                    {d.extractedFields.map((field) => (
                      <li
                        key={field.label}
                        className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
                      >
                        <span className="text-muted-foreground">
                          {field.label}
                        </span>
                        {field.tone ? (
                          <StatusPill tone={field.tone}>
                            {field.value}
                          </StatusPill>
                        ) : (
                          <span className="font-mono text-[0.8rem]">
                            {field.value}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="blockers">
                  <div className="overflow-hidden rounded-lg border border-border/70 bg-background">
                    <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border/70 bg-muted/50 px-4 py-2 font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                      <span>{d.blockers.itemHeader}</span>
                      <span>{d.blockers.ownerHeader}</span>
                      <span>{d.blockers.severityHeader}</span>
                    </div>
                    {d.blockers.rows.map((row) => (
                      <div
                        key={row.item}
                        className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border/60 px-4 py-2.5 text-sm last:border-b-0"
                      >
                        <span>{row.item}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {row.owner}
                        </span>
                        <StatusPill tone={row.severity}>
                          {row.severityLabel}
                        </StatusPill>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="followup_email">
                  <FollowUpEmailTab followUp={d.followUp} />
                </TabsContent>

                <TabsContent value="historical_patterns">
                  <ul className="space-y-3">
                    {d.patterns.items.map((pattern) => (
                      <li
                        key={pattern}
                        className="flex items-start gap-3 rounded-lg border border-border/70 bg-background px-4 py-3 text-sm"
                      >
                        <History className="mt-0.5 size-4 shrink-0 text-brand" />
                        <span className="leading-snug">{pattern}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">
                    {d.patterns.note}
                  </p>
                </TabsContent>

                <TabsContent value="customer_qa">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border/70 bg-background px-4 py-3">
                      <div className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                        {d.qa.customerAsksLabel}
                      </div>
                      <p className="mt-1.5 text-sm">{d.qa.question}</p>
                    </div>
                    <div className="rounded-lg border border-brand/25 bg-brand-muted/40 px-4 py-3">
                      <div className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                        {d.qa.draftLabel}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed">
                        {d.qa.draft}
                      </p>
                    </div>
                    <StatusPill tone="warning">{d.qa.status}</StatusPill>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FollowUpEmailTab({
  followUp,
}: {
  followUp: Dictionary["dashboard"]["followUp"]
}) {
  const [copied, setCopied] = React.useState(false)
  const [regenerating, setRegenerating] = React.useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(followUp.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — ignore.
    }
  }

  const regenerate = () => {
    setRegenerating(true)
    setTimeout(() => setRegenerating(false), 700)
  }

  return (
    <div>
      <pre
        className={
          "max-h-80 overflow-auto rounded-lg border border-border/70 bg-background px-4 py-4 font-mono text-[0.78rem] leading-relaxed whitespace-pre-wrap transition-opacity duration-300" +
          (regenerating ? " opacity-30" : " opacity-100")
        }
      >
        {followUp.email}
      </pre>
      <div className="mt-3 flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={copyEmail}>
          {copied ? (
            <Check className="size-3.5 text-emerald-600" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {copied ? followUp.copied : followUp.copy}
        </Button>
        <Button variant="outline" size="sm" onClick={regenerate}>
          <RefreshCw
            className={"size-3.5" + (regenerating ? " animate-spin" : "")}
          />
          {followUp.regenerate}
        </Button>
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          {followUp.note}
        </span>
      </div>
    </div>
  )
}
