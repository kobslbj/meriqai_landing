# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run format     # Prettier (writes in place)
```

Add shadcn/ui components with:

```bash
npx shadcn@latest add <component>   # places component in components/ui/
```

There is no test framework configured.

## Important: Next.js version

This project uses Next.js 16.2.6, which has breaking changes — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices.

## Architecture

- **Next.js App Router** (`app/` directory) with React Server Components enabled (`"rsc": true` in components.json), React 19.
- **Tailwind CSS v4**: configuration lives in CSS (`app/globals.css`), not a tailwind.config file. Theme tokens are CSS variables.
- **shadcn/ui** configured via `components.json` (style: "radix-nova", icons: lucide-react). Components are vendored into `components/ui/` and use the `cn()` helper from `lib/utils.ts` (clsx + tailwind-merge).
- **Theming**: `next-themes` with class-based dark mode, wired up in `components/theme-provider.tsx` (also registers a global "d" hotkey that toggles light/dark). The root layout (`app/layout.tsx`) wraps the app in `ThemeProvider` and sets `suppressHydrationWarning` on `<html>`.
- **Path alias**: `@/*` maps to the repo root (e.g. `@/components/ui/button`, `@/lib/utils`).

## Code style

Prettier is configured with no semicolons, double quotes, 2-space indent, and `prettier-plugin-tailwindcss` (sorts Tailwind classes; recognizes `cn` and `cva` functions).
