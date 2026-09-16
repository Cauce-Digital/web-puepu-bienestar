import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

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

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios/terapia-mtch" },
  { label: "Productos", href: "/productos" },
  { label: "Sobre mí y Contacto", href: "/sobre-mi-y-contacto" },
  { label: "Privacidad", href: "/privacidad" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-musgo)] text-[var(--color-niebla)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12">
        <div className="flex flex-col gap-3">
          <Image
            src="/images/logos/puepu-blanco.png"
            alt="Logo Puepu Bienestar"
            width={100}
            height={40}
            style={{ filter: "invert(1) brightness(2)" }}
          />
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 sm:w-fit">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--color-niebla)] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/puepu_bienestar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Puepu Bienestar"
            className="text-[var(--color-niebla)] hover:text-white"
          >
            <InstagramIcon size={24} />
          </a>
          <a
            href="https://wa.me/56952541245"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp de Puepu Bienestar"
            className="text-[var(--color-niebla)] hover:text-white"
          >
            <MessageCircle size={24} />
          </a>
        </div>

        <a
          href="https://www.caucedigital.cl"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-normal text-[var(--color-niebla)] hover:text-white"
        >
          Desarrollado por Cauce Digital
        </a>

        <p className="text-sm text-[var(--color-niebla)]/80">
          Este sitio usa Cloudflare Turnstile para protección anti-spam. Los datos del
          formulario no se almacenan. Ver{" "}
          <Link href="/privacidad" className="underline hover:text-white">
            Política de privacidad
          </Link>
          .
        </p>

        <p className="text-sm text-[var(--color-niebla)]/80">
          © 2026 Gloria Jofré Cabello — Puepu Bienestar
        </p>
      </div>
    </footer>
  );
}
