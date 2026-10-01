import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import GraciasGuard from "@/components/forms/GraciasGuard";
import { formatWhatsAppLink } from "@/lib/formatWhatsAppLink";

export const metadata: Metadata = {
  title: "Mensaje enviado",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Gracias() {
  return (
    <GraciasGuard>
      <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center md:py-32">
        <h1 className="font-display text-4xl text-[var(--color-musgo)] md:text-5xl">
          Tu mensaje fue enviado
        </h1>
        <p className="font-sans text-base text-[var(--color-musgo)] md:text-lg">
          Gloria te contactará pronto.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
          <Button href={formatWhatsAppLink()} variant="outline">
            Escríbeme por WhatsApp
          </Button>
        </div>
      </section>
    </GraciasGuard>
  );
}
