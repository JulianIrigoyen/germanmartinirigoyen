import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-gallery-text text-center tracking-tight">
          Germán Martín Irigoyen
        </h1>
        <p className="font-body text-sm md:text-base tracking-[0.2em] text-gallery-muted mt-6 uppercase">
          Artista Visual
        </p>
        <a
          href="/works"
          className="mt-12 font-body text-sm tracking-[0.15em] text-gallery-text border-b border-gallery-text pb-1 hover:text-gallery-muted hover:border-gallery-muted transition-colors"
        >
          Ver Obras
        </a>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
