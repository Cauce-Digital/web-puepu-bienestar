export type HomeImage = {
  src: string;
  alt: string;
};

export type HeroContent = {
  imagen: HomeImage;
  tagline: string;
  bajada: string;
};

export type QuienSoyContent = {
  imagen: HomeImage;
  texto: string;
};

export type ServicioResumen = {
  nombre: string;
  descripcion: string;
  imagen: HomeImage;
  href: string;
};

export type HomeContent = {
  hero: HeroContent;
  quienSoy: QuienSoyContent;
  servicios: ServicioResumen[];
  galeria: HomeImage[];
};

export const homeContent: HomeContent = {
  hero: {
    imagen: {
      src: "/images/hero/selva-hero.jpg",
      alt: "Tronco caído cubierto de musgo verde intenso en el interior de la Selva Valdiviana, con dosel otoñal y hojarasca roja en el suelo.",
    },
    tagline: "Pura energía pura",
    bajada:
      "Terapeuta en Medicina Tradicional China y guía del bosque valdiviano.",
  },
  quienSoy: {
    imagen: {
      src: "/images/galeria/fotos-arbol.jpg",
      alt: "Vista hacia arriba de un tronco cubierto de musgo con una rama de flores blancas acampanuladas creciendo sobre él y el dosel del bosque iluminado al fondo.",
    },
    texto:
      "Soy Gloria Jofré, terapeuta en Medicina Tradicional China y educadora ambiental. En mi búsqueda personal de bienestar llegué a la medicina china y a la potencia del bosque nativo de la Selva Valdiviana. Hoy acompaño a otras personas en ese mismo camino, con afecto, tiempo y respaldo profesional.",
  },
  servicios: [
    {
      nombre: "Terapia MTCH",
      descripcion:
        "Sesiones individuales con las técnicas de la Medicina Tradicional China, en un espacio acogedor y seguro.",
      imagen: {
        src: "/images/galeria/fotos-cardamo.jpg",
        alt: "Flor de cardo de mar con cabezuelas espinosas verde-blanquecinas frente al océano, bajo cielo despejado.",
      },
      href: "/servicios/terapia-mtch",
    },
    {
      nombre: "Baños de Bosque",
      descripcion:
        "Inmersión guiada en la Selva Valdiviana para armonizar cuerpo, mente y sentidos.",
      imagen: {
        src: "/images/galeria/fotos-bosque.jpg",
        alt: "Interior del bosque nativo con troncos altos cubiertos de musgo a contraluz y helechos en el sotobosque.",
      },
      href: "/servicios/banos-de-bosque",
    },
    {
      nombre: "Caminatas Medicinales",
      descripcion:
        "Recorridos por el bosque nativo para reconocer plantas y sus usos medicinales.",
      imagen: {
        src: "/images/galeria/fotos-caminata.jpg",
        alt: "Personas caminando por un sendero de tierra en el bosque; una de ellas va descalza llevando sus zapatillas en la mano.",
      },
      href: "/servicios/caminatas-medicinales",
    },
    {
      nombre: "Talleres",
      descripcion:
        "Elaboración de productos con plantas medicinales y educación ambiental para colegios.",
      imagen: {
        src: "/images/galeria/fotos-flores.jpg",
        alt: "Arbusto nativo con flores blancas acampanuladas colgantes junto a frutos y flores naranjas en racimo.",
      },
      href: "/servicios/talleres",
    },
  ],
  galeria: [
    {
      src: "/images/galeria/fotos-bosque2.jpg",
      alt: "Bosque nativo visto a contraluz entre troncos musgosos, con destello del mar en el horizonte.",
    },
    {
      src: "/images/galeria/fotos-cardamo2.jpg",
      alt: "Primer plano de varias flores de cardo de mar con el océano y la costa de fondo.",
    },
    {
      src: "/images/galeria/fotos-arbol.jpg",
      alt: "Vista hacia arriba de un tronco cubierto de musgo con una rama de flores blancas acampanuladas creciendo sobre él y el dosel del bosque iluminado al fondo.",
    },
    {
      src: "/images/galeria/fotos-flores.jpg",
      alt: "Arbusto nativo con flores blancas acampanuladas colgantes junto a frutos y flores naranjas en racimo.",
    },
    {
      src: "/images/galeria/fotos-bosque.jpg",
      alt: "Interior del bosque nativo con troncos altos cubiertos de musgo a contraluz y helechos en el sotobosque.",
    },
    {
      src: "/images/galeria/fotos-caminata.jpg",
      alt: "Personas caminando por un sendero de tierra en el bosque; una de ellas va descalza llevando sus zapatillas en la mano.",
    },
  ],
};
