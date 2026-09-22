"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const serviciosLinks = [
  { label: "Terapia MTCH", href: "/servicios/terapia-mtch" },
  { label: "Baños de Bosque", href: "/servicios/banos-de-bosque" },
  { label: "Caminatas Medicinales", href: "/servicios/caminatas-medicinales" },
  { label: "Talleres", href: "/servicios/talleres" },
];

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Sobre mí y Contacto", href: "/sobre-mi-y-contacto" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setHidden(false);
      } else if (currentScrollY > lastScrollYRef.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollYRef.current = currentScrollY;
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{ background: "var(--color-niebla)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logos/puepu-blanco.png"
              alt="Logo Puepu Bienestar"
              width={120}
              height={48}
              className="object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 font-medium md:flex">
            <Link href="/" className="text-[var(--color-musgo)] hover:text-[var(--color-corteza)] hover:underline hover:underline-offset-4">
              Inicio
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-[var(--color-musgo)] hover:text-[var(--color-corteza)] hover:underline hover:underline-offset-4"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
              >
                Servicios
                <ChevronDown size={16} />
              </button>

              {servicesOpen && (
                <div className="absolute left-0 top-full min-w-56 rounded-lg bg-[var(--color-niebla)] py-2 shadow-lg">
                  {serviciosLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-[var(--color-musgo)] hover:bg-[var(--color-cielo)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-musgo)] hover:text-[var(--color-corteza)] hover:underline hover:underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/sobre-mi-y-contacto#contacto"
              className="rounded-full bg-[var(--color-tierra-accion)] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[var(--color-tierra-accion-hover)]"
            >
              Contáctame
            </Link>
          </div>

          <button
            type="button"
            className="text-[var(--color-musgo)] md:hidden"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-[51] bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-[52] flex w-72 flex-col gap-6 bg-[var(--color-musgo)] p-6 pt-24 md:hidden">
            <button
              type="button"
              aria-label="Cerrar menú"
              className="self-end text-white"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} />
            </button>

            <nav className="flex flex-col gap-4 font-medium text-white">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                Inicio
              </Link>

              <div className="flex flex-col gap-2">
                <span className="text-white/70">Servicios</span>
                {serviciosLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="pl-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/sobre-mi-y-contacto#contacto"
              className="mt-auto rounded-full bg-[var(--color-tierra-accion)] px-6 py-2.5 text-center font-medium text-white"
              onClick={() => setMobileOpen(false)}
            >
              Contáctame
            </Link>
          </div>
        </>
      )}
    </>
  );
}
