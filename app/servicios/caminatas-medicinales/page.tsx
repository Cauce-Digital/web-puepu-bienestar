import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Caminatas Medicinales en Valdivia",
  description:
    "Caminata guiada por el bosque valdiviano para reconocer plantas nativas y sus usos medicinales, con relato dinámico y actividades sensoriales.",
  path: "/servicios/caminatas-medicinales",
});

export default function CaminatasMedicinalesPage() {
  return <ServiceLayout servicio={serviciosContent["caminatas-medicinales"]} />;
}
