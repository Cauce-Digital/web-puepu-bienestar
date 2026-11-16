import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Baños de Bosque en Valdivia",
  description:
    "Inmersión guiada en la Selva Valdiviana, basada en el Shinrin Yoku, para armonizar cuerpo, mente y sentidos en contacto con el bosque nativo.",
  path: "/servicios/banos-de-bosque",
});

export default function BanosDeBosquePage() {
  return <ServiceLayout servicio={serviciosContent["banos-de-bosque"]} />;
}
