# AGENTS.md — Contrato del Agente

**Puepu Bienestar | Sitio Web v1.0**

Este documento vive en la raíz del repositorio como `AGENTS.md` y se carga automáticamente vía CLAUDE.md (`@AGENTS.md`). Sus reglas se refuerzan con los permisos de `.claude/settings.json` (ver «Refuerzo técnico»), que no son una barrera absoluta: el control final lo ejerce el operador humano. Si una instrucción de sesión contradice este documento, este documento gana.

⚠️ **Nota sobre CLAUDE.md:** `create-next-app` genera automáticamente un `CLAUDE.md` con una sola línea (`@AGENTS.md`). No lo edites — es un puntero automático. La fuente de verdad siempre es este archivo.

## Protocolo de comandos y archivos (regla dura)

### Alcance

- Todo comando se ejecuta y escribe solo dentro de la carpeta del proyecto. Prohibido `/tmp` o cualquier ruta externa, incluso para temporales: van en `./scratch/`.
- Ninguna instrucción acotada autoriza salir del proyecto; requiere aprobación explícita y separada.
- La regla aplica a todo comando que ejecute el agente. No cubre los directorios internos que la propia herramienta gestiona (memoria, temporales del sistema).

### Comandos pre-aprobados (terminal)

- `ls`, `file`
- `git status`, `git diff`, `git log`, `git grep`
- `npm run dev`, `npm run build`, `npm run lint`, `npm run type-check`

La lista completa y vigente está en `.claude/settings.json` (`permissions.allow`); incluye además comandos de diagnóstico de solo lectura (`pwd`, `git show`, `git branch`, `git remote -v`, versiones de node/npm, `npm ls`, `npm outdated`, `npm audit`). Si hay diferencia, manda settings.json.

Para leer contenido se usa la herramienta Read; para buscar, Grep (si está disponible) o `git grep`. Nunca `cat` ni `grep` en la terminal.

### Todo lo demás se pregunta ANTES

Cualquier comando fuera de la lista se propone, se explica y espera aprobación explícita. No se ejecuta para reportarlo después. Si por error se ejecutó, se informa de inmediato.

Cada pedido de aprobación se explica en una línea simple, para alguien que no es desarrollador: qué hace el comando, por qué se necesita ahora y qué podría salir mal. Si existe una alternativa ya pre-aprobada, se usa esa en vez de preguntar.

### Edición de archivos

- Solo con las herramientas de edición del agente (Edit/Write).
- Prohibido editar desde la terminal: `sed`, `awk`, `perl -i`, redirecciones `>`/`>>`, `tee`, heredocs u otros.
- Ningún cambio sin análisis de impacto aprobado.

### Secretos

- Prohibido leer, mostrar o editar `.env`, `.env.local`, `.env.*.local`, `.env.development`, `.env.production`, `.env.test` u otro archivo con secretos. `.env.example` es de libre lectura.
- Nunca imprimir valores de variables de entorno en terminal ni en el chat.

### Eliminación de archivos

- Nunca eliminar archivos (`rm`, `rmdir`, `unlink` ni equivalentes).
- Lo prescindible se mueve a `Trash-Review/` (ignorada por git), solo con autorización previa. El borrado definitivo lo decide el humano.

### Git

- `git add` solo por nombre de archivo; nunca `git add .` ni `-A`.
- Commit y push solo con aprobación explícita, tras type-check, lint y build OK.
- Los commits mantienen la línea `Co-Authored-By` de Claude.
- Mensajes de commit con varios `-m` (título y `Co-Authored-By`), sin heredocs.

### Refuerzo técnico

`.claude/settings.json` aplica estas reglas como permisos de Claude Code (deny > ask > allow). No es una barrera absoluta: si un comando parece rodear una regla, no se ejecuta. Claude Code corre en modo acceptEdits: las ediciones dentro del proyecto se aplican sin pedir aprobación (ya cubiertas por el análisis de impacto y revisables con git diff). Nunca usar bypassPermissions.

## 1. Contexto del proyecto

**Proyecto:** Sitio web estático/semi-estático para Gloria Jofré Cabello — terapeuta en Medicina Tradicional China y guía de bienestar en Valdivia, Chile.

**Stack:** Next.js 16.3.5 + React 19.2 + TypeScript + Tailwind CSS v4

**Hosting:** Vercel, cuenta Cauce Digital, plan Hobby.

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
  4. Verificar el token de Turnstile (widget en modo Invisible) contra la API de Cloudflare:
     POST https://challenges.cloudflare.com/turnstile/v0/siteverify
     body: { secret: TURNSTILE_SECRET_KEY, response: turnstileToken }
  5. Si Turnstile falla → retornar error (no enviar correo)
  6. Si Turnstile pasa → llamar a Resend API:
     - from: CONTACT_FROM_EMAIL (variable de entorno; en producción usará
       el dominio puepubienestar.cl verificado en Resend)
     - to: CONTACT_EMAIL (variable de entorno)
     - subject: `Nuevo contacto desde Puepu Bienestar — ${servicio}`
     - html: plantilla con nombre, correo, teléfono, mensaje
  7. Si Resend falla → retornar error con mensaje amigable
  8. Si Resend pasa → retornar { success: true }

Output:
  {
    success: boolean,
    error?: string,
    errorType?: "validacion" | "turnstile" | "envio",
    fieldErrors?: { nombre?, correo?, telefono?, mensaje? }
  }

Cliente (components/forms/ContactForm.tsx):
  - El envío usa onSubmit + startTransition (no action directo del form).
  - Si success → marca "puepu-form-enviado" en sessionStorage y router.push("/gracias").
  - /gracias está protegida por GraciasGuard: sin la marca, router.replace("/").
```

**Valores válidos para el campo `servicio`** (fuente: `lib/constants.ts`, `VALID_SERVICIOS`):

- "Medicina Tradicional China"
- "Baños de Bosque"
- "Caminatas Medicinales"
- "Talleres"
- "Contacto General"

### Variables de entorno requeridas

```env
RESEND_API_KEY=                  # Clave API de Resend (solo servidor)
TURNSTILE_SECRET_KEY=            # Clave secreta de Turnstile (solo servidor)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=  # Clave pública de Turnstile (cliente)
CONTACT_EMAIL=                   # Correo donde llegan los formularios (solo servidor)
CONTACT_FROM_EMAIL=              # Remitente de las notificaciones (solo servidor)
NEXT_PUBLIC_WHATSAPP_NUMBER=     # Número de WhatsApp para links y botones (cliente)
NEXT_PUBLIC_SITE_URL=            # URL pública del sitio, https://puepubienestar.cl (solo Production en Vercel)
```

Plantilla sin valores reales: `.env.example`.

**Regla:** Ninguna variable de entorno privada (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, `CONTACT_EMAIL`, `CONTACT_FROM_EMAIL`) puede aparecer en código del lado cliente. Solo `NEXT_PUBLIC_*` van al cliente.

## 3. Estructura de archivos

```
puepu-bienestar/
├── AGENTS.md                          ← este documento
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── .env.local                         ← NUNCA commitear
├── .env.example                       ← versión sin valores reales
├── .gitignore
├── .claude/
│   └── settings.json                  ← permisos de Claude Code (refuerzo técnico)
├── scratch/                           ← temporales, ignorados por git
├── Trash-Review/                      ← archivos prescindibles, ignorados por git
│
├── public/
│   ├── puepu-opengraph.jpg            ← imagen Open Graph para redes sociales
│   └── images/
│       ├── hero/
│       │   └── selva-hero.jpg         ← foto principal del hero
│       ├── servicios/                 ← vacía por ahora
│       ├── galeria/
│       │   └── fotos-*.jpg            ← arbol, bosque, bosque2, caminata, cardamo, cardamo2, flores
│       ├── productos/
│       │   └── productos-*.jpg        ← fotos de cada ungüento
│       └── logos/
│           ├── puepu-naranjo.png
│           ├── puepu-verde.png
│           ├── puepu-blanco.png
│           └── puepu-bn.png
│
├── lib/
│   ├── site.ts                        ← URL base del sitio (NEXT_PUBLIC_SITE_URL)
│   ├── seo.ts                         ← metadata compartida y Open Graph
│   ├── constants.ts                   ← VALID_SERVICIOS, INSTAGRAM_URL
│   ├── escapeHtml.ts                  ← escape del HTML del correo
│   ├── telefono.ts                    ← validación de teléfono
│   ├── formatWhatsAppLink.ts          ← link de WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER)
│   └── content/
│       ├── home.ts
│       ├── servicios.ts
│       ├── productos.ts
│       └── sobreMi.ts
│
└── app/
    ├── layout.tsx                     ← layout raíz: fuentes, header, footer
    ├── globals.css                    ← tokens CSS, reset
    ├── page.tsx                       ← / (Inicio)
    ├── icon.png                       ← favicon
    ├── apple-icon.png                 ← ícono para iOS
    ├── sitemap.ts                     ← genera /sitemap.xml
    ├── robots.ts                      ← genera /robots.txt
    │
    ├── actions/
    │   └── submitContact.ts           ← Server Action del formulario
    │
    ├── servicios/
    │   ├── page.tsx                   ← índice de servicios
    │   ├── medicina-tradicional-china/
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
│   └── Footer.tsx
│
├── ui/
│   ├── Button.tsx
│   ├── ServiceCard.tsx
│   ├── ProductCard.tsx
│   └── InstagramIcon.tsx
│
├── sections/
│   ├── Hero.tsx
│   ├── ServiceHero.tsx
│   ├── ServiceLayout.tsx
│   ├── ServicesGrid.tsx
│   ├── PhotoGallery.tsx
│   └── CallToAction.tsx
│
└── forms/
    ├── ContactForm.tsx              ← componente cliente con estado
    ├── TurnstileWidget.tsx          ← wrapper del widget de Cloudflare (modo Invisible)
    └── GraciasGuard.tsx             ← protege /gracias si no hubo envío
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
               public/images/galeria/fotos-bosque.jpg
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
type SubmitContactResult = {
  success: boolean;
  error?: string;
  errorType?: "validacion" | "turnstile" | "envio";
  fieldErrors?: FieldErrors;
}
async function submitContact(data: ContactFormData): Promise<SubmitContactResult>

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
  src="/images/galeria/fotos-bosque.jpg"
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

- [ ] `npm run type-check`, `npm run lint` y `npm run build` pasan sin errores
- [ ] Ninguna variable privada de entorno en código cliente
- [ ] Todas las imágenes usan `<Image />` con `alt` descriptivo
- [ ] No hay `console.log` sin eliminar en código de producción
- [ ] El formulario maneja los 5 estados (inicial, enviando, éxito, error Turnstile, error Resend) + errores de validación por campo
- [ ] `prefers-reduced-motion` respetado en animaciones

## 6. Checklist antes de deploy a producción (paso 8)

- [ ] Variables de entorno reales configuradas en Vercel (cuenta Cauce Digital, plan Hobby; no placeholders)
- [ ] Dominio `puepubienestar.cl` verificado en Resend — sin esto, el formulario solo envía al correo de la cuenta de Resend, no al correo de Gloria. Verificar ANTES de probar el formulario en producción.
- [ ] Dominio `puepubienestar.cl` configurado en Cloudflare y Vercel
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
- No hardcodea el correo de Gloria ni el número de WhatsApp en el código — siempre desde variables de entorno. El enlace de Instagram es un dato público y vive en `lib/constants.ts` (`INSTAGRAM_URL`), no en variables de entorno.
- No commitea `.env.local` ni ningún archivo con secretos reales.
- No crea archivos temporales fuera de `./scratch/`.
