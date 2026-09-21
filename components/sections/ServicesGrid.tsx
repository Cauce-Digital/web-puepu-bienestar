import ServiceCard from "@/components/ui/ServiceCard";
import { homeContent } from "@/lib/content/home";

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <h2 className="mb-10 font-display text-4xl text-[var(--color-musgo)] md:text-5xl">
        Servicios
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {homeContent.servicios.map((servicio) => (
          <ServiceCard
            key={servicio.href}
            nombre={servicio.nombre}
            descripcion={servicio.descripcion}
            imagen={servicio.imagen.src}
            alt={servicio.imagen.alt}
            href={servicio.href}
          />
        ))}
      </div>
    </section>
  );
}
