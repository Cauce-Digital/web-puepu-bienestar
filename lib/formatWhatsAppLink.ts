export function formatWhatsAppLink(mensaje?: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!numero) {
    throw new Error("Falta NEXT_PUBLIC_WHATSAPP_NUMBER");
  }

  const digitos = numero.replace(/\D/g, "");
  const base = `https://wa.me/${digitos}`;

  if (!mensaje) {
    return base;
  }

  return `${base}?text=${encodeURIComponent(mensaje)}`;
}
