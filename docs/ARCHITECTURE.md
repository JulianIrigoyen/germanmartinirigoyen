# Architecture

## Rendering Strategy

The entire site is statically generated at build time. There is no server-side rendering, no API routes, and no database.

- **Static pages**: `/`, `/works`, `/exhibitions`, `/about`
- **SSG with `generateStaticParams`**: `/works/[id]` — generates one page per artwork (currently 14 pages)

All data lives in `data/works.ts` as TypeScript constants. When artwork data changes, a rebuild is required.

## Component Architecture

```
Layout (app/layout.tsx)
  ├── Header (sticky, all pages)
  ├── Page Content
  │   ├── Home: photo + bio + CTA
  │   ├── Works: SeriesSection × N + InquiryCTA
  │   ├── Works/[id]: image + info panel
  │   ├── Exhibitions: CV list
  │   └── About: bio + contact
  ├── Footer (all pages)
  └── WhatsAppButton (floating, all pages)
```

### Key Components

#### Header (`components/Header.tsx`)
- Client component (`"use client"`)
- Sticky positioning (`sticky top-0 z-50`)
- **Desktop**: horizontal nav with "Obras" hover dropdown (pure CSS via Tailwind `group-hover`)
- **Mobile**: hamburger → full-screen drawer with "Obras" accordion
- Imports `series` from data to dynamically generate dropdown links
- Accessibility: `aria-expanded`, `aria-controls`, `aria-label`, `tabIndex` management

#### SeriesSection (`components/SeriesSection.tsx`)
- Client component (for image error handling state)
- Renders one series: title (small-caps), year, description, then each artwork vertically
- Each artwork is a `<Link>` to `/works/[artworkId]`
- Image error fallback: gray placeholder with "Imagen pendiente" text
- Gallery aesthetic: `font-variant: small-caps` for titles, large centered images (max-w-700px)

#### Artwork Detail Page (`app/works/[id]/page.tsx`)
- Server component with async params (Next.js 15 pattern)
- Two-column layout on desktop (image left, info right), stacked on mobile
- MoMA-inspired structured metadata: Fecha, Técnica, Dimensiones
- WhatsApp CTA with pre-filled message including artwork title
- `generateMetadata` for per-page SEO

## Data Layer

### Interfaces

```typescript
interface Artwork {
  id: string;           // Unique ID, used in URL: /works/s1-01
  src: string;          // Image path: /works/serie-1/01.jpg
  title?: string;       // Display name
  year?: string;        // Creation year
  medium?: string;      // Technique (e.g., "Óleo sobre tela")
  dimensions?: string;  // Size (e.g., "100 x 80 cm")
  dimensionsCm?: string; // Alternate dimensions format
  description?: string; // Artwork description/concept text
}

interface Series {
  id: string;           // URL-safe identifier: "serie-1"
  title: string;        // Display name: "SERIE I"
  year: string;         // Date range: "2024 – 2025"
  description?: string; // Series concept/statement
  works: Artwork[];     // Artworks in this series
}
```

### Helper Functions

```typescript
findArtwork(id: string): { work: Artwork; series: Series } | null
// Searches across all series to find an artwork by ID

getAllArtworkIds(): string[]
// Returns flat array of all artwork IDs (for generateStaticParams)
```

### Current Data

| Series    | ID       | Year        | Works |
|-----------|----------|-------------|-------|
| SERIE I   | serie-1  | 2024 – 2025 | 5     |
| SERIE II  | serie-2  | 2023 – 2024 | 5     |
| SERIE III | serie-3  | 2022 – 2023 | 4     |

**Total: 14 artworks, 14 generated detail pages**

## Design System

### Colors

```
gallery-bg:     #fafafa  (off-white background)
gallery-text:   #1a1a1a  (near-black text)
gallery-muted:  #6b6b6b  (secondary text)
gallery-border: #e5e5e5  (borders, dividers)
gallery-hover:  #333333  (hover states)
```

### Typography

| Usage    | Font              | CSS Class      | Weight    |
|----------|-------------------|----------------|-----------|
| Display  | Cormorant Garamond | `font-display` | 300–600   |
| Body     | Inter              | `font-body`    | Variable  |

Fonts are loaded via `next/font/google` with CSS variable binding (`--font-display`, `--font-body`). This enables Tailwind to reference them and Next.js to optimize loading.

**Special styling**: Artwork titles use `font-variant: small-caps` with `tracking-[0.2em]` for the gallery aesthetic.

### Spacing Patterns

- Page max-width: `max-w-[900px]` (content), `max-w-[1200px]` (artwork detail), `max-w-[1400px]` (header)
- Section padding: `px-6 lg:px-12`
- Vertical rhythm: `space-y-24` between series, `space-y-16` between works

## SEO

- **Metadata**: Title, description, Open Graph (es_AR locale), canonical URL per page
- **JSON-LD**: `Person` schema in root layout
- **Dynamic metadata**: Artwork detail pages generate unique title/description via `generateMetadata`
- **Image optimization**: AVIF/WebP formats via Next.js Image component

## Security

Configured in `next.config.js`:
- `poweredByHeader: false`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Accessibility

- Semantic HTML: `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`
- ARIA: `aria-label` on navigation landmarks, `aria-expanded` on toggles, `aria-hidden` on decorative icons
- Focus management: `tabIndex` toggling in mobile drawer, `focus-visible` ring on WhatsApp button
- Motion: `prefers-reduced-motion` disables smooth scrolling
- Skip content: anchor links and clear navigation hierarchy
