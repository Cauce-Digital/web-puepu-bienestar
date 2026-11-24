import PhotoGallery, {
  type PhotoGalleryImage,
} from "@/components/sections/PhotoGallery";
import { INSTAGRAM_URL } from "@/lib/constants";
import { homeContent } from "@/lib/content/home";
import { getInstagramFeed } from "@/lib/instagram";

const TOTAL_IMAGENES = 6;

// Componente de servidor. Muestra las últimas publicaciones de Instagram y,
// si faltan o la API no responde, completa o reemplaza con la galería estática.
export default async function InstagramFeed() {
  const posts = await getInstagramFeed();
  const estaticas = homeContent.galeria;

  const imagenes: PhotoGalleryImage[] = posts
    ? [...posts, ...estaticas.slice(0, Math.max(0, TOTAL_IMAGENES - posts.length))]
    : estaticas;

  return (
    <PhotoGallery
      titulo="Sígueme en Instagram"
      texto="Comparto el bosque, las plantas y mis actividades en @puepu_bienestar."
      imagenes={imagenes}
      enlace={{
        href: INSTAGRAM_URL,
        ariaLabel: "Ver en Instagram (se abre en una pestaña nueva)",
        ctaLabel: "Ver en Instagram",
      }}
    />
  );
}
