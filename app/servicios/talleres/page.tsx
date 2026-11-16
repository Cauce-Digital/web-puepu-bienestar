import type { Metadata } from "next";
import ServiceLayout from "@/components/sections/ServiceLayout";
import { serviciosContent } from "@/lib/content/servicios";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Talleres de plantas medicinales en Valdivia",
  description:
    "Talleres de plantas medicinales, autocuidado en la naturaleza y educación ambiental en Valdivia, con foco en la flora nativa del bosque valdiviano.",
  path: "/servicios/talleres",
});

export default function TalleresPage() {
  return <ServiceLayout servicio={serviciosContent["talleres"]} />;
}
