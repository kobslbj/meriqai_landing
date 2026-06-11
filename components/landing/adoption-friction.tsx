"use client"

import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Files,
  Mail,
  ScanLine,
} from "lucide-react"

import { Marquee } from "@/components/magicui/marquee"

import { useDict } from "./locale-context"
import { Reveal } from "./reveal"

const artifactIcons = [FileText, Mail, FileSpreadsheet, ScanLine, Files, Mail]

export function AdoptionFriction() {
  const dict = useDict()

  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {dict.adoption.title}
          </h2>
          {dict.adoption.subtitle ? (
            <p className="mt-3 text-pretty text-muted-foreground">
              {dict.adoption.subtitle}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-2.5 sm:grid-cols-2">
            {dict.adoption.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 rounded-lg border border-border/70 bg-background px-4 py-3 text-sm"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                <span className="leading-snug">{bullet}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <Marquee pauseOnHover className="[--duration:30s]">
              {dict.adoption.artifacts.map((label, i) => {
                const Icon = artifactIcons[i % artifactIcons.length]
                return (
                  <span
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs text-muted-foreground"
                  >
                    <Icon className="size-3.5 text-brand" />
                    {label}
                  </span>
                )
              })}
            </Marquee>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
