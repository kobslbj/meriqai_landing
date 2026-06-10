import { Boxes } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-brand-foreground">
            <Boxes className="size-4" />
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Meriq AI</div>
            <div className="text-xs text-muted-foreground">
              Operational intelligence for trade teams.
            </div>
          </div>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-right">
          AI coordination layer for shipment readiness, supplier follow-ups, and
          trade operations.
        </p>
      </div>
    </footer>
  )
}
