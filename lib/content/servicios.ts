// PROVISORIO — redactado desde documentos de Gloria, pendiente de su validación.
import { homeContent, type HomeImage } from "@/lib/content/home";
import type { ServicioTag } from "@/lib/constants";

export type ServicioLanding = {
  slug: string;
  nombre: string;
  tag: ServicioTag;
  descripcionCorta: string;
  imagen: HomeImage;
  queEs: string[];
  paraQuien: string[];
  comoFunciona: string[];
};

export type ServicioSlug =
  | "terapia-mtch"
  | "banos-de-bosque"
  | "caminatas-medicinales"
  | "talleres";

function getImagenServicio(href: string): HomeImage {
  const servicio = homeContent.servicios.find((s) => s.href === href);
  if (!servicio) {
    throw new Error(`Imagen de servicio no encontrada para ${href}`);
  }
  return servicio.imagen;
}

export const serviciosContent: Record<ServicioSlug, ServicioLanding> = {
  "terapia-mtch": {
    slug: "terapia-mtch",
    nombre: "Terapia MTCH",
    tag: "Terapia MTCH",
    descripcionCorta:
      "Sesiones individuales con las técnicas de la Medicina Tradicional China, en un espacio acogedor y seguro.",
    imagen: getImagenServicio("/servicios/terapia-mtch"),
    queEs: [
      "Sesiones individuales bajo la línea de la Medicina Tradicional China, integrando sus diversas técnicas en un espacio acogedor, seguro y con respaldo profesional. Un enfoque integral, con afecto, empatía y el tiempo necesario para conocer, orientar y acompañar a cada paciente en su búsqueda de bienestar, equilibrio y salud.",
      "Formación: 4 años en la Escuela Latinoamericana de Medicina Tradicional China, pasantía en China y especialización en Nutrición Oriental.",
    ],
    paraQuien: [
      "Personas que buscan acompañamiento en sus procesos de bienestar, equilibrio y salud con un enfoque integral.",
    ],
    comoFunciona: [
      "Sesiones individuales",
      "Terapeuta acreditada Minsal — Registro 642352",
      "Duración y valores: consulta directamente",
    ],
  },
  "banos-de-bosque": {
    slug: "banos-de-bosque",
    nombre: "Baños de Bosque",
    tag: "Baños de Bosque",
    descripcionCorta:
      "Inmersión guiada en la Selva Valdiviana, basada en el Shinrin Yoku, para armonizar cuerpo, mente y sentidos en contacto con el bosque nativo.",
    imagen: getImagenServicio("/servicios/banos-de-bosque"),
    queEs: [
      "Basado en la técnica japonesa Shinrin Yoku, es una inmersión guiada en la Selva Valdiviana orientada por los principios de la Medicina Tradicional China. Promueve la contemplación de la naturaleza y una vinculación con sus ciclos, buscando armonía y bienestar físico, emocional y mental.",
      "Los bosques de la selva templada lluviosa de Valdivia son únicos en el mundo.",
    ],
    paraQuien: [
      "Personas con autonomía física, desde los 14 años. No requiere destrezas físicas, solo tiempo.",
    ],
    comoFunciona: [
      "Actividad grupal de 4 a 20 participantes",
      "Duración mínima: 2 horas",
      "Disponible también como actividad corporativa para equipos de trabajo",
    ],
  },
  "caminatas-medicinales": {
    slug: "caminatas-medicinales",
    nombre: "Caminatas Medicinales",
    tag: "Caminatas Medicinales",
    descripcionCorta:
      "Caminata guiada por el bosque valdiviano para reconocer plantas nativas y sus usos medicinales, con relato dinámico y actividades sensoriales.",
    imagen: getImagenServicio("/servicios/caminatas-medicinales"),
    queEs: [
      "Caminata guiada por el bosque valdiviano para reconocer árboles, arbustos, hierbas, trepadoras y rastreras de la flora nativa y sus usos medicinales, tanto populares como con enfoque fitoterapéutico. Mediante relato dinámico, juegos sensoriales y actividades grupales, cada participante se involucra con cada especie.",
    ],
    paraQuien: ["Personas con autonomía física, desde los 14 años."],
    comoFunciona: [
      "Actividad grupal de 4 a 20 participantes",
      "Recorrido guiado por bosque nativo",
      "Disponible también como actividad corporativa para equipos de trabajo",
    ],
  },
  talleres: {
    slug: "talleres",
    nombre: "Talleres",
    tag: "Talleres",
    descripcionCorta:
      "Elaboración de productos con plantas medicinales y talleres de flora nativa para colegios, en la Selva Valdiviana.",
    imagen: getImagenServicio("/servicios/talleres"),
    queEs: [
      "Dos líneas de trabajo: elaboración de productos con base en plantas medicinales para la salud y el autocuidado, y reconocimiento de flora nativa de la Selva Valdiviana y sus usos medicinales, para colegios.",
    ],
    paraQuien: [
      "Adultos interesados en plantas medicinales y autocuidado.",
      "Colegios, desde preescolar a enseñanza media, con enfoque de educación ambiental o contenidos curriculares.",
    ],
    comoFunciona: [
      "Talleres para adultos: elaboración de productos con plantas medicinales",
      "Talleres para colegios: flora nativa y educación ambiental",
      "Fechas y modalidad: consulta directamente",
    ],
  },
};
