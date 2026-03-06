import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { findArtwork, getAllArtworkIds } from "@/data/works";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllArtworkIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const result = findArtwork(id);
  if (!result) return { title: "Obra no encontrada" };
  const { work, series } = result;
  return {
    title: `${work.title || "Obra"} — ${series.title} — Germán Martín Irigoyen`,
    description: work.description || `${work.medium || ""} ${work.dimensions || ""}`.trim(),
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { id } = await params;
  const result = findArtwork(id);
  if (!result) notFound();
  const { work, series } = result;

  const details: { label: string; value: string }[] = [];
  if (work.year) details.push({ label: "Fecha", value: work.year });
  if (work.medium) details.push({ label: "Técnica", value: work.medium });
  if (work.dimensions) details.push({ label: "Dimensiones", value: work.dimensions });
  if (work.dimensionsCm) details.push({ label: "Dimensiones (cm)", value: work.dimensionsCm });

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 lg:py-16">
        {/* Back link */}
        <Link
          href="/works"
          className="inline-flex items-center gap-2 font-body text-sm text-gallery-muted hover:text-gallery-text transition-colors mb-8"
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          Volver a obras
        </Link>

        {/* Two-column layout: image left, info right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative w-full aspect-[3/4] bg-gallery-border/30">
            <Image
              src={work.src}
              alt={work.title || "Obra"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Info panel */}
          <div className="flex flex-col justify-start">
            <p className="font-body text-sm text-gallery-muted mb-1">
              Germán Martín Irigoyen
            </p>

            {work.title && (
              <h1 className="font-display text-2xl md:text-3xl font-light italic text-gallery-text mb-6">
                {work.title}
              </h1>
            )}

            <p className="font-body text-xs tracking-[0.15em] text-gallery-muted uppercase mb-6">
              {series.title}, {series.year}
            </p>

            {/* Structured details — MoMA style */}
            {details.length > 0 && (
              <div className="border-t border-gallery-border pt-6 space-y-4">
                {details.map((d) => (
                  <div key={d.label} className="flex gap-6">
                    <span className="font-body text-sm font-medium text-gallery-text w-32 shrink-0">
                      {d.label}:
                    </span>
                    <span className="font-body text-sm text-gallery-muted">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            {work.description && (
              <p className="font-body text-sm text-gallery-text/80 leading-relaxed mt-8 max-w-md">
                {work.description}
              </p>
            )}

            {/* Inquiry CTA */}
            <div className="mt-10 pt-6 border-t border-gallery-border">
              <a
                href={`https://wa.me/5491136586777?text=${encodeURIComponent(`Hola Germán, me interesa la obra "${work.title || ""}".`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm tracking-[0.1em] text-gallery-text border-b border-gallery-text pb-1 hover:text-gallery-muted hover:border-gallery-muted transition-colors"
              >
                Consultar por esta obra
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
