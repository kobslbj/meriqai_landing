import { AdoptionFriction } from "@/components/landing/adoption-friction"
import { FeatureGrid } from "@/components/landing/feature-grid"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { MockShipmentDashboard } from "@/components/landing/mock-shipment-dashboard"
import { Navbar } from "@/components/landing/navbar"
import { PainProvider } from "@/components/landing/pain-context"
import { PainSelector } from "@/components/landing/pain-selector"
import { PersonaSelector } from "@/components/landing/persona-selector"
import { PilotForm } from "@/components/landing/pilot-form"
import { WorkflowSection } from "@/components/landing/workflow-section"

export default function Page() {
  return (
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
  )
}
