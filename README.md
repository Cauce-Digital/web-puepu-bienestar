# Puepu Bienestar — Sitio web

Sitio web de Puepu Bienestar (Gloria Jofré Cabello), desarrollado por Cauce Digital.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Resend (envío del formulario de contacto)
- Cloudflare Turnstile (protección antispam del formulario)
- Vercel (cuenta Cauce Digital)

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # luego completar los valores
npm run dev                  # http://localhost:3000
```

## Scripts

| Comando              | Qué hace                         |
| -------------------- | -------------------------------- |
| `npm run dev`        | Servidor de desarrollo           |
| `npm run build`      | Build de producción              |
| `npm run lint`       | ESLint                           |
| `npm run type-check` | Verificación de tipos TypeScript |

## Variables de entorno

La lista completa está en `.env.example`. Nunca commitear `.env.local`.

## Ramas

- `develop` → preview en Vercel
- `main` → producción

## Agentes de IA

Las reglas de trabajo para agentes viven en `AGENTS.md` y se refuerzan con `.claude/settings.json`.
