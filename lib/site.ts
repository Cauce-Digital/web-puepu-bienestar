// Solo servidor: VERCEL_* no existe en el navegador.
function withoutTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return withoutTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (
    process.env.VERCEL_ENV === "production" &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const IS_PRODUCTION = process.env.VERCEL_ENV === "production";
