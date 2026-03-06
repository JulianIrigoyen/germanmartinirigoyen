"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import type { Series } from "@/data/works";
import SeriesSection from "@/components/SeriesSection";

interface Props {
  allSeries: Series[];
}

export default function WorksPageClient({ allSeries }: Props) {
  const searchParams = useSearchParams();
  const initial = searchParams.get("series");
  const [active, setActive] = useState<string | null>(
    initial && allSeries.some((s) => s.id === initial) ? initial : null
  );

  const handleFilter = (id: string | null) => {
    setActive(id);
    const url = id ? `/works?series=${id}` : "/works";
    window.history.replaceState(null, "", url);
  };

  const visible = active
    ? allSeries.filter((s) => s.id === active)
    : allSeries;

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">
      {/* Mobile filter bar */}
      <div className="flex md:hidden gap-4 overflow-x-auto pb-4 mb-6 border-b border-gallery-border">
        <button
          onClick={() => handleFilter(null)}
          className={clsx(
            "shrink-0 font-body text-xs tracking-[0.15em] uppercase pb-1 transition-colors",
            active === null
              ? "text-gallery-text border-b border-gallery-text"
              : "text-gallery-muted"
          )}
        >
          Todos
        </button>
        {allSeries.map((s) => (
          <button
            key={s.id}
            onClick={() => handleFilter(s.id)}
            className={clsx(
              "shrink-0 font-body text-xs tracking-[0.15em] pb-1 transition-colors",
              active === s.id
                ? "text-gallery-text border-b border-gallery-text"
                : "text-gallery-muted"
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="flex gap-12 lg:gap-16">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-[180px] lg:w-[200px] shrink-0">
          <nav className="sticky top-28 space-y-4" aria-label="Filtrar por serie">
            <button
              onClick={() => handleFilter(null)}
              className={clsx(
                "block font-body text-sm tracking-[0.2em] uppercase transition-colors",
                active === null
                  ? "text-gallery-text"
                  : "text-gallery-muted hover:text-gallery-text"
              )}
            >
              Todos
            </button>
            {allSeries.map((s) => (
              <button
                key={s.id}
                onClick={() => handleFilter(s.id)}
                className={clsx(
                  "block font-body text-sm tracking-[0.15em] transition-colors",
                  active === s.id
                    ? "text-gallery-text"
                    : "text-gallery-muted hover:text-gallery-text"
                )}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-20">
          {visible.map((s) => (
            <SeriesSection key={s.id} series={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
