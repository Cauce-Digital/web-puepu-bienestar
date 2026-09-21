"use client";

import { useRef, type FormEvent } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import type { ServicioTag } from "@/lib/constants";

type ContactFormProps = {
  servicio: ServicioTag;
};

const fieldStyles =
  "peer w-full border-b border-[var(--color-corteza)] bg-transparent px-1 pb-2 pt-5 font-sans text-[var(--color-musgo)] outline-none focus:border-b-2 focus:border-[var(--color-tierra)]";

const labelStyles =
  "pointer-events-none absolute left-1 top-5 font-sans text-[var(--color-corteza)] transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-tierra)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

export default function ContactForm({ servicio }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // TODO Paso 6: conectar Server Action submitContact + Turnstile.
    event.preventDefault();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
      <input type="hidden" name="servicio" value={servicio} />

      <div className="relative">
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder=" "
          className={fieldStyles}
        />
        <label htmlFor="nombre" className={labelStyles}>
          Nombre
        </label>
      </div>

      <div className="relative">
        <input
          id="correo"
          name="correo"
          type="email"
          required
          placeholder=" "
          className={fieldStyles}
        />
        <label htmlFor="correo" className={labelStyles}>
          Correo
        </label>
      </div>

      <div className="relative">
        <input
          id="telefono"
          name="telefono"
          type="tel"
          placeholder=" "
          className={fieldStyles}
        />
        <label htmlFor="telefono" className={labelStyles}>
          Teléfono (opcional)
        </label>
      </div>

      <div className="relative">
        <textarea
          id="mensaje"
          name="mensaje"
          required
          rows={4}
          placeholder=" "
          className={`${fieldStyles} resize-none`}
        />
        <label htmlFor="mensaje" className={labelStyles}>
          Mensaje
        </label>
      </div>

      <Button
        variant="primary"
        className="w-full sm:w-auto"
        onClick={() => formRef.current?.requestSubmit()}
      >
        Enviar
      </Button>

      <p className="text-sm text-[var(--color-corteza)]">
        Tus datos se usan solo para responderte y no se almacenan. Ver{" "}
        <Link
          href="/privacidad"
          className="underline hover:text-[var(--color-tierra)]"
        >
          Política de privacidad
        </Link>
        .
      </p>
    </form>
  );
}
