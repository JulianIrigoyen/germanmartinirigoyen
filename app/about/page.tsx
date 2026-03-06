import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Sobre mí — Germán Martín Irigoyen",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="max-w-[700px] mx-auto px-6 lg:px-12 py-16 min-h-[60vh]">
        <h1 className="font-body text-sm tracking-[0.25em] text-gallery-text mb-12 uppercase">
          Sobre mí
        </h1>

        {/* Foto del artista placeholder */}
        <div className="w-full aspect-[4/3] bg-gallery-border/50 mb-10 flex items-center justify-center">
          <span className="text-gallery-muted text-sm">Foto del artista</span>
        </div>

        <div className="space-y-4 font-body text-base text-gallery-text leading-relaxed">
          <p>
            Germán Martín Irigoyen es un artista visual radicado en Buenos Aires, Argentina.
          </p>
          <p>
            Su obra explora temas de identidad, memoria y la forma humana a través
            de la pintura y la técnica mixta. Partiendo tanto de la técnica clásica como
            de la expresión contemporánea, su práctica busca tender un puente entre lo
            visceral y lo contemplativo.
          </p>
          <p>
            {/* Reemplazar con la bio real */}
            [Texto de biografía — reemplazar con el statement real de Germán.]
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gallery-border">
          <p className="font-body text-sm text-gallery-muted">
            Para prensa, colaboraciones o adquisiciones:
          </p>
          <a
            href="mailto:german@germanmartinirigoyen.com"
            className="font-body text-sm text-gallery-text underline underline-offset-4 mt-2 inline-block hover:text-gallery-muted transition-colors"
          >
            german@germanmartinirigoyen.com
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
