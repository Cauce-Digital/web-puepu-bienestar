export const VALID_SERVICIOS = [
  "Medicina Tradicional China",
  "Baños de Bosque",
  "Caminatas Medicinales",
  "Talleres",
  "Contacto General",
] as const;

export type ServicioTag = (typeof VALID_SERVICIOS)[number];
