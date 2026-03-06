"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import clsx from "clsx";
import type { Series } from "@/data/works";

interface Props {
  series: Series;
}

export default function SeriesViewer({ series }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoOpen, setInfoOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const works = series.works;
  const active = works[activeIndex];
  const [imgError, setImgError] = useState<Set<string>>(new Set());
  const hasInfo = !!(active.title || active.medium || active.dimensions || active.description);

  // Close info panel when switching artworks
  useEffect(() => {
    setInfoOpen(false);
  }, [activeIndex]);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === 0 ? works.length - 1 : i - 1));
  }, [works.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === works.length - 1 ? 0 : i + 1));
  }, [works.length]);

  const handleImageError = useCallback((id: string) => {
    setImgError((prev) => new Set(prev).add(id));
  }, []);

  return (
    <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
      {/* Series header */}
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-body text-sm md:text-base tracking-[0.25em] text-gallery-text">
          {series.title}
        </h2>
        <span className="font-body text-sm md:text-base tracking-[0.2em] text-gallery-muted">
          {series.year}
        </span>
      </div>

      {/* Gallery layout */}
      <div className="flex gap-6 lg:gap-10 items-start">
        {/* Thumbnail strip (left) */}
        <div className="hidden md:flex flex-col gap-3 w-[100px] lg:w-[120px] shrink-0">
          {works.map((work, i) => (
            <button
              key={work.id}
              onClick={() => setActiveIndex(i)}
              className={clsx(
                "relative aspect-square overflow-hidden border-2 transition-all duration-200",
                i === activeIndex
                  ? "border-gallery-text opacity-100"
                  : "border-transparent opacity-60 hover:opacity-90"
              )}
              aria-label={`Ver ${work.title || `obra ${i + 1}`}`}
            >
              {imgError.has(work.id) ? (
                <div className="w-full h-full bg-gallery-border flex items-center justify-center">
                  <span className="text-[10px] text-gallery-muted">{i + 1}</span>
                </div>
              ) : (
                <Image
                  src={work.src}
                  alt={work.title || `Thumbnail ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                  onError={() => handleImageError(work.id)}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main image with arrows */}
        <div className="flex-1 flex items-center gap-2 lg:gap-6 min-w-0">
          {/* Prev arrow */}
          <button
            onClick={prev}
            aria-label="Obra anterior"
            className="shrink-0 p-1 text-gallery-muted hover:text-gallery-text transition-colors"
          >
            <ChevronLeft size={36} strokeWidth={1} aria-hidden="true" />
          </button>

          {/* Main image */}
          <div className="relative flex-1 aspect-[3/4] max-h-[80vh] bg-gallery-border/30 group">
            {imgError.has(active.id) ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gallery-border/50">
                <span className="text-gallery-muted text-sm">Imagen pendiente</span>
                <span className="text-gallery-muted text-xs mt-1">{active.title}</span>
              </div>
            ) : (
              <Image
                key={active.id}
                src={active.src}
                alt={active.title || "Artwork"}
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                className="object-contain"
                priority={activeIndex === 0}
                onError={() => handleImageError(active.id)}
              />
            )}

            {/* Info overlay on hover */}
            {(active.medium || active.dimensions) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {active.medium && (
                  <p className="text-white/90 text-sm font-body">
                    {active.medium}{active.dimensions ? `, ${active.dimensions}` : ""}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            aria-label="Obra siguiente"
            className="shrink-0 p-1 text-gallery-muted hover:text-gallery-text transition-colors"
          >
            <ChevronRight size={36} strokeWidth={1} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Collapsible artwork info */}
      {hasInfo && (
        <div className="mt-4 md:ml-[124px] lg:ml-[154px]">
          <button
            onClick={() => setInfoOpen((o) => !o)}
            aria-expanded={infoOpen}
            aria-controls={`info-${active.id}`}
            className="flex items-center gap-2 text-gallery-muted hover:text-gallery-text transition-colors group"
          >
            <span className="font-body text-xs tracking-[0.15em] uppercase">
              {active.title || "Sobre esta obra"}
            </span>
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              aria-hidden="true"
              className={clsx(
                "transition-transform duration-200",
                infoOpen && "rotate-180"
              )}
            />
          </button>

          <div
            id={`info-${active.id}`}
            ref={panelRef}
            className={clsx(
              "overflow-hidden transition-all duration-300 ease-in-out",
              infoOpen ? "max-h-60 opacity-100 mt-3" : "max-h-0 opacity-0"
            )}
          >
            <div className="border-l border-gallery-border pl-4 space-y-2">
              {active.medium && (
                <p className="font-body text-sm text-gallery-muted">
                  {active.medium}
                  {active.dimensions ? ` — ${active.dimensions}` : ""}
                </p>
              )}
              {active.description && (
                <p className="font-body text-sm text-gallery-text/80 leading-relaxed max-w-xl">
                  {active.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile thumbnail strip */}
      <div className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
        {works.map((work, i) => (
          <button
            key={work.id}
            onClick={() => setActiveIndex(i)}
            className={clsx(
              "relative w-16 h-16 shrink-0 overflow-hidden border-2 transition-all",
              i === activeIndex
                ? "border-gallery-text opacity-100"
                : "border-transparent opacity-50"
            )}
            aria-label={`Ver ${work.title || `obra ${i + 1}`}`}
          >
            {imgError.has(work.id) ? (
              <div className="w-full h-full bg-gallery-border flex items-center justify-center">
                <span className="text-[10px] text-gallery-muted">{i + 1}</span>
              </div>
            ) : (
              <Image
                src={work.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                onError={() => handleImageError(work.id)}
              />
            )}
          </button>
        ))}
      </div>

      {/* Work info (mobile) */}
      <div className="md:hidden mt-3 text-center">
        {active.title && (
          <p className="text-gallery-text text-sm font-body">{active.title}</p>
        )}
        {active.medium && (
          <p className="text-gallery-muted text-xs font-body mt-1">
            {active.medium}{active.dimensions ? ` — ${active.dimensions}` : ""}
          </p>
        )}
      </div>
    </section>
  );
}
