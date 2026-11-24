import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    // 31 días. Mitiga imágenes de Instagram rotas cuando la URL firmada de
    // Meta vence y el inicio (ISR) no se ha regenerado por poco tráfico.
    // Consecuencia: toda imagen nueva o reemplazada en public/ debe tener un
    // nombre de archivo nuevo (ver AGENTS.md §4).
    minimumCacheTTL: 2678400,
    // Imágenes del feed de Instagram (CDN de Meta). Mantener en sincronía con
    // ALLOWED_IMAGE_HOSTS de lib/instagram.ts.
    remotePatterns: [
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
