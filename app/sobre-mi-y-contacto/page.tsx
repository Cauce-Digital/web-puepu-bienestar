import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { sobreMiContent } from "@/lib/content/sobreMi";

export const metadata: Metadata = {
  title: "Sobre mí y Contacto | Gloria Jofré — Puepu Bienestar",
  description:
    "Conoce a Gloria Jofré, terapeuta en Medicina Tradicional China y guía del bosque valdiviano, y escríbele para agendar tu sesión o resolver dudas.",
};

export default function SobreMiYContactoPage() {
  const { imagen, titulo, roles, historia, formacion, acreditacion, enfoque, contacto } =
    sobreMiContent;

  return (
    <>
      <section
        id="sobre-mi"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <Image
            src={imagen.src}
            alt={imagen.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="font-display text-4xl text-[var(--color-musgo)] md:text-6xl">
            {titulo}
          </h1>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm text-[var(--color-corteza)]">
            {roles.map((rol) => (
              <li key={rol}>{rol}</li>
            ))}
          </ul>

          {historia.map((parrafo) => (
            <p
              key={parrafo}
              className="max-w-[70ch] font-sans text-base text-[var(--color-musgo)] md:text-lg"
            >
              {parrafo}
            </p>
          ))}

          <ul className="flex max-w-[70ch] flex-col gap-2 font-sans text-base text-[var(--color-musgo)]">
            {formacion.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-[var(--color-corteza)]">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>

          <p className="max-w-[70ch] border-l-4 border-[var(--color-bosque)] pl-4 font-sans text-base font-medium text-[var(--color-musgo)]">
            {acreditacion}
          </p>
        </div>
      </section>

      <section
        className="px-6 py-16 md:py-24"
        style={{ background: "color-mix(in srgb, var(--color-bosque) 8%, transparent)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <h2 className="font-display text-3xl text-[var(--color-musgo)] md:text-4xl">
            {enfoque.titulo}
          </h2>
          <p className="max-w-[70ch] font-sans text-base text-[var(--color-musgo)] md:text-lg">
            {enfoque.parrafo}
          </p>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6 border-l-4 border-[var(--color-tierra)] bg-[var(--color-niebla)] p-6 md:p-8">
            <h2 className="font-display text-3xl text-[var(--color-musgo)] md:text-4xl">
              {contacto.titulo}
            </h2>
            <p className="font-sans text-base text-[var(--color-musgo)]">{contacto.texto}</p>
            <ContactForm servicio="Contacto General" />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-display text-2xl text-[var(--color-musgo)]">
              Contacto directo
            </h3>
            <a
              href="https://wa.me/56952541245"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-sans text-[var(--color-musgo)] hover:text-[var(--color-corteza)]"
            >
              <MessageCircle size={24} />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/puepu_bienestar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 font-sans text-[var(--color-musgo)] hover:text-[var(--color-corteza)]"
            >
              <InstagramIcon size={24} />
              @puepu_bienestar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
