import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Exposiciones — Germán Martín Irigoyen",
};

const exhibitions = [
  { year: "2025", title: "Título de la muestra", venue: "Nombre de galería, Buenos Aires", type: "Individual" },
  { year: "2024", title: "Título de la muestra", venue: "Nombre de galería, Buenos Aires", type: "Colectiva" },
  { year: "2023", title: "Título de la muestra", venue: "Nombre de galería, Buenos Aires", type: "Individual" },
];

export default function ExhibitionsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-6 lg:px-12 py-16 min-h-[60vh]">
        <h1 className="font-body text-sm tracking-[0.25em] text-gallery-text mb-12 uppercase">
          Exposiciones
        </h1>
        <div className="space-y-8">
          {exhibitions.map((ex, i) => (
            <div key={i} className="flex gap-8 items-baseline border-b border-gallery-border pb-6">
              <span className="font-body text-sm tracking-[0.15em] text-gallery-muted w-16 shrink-0">
                {ex.year}
              </span>
              <div>
                <p className="font-body text-base text-gallery-text">{ex.title}</p>
                <p className="font-body text-sm text-gallery-muted mt-1">
                  {ex.venue} — <span className="italic">{ex.type}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
