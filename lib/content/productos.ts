// PROVISORIO — descripciones genéricas, pendientes de validación de Gloria.
import type { HomeImage } from "@/lib/content/home";

export type Producto = {
  slug: string;
  nombre: string;
  descripcion: string;
  imagen?: HomeImage;
};

export type ProductosIntro = {
  titulo: string;
  parrafos: string[];
  imagen: HomeImage;
};

export type ProductosContent = {
  intro: ProductosIntro;
  lineaCompleta: HomeImage;
  productos: Producto[];
};

export const productosContent: ProductosContent = {
  intro: {
    titulo: "Ungüentos Puepu",
    parrafos: [
      "Cada ungüento Puepu nace de la experiencia de Gloria como terapeuta en Medicina Tradicional China y de su práctica cotidiana con plantas medicinales. Las plantas son recolectadas y procesadas directamente por ella, desde su origen hasta el frasco.",
      "Fueron pensados como un botiquín familiar, para tener siempre a mano, aunque también puedes adquirirlos por separado.",
    ],
    imagen: {
      src: "/images/productos/productos-senital.jpg",
      alt: "Vista cenital de 4 potes de vidrio abiertos con ungüento amarillo-verdoso y una botella de vidrio ámbar con tapa negra, sobre un paño oscuro con una tela a rayas en el borde.",
    },
  },
  lineaCompleta: {
    src: "/images/productos/productos-varios.jpg",
    alt: "Los 5 ungüentos Puepu en potes de vidrio con tapa blanca, etiquetados como Dolores articulares, Descontracturante, Picaduras, Tendinitis-golpes y Hongos, sobre un fondo de arpillera.",
  },
  // PROVISORIO: actualizar alt al reemplazar la foto definitiva.
  productos: [
    {
      slug: "dolores-articulares",
      nombre: "Dolores Articulares",
      descripcion:
        "Elaborado con plantas medicinales de uso tradicional, pensado para acompañar el cuidado de las articulaciones y aportar alivio en momentos de molestia.",
      imagen: {
        src: "/images/productos/productos-articulares.jpg",
        alt: "Ungüento Puepu Dolores Articulares",
      },
    },
    {
      slug: "descontracturante",
      nombre: "Descontracturante",
      descripcion:
        "Pensado para aplicar con masaje suave sobre zonas de tensión muscular, acompañando la relajación después de la actividad física o de jornadas exigentes.",
      imagen: {
        src: "/images/productos/productos-descontracturante.jpg",
        alt: "Ungüento Puepu Descontracturante",
      },
    },
    {
      slug: "tendinitis-golpes",
      nombre: "Tendinitis-golpes",
      descripcion:
        "Un aliado para el botiquín ante golpes y sobrecargas. Combina plantas de uso tradicional para acompañar la recuperación de la zona afectada.",
      imagen: {
        src: "/images/productos/productos-tendinitis.jpg",
        alt: "Ungüento Puepu Tendinitis-golpes",
      },
    },
    {
      slug: "picaduras",
      nombre: "Picaduras",
      descripcion:
        "Pensado para aplicar sobre la piel después de picaduras de insectos, con plantas de uso tradicional que ayudan a calmar la zona.",
      imagen: {
        src: "/images/productos/productos-picaduras.jpg",
        alt: "Ungüento Puepu Picaduras",
      },
    },
    {
      slug: "hongos",
      nombre: "Hongos",
      descripcion:
        "Elaborado con plantas medicinales de uso tradicional para acompañar el cuidado de la piel en zonas propensas a hongos.",
      imagen: {
        src: "/images/productos/productos-hongos.jpg",
        alt: "Ungüento Puepu Hongos",
      },
    },
  ],
};
