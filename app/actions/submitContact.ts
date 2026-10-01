"use server";

import { Resend } from "resend";
import { escapeHtml } from "@/lib/escapeHtml";
import { VALID_SERVICIOS, type ServicioTag } from "@/lib/constants";

export type ContactFormResult = {
  success: boolean;
  error?: string;
  errorType?: "validacion" | "turnstile" | "envio";
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
  telefono: 20,
  mensaje: 2000,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RESEND_TIMEOUT_MS = 5000;
const TURNSTILE_TIMEOUT_MS = 5000;

const ERROR_MESSAGES = {
  validacion: "Revisa los datos del formulario e intenta de nuevo.",
  turnstile: "No pudimos verificar tu envío. Intenta de nuevo.",
  envio: "No pudimos enviar tu mensaje. Escríbenos por WhatsApp.",
} as const;

function fail(errorType: "validacion" | "turnstile" | "envio"): ContactFormResult {
  return { success: false, errorType, error: ERROR_MESSAGES[errorType] };
}

function validate(formData: FormData): ContactFormData | null {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const correo = String(formData.get("correo") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();
  const servicioInput = String(formData.get("servicio") ?? "").trim();

  if (!nombre || !correo || !mensaje) return null;
  if (nombre.length > MAX_LENGTHS.nombre) return null;
  if (correo.length > MAX_LENGTHS.correo) return null;
  if (telefono.length > MAX_LENGTHS.telefono) return null;
  if (mensaje.length > MAX_LENGTHS.mensaje) return null;
  if (!EMAIL_REGEX.test(correo)) return null;

  const servicio = (VALID_SERVICIOS as readonly string[]).includes(servicioInput)
    ? (servicioInput as ServicioTag)
    : "Contacto General";

  return { nombre, correo, telefono, mensaje, servicio };
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
  const data = validate(formData);
  if (!data) {
    return fail("validacion");
  }

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
