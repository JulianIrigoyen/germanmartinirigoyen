# Germán Martín Irigoyen — Artist Portfolio

## Overview

Portfolio website for **Germán Martín Irigoyen**, a visual artist based in Buenos Aires, Argentina. The site presents artwork organized in series with a minimalist, gallery-inspired design.

- **Domain**: germanmartinirigoyen.com
- **Live URL**: https://german-site-eight.vercel.app
- **GitHub**: https://github.com/JulianIrigoyen/germanmartinirigoyen
- **Hosting**: Vercel (auto-deploys from `master` branch)

## Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Framework     | Next.js 15.1 (App Router)           |
| Language      | TypeScript 5.7 (strict mode)        |
| UI            | React 19                            |
| Styling       | Tailwind CSS 3.4                    |
| Icons         | Lucide React 0.474                  |
| Utilities     | clsx 2.1                            |
| Fonts         | Cormorant Garamond (display/serif) + Inter (body/sans) via next/font/google |
| Deployment    | Vercel (connected to GitHub)        |

No database. No authentication. Fully static site — all pages pre-rendered at build time.

## Contact Information

| Field         | Value                                   |
|---------------|-----------------------------------------|
| WhatsApp      | +54 9 11 3658-6777 (`5491136586777`)    |
| Email         | german@germanmartinirigoyen.com         |
| Instagram     | @germanmartinirigoyen (link TBD)        |
| Location      | Buenos Aires, Argentina                 |

## Pages

| Route               | Description                                  | Rendering   |
|---------------------|----------------------------------------------|-------------|
| `/`                 | Home — artist photo, bio, "Ver Obras" CTA    | Static      |
| `/works`            | Gallery listing — all series, centered layout | Static      |
| `/works/[id]`       | Individual artwork detail page               | SSG (14 pages) |
| `/exhibitions`      | CV-style exhibition list                     | Static      |
| `/about`            | Artist biography + contact                   | Static      |

## Project Structure

```
german/
├── app/
│   ├── globals.css              # Tailwind layers, scroll behavior, selection
│   ├── layout.tsx               # Root layout: fonts, metadata, JSON-LD
│   ├── page.tsx                 # Home page
│   ├── works/
│   │   ├── page.tsx             # Gallery listing (all series)
│   │   └── [id]/
│   │       └── page.tsx         # Individual artwork detail
│   ├── exhibitions/
│   │   └── page.tsx             # Exhibition CV
│   └── about/
│       └── page.tsx             # Bio + contact
├── components/
│   ├── Header.tsx               # Sticky nav, Obras dropdown, mobile drawer
│   ├── SeriesSection.tsx        # Series display: centered images, small-caps titles
│   ├── InquiryCTA.tsx           # "¿Te interesa una obra?" dark CTA section
│   ├── Footer.tsx               # Location, socials, copyright
│   └── WhatsAppButton.tsx       # Floating FAB (bottom-right)
├── data/
│   └── works.ts                 # Series/Artwork data, helper functions
├── docs/                        # This documentation
├── public/
│   └── works/                   # Artwork images (see IMAGE_GUIDE below)
│       ├── serie-1/
│       ├── serie-2/
│       └── serie-3/
├── lib/                         # (empty — reserved for future utilities)
├── package.json
├── tsconfig.json                # @/* path alias
├── next.config.js               # Security headers, AVIF/WebP
├── tailwind.config.ts           # Gallery color tokens, font families
├── postcss.config.js
└── .gitignore
```
