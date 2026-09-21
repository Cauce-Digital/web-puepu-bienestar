export const VALID_SERVICIOS = [
  "Terapia MTCH",
  "Baños de Bosque",
  "Caminatas Medicinales",
  "Talleres",
  "Contacto General",
] as const;

export type ServicioTag = (typeof VALID_SERVICIOS)[number];
