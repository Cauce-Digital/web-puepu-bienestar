import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Medicina Tradicional China en Valdivia",
  description:
    "Sesiones individuales de Medicina Tradicional China con Gloria Jofré, terapeuta acreditada, en un espacio acogedor y con respaldo profesional.",
  path: "/servicios/medicina-tradicional-china",
});

export default function MedicinaTradicionalChinaPage() {
  return <ServiceLayout servicio={serviciosContent["medicina-tradicional-china"]} />;
}
