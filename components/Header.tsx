"use client";

import { useState } from "react";
import { Menu, X, Instagram, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { series } from "@/data/works";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Exposiciones", href: "/exhibitions" },
  { label: "Sobre mí", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [obrasOpen, setObrasOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gallery-bg">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Artist name */}
          <a href="/" className="font-display text-2xl md:text-[1.75rem] lg:text-[2rem] font-light text-gallery-text">
            Germán Martín Irigoyen
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-10">
            <a href="/" className="font-body text-sm tracking-[0.15em] text-gallery-text hover:underline underline-offset-4 transition-colors">
              Inicio
            </a>

            {/* Obras with dropdown */}
            <div className="relative group">
              <a
                href="/works"
                className="font-body text-sm tracking-[0.15em] text-gallery-text hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1"
              >
                Obras
                <ChevronDown
                  size={12}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="group-hover:rotate-180 transition-transform duration-200"
                />
              </a>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-gallery-bg border border-gallery-border py-3 px-5 min-w-[160px] shadow-sm">
                  <a
                    href="/works"
                    className="block font-body text-sm tracking-[0.1em] text-gallery-text py-1.5 hover:text-gallery-muted transition-colors"
                  >
                    Todos
                  </a>
                  {series.map((s) => (
                    <a
                      key={s.id}
                      href={`/works?series=${s.id}`}
                      className="block font-body text-sm tracking-[0.1em] text-gallery-muted py-1.5 hover:text-gallery-text transition-colors"
                    >
                      {s.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="/exhibitions" className="font-body text-sm tracking-[0.15em] text-gallery-text hover:underline underline-offset-4 transition-colors">
              Exposiciones
            </a>
            <a href="/about" className="font-body text-sm tracking-[0.15em] text-gallery-text hover:underline underline-offset-4 transition-colors">
              Sobre mí
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gallery-text hover:text-gallery-muted transition-colors"
            >
              <Instagram size={20} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="md:hidden p-2 text-gallery-text"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={clsx(
          "md:hidden fixed inset-0 top-20 bg-gallery-bg z-40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav aria-label="Navegación móvil" className="flex flex-col items-center gap-8 pt-16">
          <a
            href="/"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            className="font-body text-lg tracking-[0.15em] text-gallery-text hover:underline underline-offset-4"
          >
            Inicio
          </a>

          {/* Obras accordion */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setObrasOpen((o) => !o)}
              tabIndex={open ? 0 : -1}
              className="font-body text-lg tracking-[0.15em] text-gallery-text inline-flex items-center gap-2"
            >
              Obras
              <ChevronDown
                size={14}
                strokeWidth={1.5}
                aria-hidden="true"
                className={clsx("transition-transform duration-200", obrasOpen && "rotate-180")}
              />
            </button>
            {obrasOpen && (
              <div className="flex flex-col items-center gap-3 mt-4">
                <a
                  href="/works"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="font-body text-base tracking-[0.1em] text-gallery-muted hover:text-gallery-text transition-colors"
                >
                  Todos
                </a>
                {series.map((s) => (
                  <a
                    key={s.id}
                    href={`/works?series=${s.id}`}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="font-body text-base tracking-[0.1em] text-gallery-muted hover:text-gallery-text transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="font-body text-lg tracking-[0.15em] text-gallery-text hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            tabIndex={open ? 0 : -1}
            className="text-gallery-text"
          >
            <Instagram size={22} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
