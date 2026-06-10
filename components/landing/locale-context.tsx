"use client"

import * as React from "react"
import posthog from "posthog-js"

import type { Dictionary } from "@/lib/dictionaries/types"
import type { Locale } from "@/lib/i18n"

type LocaleContextValue = {
  locale: Locale
  dict: Dictionary
}

const LocaleContext = React.createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale,
  dict,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  React.useEffect(() => {
    if (posthog.__loaded) {
      posthog.register({ locale })
    }
  }, [locale])

  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = React.useContext(LocaleContext)
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }
  return context
}

export function useDict() {
  return useLocale().dict
}
