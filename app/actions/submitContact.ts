"use server";

import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { VALID_SERVICIOS, type ServicioTag } from "@/lib/constants";
import { validarTelefono } from "@/lib/telefono";

export type CampoFormulario = "nombre" | "correo" | "telefono" | "mensaje";

export type FieldErrors = Partial<Record<CampoFormulario, string>>;

export type ContactFormResult = {
  success: boolean;
  error?: string;
  errorType?: "validacion" | "turnstile" | "envio";
  fieldErrors?: FieldErrors;
};

type ContactFormData = {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
  servicio: ServicioTag;
};

const MAX_LENGTHS = {
  nombre: 100,
  correo: 200,
  mensaje: 2000,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_TIMEOUT_MS = 5000;
const TURNSTILE_TIMEOUT_MS = 5000;

const ERROR_MESSAGES = {
  validacion: "Revisa los datos del formulario e intenta de nuevo.",
  turnstile: "No pudimos verificar tu envío. Intenta de nuevo.",
  envio: "No pudimos enviar tu mensaje.",
} as const;

const FIELD_MESSAGES: Record<Exclude<CampoFormulario, "telefono">, string> = {
  nombre: "Escribe tu nombre (máx. 100 caracteres).",
  correo: "Revisa el formato del correo.",
  mensaje: "Escribe tu mensaje (máx. 2000 caracteres).",
};

type ValidationResult =
  | { ok: true; data: ContactFormData }
  | { ok: false; fieldErrors: FieldErrors };

function fail(
  errorType: "validacion" | "turnstile" | "envio",
  fieldErrors?: FieldErrors,
): ContactFormResult {
  return { success: false, errorType, error: ERROR_MESSAGES[errorType], fieldErrors };
}

function validate(formData: FormData): ValidationResult {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const correo = String(formData.get("correo") ?? "").trim();
  const telefonoInput = String(formData.get("telefono") ?? "").trim();
  const telefonoPais = String(formData.get("telefonoPais") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const servicioInput = String(formData.get("servicio") ?? "").trim();

  const fieldErrors: FieldErrors = {};

  if (!nombre || nombre.length > MAX_LENGTHS.nombre) {
    fieldErrors.nombre = FIELD_MESSAGES.nombre;
  }
  if (!correo || correo.length > MAX_LENGTHS.correo || !EMAIL_REGEX.test(correo)) {
    fieldErrors.correo = FIELD_MESSAGES.correo;
  }
  if (!mensaje || mensaje.length > MAX_LENGTHS.mensaje) {
    fieldErrors.mensaje = FIELD_MESSAGES.mensaje;
  }

  // Opcional: solo se valida si viene con contenido.
  let telefono = "";
  if (telefonoInput) {
    const resultado = validarTelefono(telefonoPais, telefonoInput);
    if (resultado.ok) {
      telefono = resultado.formateado;
    } else {
      fieldErrors.telefono = resultado.error;
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  const servicio = (VALID_SERVICIOS as readonly string[]).includes(servicioInput)
    ? (servicioInput as ServicioTag)
    : "Contacto General";

  return { ok: true, data: { nombre, correo, telefono, mensaje, servicio } };
}

async function verifyTurnstile(token: string): Promise<boolean> {
  try {
    const body = new URLSearchParams({
      secret: process.env.TURNSTILE_SECRET_KEY ?? "",
      response: token,
    });

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS),
      },
    );

    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

function buildEmailContent(data: ContactFormData): { html: string; text: string } {
  const fecha = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date());

  const nombre = escapeHtml(data.nombre);
  const correo = escapeHtml(data.correo);
  const telefono = escapeHtml(data.telefono || "No proporcionado");
  const mensaje = escapeHtml(data.mensaje).replace(/\n/g, "<br />");
  const servicio = escapeHtml(data.servicio);

  const html = `
    <h2>Nuevo contacto desde Puepu Bienestar</h2>
    <p><strong>Servicio:</strong> ${servicio}</p>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${mensaje}</p>
    <p><small>Enviado el ${escapeHtml(fecha)} (hora de Chile)</small></p>
  `.trim();

  const text = [
    "Nuevo contacto desde Puepu Bienestar",
    `Servicio: ${data.servicio}`,
    `Nombre: ${data.nombre}`,
    `Correo: ${data.correo}`,
    `Teléfono: ${data.telefono || "No proporcionado"}`,
    "Mensaje:",
    data.mensaje,
    `Enviado el ${fecha} (hora de Chile)`,
  ].join("\n");

  return { html, text };
}

async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("submitContact: faltan variables de entorno de Resend");
    return false;
  }

  const resend = new Resend(apiKey);
  const { html, text } = buildEmailContent(data);

  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const timeout = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(
        () => reject(new Error("Resend timeout")),
        RESEND_TIMEOUT_MS,
      );
    });

    const { error } = await Promise.race([
      resend.emails.send({
        from,
        to,
        replyTo: data.correo,
        subject: `Nuevo contacto desde Puepu Bienestar — ${data.servicio}`,
        html,
        text,
      }),
      timeout,
    ]);

    if (error) {
      console.error("submitContact: Resend devolvió un error", error.name);
      return false;
    }

    return true;
  } catch (err) {
    const reason = err instanceof Error ? err.message : "desconocido";
    console.error("submitContact: fallo al enviar con Resend", reason);
    return false;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function submitContact(
  _prevState: ContactFormResult,
  formData: FormData,
): Promise<ContactFormResult> {
  const validation = validate(formData);
  if (!validation.ok) {
    return fail("validacion", validation.fieldErrors);
  }
  const { data } = validation;

  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
  if (!turnstileToken) {
    return fail("turnstile");
  }

  const turnstileOk = await verifyTurnstile(turnstileToken);
  if (!turnstileOk) {
    return fail("turnstile");
  }

  const sent = await sendContactEmail(data);
  if (!sent) {
    return fail("envio");
  }

  return { success: true };
}
