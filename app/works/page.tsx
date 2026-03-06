import type { Metadata } from "next";
import Header from "@/components/Header";
import SeriesViewer from "@/components/SeriesViewer";
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
      <main>
        {series.map((s) => (
          <SeriesViewer key={s.id} series={s} />
        ))}
        <InquiryCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
