-- ══════════════════════════════════════════════════
-- GWS Global Web Solutions — Supabase Schema
-- Ejecutar en: Supabase → SQL Editor → Run
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

drop policy if exists "Public read projects"  on public.projects;
drop policy if exists "Auth manage projects"  on public.projects;

create policy "Public read projects"
  on public.projects for select using (true);

create policy "Auth all projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 2. TABLA: hero
create table if not exists public.hero (
  id         uuid primary key default gen_random_uuid(),
  title      text not null default 'Sistemas que hacen crecer tu negocio',
  subtitle   text not null default 'Construimos software a medida para clínicas, talleres, retail, e-commerce y gobierno.',
  image_url  text,
  created_at timestamptz default now()
);

alter table public.hero enable row level security;

drop policy if exists "Public read hero" on public.hero;
drop policy if exists "Auth manage hero" on public.hero;
drop policy if exists "Auth all hero"    on public.hero;

create policy "Public read hero"
  on public.hero for select using (true);

create policy "Auth all hero"
  on public.hero for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 3. TABLA: settings
create table if not exists public.settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

alter table public.settings enable row level security;

drop policy if exists "Public read settings" on public.settings;
drop policy if exists "Auth all settings"    on public.settings;

create policy "Public read settings"
  on public.settings for select using (true);

create policy "Auth all settings"
  on public.settings for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 4. TABLA: leads
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  email      text not null,
  mensaje    text,
  telefono   text,
  source     text default 'landing',
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

drop policy if exists "Allow public insert leads" on public.leads;
drop policy if exists "Auth read leads"           on public.leads;

create policy "Allow public insert leads"
  on public.leads for insert to anon
  with check (true);

create policy "Auth read leads"
  on public.leads for select
  using (auth.role() = 'authenticated');

-- 5. STORAGE bucket "media"
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public read media"  on storage.objects;
drop policy if exists "Auth upload media"  on storage.objects;
drop policy if exists "Auth update media"  on storage.objects;
drop policy if exists "Auth delete media"  on storage.objects;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Auth upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "Auth update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "Auth delete media"
  on storage.objects for delete
  to authenticated
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

-- ══════════════════════════════════════════════════
-- ¡Listo! Recuerda crear tu usuario en:
-- Authentication → Users → Add user
-- ══════════════════════════════════════════════════

-- 7. Redes sociales (agregar al settings existente)
-- Ejecutar si ya tienes la tabla settings creada:
insert into public.settings (key, value) values
  ('social_linkedin',  '') on conflict (key) do nothing;
insert into public.settings (key, value) values
  ('social_instagram', '') on conflict (key) do nothing;
insert into public.settings (key, value) values
  ('social_facebook',  '') on conflict (key) do nothing;
insert into public.settings (key, value) values
  ('social_twitter',   '') on conflict (key) do nothing;
insert into public.settings (key, value) values
  ('social_tiktok',    '') on conflict (key) do nothing;
insert into public.settings (key, value) values
  ('social_whatsapp',  '') on conflict (key) do nothing;

-- Agregar campo telefono a leads si no existe
alter table public.leads add column if not exists telefono text;
