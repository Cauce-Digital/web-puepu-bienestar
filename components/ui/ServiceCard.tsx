import Image from "next/image";
import Link from "next/link";

type ServiceCardProps = {
  nombre: string;
  descripcion: string;
  imagen: string;
  alt: string;
  href: string;
};

export default function ServiceCard({
  nombre,
  descripcion,
  imagen,
  alt,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-2xl shadow-[4px_4px_0_var(--color-musgo)] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={imagen}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 bg-[var(--color-bosque)] p-6">
        <h3 className="font-display text-2xl text-white">{nombre}</h3>
        <p className="font-sans text-sm text-white/90">{descripcion}</p>
        <span className="mt-auto font-sans text-sm font-medium text-[var(--color-tierra)]">
          Saber más
        </span>
      </div>
    </Link>
  );
}
