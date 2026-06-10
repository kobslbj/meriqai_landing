import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { defaultLocale, locales } from "@/lib/i18n"

function detectLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language") ?? ""
  return /\bzh\b|zh-/i.test(acceptLanguage) ? "zh" : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (pathnameHasLocale) return

  const url = request.nextUrl.clone()
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Exclude Next internals, the PostHog /ingest proxy, and static files
  // (anything with a file extension, e.g. favicon.ico, logo svgs).
  matcher: ["/((?!_next|ingest|.*\\..*).*)"],
}
