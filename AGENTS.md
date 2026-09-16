# AGENTS.md — Contrato del Agente

**Puepu Bienestar | Sitio Web v1.0**

Este documento vive en la raíz del repositorio como `AGENTS.md`. Claude Code lo lee cuando se le instruye explícitamente — no hay garantía de lectura automática. Sus reglas son declarativas, no guardrails técnicos: no existe un mecanismo que impida ejecutar comandos fuera de alcance. El control real lo ejerce el operador humano. Si una instrucción de sesión contradice este documento, este documento gana.

⚠️ **Nota sobre CLAUDE.md:** `create-next-app` genera automáticamente un `CLAUDE.md` con una sola línea (`@AGENTS.md`). No lo edites — es un puntero automático. La fuente de verdad siempre es este archivo.

⚠️ **Nota sobre el bloque agentRules:** Next.js 15.2+ inyecta automáticamente contenido en este archivo entre los markers `<!-- BEGIN:nextjs-agent-rules -->` y `<!-- END:nextjs-agent-rules -->`. Ese bloque es gestionado por el framework — no lo borres. Todo el contenido personalizado de este archivo vive fuera de esos markers.

## Alcance de comandos de terminal (regla dura)

Todo comando ejecuta y escribe EXCLUSIVAMENTE dentro de la carpeta del proyecto.
Prohibido `/tmp` o cualquier ruta fuera del proyecto, incluso para temporales.
Los temporales van en `./scratch/` (en `.gitignore`).
Ninguna instrucción acotada puede autorizar salir del perímetro del proyecto.

⚠️ **Enforcement:** esta regla es declarativa. Si vas a ejecutar un comando que no está en la lista de pre-aprobados, DETENTE y pide confirmación antes de ejecutarlo. Si ya lo ejecutaste fuera de alcance, repórtalo — no lo autocorrijas en silencio.

### Comandos pre-aprobados (no requieren confirmación individual)

```
npm run dev
npm run build
npm run lint
npm run type-check
```

Todo lo demás requiere aprobación explícita del operador antes de ejecutarse, incluyendo sin limitarse a: `npx`, `tsc` standalone, `node`, `find`, `curl`, `git` (salvo `git status` y `git diff`), y cualquier comando con rutas fuera del proyecto.

## 1. Contexto del proyecto

**Proyecto:** Sitio web estático/semi-estático para Gloria Jofré Cabello — terapeuta MTCH y guía de bienestar en Valdivia, Chile.

**Stack:** Next.js 15 + React 19 + TypeScript + Tailwind CSS v4

**Sin base de datos.** No hay BD propia en este proyecto. La única lógica de servidor es el Server Action del formulario de contacto.

**Sin autenticación.** El sitio es completamente público. No hay login, roles ni sesiones.

**Desarrollador responsable:** Luis Valdés Vargas / Cauce Digital

## 2. Esquema de servidor (Backend mínimo)

Este sitio tiene exactamente un punto de lógica de servidor: el formulario de contacto.

**Server Action:** `submitContact`

**Archivo:** `app/actions/submitContact.ts`

**Flujo:**

```
Input:
  - nombre: string (requerido, max 100 chars)
  - correo: string (requerido, formato email válido)
  - telefono: string (opcional, max 20 chars)
  - mensaje: string (requerido, max 2000 chars)
  - servicio: string (requerido, campo oculto — tag de la página)
  - turnstileToken: string (requerido, del widget de Cloudflare)

Pasos:
  1. Validar que todos los campos requeridos estén presentes y no vacíos
  2. Sanitizar inputs: trim() en todos los campos de texto
  3. Validar formato de correo (regex básico o librería)
  4. Verificar el token de Turnstile contra la API de Cloudflare:
     POST https://challenges.cloudflare.com/turnstile/v0/siteverify
     body: { secret: TURNSTILE_SECRET_KEY, response: turnstileToken }
  5. Si Turnstile falla → retornar error (no enviar correo)
  6. Si Turnstile pasa → llamar a Resend API:
     - from: "Puepu Bienestar <noreply@puepu-bienestar.com>"
     - to: CONTACT_EMAIL (variable de entorno)
     - subject: `Nuevo contacto desde Puepu Bienestar — ${servicio}`
     - html: plantilla con nombre, correo, teléfono, mensaje
  7. Si Resend falla → retornar error con mensaje amigable
  8. Si Resend pasa → retornar { success: true }
  (la redirección a /gracias la maneja el componente cliente)

Output:
  { success: boolean, error?: string }
```

**Valores válidos para el campo `servicio`:**

- "Terapia MTCH"
- "Baños de Bosque"
- "Caminatas Medicinales"
- "Talleres"
- "Contacto General"

### Variables de entorno requeridas

```env
RESEND_API_KEY=           # Clave API de Resend (solo servidor)
TURNSTILE_SECRET_KEY=     # Clave secreta de Turnstile (solo servidor)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=  # Clave pública de Turnstile (cliente)
CONTACT_EMAIL=            # Correo de Gloria donde llegan los formularios
WHATSAPP_NUMBER=          # +56952541245 (usado en links y botones)
```

**Regla:** Ninguna variable de entorno privada (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_EMAIL`) puede aparecer en código del lado cliente. Solo `NEXT_PUBLIC_*` van al cliente.

## 3. Estructura de archivos

```
puepu-bienestar/
├── AGENTS.md                          ← este documento
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .env.local                         ← NUNCA commitear
├── .env.example                       ← versión sin valores reales
├── .gitignore
├── scratch/                           ← temporales, ignorados por git
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   │   └── cardo-mar.webp         ← foto principal del hero
│   │   ├── servicios/
│   │   │   ├── banos-bosque.webp
│   │   │   ├── caminatas.webp
│   │   │   ├── talleres.webp
│   │   │   └── terapia-mtch.webp      ← pendiente foto de Gloria en sesión
│   │   ├── galeria/
│   │   │   ├── bosque-01.webp
│   │   │   ├── bosque-02.webp
│   │   │   ├── flores-nativas.webp
│   │   │   └── epifita.webp
│   │   └── logos/
│   │       ├── puepu-naranja.svg
│   │       ├── puepu-verde.svg
│   │       ├── puepu-blanco.svg
│   │       └── puepu-bn.svg
│   ├── favicon.ico
│   └── og-image.jpg                   ← imagen Open Graph para redes sociales
│
└── app/
    ├── layout.tsx                     ← layout raíz: fuentes, header, footer
    ├── globals.css                    ← tokens CSS, reset
    ├── page.tsx                       ← / (Inicio)
    ├── sitemap.ts                     ← genera /sitemap.xml
    ├── robots.ts                      ← genera /robots.txt
    │
    ├── actions/
    │   └── submitContact.ts           ← Server Action del formulario
    │
    ├── servicios/
    │   ├── terapia-mtch/
    │   │   └── page.tsx
    │   ├── banos-de-bosque/
    │   │   └── page.tsx
    │   ├── caminatas-medicinales/
    │   │   └── page.tsx
    │   └── talleres/
    │       └── page.tsx
    │
    ├── productos/
    │   └── page.tsx
    │
    ├── sobre-mi-y-contacto/
    │   └── page.tsx
    │
    ├── privacidad/
    │   └── page.tsx
    │
    └── gracias/
        └── page.tsx
```

Directorio de componentes:

```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
│
├── ui/
│   ├── Button.tsx
│   ├── ServiceCard.tsx
│   └── ProductCard.tsx
│
├── sections/
│   ├── Hero.tsx
│   ├── ServicesGrid.tsx
│   ├── PhotoGallery.tsx
│   └── CallToAction.tsx
│
└── forms/
    ├── ContactForm.tsx              ← componente cliente con estado
    └── TurnstileWidget.tsx          ← wrapper del widget de Cloudflare
```

## 4. Convenciones de código

### Nombrado de archivos y componentes

```
Páginas:       PascalCase en el componente, kebab-case en la carpeta
               app/sobre-mi-y-contacto/page.tsx → export default function SobreMiYContacto()

Componentes:   PascalCase
               components/ui/ServiceCard.tsx → export default function ServiceCard()

Utilidades:    camelCase
               lib/formatWhatsAppLink.ts → export function formatWhatsAppLink()

Imágenes:      kebab-case
               public/images/galeria/bosque-interior-01.webp
```

### TypeScript

```typescript
// ✅ BIEN: tipos explícitos en funciones de servidor
type ContactFormData = {
  nombre: string;
  correo: string;
  telefono?: string;
  mensaje: string;
  servicio: string;
}

// ✅ BIEN: tipo de retorno explícito en Server Actions
async function submitContact(data: ContactFormData): Promise<{ success: boolean; error?: string }>

// ❌ MAL: never usar any
const data: any = formData; // Prohibido
```

### Componentes React

```tsx
// ✅ BIEN: props tipadas, componente nombrado
type ServiceCardProps = {
  nombre: string;
  descripcion: string;
  foto: string;
  href: string;
}

export default function ServiceCard({ nombre, descripcion, foto, href }: ServiceCardProps) {
  // ...
}

// ❌ MAL: props sin tipo, componente anónimo
export default ({ nombre, descripcion }: any) => { ... }
```

### Imágenes

Siempre usar el componente `<Image />` de Next.js:

```tsx
// ✅ BIEN
import Image from "next/image"
<Image
  src="/images/galeria/bosque-01.webp"
  alt="Interior de la Selva Valdiviana, árboles nativos con luz lateral"
  width={800}
  height={1200}
  loading="lazy"
/>

// ❌ MAL: img nativa sin optimización
<img src="/images/bosque.jpg" />
```

**Regla:** todo `alt` describe lo que se ve en la imagen, no "foto de" ni vacío.

### Tailwind CSS

```tsx
// ✅ BIEN: usar tokens CSS para colores de marca
<button className="bg-[var(--color-tierra)] text-white rounded-full px-7 py-3.5">

// ✅ BIEN: clases responsivas explícitas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// ❌ MAL: hardcodear colores
<button className="bg-[#C8672A]"> // Usar --color-tierra

// ❌ MAL: inline styles para cosas que debería manejar Tailwind
<div style={{ backgroundColor: "#3A6B35" }}>
```

## 5. Checklist antes de cada commit

- [ ] `npm run build` pasa sin errores
- [ ] Ninguna variable privada de entorno en código cliente
- [ ] Todas las imágenes usan `<Image />` con `alt` descriptivo
- [ ] No hay `console.log` sin eliminar en código de producción
- [ ] El formulario maneja los 5 estados: inicial, enviando, éxito, error Turnstile, error Resend
- [ ] `prefers-reduced-motion` respetado en animaciones

## 6. Checklist antes de deploy a producción (paso 8)

- [ ] Variables de entorno reales configuradas en Vercel (no placeholders)
- [ ] Dominio verificado en Resend — sin esto, el formulario solo envía al correo de la cuenta de Resend, no al correo de Gloria. Verificar ANTES de probar el formulario en producción.
- [ ] Dominio configurado en Cloudflare y Vercel
- [ ] SSL activo y verificado
- [ ] Envío del formulario probado end-to-end (Gloria recibe el correo)
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] Lighthouse Performance > 80 en mobile
- [ ] Revisión conjunta con Gloria completada y aprobada

## 7. Lo que este agente NO hace

- No crea endpoints de autenticación (no hay auth en este proyecto).
- No crea tablas de base de datos (no hay BD).
- No instala librerías de animación pesadas sin actualizar el TRD.
- No usa `dangerouslySetInnerHTML`.
- No hardcodea el correo de Gloria ni el número de WhatsApp en el código — siempre desde variables de entorno.
- No commitea `.env.local` ni ningún archivo con secretos reales.
- No crea archivos temporales fuera de `./scratch/`.
