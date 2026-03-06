"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Series } from "@/data/works";

interface Props {
  series: Series;
}

export default function SeriesSection({ series }: Props) {
  const [imgError, setImgError] = useState<Set<string>>(new Set());

  const handleError = useCallback((id: string) => {
    setImgError((prev) => new Set(prev).add(id));
  }, []);

  return (
    <section id={series.id} className="text-center">
      {/* Series header */}
      <h2 className="font-display text-xl md:text-2xl tracking-[0.2em] text-gallery-text mb-2" style={{ fontVariant: "small-caps" }}>
        {series.title}
      </h2>
      <p className="font-body text-sm tracking-[0.15em] text-gallery-muted mb-4">
        {series.year}
      </p>

      {/* Series description */}
      {series.description && (
        <p className="font-body text-base text-gallery-text/70 leading-relaxed max-w-xl mx-auto mb-12">
          {series.description}
        </p>
      )}

      {/* Works — large centered, one per row */}
      <div className="space-y-16">
        {series.works.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="block group"
          >
            {/* Image */}
            <div className="relative w-full max-w-[700px] mx-auto aspect-[3/4] bg-gallery-border/30">
              {imgError.has(work.id) ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gallery-border/50">
                  <span className="text-gallery-muted text-sm">Imagen pendiente</span>
                  {work.title && (
                    <span className="text-gallery-muted text-xs mt-1">{work.title}</span>
                  )}
                </div>
              ) : (
                <Image
                  src={work.src}
                  alt={work.title || "Obra"}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain group-hover:opacity-90 transition-opacity duration-300"
                  onError={() => handleError(work.id)}
                />
              )}
            </div>

            {/* Info below — small caps title, medium, dimensions */}
            <div className="mt-4">
              {work.title && (
                <p
                  className="font-display text-base md:text-lg tracking-[0.2em] text-gallery-text"
                  style={{ fontVariant: "small-caps" }}
                >
                  {work.title}
                </p>
              )}
              {work.medium && (
                <p className="font-body text-sm text-gallery-muted mt-2">
                  {work.medium}
                </p>
              )}
              {work.dimensions && (
                <p className="font-body text-sm text-gallery-muted mt-1">
                  {work.dimensions}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
