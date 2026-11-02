import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";

export const metadata: Metadata = {
  title: "Talleres en Valdivia | Puepu Bienestar",
  description:
    "Talleres de plantas medicinales, autocuidado en la naturaleza y educación ambiental en Valdivia, con foco en la flora nativa del bosque valdiviano.",
};

export default function TalleresPage() {
  return <ServiceLayout servicio={serviciosContent["talleres"]} />;
}
