import type { Metadata } from "next";
import ServicesGrid from "@/components/sections/ServicesGrid";

export const metadata: Metadata = {
  title: "Servicios | Puepu Bienestar",
  description:
    "Terapia MTCH, baños de bosque, caminatas medicinales y talleres con Gloria Jofré en la Selva Valdiviana, Valdivia.",
};

export default function ServiciosPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24">
        <h1 className="font-display text-4xl text-[var(--color-musgo)] md:text-6xl">
          Servicios
        </h1>
        <p className="mt-4 max-w-[65ch] font-sans text-lg text-[var(--color-musgo)]">
          Cuatro formas de acompañarte en tu bienestar, desde sesiones
          individuales hasta actividades grupales en la Selva Valdiviana.
        </p>
      </div>

      <ServicesGrid mostrarTitulo={false} />
    </>
  );
}
