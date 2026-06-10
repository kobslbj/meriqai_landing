"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { BorderBeam } from "@/components/magicui/border-beam"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { captureEvent } from "@/lib/analytics"
import { painCards, type PainId } from "@/lib/landing-data"

import { usePain } from "./pain-context"
import { Reveal } from "./reveal"

const focusAreas = [
  "FDA",
  "APHIS",
  "food imports",
  "agriculture",
  "supplements",
  "regulated goods",
]

type FormErrors = Partial<Record<"email" | "company" | "role", string>>

export function PilotForm() {
  const { selectedPain, setSelectedPain } = usePain()
  const [email, setEmail] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [role, setRole] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Enter a valid work email."
    }
    if (!company.trim()) {
      nextErrors.company = "Company is required."
    }
    if (!role.trim()) {
      nextErrors.role = "Role is required."
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const formData = {
      email,
      company,
      role,
      selectedPain,
      message,
    }
    console.log("[pilot request]", formData)

    captureEvent("pilot_requested", {
      email_domain: email.split("@")[1],
      company,
      role,
      selected_pain: selectedPain,
      message_length: message.length,
    })

    setSubmitted(true)
  }

  return (
    <section id="pilot" className="scroll-mt-20 border-b border-border/60">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Looking for 3–5 pilot partners.
            </h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              We&apos;re working with customs brokers, freight forwarders, and
              import teams handling document-heavy and regulated shipments.
            </p>
            <p className="mt-5 text-sm font-medium">Especially:</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {focusAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="bg-background font-mono"
                >
                  {area}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-xl border border-border bg-card p-6 sm:p-8">
              <BorderBeam size={160} duration={12} />
              {submitted ? (
                <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
                  <CheckCircle2 className="size-10 text-emerald-500" />
                  <p className="text-lg font-medium">
                    Thanks — we&apos;ll reach out to learn about your workflow.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <Field label="Work email" error={errors.email}>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      aria-invalid={Boolean(errors.email)}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Company" error={errors.company}>
                      <Input
                        placeholder="Company name"
                        value={company}
                        aria-invalid={Boolean(errors.company)}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </Field>
                    <Field label="Role" error={errors.role}>
                      <Input
                        placeholder="e.g. Licensed customs broker"
                        value={role}
                        aria-invalid={Boolean(errors.role)}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </Field>
                  </div>

                  <Field label="Biggest workflow bottleneck">
                    <Select
                      value={selectedPain}
                      onValueChange={(value) =>
                        setSelectedPain(value as PainId)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a workflow" />
                      </SelectTrigger>
                      <SelectContent>
                        {painCards.map((pain) => (
                          <SelectItem key={pain.id} value={pain.id}>
                            {pain.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Workflow description (optional)">
                    <Textarea
                      placeholder="Tell us what this workflow looks like for your team today…"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Field>

                  <ShimmerButton type="submit" className="w-full">
                    Request pilot
                  </ShimmerButton>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
