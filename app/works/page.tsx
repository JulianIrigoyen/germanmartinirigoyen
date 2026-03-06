import type { Metadata } from "next";
import Header from "@/components/Header";
import SeriesSection from "@/components/SeriesSection";
import InquiryCTA from "@/components/InquiryCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { series } from "@/data/works";

export const metadata: Metadata = {
  title: "Obras — Germán Martín Irigoyen",
  description: "Obras seleccionadas de Germán Martín Irigoyen. Pinturas y técnica mixta.",
};

export default function WorksPage() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto px-6 lg:px-12 py-12 lg:py-20 space-y-24">
        {series.map((s) => (
          <SeriesSection key={s.id} series={s} />
        ))}
      </main>
      <InquiryCTA />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
