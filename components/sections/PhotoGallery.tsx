import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HomeImage } from "@/lib/content/home";

type PhotoGalleryEnlace = {
  href: string;
  ariaLabel: string;
  ctaLabel: string;
};

// href opcional por imagen (por ejemplo, el permalink de una publicación de
// Instagram). Si no viene, la imagen usa enlace.href como hasta ahora.
export type PhotoGalleryImage = HomeImage & {
  href?: string;
};

type PhotoGalleryProps = {
  titulo: string;
  texto?: string;
  imagenes: PhotoGalleryImage[];
  enlace?: PhotoGalleryEnlace;
};

export default function PhotoGallery({
  titulo,
  texto,
  imagenes,
  enlace,
}: PhotoGalleryProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h2 className="font-display text-4xl text-[var(--color-musgo)] md:text-5xl">
        {titulo}
      </h2>
      {texto && (
        <p className="mt-4 max-w-[65ch] font-sans text-lg text-[var(--color-musgo)]">
          {texto}
        </p>
      )}

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {imagenes.map((imagen) => {
          const foto = (
            <Image
              src={imagen.src}
              alt={imagen.alt}
              fill
              loading="lazy"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          );

          const href = imagen.href ?? enlace?.href;
          const ariaLabel = imagen.href
            ? `${imagen.alt} (se abre en una pestaña nueva)`
            : enlace?.ariaLabel;

          return href ? (
            <a
              key={imagen.src}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className="relative block aspect-square w-full overflow-hidden rounded-xl transition-opacity hover:opacity-90"
            >
              {foto}
            </a>
          ) : (
            <div
              key={imagen.src}
              className="relative aspect-square w-full overflow-hidden rounded-xl"
            >
              {foto}
            </div>
          );
        })}
      </div>

      {enlace && (
        <div className="mt-10 flex justify-center">
          <Button href={enlace.href} variant="outline">
            {enlace.ctaLabel}
          </Button>
        </div>
      )}
    </section>
  );
}
