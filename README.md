# 365 SHOP Frontend

Enterprise-level ecommerce frontend foundation built with Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui-ready architecture, next-themes, and token-based global styling.

## Project Goal

365 SHOP frontend is designed to become a premium, responsive, accessible, scalable and backend/API-ready ecommerce platform.

Current stage:

- Clean enterprise frontend foundation
- Global design token system
- Light/Dark mode support
- Tailwind v4 theme bridge
- shadcn/ui-ready setup
- Backend/API-ready architecture preparation
- Section-by-section future development workflow

## Tech Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS v4
- shadcn/ui compatible setup
- next-themes
- Framer Motion
- Lenis
- Embla Carousel
- TanStack Query
- TanStack Table
- Zustand
- React Hook Form
- Zod
- Recharts
- Serwist
- MSW
- pnpm

## Scripts

Install dependencies:

```bash
pnpm install
```

Run development server:

```bash
pnpm dev
```

Run lint and type check:

```bash
pnpm check
```

Create production build:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Styling Architecture

Global CSS entry:

```txt
src/app/globals.css
```

Design system files:

```txt
src/styles/tokens.css
src/styles/base.css
src/styles/utilities.css
src/styles/animations.css
```

Layout primitives:

```txt
src/styles/layout/container.css
src/styles/layout/section.css
```

Reusable component CSS:

```txt
src/styles/components/button.css
src/styles/components/badge.css
```

Rules:

- `globals.css` only controls stylesheet loading order.
- `tokens.css` is the single source of truth for colors, fonts, radius, shadows, spacing, z-index and dark/light mode.
- Component-specific CSS must use the `gb-*` prefix.
- Avoid hardcoded colors, shadows, radius and spacing inside components.
- Use tokens so the whole website can be visually updated from one place.

## Development Workflow

This project follows a strict one-module-at-a-time workflow.

Examples:

- Header work means only header component, data and CSS files.
- Product card work means only product card component, data and CSS files.
- Homepage work means only homepage sections and required supporting files.
- PWA work means only PWA config, manifest and service worker related files.
- API work means only service, query, schema and type files related to that module.

Do not build multiple large sections together.

## Accessibility Standards

Every UI module should consider:

- Semantic HTML
- Keyboard navigation
- `aria-label` where needed
- `aria-expanded` for dropdowns
- Escape key close behavior
- Outside click close behavior
- Focus-visible state
- Screen-reader friendly labels
- Mobile touch-friendly controls
- Reduced motion support

## Performance Standards

Target:

- LCP under 2.5s
- CLS under 0.1
- INP under 200ms
- Optimized images with Next.js Image
- Route-level code splitting
- Lazy loading for heavy UI
- Dynamic imports where needed
- Server Components by default
- Client Components only when interaction, state, browser APIs or effects are required

## Current Foundation Status

The project is intentionally clean right now.

Homepage, header, product card, footer and ecommerce feature UI will be rebuilt step-by-step after the foundation is verified with:

```bash
pnpm check
pnpm build
```

## Folder Direction

Preferred high-level structure:

```txt
src/app
src/components
src/components/common
src/components/layout
src/components/providers
src/components/ui
src/data
src/features
src/hooks
src/lib
src/services
src/store
src/styles
src/types
```

Feature modules should be added only when that feature is actively being built.

## Important Rule

Generated files must not be committed.

Examples:

```txt
.next
node_modules
tsconfig.tsbuildinfo
```