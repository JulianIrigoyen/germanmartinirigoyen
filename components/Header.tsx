"use client";

import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import clsx from "clsx";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Obras", href: "/works" },
  { label: "Exposiciones", href: "/exhibitions" },
  { label: "Sobre mí", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm tracking-[0.15em] text-gallery-text hover:underline underline-offset-4 transition-colors"
              >
                {link.label}
              </a>
            ))}
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
          {links.map((link) => (
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
