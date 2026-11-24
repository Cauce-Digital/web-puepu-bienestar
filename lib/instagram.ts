// Feed de Instagram (Instagram API con inicio de sesión de Instagram).
//
// Solo servidor: usa INSTAGRAM_ACCESS_TOKEN, que no lleva prefijo NEXT_PUBLIC_
// y por lo tanto nunca se incrusta en el código del cliente. Importar este
// archivo solo desde componentes de servidor.
//
// Contrato: getInstagramFeed() nunca lanza error. Ante cualquier problema
// (sin token, API caída, timeout, token vencido, respuesta inválida, cero
// publicaciones utilizables) devuelve null y el sitio muestra la galería
// estática.

import { INSTAGRAM_URL } from "@/lib/constants";
import type { HomeImage } from "@/lib/content/home";

export type InstagramPost = HomeImage & {
  href: string;
};

const API_URL = "https://graph.instagram.com/me/media";
const FIELDS = [
  "id",
  "caption",
  "alt_text",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "children{media_type,media_url,thumbnail_url,alt_text}",
].join(",");
const LIMIT = 12;
const MAX_POSTS = 6;
const TIMEOUT_MS = 5000;
const CAPTION_MAX_CHARS = 80;
const ALT_PREFIX = "Publicación de Instagram de Puepu Bienestar";

// Deben coincidir con images.remotePatterns de next.config.ts. Una URL fuera
// de estos dominios haría fallar a <Image>, así que se descarta antes.
const ALLOWED_IMAGE_HOSTS = [".cdninstagram.com", ".fbcdn.net"];

type RawChild = {
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  alt_text?: string;
};

type RawMedia = RawChild & {
  id?: string;
  caption?: string;
  permalink?: string;
  children?: RawChild[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(record: Record<string, unknown>, key: string): string | undefined {
  const value = record[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

function parseChild(value: unknown): RawChild | null {
  if (!isRecord(value)) return null;
  return {
    media_type: readString(value, "media_type"),
    media_url: readString(value, "media_url"),
    thumbnail_url: readString(value, "thumbnail_url"),
    alt_text: readString(value, "alt_text"),
  };
}

function parseMedia(value: unknown): RawMedia | null {
  const base = parseChild(value);
  if (!base || !isRecord(value)) return null;

  let children: RawChild[] | undefined;
  const rawChildren = value.children;
  if (isRecord(rawChildren) && Array.isArray(rawChildren.data)) {
    children = rawChildren.data
      .map(parseChild)
      .filter((child): child is RawChild => child !== null);
  }

  return {
    ...base,
    id: readString(value, "id"),
    caption: readString(value, "caption"),
    permalink: readString(value, "permalink"),
    children,
  };
}

function isAllowedImageUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const { protocol, hostname } = new URL(url);
    return (
      protocol === "https:" &&
      ALLOWED_IMAGE_HOSTS.some((suffix) => hostname.endsWith(suffix))
    );
  } catch {
    return false;
  }
}

function isInstagramPermalink(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && hostname === "www.instagram.com";
  } catch {
    return false;
  }
}

// Imagen a mostrar según el tipo: IMAGE → media_url; VIDEO → thumbnail_url
// (nunca el .mp4). En un carrusel se usa el primer elemento.
function pickImage(media: RawChild): string | undefined {
  if (media.media_type === "IMAGE") return media.media_url;
  if (media.media_type === "VIDEO") return media.thumbnail_url;
  return undefined;
}

function truncate(text: string, max: number): string {
  const singleLine = text.replace(/\s+/g, " ").trim();
  if (singleLine.length <= max) return singleLine;
  const cut = singleLine.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max / 2 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function buildAlt(media: RawMedia, cover: RawChild | undefined): string {
  const altText = cover?.alt_text ?? media.alt_text;
  if (altText) return altText;
  if (media.caption) {
    return `${ALT_PREFIX}: ${truncate(media.caption, CAPTION_MAX_CHARS)}`;
  }
  return ALT_PREFIX;
}

function toPost(media: RawMedia): InstagramPost | null {
  if (!media.id) return null;

  let src: string | undefined;
  let cover: RawChild | undefined;

  if (media.media_type === "CAROUSEL_ALBUM") {
    cover = media.children?.[0];
    src = cover ? pickImage(cover) : undefined;
  } else {
    src = pickImage(media);
  }

  if (!isAllowedImageUrl(src)) return null;

  return {
    src,
    alt: buildAlt(media, cover),
    href: isInstagramPermalink(media.permalink) ? media.permalink : INSTAGRAM_URL,
  };
}

// fetch() con AbortSignal no basta: durante la regeneración ISR, Next.js
// descarta el signal de la petición. Este temporizador garantiza el corte.
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`timeout de ${ms} ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

// El mensaje se enmascara por si algún error incluyera la URL con el token.
function describeError(error: unknown, token: string): string {
  const message = error instanceof Error ? error.message : "error desconocido";
  return message.split(token).join("[token]");
}

export async function getInstagramFeed(): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const url = new URL(API_URL);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(LIMIT));
  url.searchParams.set("access_token", token);

  try {
    const response = await withTimeout(
      fetch(url, {
        next: { revalidate: 43200, tags: ["instagram"] },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
      TIMEOUT_MS,
    );

    if (!response.ok) {
      // Solo el código HTTP: el cuerpo o la URL podrían incluir el token.
      console.error(`[instagram] La API respondió ${response.status}`);
      return null;
    }

    const json: unknown = await withTimeout(response.json(), TIMEOUT_MS);
    if (!isRecord(json) || !Array.isArray(json.data)) {
      console.error("[instagram] Respuesta con formato inesperado");
      return null;
    }

    const posts = json.data
      .map(parseMedia)
      .filter((media): media is RawMedia => media !== null)
      .map(toPost)
      .filter((post): post is InstagramPost => post !== null)
      .slice(0, MAX_POSTS);

    return posts.length > 0 ? posts : null;
  } catch (error) {
    console.error(`[instagram] No se pudo obtener el feed: ${describeError(error, token)}`);
    return null;
  }
}
