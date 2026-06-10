import Image from "next/image"

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-col gap-2">
          <Image
            src="/meriq-ai-logo.svg"
            alt="Meriq AI"
            width={150}
            height={36}
            className="h-8 w-auto"
          />
          <p className="text-xs text-muted-foreground">
            Operational intelligence for trade teams.
          </p>
        </div>
        <div className="max-w-sm space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-right">
          <p>
            AI coordination layer for shipment readiness, supplier follow-ups,
            and trade operations.
          </p>
          <p>&copy; {currentYear} Meriq AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
