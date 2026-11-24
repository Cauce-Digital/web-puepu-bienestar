# Puepu Bienestar — Sitio web

Sitio web de Puepu Bienestar (Gloria Jofré Cabello), desarrollado por Cauce Digital.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4
- Resend (envío del formulario de contacto)
- Cloudflare Turnstile (protección antispam del formulario)
- Instagram API con inicio de sesión de Instagram (feed del inicio)
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

## Feed de Instagram

La sección «Sígueme en Instagram» del inicio muestra las últimas 6 publicaciones de @puepu_bienestar (`lib/instagram.ts` + `components/sections/InstagramFeed.tsx`) y se actualiza cada 12 h. Requiere `INSTAGRAM_ACCESS_TOKEN` (solo servidor; Production en Vercel, opcional en Preview). Sin token, o si la API falla, se muestra la galería estática de `lib/content/home.ts`.

### Renovación manual del token (cada ~50 días)

El token de larga duración vence a los 60 días. En cada mantención:

1. Renovar el token vigente (debe tener más de 24 h y no estar vencido):

   ```
   GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=<TOKEN_ACTUAL>
   ```

   La respuesta trae el nuevo `access_token` y `expires_in` (segundos).
2. Reemplazar `INSTAGRAM_ACCESS_TOKEN` en Vercel → Settings → Environment Variables (Production y, si se usa, Preview).
3. Hacer redeploy de producción para que tome el nuevo valor.
4. Anotar la fecha de la próxima renovación.

Si el token vence, el sitio no se rompe: vuelve a la galería estática hasta renovarlo. Un token vencido no se puede renovar; hay que generar uno nuevo desde la app de Meta.

## Ramas

- `develop` → preview en Vercel
- `main` → producción

## Agentes de IA

Las reglas de trabajo para agentes viven en `AGENTS.md` y se refuerzan con `.claude/settings.json`.
