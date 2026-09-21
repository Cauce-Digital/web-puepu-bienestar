import Image from "next/image";
import type { HomeImage } from "@/lib/content/home";

type ServiceHeroProps = {
  nombre: string;
  descripcionCorta: string;
  imagen: HomeImage;
};

export default function ServiceHero({
  nombre,
  descripcionCorta,
  imagen,
}: ServiceHeroProps) {
  return (
    <section className="grid grid-cols-1 items-center md:grid-cols-2">
      <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[420px]">
        <Image
          src={imagen.src}
          alt={imagen.alt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 px-6 py-10 md:px-16 md:py-16">
        <h1 className="font-display text-4xl text-[var(--color-musgo)] md:text-6xl">
          {nombre}
        </h1>
        <p className="max-w-[65ch] font-sans text-lg text-[var(--color-musgo)]">
          {descripcionCorta}
        </p>
      </div>
    </section>
  );
}
