import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";

export const metadata: Metadata = {
  title: "Terapia MTCH en Valdivia | Puepu Bienestar",
  description:
    "Sesiones individuales de Medicina Tradicional China con Gloria Jofré, terapeuta acreditada, en un espacio acogedor y con respaldo profesional.",
};

export default function TerapiaMtchPage() {
  return <ServiceLayout servicio={serviciosContent["terapia-mtch"]} />;
}
