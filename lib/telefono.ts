export const PAISES_TELEFONO = [
  { iso: "CL", nombre: "Chile", codigo: "+56", min: 9, max: 9 },
  { iso: "AR", nombre: "Argentina", codigo: "+54", min: 10, max: 11 },
  { iso: "PE", nombre: "Perú", codigo: "+51", min: 9, max: 9 },
  { iso: "BR", nombre: "Brasil", codigo: "+55", min: 10, max: 11 },
  { iso: "CO", nombre: "Colombia", codigo: "+57", min: 10, max: 10 },
  { iso: "MX", nombre: "México", codigo: "+52", min: 10, max: 10 },
  { iso: "ES", nombre: "España", codigo: "+34", min: 9, max: 9 },
  { iso: "US", nombre: "EE. UU./Canadá", codigo: "+1", min: 10, max: 10 },
  // Sin código fijo: el visitante escribe el número con su código de país.
  { iso: "OTRO", nombre: "Otro país", codigo: "", min: 8, max: 15 },
] as const;

export type PaisTelefono = (typeof PAISES_TELEFONO)[number];
export type PaisIso = PaisTelefono["iso"];

export const PAIS_TELEFONO_DEFAULT: PaisIso = "CL";

// Largo de "9 2222 2222": 9 dígitos + 2 espacios.
const MAX_LENGTH_CHILE = 11;

export function buscarPais(iso: string): PaisTelefono | undefined {
  return PAISES_TELEFONO.find((pais) => pais.iso === iso);
}

export function soloDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

// "922222222" → "9 2222 2222"
export function formatearChile(digitos: string): string {
  const d = digitos.slice(0, 9);
  return [d.slice(0, 1), d.slice(1, 5), d.slice(5, 9)].filter(Boolean).join(" ");
}

export function formatearInput(pais: PaisTelefono, valor: string): string {
  const digitos = soloDigitos(valor).slice(0, pais.max);
  return pais.iso === "CL" ? formatearChile(digitos) : digitos;
}

export function maxLengthInput(pais: PaisTelefono): number {
  return pais.iso === "CL" ? MAX_LENGTH_CHILE : pais.max;
}

// Patrón para la validación nativa del input; replica las reglas de validarTelefono.
export function patronInput(pais: PaisTelefono): string {
  return pais.iso === "CL"
    ? "9 [0-9]{4} [0-9]{4}"
    : `[0-9]{${pais.min},${pais.max}}`;
}

export function etiquetaPais(pais: PaisTelefono): string {
  return pais.codigo ? `${pais.nombre} ${pais.codigo}` : pais.nombre;
}

export function mensajeErrorTelefono(iso: string): string {
  if (iso === "CL") return "Ingresa un celular: 9 XXXX XXXX";
  if (iso === "OTRO") {
    return "Escribe tu número con el código de país (8 a 15 dígitos).";
  }
  return "Revisa el número: solo dígitos y el largo correcto.";
}

function formatearTelefono(pais: PaisTelefono, digitos: string): string {
  if (pais.iso === "CL") return `${pais.codigo} ${formatearChile(digitos)}`;
  if (pais.iso === "OTRO") return `+${digitos}`;
  return `${pais.codigo} ${digitos}`;
}

export function validarTelefono(
  iso: string,
  valor: string,
): { ok: true; formateado: string } | { ok: false; error: string } {
  const pais = buscarPais(iso);
  if (!pais) return { ok: false, error: mensajeErrorTelefono(iso) };

  const sinEspacios = valor.replace(/\s/g, "");
  if (!/^\d+$/.test(sinEspacios)) {
    return { ok: false, error: mensajeErrorTelefono(pais.iso) };
  }
  if (sinEspacios.length < pais.min || sinEspacios.length > pais.max) {
    return { ok: false, error: mensajeErrorTelefono(pais.iso) };
  }
  if (pais.iso === "CL" && !/^9\d{8}$/.test(sinEspacios)) {
    return { ok: false, error: mensajeErrorTelefono(pais.iso) };
  }

  return { ok: true, formateado: formatearTelefono(pais, sinEspacios) };
}
