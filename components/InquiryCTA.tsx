export default function InquiryCTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      {/* Background — will be a painting image, using gradient placeholder */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center px-6">
        <h2 className="font-body text-xl md:text-2xl tracking-[0.2em] text-white/90 mb-4">
          ¿Te interesa una obra?
        </h2>
        <p className="font-body text-base text-white/70 max-w-lg mx-auto">
          Para consultas sobre adquisición de obras, contactame por{" "}
          <a
            href="https://wa.me/5491136586777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
          >
            WhatsApp
          </a>
          .
        </p>
      </div>
    </section>
  );
}
