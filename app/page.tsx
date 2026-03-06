import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        {/* Artist photo placeholder */}
        <div className="w-full max-w-[500px] mx-auto aspect-[3/4] bg-gallery-border/50 flex items-center justify-center mb-10">
          <span className="text-gallery-muted text-sm">Foto del artista</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-gallery-text text-center tracking-tight">
          Germán Martín Irigoyen
        </h1>

        <div className="mt-8 max-w-[600px] mx-auto space-y-4 text-center">
          <p className="font-body text-base text-gallery-text leading-relaxed">
            Artista visual radicado en Buenos Aires, Argentina. Su obra explora
            la tensión entre lo orgánico y lo geométrico a través de la pintura
            y la técnica mixta.
          </p>
          <p className="font-body text-base text-gallery-muted leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/works"
            className="font-body text-sm tracking-[0.15em] text-gallery-text border-b border-gallery-text pb-1 hover:text-gallery-muted hover:border-gallery-muted transition-colors"
          >
            Ver Obras
          </a>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
