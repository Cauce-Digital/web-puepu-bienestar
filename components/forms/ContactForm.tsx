"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  submitContact,
  type ContactFormResult,
} from "@/app/actions/submitContact";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import { formatWhatsAppLink } from "@/lib/formatWhatsAppLink";
import type { ServicioTag } from "@/lib/constants";

type ContactFormProps = {
  servicio: ServicioTag;
};

const fieldStyles =
  "peer w-full border-b border-[var(--color-corteza)] bg-transparent px-1 pb-2 pt-5 font-sans text-[var(--color-musgo)] outline-none focus:border-b-2 focus:border-[var(--color-tierra)] disabled:opacity-60";

const labelStyles =
  "pointer-events-none absolute left-1 top-5 font-sans text-[var(--color-corteza)] transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-tierra)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

const initialState: ContactFormResult = { success: false };

export default function ContactForm({ servicio }: ContactFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [handledState, setHandledState] = useState(initialState);

  if (state !== handledState) {
    setHandledState(state);
    if (state !== initialState && !state.success) {
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
    }
  }

  useEffect(() => {
    if (state === initialState || !state.success) return;
    try {
      sessionStorage.setItem("puepu-form-enviado", "1");
    } catch {
      // sessionStorage puede no estar disponible; no bloquea la redirección.
    }
    router.push("/gracias");
  }, [state, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <input type="hidden" name="servicio" value={servicio} />
      <input
        type="hidden"
        name="cf-turnstile-response"
        value={turnstileToken ?? ""}
      />

      <div className="relative">
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          placeholder=" "
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
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
          disabled={isPending}
          className={`${fieldStyles} resize-none`}
        />
        <label htmlFor="mensaje" className={labelStyles}>
          Mensaje
        </label>
      </div>

      <TurnstileWidget
        resetKey={turnstileResetKey}
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken(null)}
      />

      <button
        type="submit"
        disabled={!turnstileToken || isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-tierra-accion)] px-7 py-3.5 font-medium text-white transition-colors hover:bg-[var(--color-tierra-accion-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending && (
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
          />
        )}
        {isPending ? "Enviando" : "Enviar"}
      </button>

      <div aria-live="polite" className="font-sans text-sm">
        {!state.success && state.errorType === "validacion" && (
          <p className="text-red-700">{state.error}</p>
        )}
        {!state.success && state.errorType === "turnstile" && (
          <p className="text-red-700">{state.error}</p>
        )}
        {!state.success && state.errorType === "envio" && (
          <p className="text-red-700">
            {state.error}{" "}
            <a
              href={formatWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Escríbenos por WhatsApp
            </a>
          </p>
        )}
      </div>

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
