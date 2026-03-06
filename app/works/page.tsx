import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import WorksPageClient from "@/components/WorksPageClient";
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
        <Suspense fallback={null}>
          <WorksPageClient allSeries={series} />
        </Suspense>
        <InquiryCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
