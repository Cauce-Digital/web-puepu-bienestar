import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ServiceHero from "@/components/sections/ServiceHero";
import ContactForm from "@/components/forms/ContactForm";
import type { ServicioLanding } from "@/lib/content/servicios";

type ServiceLayoutProps = {
  servicio: ServicioLanding;
};

export default function ServiceLayout({ servicio }: ServiceLayoutProps) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-6">
        <ol className="flex items-center gap-2 font-sans text-sm text-[var(--color-corteza)]">
          <li>
            <Link href="/" className="hover:text-[var(--color-musgo)]">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li>
            <Link href="/servicios" className="hover:text-[var(--color-musgo)]">
              Servicios
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li aria-current="page" className="text-[var(--color-musgo)]">
            {servicio.nombre}
          </li>
        </ol>
      </nav>

      <ServiceHero
        nombre={servicio.nombre}
        descripcionCorta={servicio.descripcionCorta}
        imagen={servicio.imagen}
      />

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-16 md:py-24">
        <section className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-[var(--color-musgo)] md:text-4xl">
            ¿Qué es?
          </h2>
          {servicio.queEs.map((parrafo) => (
            <p
              key={parrafo}
              className="max-w-[70ch] font-sans text-base text-[var(--color-musgo)] md:text-lg"
            >
              {parrafo}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-[var(--color-musgo)] md:text-4xl">
            ¿Para quién es?
          </h2>
          {servicio.paraQuien.map((parrafo) => (
            <p
              key={parrafo}
              className="max-w-[70ch] font-sans text-base text-[var(--color-musgo)] md:text-lg"
            >
              {parrafo}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="font-display text-3xl text-[var(--color-musgo)] md:text-4xl">
            ¿Cómo funciona?
          </h2>
          <ul className="flex max-w-[70ch] flex-col gap-2 font-sans text-base text-[var(--color-musgo)] md:text-lg">
            {servicio.comoFunciona.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-[var(--color-corteza)]">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        id="contacto"
        className="border-l-4 border-[var(--color-tierra)] bg-[var(--color-niebla)] px-6 py-16 md:py-24"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <h2 className="font-display text-3xl text-[var(--color-musgo)] md:text-4xl">
            Escríbeme
          </h2>
          <ContactForm servicio={servicio.tag} />
        </div>
      </section>
    </>
  );
}
