// PROVISORIO — redactado desde documentos de Gloria, pendiente de su validación.
import type { HomeImage } from "@/lib/content/home";

export type SobreMiContent = {
  imagen: HomeImage;
  titulo: string;
  roles: string[];
  historia: string[];
  formacion: string[];
  acreditacion: string;
  enfoque: {
    titulo: string;
    parrafo: string;
  };
  contacto: {
    titulo: string;
    texto: string;
  };
};

export const sobreMiContent: SobreMiContent = {
  imagen: {
    src: "/images/galeria/fotos-bosque2.jpg",
    alt: "Bosque nativo visto a contraluz entre troncos musgosos, con destello del mar en el horizonte.",
  },
  titulo: "Sobre mí",
  roles: [
    "Terapeuta en Medicina Tradicional China",
    "Educadora Diferencial",
    "Educadora Ambiental",
  ],
  historia: [
    "En mi búsqueda personal de bienestar fui explorando, entre mis propios intereses y distintas propuestas alternativas de salud, hasta llegar a la milenaria Medicina Tradicional China y a la potencia del bosque nativo de la Selva Valdiviana.",
    "Hoy integro ambos caminos: la terapia individual desde la Medicina Tradicional China y las experiencias guiadas en el bosque, donde la naturaleza se vuelve parte del proceso de bienestar.",
  ],
  formacion: [
    "4 años de formación en la Escuela Latinoamericana de Medicina Tradicional China",
    "Pasantía en China",
    "Especialización en Nutrición Oriental",
    "Educadora Diferencial y Educadora Ambiental",
  ],
  acreditacion: "Terapeuta acreditada Minsal — Registro 642352",
  enfoque: {
    titulo: "Mi enfoque",
    parrafo:
      "Trabajo con un enfoque integral. Acojo a cada persona con afecto, empatía y el tiempo necesario para conocerla, orientarla y acompañarla en su propio proceso de búsqueda de bienestar, equilibrio y salud.",
  },
  contacto: {
    titulo: "Escríbeme",
    texto:
      "Cuéntame qué buscas y te responderé a la brevedad. Si prefieres, también puedes escribirme directamente por WhatsApp o Instagram.",
  },
};
