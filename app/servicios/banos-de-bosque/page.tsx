import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";

export const metadata: Metadata = {
  title: "Baños de Bosque en Valdivia | Puepu Bienestar",
  description:
    "Inmersión guiada en la Selva Valdiviana, basada en el Shinrin Yoku, para armonizar cuerpo, mente y sentidos en contacto con el bosque nativo.",
};

export default function BanosDeBosquePage() {
  return <ServiceLayout servicio={serviciosContent["banos-de-bosque"]} />;
}
