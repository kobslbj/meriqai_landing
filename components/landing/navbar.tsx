"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/analytics"
import { locales, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

import { useLocale } from "./locale-context"
import { scrollToSection } from "./pain-context"

const localeLabels: Record<Locale, string> = {
  en: "EN",
  zh: "繁中",
}

export function Navbar() {
  const { locale, dict } = useLocale()

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center"
        >
          <Image
            src="/meriq-ai-logo.svg"
            alt="Meriq AI"
            width={150}
            height={36}
            priority
            className="h-8 w-auto"
          />
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
          {dict.navbar.links.map((link) => (
            <Button
              key={link.id}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                aria-current={l === locale ? "page" : undefined}
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
                  l === locale
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>
          <Button
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand/90"
            onClick={() => {
              captureEvent("cta_clicked", { cta: "navbar_request_pilot" })
              scrollToSection("pilot")
            }}
          >
            {dict.navbar.requestPilot}
          </Button>
        </div>
      </div>
    </header>
  )
}
