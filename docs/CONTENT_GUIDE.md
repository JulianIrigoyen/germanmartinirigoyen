# Content Guide

How to update the site content. All changes require a rebuild (`npm run build`) and push to GitHub for deployment.

## Adding/Editing Artwork

All artwork data lives in **`data/works.ts`**.

### Adding a New Work to an Existing Series

1. Add the image to `public/works/{serie-id}/` (e.g., `public/works/serie-1/06.jpg`)
2. Add an entry to the series `works` array in `data/works.ts`:

```typescript
{
  id: "s1-06",                    // Unique ID (series prefix + number)
  src: "/works/serie-1/06.jpg",   // Path from public/
  title: "Obra VI",               // Display name
  year: "2025",                   // Creation year (optional)
  medium: "Óleo sobre tela",      // Technique (optional)
  dimensions: "100 x 80 cm",     // Size (optional)
  description: "...",             // Description text (optional)
}
```

3. Run `npm run build` to regenerate pages
4. Commit and push

### Adding a New Series

1. Create directory: `public/works/serie-4/`
2. Add images: `01.jpg`, `02.jpg`, etc.
3. Add series entry in `data/works.ts`:

```typescript
{
  id: "serie-4",
  title: "SERIE IV",
  year: "2025 – 2026",
  description: "Description text for the series...",
  works: [
    { id: "s4-01", src: "/works/serie-4/01.jpg", title: "Obra I", medium: "...", dimensions: "..." },
    // ... more works
  ],
}
```

The header dropdown and works listing will automatically include the new series.

### ID Convention

- Series ID: `serie-{N}` (e.g., `serie-1`, `serie-2`)
- Artwork ID: `s{N}-{NN}` (e.g., `s1-01`, `s2-03`)
- IDs are used in URLs: `/works/s1-01`, and as anchor targets: `/works#serie-1`

## Images

### File Format & Naming

```
public/works/{serie-id}/{number}.jpg

Examples:
  public/works/serie-1/01.jpg
  public/works/serie-1/02.jpg
  public/works/serie-2/01.jpg
```

### Recommended Specs

| Context         | Recommended Size | Aspect Ratio | Notes                          |
|-----------------|------------------|--------------|--------------------------------|
| Artwork image   | 1600×2100px      | ~3:4         | `object-contain` preserves ratio |
| Artist photo    | 1000×1300px      | 3:4          | Home page + about page         |

- Format: JPG or PNG (Next.js auto-converts to AVIF/WebP)
- Keep file sizes under 500KB for fast loading
- Use descriptive originals if desired, but the convention uses numbered files

### Missing Images

If an image file doesn't exist, the component shows a gray placeholder with "Imagen pendiente" text. This allows the site to build and deploy before all images are ready.

## Artist Photo

Two placeholders exist for the artist photo:

1. **Home page** (`app/page.tsx`): 3:4 aspect ratio, max-width 500px
2. **About page** (`app/about/page.tsx`): 4:3 aspect ratio, full width

To add a real photo:
1. Place image at `public/artist.jpg` (or any path)
2. Replace the placeholder `<div>` with:
```tsx
<Image src="/artist.jpg" alt="Germán Martín Irigoyen" fill className="object-cover" />
```

## Biography Text

### Home Page (`app/page.tsx`)
Currently has:
- One real paragraph (short intro)
- One lorem ipsum paragraph

Replace the lorem ipsum with real bio text from the client.

### About Page (`app/about/page.tsx`)
Contains placeholder text marked with `[Texto de biografía — reemplazar con el statement real de Germán.]`

Replace with the artist's full statement/bio.

## Exhibitions

Exhibition data is hardcoded in `app/exhibitions/page.tsx` as a simple array:

```typescript
const exhibitions = [
  {
    year: "2025",
    title: "Título de la muestra",
    venue: "Nombre de galería, Buenos Aires",
    type: "Individual"  // or "Colectiva"
  },
  // ... more entries
];
```

Replace placeholder entries with real exhibition history.

## Instagram Link

The Instagram URL in `Header.tsx`, `Footer.tsx`, and the `WhatsAppButton.tsx` currently points to `https://instagram.com/` (generic). Update to the real profile URL (e.g., `https://instagram.com/germanmartinirigoyen`).

Search for `instagram.com/` in the codebase and update all 4 occurrences:
- `components/Header.tsx` (desktop nav, line ~75)
- `components/Header.tsx` (mobile drawer, line ~170)
- `components/Footer.tsx` (footer link)
