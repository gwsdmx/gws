# GWS — Global Web Solutions

Landing page profesional + Panel Admin con Next.js 14, Tailwind CSS y Supabase.

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 14 (App Router) | Frontend + SSR |
| Tailwind CSS | Estilos |
| Supabase | DB + Storage + Auth |
| Vercel | Deploy |

---

## Instalación local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local con tus credenciales de Supabase

# 3. Ejecutar en desarrollo
npm run dev
```

Abre http://localhost:3000

---

## Configurar Supabase

1. Ve a **Supabase → SQL Editor**
2. Copia y ejecuta el contenido de `supabase-schema.sql`
3. Crea un usuario admin en **Authentication → Users → Add user**
4. El usuario puede acceder a `/admin/login`

### Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_WHATSAPP_NUMBER=521XXXXXXXXXX
NEXT_PUBLIC_CONTACT_EMAIL=tu@email.com
```

---

## Estructura del proyecto

```
gws-app/
├── app/
│   ├── page.jsx              ← Landing page (pública)
│   ├── layout.jsx
│   ├── globals.css
│   └── admin/
│       ├── page.jsx          ← Dashboard admin
│       ├── login/page.jsx    ← Login
│       ├── projects/page.jsx ← Gestión de proyectos
│       ├── hero/page.jsx     ← Editar hero
│       └── settings/page.jsx ← Video y ajustes
├── components/
│   ├── landing/              ← Componentes de la landing
│   ├── admin/                ← Componentes del admin
│   └── ui/                   ← Botones, inputs, cards reutilizables
├── lib/
│   ├── supabase.js           ← Cliente browser
│   ├── supabase-server.js    ← Cliente server
│   └── utils.js
├── middleware.js              ← Protección de rutas /admin
└── supabase-schema.sql        ← Ejecutar en Supabase
```

---

## Deploy en Vercel

1. Sube el proyecto a GitHub (sin `.env.local`)
2. Importa el repo en vercel.com
3. Agrega las variables de entorno en Vercel → Settings → Environment Variables
4. Deploy automático en cada commit

---

## Admin Panel

- URL: `tu-dominio.com/admin`
- Login: `tu-dominio.com/admin/login`
- Requiere usuario creado en Supabase Auth

### Funciones del admin
- **Dashboard** — Métricas y leads recientes
- **Proyectos** — Crear/editar/eliminar con subida de imágenes y videos
- **Hero** — Cambiar título, subtítulo e imagen principal
- **Ajustes** — Subir video principal o pegar URL de YouTube

---

## Base de datos

| Tabla | Descripción |
|---|---|
| `projects` | Proyectos del portafolio |
| `hero` | Contenido del hero (título, imagen) |
| `settings` | Configuración clave-valor (video, etc.) |
| `leads` | Formularios de contacto recibidos |
