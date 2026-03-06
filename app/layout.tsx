import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Germán Martín Irigoyen — Artista Visual",
  description:
    "Portfolio de Germán Martín Irigoyen. Artista visual radicado en Buenos Aires, Argentina.",
  alternates: {
    canonical: "https://germanmartinirigoyen.com",
  },
  openGraph: {
    title: "Germán Martín Irigoyen — Artista Visual",
    description: "Artista visual radicado en Buenos Aires, Argentina.",
    url: "https://germanmartinirigoyen.com",
    siteName: "Germán Martín Irigoyen",
    type: "website",
    locale: "es_AR",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Germán Martín Irigoyen",
  url: "https://germanmartinirigoyen.com",
  jobTitle: "Artista Visual",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
