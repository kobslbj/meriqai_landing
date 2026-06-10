"use client"

import { Boxes } from "lucide-react"

import { Button } from "@/components/ui/button"
import { captureEvent } from "@/lib/analytics"

import { scrollToSection } from "./pain-context"

const navLinks = [
  { label: "Workflows", id: "workflows" },
  { label: "How it works", id: "how-it-works" },
  { label: "Pilot", id: "pilot" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-brand-foreground">
            <Boxes className="size-4" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">
              Meriq AI
            </span>
            <span className="hidden text-[0.65rem] text-muted-foreground md:block">
              Operational intelligence for trade teams.
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
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

        <Button
          size="sm"
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          onClick={() => {
            captureEvent("cta_clicked", { cta: "navbar_request_pilot" })
            scrollToSection("pilot")
          }}
        >
          Request pilot
        </Button>
      </div>
    </header>
  )
}
