import { notFound } from "next/navigation"

import { AdoptionFriction } from "@/components/landing/adoption-friction"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { LocaleProvider } from "@/components/landing/locale-context"
import { MockShipmentDashboard } from "@/components/landing/mock-shipment-dashboard"
import { Navbar } from "@/components/landing/navbar"
import { PainProvider } from "@/components/landing/pain-context"
import { PainSelector } from "@/components/landing/pain-selector"
import { PersonaSelector } from "@/components/landing/persona-selector"
import { PilotForm } from "@/components/landing/pilot-form"
import { WorkflowSection } from "@/components/landing/workflow-section"
import { getDictionary, hasLocale } from "@/lib/i18n"

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = getDictionary(lang)

  return (
    <LocaleProvider locale={lang} dict={dict}>
      <PainProvider>
        <Navbar />
        <main>
          <Hero />
          <PainSelector />
          <WorkflowSection />
          <FeatureGrid />
          <MockShipmentDashboard />
          <PersonaSelector />
          <AdoptionFriction />
          <PilotForm />
        </main>
        <Footer />
      </PainProvider>
    </LocaleProvider>
  )
}
