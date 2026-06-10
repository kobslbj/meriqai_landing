"use client"

import * as React from "react"
import { CalendarDays, CheckCircle2 } from "lucide-react"

import { BorderBeam } from "@/components/magicui/border-beam"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import type { PainId } from "@/lib/dictionaries/types"
import { insforge } from "@/lib/insforge"

import { useLocale } from "./locale-context"
import { usePain } from "./pain-context"
import { Reveal } from "./reveal"

const BOOKING_URL = "https://calendar.app.google/ZeKFkEgcuz96X6wW6"

type FormErrors = Partial<Record<"email" | "company" | "role", string>>

export function PilotForm() {
  const { locale, dict } = useLocale()
  const t = dict.pilot
  const { selectedPain, setSelectedPain } = usePain()
  const [email, setEmail] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [role, setRole] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = t.form.errors.email
    }
    if (!company.trim()) {
      nextErrors.company = t.form.errors.company
    }
    if (!role.trim()) {
      nextErrors.role = t.form.errors.role
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    setSubmitError(null)

    const { error } = await insforge.database.from("pilot_requests").insert([
      {
        email,
        company: company.trim(),
        role: role.trim(),
        selected_pain: selectedPain,
        message,
        locale,
      },
    ])

    setSubmitting(false)

    if (error) {
      console.error("[pilot request] insert failed", error)
      setSubmitError(t.form.submitError)
      return
    }

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
              {t.title}
            </h2>
            <p className="mt-4 leading-relaxed text-pretty text-muted-foreground">
              {t.copy}
            </p>
            <p className="mt-5 text-sm font-medium">{t.especially}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {t.focusAreas.map((area) => (
                <Badge
                  key={area}
                  variant="outline"
                  className="bg-background font-mono"
                >
                  {area}
                </Badge>
              ))}
            </div>
            <div className="mt-8 border-t border-border/60 pt-6">
              <p className="text-sm text-muted-foreground">
                {t.booking.prompt}
              </p>
              <Button asChild variant="outline" className="mt-3 bg-background">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    captureEvent("cta_clicked", {
                      cta: "book_appointment_pilot_section",
                    })
                  }
                >
                  <CalendarDays className="size-4" />
                  {t.booking.cta}
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-xl border border-border bg-card p-6 sm:p-8">
              <BorderBeam size={160} duration={12} />
              {submitted ? (
                <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center">
                  <CheckCircle2 className="size-10 text-emerald-500" />
                  <p className="text-lg font-medium">{t.form.success}</p>
                  <p className="text-sm text-muted-foreground">
                    {t.form.successBookingPrompt}
                  </p>
                  <Button asChild variant="outline" className="bg-background">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        captureEvent("cta_clicked", {
                          cta: "book_appointment_success",
                        })
                      }
                    >
                      <CalendarDays className="size-4" />
                      {t.booking.cta}
                    </a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <Field label={t.form.emailLabel} error={errors.email}>
                    <Input
                      type="email"
                      placeholder={t.form.emailPlaceholder}
                      value={email}
                      aria-invalid={Boolean(errors.email)}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t.form.companyLabel} error={errors.company}>
                      <Input
                        placeholder={t.form.companyPlaceholder}
                        value={company}
                        aria-invalid={Boolean(errors.company)}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </Field>
                    <Field label={t.form.roleLabel} error={errors.role}>
                      <Input
                        placeholder={t.form.rolePlaceholder}
                        value={role}
                        aria-invalid={Boolean(errors.role)}
                        onChange={(e) => setRole(e.target.value)}
                      />
                    </Field>
                  </div>

                  <Field label={t.form.bottleneckLabel}>
                    <Select
                      value={selectedPain}
                      onValueChange={(value) =>
                        setSelectedPain(value as PainId)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={t.form.bottleneckPlaceholder}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {dict.painSection.cards.map((pain) => (
                          <SelectItem key={pain.id} value={pain.id}>
                            {pain.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label={t.form.messageLabel}>
                    <Textarea
                      placeholder={t.form.messagePlaceholder}
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Field>

                  <ShimmerButton
                    type="submit"
                    className="w-full disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={submitting}
                  >
                    {submitting ? t.form.submitting : t.form.submit}
                  </ShimmerButton>
                  {submitError && (
                    <p className="text-center text-sm text-destructive">
                      {submitError}
                    </p>
                  )}
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
