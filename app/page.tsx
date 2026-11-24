import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import InstagramFeed from "@/components/sections/InstagramFeed";
import CallToAction from "@/components/sections/CallToAction";
import { homeContent } from "@/lib/content/home";
import { buildMetadata } from "@/lib/seo";

// Regenera el inicio cada 12 h para refrescar el feed de Instagram (ISR).
// Debe ser un número literal: Next.js no evalúa expresiones aquí.
export const revalidate = 43200;

export const metadata: Metadata = buildMetadata({
  title: {
    absolute:
      "Puepu Bienestar | Medicina Tradicional China y Baños de Bosque en Valdivia",
  },
  description:
    "Gloria Jofré, terapeuta en Medicina Tradicional China. Baños de bosque, caminatas medicinales y talleres en la Selva Valdiviana.",
  path: "/",
});

export default function Home() {
  const { quienSoy } = homeContent;

  return (
    <>
      <Hero />

      <section
        id="quien-soy"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={quienSoy.imagen.src}
            alt={quienSoy.imagen.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="font-display text-4xl text-[var(--color-musgo)] md:text-5xl">
            Quién soy
          </h2>
          <p className="font-sans text-lg text-[var(--color-musgo)]">
            {quienSoy.texto}
          </p>
          <Link
            href="/sobre-mi-y-contacto#sobre-mi"
            className="font-sans font-medium text-[var(--color-corteza)] hover:underline"
          >
            Conoce mi historia
          </Link>
        </div>
      </section>

      <ServicesGrid />

      <InstagramFeed />

      <CallToAction
        titulo="¿Te animas a comenzar?"
        label="Escríbeme"
        href="/sobre-mi-y-contacto#contacto"
      />
    </>
  );
}
