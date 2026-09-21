import Image from "next/image";
import Button from "@/components/ui/Button";
import { homeContent } from "@/lib/content/home";

export default function Hero() {
  const { hero } = homeContent;

  return (
    <section className="relative flex min-h-[calc(100dvh-72px)] items-center justify-center overflow-hidden md:justify-start">
      <Image
        src={hero.imagen.src}
        alt={hero.imagen.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay: rgba(44,74,40,0.3) === --color-musgo al 30% */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(44,74,40,0.3)" }}
        aria-hidden="true"
      />

      {/* Panel glassmorphism: rgba(44,74,40,0.55) === --color-musgo al 55% */}
      <div
        className="animate-panel-in relative mx-6 flex max-w-lg flex-col items-center gap-6 rounded-2xl border border-white/15 p-8 text-center backdrop-blur-md md:ml-16 md:mr-auto md:items-start md:p-12 md:text-left"
        style={{ background: "rgba(44,74,40,0.55)" }}
      >
        <Image
          src="/images/logos/puepu-blanco.png"
          alt="Logo Puepu Bienestar"
          width={160}
          height={64}
          style={{ filter: "invert(1) brightness(2)" }}
        />

        <h1 className="font-display text-[48px] leading-none text-white md:text-[80px]">
          {hero.tagline}
        </h1>

        <p className="font-sans text-lg text-white/90">{hero.bajada}</p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/servicios" variant="primary">
            Ver servicios
          </Button>
          <Button
            href="/sobre-mi-y-contacto#contacto"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            Contáctame
          </Button>
        </div>
      </div>
    </section>
  );
}
