-- Hamza Dev — Supabase database foundation
-- Run this in Supabase Dashboard > SQL Editor. Never expose service_role keys in browser code.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'client' check (role in ('admin','client')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  technologies text[] not null default '{}',
  screenshot_url text,
  live_url text,
  github_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_pkr integer not null check (price_pkr >= 0),
  description text,
  revisions integer not null default 0,
  delivery_days text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  content text not null,
  rating integer check (rating between 1 and 5),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image_url text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  client_name text not null,
  client_email text not null,
  phone text,
  project_type text,
  package_name text,
  budget_pkr integer,
  deadline date,
  requirements text not null,
  status text not null default 'pending' check (status in ('pending','confirmed','in_progress','review','completed','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','pending','paid','refunded')),
  created_at timestamptz not null default now()
);

create table if not exists public.client_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  message text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.pricing_packages enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_posts enable row level security;
alter table public.contact_requests enable row level security;
alter table public.orders enable row level security;
alter table public.client_feedback enable row level security;

-- Public visitors can read only published/active portfolio content.
create policy "Public reads published projects" on public.projects for select using (is_published or public.is_admin());
create policy "Admins manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active services" on public.services for select using (is_active or public.is_admin());
create policy "Admins manage services" on public.services for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads active pricing" on public.pricing_packages for select using (is_active or public.is_admin());
create policy "Admins manage pricing" on public.pricing_packages for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads published testimonials" on public.testimonials for select using (is_published or public.is_admin());
create policy "Admins manage testimonials" on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "Public reads published blog" on public.blog_posts for select using (is_published or public.is_admin());
create policy "Admins manage blog" on public.blog_posts for all using (public.is_admin()) with check (public.is_admin());

-- Anonymous visitors may submit requests, but cannot read them.
create policy "Anyone can submit contact request" on public.contact_requests for insert with check (true);
create policy "Admins manage contact requests" on public.contact_requests for all using (public.is_admin()) with check (public.is_admin());
create policy "Anyone can submit an order request" on public.orders for insert with check (user_id is null or user_id = auth.uid());
create policy "Clients read own orders" on public.orders for select using (user_id = auth.uid() or public.is_admin());
create policy "Admins manage orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "Clients manage own feedback" on public.client_feedback for all using (user_id = auth.uid() or public.is_admin()) with check (user_id = auth.uid() or public.is_admin());
create policy "Users read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "Admins update profiles" on public.profiles for update using (public.is_admin()) with check (public.is_admin());

-- IMPORTANT: after creating your account, promote ONLY your own user UUID to admin:
-- update public.profiles set role = 'admin' where id = 'YOUR_AUTH_USER_UUID';
