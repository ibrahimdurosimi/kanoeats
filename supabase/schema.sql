-- ============================================================================
-- KanoEats — Supabase schema
-- Run this in the Supabase SQL editor on a fresh project, then run seed.sql.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Reference data: kitchens and their menus
-- ---------------------------------------------------------------------------

create table if not exists public.restaurants (
  id            text primary key,
  name          text    not null,
  cuisine       text    not null,
  rating        numeric not null default 0,
  review_count  integer not null default 0,
  delivery_time integer not null,                 -- minutes
  tags          text[]  not null default '{}',
  logo_text     text    not null,
  address       text    not null,
  city          text    not null default 'Kano',
  opens         text    not null,
  closes        text    not null,
  art_key       text    not null default 'kitchen',
  is_active     boolean not null default true,
  owner_id      uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now()
);

create table if not exists public.dishes (
  id            text primary key,
  restaurant_id text    not null references public.restaurants(id) on delete cascade,
  name          text    not null,
  description   text    not null,
  price         integer not null,                 -- kobo-free: whole naira
  category      text    not null check (category in ('Starters','Mains','Drinks','Snacks')),
  art_key       text    not null default 'kitchen',
  spice_level   integer not null default 0 check (spice_level between 0 and 3),
  is_available  boolean not null default true,
  created_at    timestamptz not null default now()
);

create index if not exists dishes_restaurant_idx on public.dishes(restaurant_id);

-- ---------------------------------------------------------------------------
-- Customer profiles — one row per auth user, created by trigger on signup
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null default '',
  phone      text not null default '',
  role       text not null default 'customer' check (role in ('customer','owner')),
  created_at timestamptz not null default now()
);

create table if not exists public.addresses (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  label      text not null default 'Home',
  line1      text not null,
  area       text not null default '',
  city       text not null default 'Kano',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists addresses_user_idx on public.addresses(user_id);

-- ---------------------------------------------------------------------------
-- Orders
-- ---------------------------------------------------------------------------

create table if not exists public.orders (
  id               uuid primary key default gen_random_uuid(),
  reference        text unique not null,           -- Paystack reference, also the human order ref
  user_id          uuid not null references auth.users(id) on delete cascade,
  restaurant_id    text not null references public.restaurants(id),
  status           text not null default 'pending'
                     check (status in ('pending','confirmed','preparing','on_the_way','delivered','cancelled')),
  payment_status   text not null default 'unpaid'
                     check (payment_status in ('unpaid','paid','failed','refunded')),
  payment_method   text not null default 'paystack'
                     check (payment_method in ('paystack','cash_on_delivery')),
  subtotal         integer not null,
  delivery_fee     integer not null default 0,
  discount         integer not null default 0,
  total            integer not null,
  promo_code       text,
  delivery_address text not null,
  delivery_notes   text,
  scheduled_for    timestamptz,                    -- null = deliver now
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders(user_id, created_at desc);
create index if not exists orders_restaurant_idx on public.orders(restaurant_id, created_at desc);

create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  dish_id     text not null,
  dish_name   text not null,                       -- denormalised: menus change, receipts must not
  unit_price  integer not null,
  quantity    integer not null check (quantity > 0),
  options     jsonb   not null default '{}'::jsonb -- spice level, add-ons
);

create index if not exists order_items_order_idx on public.order_items(order_id);

-- Keep orders.updated_at honest
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Create a profile automatically whenever someone signs up
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.restaurants enable row level security;
alter table public.dishes      enable row level security;
alter table public.profiles    enable row level security;
alter table public.addresses   enable row level security;
alter table public.orders      enable row level security;
alter table public.order_items enable row level security;

-- Menus are public reading material.
drop policy if exists "restaurants are publicly readable" on public.restaurants;
create policy "restaurants are publicly readable"
  on public.restaurants for select using (true);

drop policy if exists "dishes are publicly readable" on public.dishes;
create policy "dishes are publicly readable"
  on public.dishes for select using (true);

-- A kitchen owner may edit their own kitchen and menu.
drop policy if exists "owners manage their restaurant" on public.restaurants;
create policy "owners manage their restaurant"
  on public.restaurants for update using (auth.uid() = owner_id);

drop policy if exists "owners manage their dishes" on public.dishes;
create policy "owners manage their dishes"
  on public.dishes for all
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = dishes.restaurant_id and r.owner_id = auth.uid()
    )
  );

-- Profiles and addresses are private to their owner.
drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
  on public.profiles for update using (auth.uid() = id);

drop policy if exists "users manage own addresses" on public.addresses;
create policy "users manage own addresses"
  on public.addresses for all using (auth.uid() = user_id);

-- Orders: a customer sees their own; the kitchen owner sees orders placed with them.
drop policy if exists "users read own orders" on public.orders;
create policy "users read own orders"
  on public.orders for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.restaurants r
      where r.id = orders.restaurant_id and r.owner_id = auth.uid()
    )
  );

drop policy if exists "users create own orders" on public.orders;
create policy "users create own orders"
  on public.orders for insert with check (auth.uid() = user_id);

-- A customer may only cancel; everything else is the kitchen's to change.
-- Payment status is never client-writable — the Edge Function owns it.
drop policy if exists "owners update order status" on public.orders;
create policy "owners update order status"
  on public.orders for update
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = orders.restaurant_id and r.owner_id = auth.uid()
    )
  );

drop policy if exists "users read own order items" on public.order_items;
create policy "users read own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (
          o.user_id = auth.uid()
          or exists (
            select 1 from public.restaurants r
            where r.id = o.restaurant_id and r.owner_id = auth.uid()
          )
        )
    )
  );

drop policy if exists "users create own order items" on public.order_items;
create policy "users create own order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );
