import Image from "next/image";
import type { HomeImage } from "@/lib/content/home";

type ProductCardProps = {
  nombre: string;
  descripcion: string;
  imagen?: HomeImage;
};

export default function ProductCard({
  nombre,
  descripcion,
  imagen,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border-l-4 border-[var(--color-bosque)] bg-[var(--color-niebla)] shadow-[4px_4px_0_var(--color-musgo)] md:flex-row">
      {imagen && (
        <div className="relative aspect-square w-full md:w-48 md:shrink-0">
          <Image
            src={imagen.src}
            alt={imagen.alt}
            fill
            sizes="(min-width: 768px) 192px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 min-w-0 flex-col gap-2 p-6">
        <h3 className="font-display text-2xl text-[var(--color-musgo)]">
          {nombre}
        </h3>
        <p className="font-sans text-base text-[var(--color-musgo)]">
          {descripcion}
        </p>
      </div>
    </article>
  );
}
