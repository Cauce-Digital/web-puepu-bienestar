import type { MetadataRoute } from "next";
import { serviciosContent } from "@/lib/content/servicios";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const landings = Object.values(serviciosContent).map(
    (servicio) => `/servicios/${servicio.slug}`,
  );

  const paths = [
    "/",
    "/servicios",
    ...landings,
    "/productos",
    "/sobre-mi-y-contacto",
    "/privacidad",
  ];

  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
