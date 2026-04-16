# GymApp

Aplicacion web para gimnasio construida con `Next.js`, `Tailwind CSS`, `Supabase`, `Supabase Auth SSR` y pensada para desplegarse en `Vercel`.

La app queda enfocada en una operacion simple:

- web publica para presentar el gimnasio;
- panel admin para registrar socios;
- renovaciones manuales de membresia;
- seguimiento de activos, por vencer y vencidos;
- ficha individual de cada socio;
- aviso por correo a socios vencidos.

## Objetivo del proyecto

Resolver la operacion diaria del gimnasio sin meter el cobro dentro del sistema.

La caja puede seguir funcionando por afuera con efectivo o transferencia, mientras la app se usa para:

- registrar socios;
- activar o renovar membresias;
- ver quienes vencen pronto;
- ver quienes ya vencieron;
- mantener fichas ordenadas;
- centralizar la informacion del gimnasio.

## Stack

- `Next.js` App Router
- `React 19`
- `Tailwind CSS`
- `Supabase`
- `Supabase Auth SSR`
- `Resend` para notificaciones por correo
- `Vercel`

## Funcionalidades actuales

### Web publica

- home principal del gym;
- secciones de presentacion y CTA;
- acceso al panel admin;
- demo comercial en `/demo`.

### Panel admin

- login con `Supabase Auth`;
- dashboard con metricas generales;
- registro de nuevos socios;
- renovacion de membresias para socios existentes;
- busqueda por nombre, email o documento;
- filtros por estado del socio;
- tabla general de socios;
- vista de socios por vencer;
- vista de socios vencidos;
- boton para informar por correo fin de suscripcion;
- ficha individual del socio;
- edicion basica de datos del socio desde su ficha.

## Estructura del dominio

La app trabaja con este flujo:

1. se registra un socio;
2. se crea una membresia;
3. una renovacion agrega una nueva membresia;
4. el dashboard consulta la membresia vigente;
5. los vencimientos y avisos salen de esa capa.

## Modelo de datos

El esquema principal vive en `supabase/schema.sql`.

### Tablas

- `members`: datos base del socio.
- `plans`: catalogo de planes.
- `memberships`: periodos activos del socio.

### Vista derivada

- `member_status_view`: devuelve el estado actual del socio (`active`, `expiring`, `expired`) a partir de su ultima membresia.

## Variables de entorno

Copia `.env.example` como `.env.local`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
RESEND_API_KEY=
RESEND_FROM_EMAIL=Gym App <notifications@example.com>
```

## Instalacion

Usando `pnpm`:

```bash
pnpm install
```

## Puesta en marcha

1. crea un proyecto en `Supabase`;
2. ejecuta `supabase/schema.sql` en el SQL Editor;
3. crea un usuario admin en `Supabase Auth`;
4. completa `.env.local`;
5. levanta el proyecto:

```bash
pnpm dev
```

## Despliegue en Vercel

1. sube el repo;
2. crea el proyecto en `Vercel`;
3. carga las mismas variables de entorno;
4. verifica que `NEXT_PUBLIC_APP_URL` apunte al dominio real;
5. redeploya luego de guardar variables.

### Variables para produccion

En `Vercel`, configura al menos:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
RESEND_API_KEY=
RESEND_FROM_EMAIL=Gym App <onboarding@resend.dev>
```

Si luego conectas un dominio propio, actualiza `NEXT_PUBLIC_APP_URL` al dominio final.

### Checklist antes de mostrarla

1. login admin funcionando;
2. alta de socio funcionando;
3. renovacion con buscador funcionando;
4. un socio vencido visible en dashboard;
5. boton de email probado;
6. boton de WhatsApp probado;
7. metadata correcta en la URL publicada.

## Archivos clave

- `app/page.tsx`: home publica.
- `app/demo/page.tsx`: demo comercial lista para mostrar.
- `app/login/page.tsx`: login admin.
- `app/admin/page.tsx`: dashboard principal.
- `app/admin/members/[memberId]/page.tsx`: ficha individual del socio.
- `app/admin/actions.ts`: server actions del panel.
- `lib/dashboard.ts`: consultas y flujos del dashboard.
- `components/dashboard.tsx`: UI principal del panel.
- `components/member-detail.tsx`: ficha individual del socio.
- `supabase/schema.sql`: modelo SQL completo.

## Flujo actual de alta

1. se crea el socio;
2. se toma la fecha de inicio;
3. se define cuantos meses queda activo;
4. se crea la membresia.

## Flujo actual de renovacion

1. se elige un socio existente;
2. se define fecha de inicio de renovacion;
3. se define cuantos meses se agregan;
4. se crea una nueva membresia.

## Ficha del socio

Cada socio puede abrir una ficha individual desde el dashboard.

La ficha muestra:

1. datos principales del socio;
2. estado actual y vigencia;
3. historial de membresias y renovaciones;
4. edicion de datos basicos y notas.

## Busqueda y filtros

El dashboard permite:

1. buscar por nombre, email o documento;
2. filtrar por estado del socio;
3. trabajar sobre la tabla general, por vencer y vencidos con la misma vista filtrada.

## Demo comercial

La ruta `/demo` sirve para mostrarle rapido la idea a un dueño de gym:

1. web del gimnasio;
2. administracion de socios;
3. renovaciones;
4. vencimientos;
5. fichas ordenadas sin planillas paralelas.

## Emails de vencimiento

Si configuras `Resend`, el boton de avisar por correo envia una notificacion simple a socios vencidos.

Si no configuras `Resend`, el boton sigue funcionando como flujo UI, pero no enviara email real.

## Produccion lista

La app ya incluye:

- `robots.txt` generado por `app/robots.ts`;
- `sitemap.xml` generado por `app/sitemap.ts`;
- `manifest.webmanifest` generado por `app/manifest.ts`;
- metadata base y SEO para compartir mejor el link;
- optimizacion de imports para `lucide-react` en `next.config.ts`.

## Validacion

Valida el proyecto con:

```bash
pnpm build
```
