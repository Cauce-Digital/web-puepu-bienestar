import Image from "next/image";
import type { HomeImage } from "@/lib/content/home";

type PhotoGalleryProps = {
  titulo: string;
  imagenes: HomeImage[];
};

export default function PhotoGallery({ titulo, imagenes }: PhotoGalleryProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h2 className="mb-10 font-display text-4xl text-[var(--color-musgo)] md:text-5xl">
        {titulo}
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {imagenes.map((imagen) => (
          <div
            key={imagen.src}
            className="relative aspect-square w-full overflow-hidden rounded-xl"
          >
            <Image
              src={imagen.src}
              alt={imagen.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
