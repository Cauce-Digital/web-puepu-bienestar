import type { Metadata } from "next";
import Link from "next/link";
import { formatWhatsAppLink } from "@/lib/formatWhatsAppLink";

export const metadata: Metadata = {
  title: "Política de privacidad | Puepu Bienestar",
  description:
    "Cómo Puepu Bienestar trata los datos que ingresas en el formulario de contacto.",
};

const h2Styles =
  "font-sans text-xl font-semibold text-[var(--color-musgo)] md:text-2xl";

const parrafoStyles =
  "max-w-[70ch] font-sans text-base text-[var(--color-musgo)] md:text-lg";

const linkStyles = "underline hover:text-[var(--color-tierra)]";

const proveedores = [
  { nombre: "Vercel", uso: "alojamiento del sitio." },
  {
    nombre: "Cloudflare",
    uso: "seguridad del sitio y verificación anti-spam (Turnstile).",
  },
  { nombre: "Resend", uso: "envío del correo con tu mensaje." },
  { nombre: "Google (Gmail)", uso: "bandeja donde se recibe tu mensaje." },
];

function EnlacesContacto() {
  return (
    <>
      <Link href="/sobre-mi-y-contacto#contacto" className={linkStyles}>
        formulario de contacto
      </Link>{" "}
      o por{" "}
      <a
        href={formatWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className={linkStyles}
      >
        WhatsApp
      </a>
    </>
  );
}

export default function Privacidad() {
  return (
    <article className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16 md:py-24">
      <header className="flex flex-col gap-4">
        <h1 className="font-display text-4xl text-[var(--color-musgo)] md:text-6xl">
          Política de privacidad
        </h1>
        {/* TODO: fecha real al publicar — Paso 8 */}
        <p className="font-sans text-sm text-[var(--color-corteza)]">
          Última actualización: noviembre de 2026
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>Quién es responsable de tus datos</h2>
        <p className={parrafoStyles}>
          Gloria Jofré Cabello, titular de Puepu Bienestar (Valdivia, Chile), es
          responsable del tratamiento de los datos que ingresas en este sitio.
          Puedes contactarla a través del <EnlacesContacto />.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>Qué datos recopilamos y para qué</h2>
        <p className={parrafoStyles}>
          El formulario de contacto solicita tu nombre, correo electrónico,
          teléfono (opcional) y mensaje. Estos datos se usan únicamente para
          responder tu consulta. No se usan para publicidad ni se comparten con
          terceros con fines comerciales.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>Cómo se procesan</h2>
        <p className={parrafoStyles}>
          Este sitio no tiene base de datos: tus datos no se almacenan en sus
          servidores. Al enviar el formulario, se transmiten de forma cifrada
          (HTTPS) y se entregan como un correo electrónico a la bandeja de
          Gloria. Para funcionar, el sitio utiliza los siguientes proveedores,
          que pueden procesar datos fuera de Chile:
        </p>
        <ul className="flex max-w-[70ch] flex-col gap-2 font-sans text-base text-[var(--color-musgo)] md:text-lg">
          {proveedores.map((proveedor) => (
            <li key={proveedor.nombre} className="flex gap-2">
              <span aria-hidden="true" className="text-[var(--color-corteza)]">
                •
              </span>
              <span>
                <span className="font-medium">{proveedor.nombre}:</span>{" "}
                {proveedor.uso}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>
          Verificación anti-spam (Cloudflare Turnstile)
        </h2>
        <p className={parrafoStyles}>
          Para evitar envíos automáticos, el formulario usa Cloudflare
          Turnstile, que verifica en segundo plano que quien envía es una
          persona. Para ello, Cloudflare puede procesar datos técnicos de tu
          navegador y conexión, como tu dirección IP. Más información en el{" "}
          <a
            href="https://www.cloudflare.com/turnstile-privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
          >
            Turnstile Privacy Addendum
          </a>{" "}
          de Cloudflare.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>Cookies y analítica</h2>
        <p className={parrafoStyles}>
          Este sitio no usa cookies de seguimiento ni herramientas de analítica.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>Cuánto tiempo se conservan</h2>
        <p className={parrafoStyles}>
          El sitio no conserva tus datos. El correo con tu consulta permanece en
          la bandeja de Gloria el tiempo necesario para atenderla. Puedes pedir
          que se elimine en cualquier momento.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={h2Styles}>Tus derechos</h2>
        <p className={parrafoStyles}>
          De acuerdo con la legislación chilena de protección de datos
          personales, puedes solicitar el acceso, rectificación, supresión,
          oposición, portabilidad o bloqueo de tus datos. Para ejercerlos,
          escribe a través del <EnlacesContacto />.
        </p>
      </section>
    </article>
  );
}
