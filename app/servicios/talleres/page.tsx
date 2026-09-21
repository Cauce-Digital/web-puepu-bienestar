import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";

export const metadata: Metadata = {
  title: "Talleres en Valdivia | Puepu Bienestar",
  description:
    "Elaboración de productos con plantas medicinales y talleres de flora nativa para colegios, en la Selva Valdiviana.",
};

export default function TalleresPage() {
  return <ServiceLayout servicio={serviciosContent["talleres"]} />;
}
