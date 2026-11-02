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
  type CampoFormulario,
  type ContactFormResult,
} from "@/app/actions/submitContact";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import Button from "@/components/ui/Button";
import { formatWhatsAppLink } from "@/lib/formatWhatsAppLink";
import type { ServicioTag } from "@/lib/constants";
import {
  PAISES_TELEFONO,
  PAIS_TELEFONO_DEFAULT,
  buscarPais,
  etiquetaPais,
  formatearInput,
  maxLengthInput,
  mensajeErrorTelefono,
  patronInput,
  type PaisIso,
} from "@/lib/telefono";

type ContactFormProps = {
  servicio: ServicioTag;
};

type FieldErrorProps = {
  id: string;
  mensaje?: string;
};

const fieldStyles =
  "peer w-full border-b border-[var(--color-corteza)] bg-transparent px-1 pb-2 pt-5 font-sans text-[var(--color-musgo)] outline-none focus:border-b-2 focus:border-[var(--color-tierra)] disabled:opacity-60 aria-[invalid=true]:border-red-700";

const labelStyles =
  "pointer-events-none absolute left-1 top-5 font-sans text-[var(--color-corteza)] transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[var(--color-tierra)] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

const selectStyles =
  "border-b border-[var(--color-corteza)] bg-transparent pb-2 pt-5 font-sans text-[var(--color-musgo)] outline-none focus:border-b-2 focus:border-[var(--color-tierra)] disabled:opacity-60";

const initialState: ContactFormResult = { success: false };

function errorId(campo: CampoFormulario): string {
  return `${campo}-error`;
}

function FieldError({ id, mensaje }: FieldErrorProps) {
  if (!mensaje) return null;
  return (
    <p id={id} className="mt-1 font-sans text-xs text-red-700">
      {mensaje}
    </p>
  );
}

export default function ContactForm({ servicio }: ContactFormProps) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [handledState, setHandledState] = useState(initialState);
  const [paisIso, setPaisIso] = useState<PaisIso>(PAIS_TELEFONO_DEFAULT);
  const [telefono, setTelefono] = useState("");

  const pais = buscarPais(paisIso) ?? PAISES_TELEFONO[0];
  const fieldErrors = state.success ? undefined : state.fieldErrors;

  if (state !== handledState) {
    setHandledState(state);
    // Un error de validación ocurre antes de verificar el token, así que
    // sigue siendo válido y no hace falta repetir el desafío.
    if (
      state !== initialState &&
      !state.success &&
      state.errorType !== "validacion"
    ) {
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

  function fieldA11y(campo: CampoFormulario) {
    const tieneError = Boolean(fieldErrors?.[campo]);
    return {
      "aria-invalid": tieneError,
      "aria-describedby": tieneError ? errorId(campo) : undefined,
    };
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="servicio" value={servicio} />
      <input
        type="hidden"
        name="cf-turnstile-response"
        value={turnstileToken ?? ""}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="relative">
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            maxLength={100}
            placeholder=" "
            disabled={isPending}
            className={fieldStyles}
            {...fieldA11y("nombre")}
          />
          <label htmlFor="nombre" className={labelStyles}>
            Nombre
          </label>
          <FieldError id={errorId("nombre")} mensaje={fieldErrors?.nombre} />
        </div>

        <div className="relative">
          <input
            id="correo"
            name="correo"
            type="email"
            required
            maxLength={200}
            placeholder=" "
            disabled={isPending}
            className={fieldStyles}
            {...fieldA11y("correo")}
          />
          <label htmlFor="correo" className={labelStyles}>
            Correo
          </label>
          <FieldError id={errorId("correo")} mensaje={fieldErrors?.correo} />
        </div>
      </div>

      {/* En móvil el selector va sobre el input para que la etiqueta tenga
          todo el ancho; desde md vuelven a la misma fila. */}
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-3">
        <select
          name="telefonoPais"
          aria-label="Código de país"
          value={paisIso}
          onChange={(event) => {
            setPaisIso(event.target.value as PaisIso);
            setTelefono("");
          }}
          disabled={isPending}
          className={selectStyles}
        >
          {PAISES_TELEFONO.map((opcion) => (
            <option key={opcion.iso} value={opcion.iso}>
              {etiquetaPais(opcion)}
            </option>
          ))}
        </select>

        <div className="relative flex-1">
          <input
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={maxLengthInput(pais)}
            pattern={patronInput(pais)}
            title={mensajeErrorTelefono(pais.iso)}
            placeholder=" "
            value={telefono}
            onChange={(event) =>
              setTelefono(formatearInput(pais, event.target.value))
            }
            disabled={isPending}
            className={fieldStyles}
            {...fieldA11y("telefono")}
          />
          <label htmlFor="telefono" className={labelStyles}>
            Teléfono (opcional)
          </label>
          <FieldError
            id={errorId("telefono")}
            mensaje={fieldErrors?.telefono}
          />
        </div>
      </div>

      <div className="relative">
        <textarea
          id="mensaje"
          name="mensaje"
          required
          maxLength={2000}
          rows={3}
          placeholder=" "
          disabled={isPending}
          className={`${fieldStyles} resize-none`}
          {...fieldA11y("mensaje")}
        />
        <label htmlFor="mensaje" className={labelStyles}>
          Mensaje
        </label>
        <FieldError id={errorId("mensaje")} mensaje={fieldErrors?.mensaje} />
      </div>

      {/* Turnstile, aviso y botón en un solo bloque: si el widget no ocupa
          alto (modo Invisible) o no hay mensaje, no se suma separación. */}
      <div className="flex flex-col">
        <TurnstileWidget
          resetKey={turnstileResetKey}
          onVerify={setTurnstileToken}
          onExpire={() => setTurnstileToken(null)}
          className="data-[visible=true]:mb-5"
        />

        <div aria-live="polite" className="font-sans text-sm">
          {!state.success &&
            (state.errorType === "validacion" ||
              state.errorType === "turnstile") && (
              <p className="mb-3 text-red-700">{state.error}</p>
            )}
          {!state.success && state.errorType === "envio" && (
            <p className="mb-3 text-red-700">
              {state.error}{" "}
              <a
                href={formatWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Escríbeme por WhatsApp
              </a>
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!turnstileToken || isPending}
          className="w-full gap-2 sm:w-auto"
        >
          {isPending && (
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white motion-reduce:animate-none"
            />
          )}
          {isPending ? "Enviando" : "Enviar"}
        </Button>
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
