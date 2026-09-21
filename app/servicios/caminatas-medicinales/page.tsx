import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";

export const metadata: Metadata = {
  title: "Caminatas Medicinales en Valdivia | Puepu Bienestar",
  description:
    "Caminata guiada por el bosque valdiviano para reconocer plantas nativas y sus usos medicinales, con relato dinámico y actividades sensoriales.",
};

export default function CaminatasMedicinalesPage() {
  return <ServiceLayout servicio={serviciosContent["caminatas-medicinales"]} />;
}
