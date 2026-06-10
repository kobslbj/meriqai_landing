"use client"

import * as React from "react"

import type { PainId } from "@/lib/landing-data"

type PainContextValue = {
  selectedPain: PainId
  setSelectedPain: (pain: PainId) => void
}

const PainContext = React.createContext<PainContextValue | null>(null)

export function PainProvider({ children }: { children: React.ReactNode }) {
  const [selectedPain, setSelectedPain] = React.useState<PainId>(
    "missing_supplier_documents"
  )

  return (
    <PainContext.Provider value={{ selectedPain, setSelectedPain }}>
      {children}
    </PainContext.Provider>
  )
}

export function usePain() {
  const context = React.useContext(PainContext)
  if (!context) {
    throw new Error("usePain must be used within a PainProvider")
  }
  return context
}

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
