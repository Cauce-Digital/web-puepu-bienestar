import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { homeContent } from "@/lib/content/home";

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Productos", href: "/productos" },
  { label: "Sobre mí y Contacto", href: "/sobre-mi-y-contacto" },
  { label: "Privacidad", href: "/privacidad" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-musgo)] text-[var(--color-niebla)]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Image
              src="/images/logos/puepu-blanco.png"
              alt="Logo Puepu Bienestar"
              width={100}
              height={40}
              style={{ filter: "invert(1) brightness(2)" }}
            />
            <p className="font-sans text-sm text-[var(--color-niebla)]/80">
              {homeContent.hero.tagline}
            </p>
          </div>

          <nav aria-label="Navegación del sitio" className="flex flex-col gap-3">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-[var(--color-niebla)]/80">
              Navegación
            </h3>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-niebla)] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-[var(--color-niebla)]/80">
              Sígueme
            </h3>
            <a
              href="https://www.instagram.com/puepu_bienestar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-niebla)] hover:text-white"
            >
              <InstagramIcon size={24} />
              @puepu_bienestar
            </a>
            <a
              href="https://wa.me/56952541245"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[var(--color-niebla)] hover:text-white"
            >
              <MessageCircle size={24} />
              WhatsApp
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-[var(--color-niebla)]/80">
          Este sitio usa Cloudflare Turnstile para protección anti-spam. Los datos del
          formulario no se almacenan. Ver{" "}
          <Link href="/privacidad" className="underline hover:text-white">
            Política de privacidad
          </Link>
          .
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/15 pt-6 text-center text-sm text-[var(--color-niebla)]/80 md:flex-row md:items-center md:justify-between md:text-left">
          <p>© 2026 Gloria Jofré Cabello — Puepu Bienestar</p>
          <a
            href="https://www.caucedigital.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Desarrollado por Cauce Digital
          </a>
        </div>
      </div>
    </footer>
  );
}
