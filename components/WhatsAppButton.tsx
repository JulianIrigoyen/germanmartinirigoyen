import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5491136586777?text=Hola%20Germ%C3%A1n%2C%20me%20interesa%20tu%20trabajo";

export default function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gallery-text text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gallery-text focus-visible:ring-offset-2"
    >
      <MessageCircle size={22} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
