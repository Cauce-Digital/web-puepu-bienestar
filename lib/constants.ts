export const VALID_SERVICIOS = [
  "Medicina Tradicional China",
  "Baños de Bosque",
  "Caminatas Medicinales",
  "Talleres",
  "Contacto General",
] as const;

export type ServicioTag = (typeof VALID_SERVICIOS)[number];

export const INSTAGRAM_URL = "https://www.instagram.com/puepu_bienestar";
