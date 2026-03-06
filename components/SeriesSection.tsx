"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { Series } from "@/data/works";

interface Props {
  series: Series;
}

export default function SeriesSection({ series }: Props) {
  const [hero, ...rest] = series.works;
  const [imgError, setImgError] = useState<Set<string>>(new Set());

  const handleError = useCallback((id: string) => {
    setImgError((prev) => new Set(prev).add(id));
  }, []);

  return (
    <section id={series.id}>
      {/* Series header */}
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="font-body text-sm md:text-base tracking-[0.25em] text-gallery-text uppercase">
          {series.title}
        </h2>
        <span className="font-body text-sm tracking-[0.2em] text-gallery-muted">
          {series.year}
        </span>
      </div>

      {/* Hero image — first work, displayed large */}
      <div className="relative w-full aspect-[4/3] bg-gallery-border/30 mb-4">
        {imgError.has(hero.id) ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gallery-border/50">
            <span className="text-gallery-muted text-sm">Imagen pendiente</span>
            {hero.title && (
              <span className="text-gallery-muted text-xs mt-1">{hero.title}</span>
            )}
          </div>
        ) : (
          <Image
            src={hero.src}
            alt={hero.title || series.title}
            fill
            sizes="(max-width: 768px) 100vw, 70vw"
            className="object-contain"
            priority
            onError={() => handleError(hero.id)}
          />
        )}
      </div>

      {/* Hero caption */}
      {(hero.title || hero.medium) && (
        <div className="mb-8">
          {hero.title && (
            <p className="font-body text-sm text-gallery-text">{hero.title}</p>
          )}
          {hero.medium && (
            <p className="font-body text-xs text-gallery-muted mt-1">
              {hero.medium}
              {hero.dimensions ? ` — ${hero.dimensions}` : ""}
            </p>
          )}
        </div>
      )}

      {/* Series description */}
      {series.description && (
        <p className="font-body text-base text-gallery-text/80 leading-relaxed max-w-2xl mb-10">
          {series.description}
        </p>
      )}

      {/* Grid of remaining works */}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {rest.map((work) => (
            <div key={work.id} className="group">
              <div className="relative aspect-square bg-gallery-border/30 overflow-hidden">
                {imgError.has(work.id) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gallery-border/50">
                    <span className="text-gallery-muted text-xs">
                      {work.title || "Imagen pendiente"}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={work.src}
                    alt={work.title || "Obra"}
                    fill
                    sizes="(max-width: 768px) 45vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => handleError(work.id)}
                  />
                )}
              </div>
              {work.title && (
                <p className="font-body text-xs text-gallery-muted mt-2">
                  {work.title}
                </p>
              )}
              {work.medium && (
                <p className="font-body text-[11px] text-gallery-muted/70 mt-0.5">
                  {work.medium}
                  {work.dimensions ? ` — ${work.dimensions}` : ""}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
