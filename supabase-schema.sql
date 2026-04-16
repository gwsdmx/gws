-- ══════════════════════════════════════════════════
-- GWS Global Web Solutions — Supabase Schema
-- Ejecutar en: Supabase → SQL Editor
-- ══════════════════════════════════════════════════

-- 1. TABLA: projects
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  media_url   text,
  media_type  text default 'image' check (media_type in ('image','video')),
  category    text default 'General',
  created_at  timestamptz default now()
);
alter table public.projects enable row level security;
create policy "Public read projects"    on public.projects for select to anon  using (true);
create policy "Auth manage projects"    on public.projects for all    to authenticated using (true);

-- 2. TABLA: hero
create table if not exists public.hero (
  id          uuid primary key default gen_random_uuid(),
  title       text not null default 'Sistemas que hacen crecer tu negocio',
  subtitle    text not null default 'Construimos software a medida para clínicas, talleres, retail, e-commerce y gobierno.',
  image_url   text,
  created_at  timestamptz default now()
);
alter table public.hero enable row level security;
create policy "Public read hero"  on public.hero for select to anon  using (true);
create policy "Auth manage hero"  on public.hero for all    to authenticated using (true);

-- 3. TABLA: settings (clave-valor)
create table if not exists public.settings (
  key         text primary key,
  value       text,
  updated_at  timestamptz default now()
);
alter table public.settings enable row level security;
create policy "Public read settings"  on public.settings for select to anon  using (true);
create policy "Auth manage settings"  on public.settings for all    to authenticated using (true);

-- 4. TABLA: leads (formulario de contacto)
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  email       text not null,
  mensaje     text,
  source      text default 'landing',
  created_at  timestamptz default now()
);
alter table public.leads enable row level security;
create policy "Allow public insert leads" on public.leads for insert to anon with check (true);
create policy "Auth read leads"           on public.leads for select to authenticated using (true);

-- 5. STORAGE: bucket "media" (público)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select to anon
  using (bucket_id = 'media');

create policy "Auth upload media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'media');

create policy "Auth update media"
  on storage.objects for update to authenticated
  using (bucket_id = 'media');

create policy "Auth delete media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'media');

-- 6. Datos iniciales
insert into public.hero (title, subtitle)
values (
  'Sistemas que hacen crecer tu negocio',
  'Construimos software a medida para clínicas, talleres, retail, e-commerce y gobierno. No plantillas — exactamente lo que necesitas.'
) on conflict do nothing;

insert into public.settings (key, value)
values ('video_url', '')
on conflict (key) do nothing;
