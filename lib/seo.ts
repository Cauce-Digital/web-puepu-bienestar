import type { Metadata } from "next";

export const SITE_NAME = "Puepu Bienestar";

// Un openGraph de página reemplaza entero al del layout, así que cada página
// debe repetir estos valores.
export const OG_DEFAULTS = {
  siteName: SITE_NAME,
  locale: "es_CL",
  type: "website",
  images: [
    {
      url: "/puepu-opengraph.jpg",
      width: 1200,
      height: 630,
      alt: "Puepu Bienestar: Medicina Tradicional China y bosque valdiviano en Valdivia",
    },
  ],
} satisfies NonNullable<Metadata["openGraph"]>;

type BuildMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
}: BuildMetadataInput): Metadata {
  // La plantilla "%s | Puepu Bienestar" del layout no aplica al og:title.
  const ogTitle =
    typeof title === "string" ? `${title} | ${SITE_NAME}` : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...OG_DEFAULTS,
      title: ogTitle,
      description,
      url: path,
    },
  };
}
