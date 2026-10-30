import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";

export const metadata: Metadata = {
  title: "Medicina Tradicional China en Valdivia | Puepu Bienestar",
  description:
    "Sesiones individuales de Medicina Tradicional China con Gloria Jofré, terapeuta acreditada, en un espacio acogedor y con respaldo profesional.",
};

export default function MedicinaTradicionalChinaPage() {
  return <ServiceLayout servicio={serviciosContent["medicina-tradicional-china"]} />;
}
