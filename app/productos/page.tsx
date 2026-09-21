import type { Metadata } from "next";
import Image from "next/image";
import ProductCard from "@/components/ui/ProductCard";
import CallToAction from "@/components/sections/CallToAction";
import { productosContent } from "@/lib/content/productos";

export const metadata: Metadata = {
  title: "Ungüentos Puepu | Productos naturales en Valdivia",
  description:
    "Ungüentos naturales elaborados por Gloria Jofré con plantas medicinales de la Selva Valdiviana, para dolores articulares, tensión muscular y más.",
};

export default function ProductosPage() {
  const { intro, lineaCompleta, productos } = productosContent;

  return (
    <>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-4xl text-[var(--color-musgo)] md:text-6xl">
            {intro.titulo}
          </h1>
          {intro.parrafos.map((parrafo) => (
            <p
              key={parrafo}
              className="max-w-[70ch] font-sans text-lg text-[var(--color-musgo)]"
            >
              {parrafo}
            </p>
          ))}
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={intro.imagen.src}
            alt={intro.imagen.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section
        className="px-6 py-16 md:py-24"
        style={{
          background: "color-mix(in srgb, var(--color-bosque) 8%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <figure className="flex flex-col gap-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[21/9]">
              <Image
                src={lineaCompleta.src}
                alt={lineaCompleta.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="font-sans text-sm text-[var(--color-corteza)]">
              La línea completa de Ungüentos Puepu
            </figcaption>
          </figure>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {productos.map((producto) => (
              <ProductCard
                key={producto.slug}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                imagen={producto.imagen}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        titulo="¿Quieres saber más o adquirirlos?"
        label="Contáctame"
        href="/sobre-mi-y-contacto#contacto"
        segundoLabel="Escríbeme por WhatsApp"
        segundoHref="https://wa.me/56952541245"
      />
    </>
  );
}
