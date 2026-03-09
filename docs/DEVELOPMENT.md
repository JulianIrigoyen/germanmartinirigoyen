# Development Guide

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
cd clients/german
npm install
npm run dev
```

Open http://localhost:3000

## Available Scripts

| Script         | Command          | Description                    |
|----------------|------------------|--------------------------------|
| `npm run dev`  | `next dev`       | Start dev server (port 3000)   |
| `npm run build`| `next build`     | Production build               |
| `npm run start`| `next start`     | Serve production build locally |

## Project Conventions

### File Naming
- Components: PascalCase (`SeriesSection.tsx`)
- Pages: lowercase directories (`works/[id]/page.tsx`)
- Data: camelCase (`works.ts`)

### Component Patterns
- Server components by default (no `"use client"` unless needed)
- Client components only when state or browser APIs are required:
  - `Header.tsx` — mobile menu state
  - `SeriesSection.tsx` — image error tracking state
- Props interfaces defined inline or in the component file
- Shared types in `data/works.ts`

### Styling
- Tailwind utility classes exclusively (no CSS modules, no styled-components)
- Custom colors via `gallery-*` tokens defined in `tailwind.config.ts`
- Font classes: `font-display` (serif) and `font-body` (sans)
- Responsive: mobile-first with `md:` and `lg:` breakpoints
- Common patterns:
  - `max-w-[900px] mx-auto px-6 lg:px-12` — page container
  - `tracking-[0.15em]` — letter spacing for UI text
  - `text-gallery-muted` — secondary text color

### Image Handling
- Always use Next.js `<Image>` component (auto-optimization, AVIF/WebP)
- Use `fill` + `object-contain` for artwork (preserves aspect ratio)
- Use `fill` + `object-cover` for photos (crops to fit)
- Set `sizes` prop for responsive loading
- Set `priority` on above-the-fold images
- Handle errors with `onError` callback → show fallback placeholder

### Accessibility Checklist
- Icons: always add `aria-hidden="true"` and pair with text or `aria-label`
- Interactive elements: `aria-expanded`, `aria-controls` for toggles
- Navigation: `aria-label` on `<nav>` elements
- Mobile drawer: `tabIndex={open ? 0 : -1}` to prevent hidden element focus
- Decorative elements: `aria-hidden="true"`

## Adding a New Page

1. Create `app/{route}/page.tsx`
2. Export metadata:
```tsx
export const metadata: Metadata = {
  title: "Page Title — Germán Martín Irigoyen",
};
```
3. Include shared layout components:
```tsx
<>
  <Header />
  <main className="max-w-[900px] mx-auto px-6 lg:px-12 py-16">
    {/* content */}
  </main>
  <Footer />
  <WhatsAppButton />
</>
```
4. Add nav link in `Header.tsx` if needed

## Adding a New Component

1. Create in `components/` directory
2. Use server component unless state/interactivity is needed
3. Import types from `@/data/works` if needed
4. Follow existing patterns for styling and accessibility

## Troubleshooting

### Build Errors
- **Missing image**: Build still passes — component shows "Imagen pendiente" fallback
- **TypeScript error**: Check `data/works.ts` interfaces match component usage
- **Tailwind class not working**: Ensure file is in `content` array in `tailwind.config.ts`

### Common Issues
- **Dropdown doesn't show on hover**: The `pt-2` spacer bridges the gap between trigger and dropdown. If removed, there's a hover dead zone.
- **Font not loading**: Check `layout.tsx` — fonts must be assigned to CSS variables and referenced in `tailwind.config.ts`
- **Page not found for artwork**: Ensure artwork ID exists in `data/works.ts` and matches URL param
