import {
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Files,
  Mail,
  ScanLine,
} from "lucide-react"

import { Marquee } from "@/components/magicui/marquee"
import { adoptionBullets } from "@/lib/landing-data"

import { Reveal } from "./reveal"

const artifacts = [
  { label: "Commercial invoice.pdf", icon: FileText },
  { label: "RE: RE: FW: missing COO", icon: Mail },
  { label: "packing_list_final_v3.xlsx", icon: FileSpreadsheet },
  { label: "scanned_certificate.jpg", icon: ScanLine },
  { label: "FDA prior notice draft", icon: Files },
  { label: "supplier reply thread", icon: Mail },
]

export function AdoptionFriction() {
  return (
    <section className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Works alongside your existing workflow.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-2.5 sm:grid-cols-2">
            {adoptionBullets.map((bullet) => (
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
              {artifacts.map((artifact) => (
                <span
                  key={artifact.label}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  <artifact.icon className="size-3.5 text-brand" />
                  {artifact.label}
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
