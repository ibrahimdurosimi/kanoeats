-- ============================================================================
-- KanoEats — migration 002
-- Reviews, catering requests, owner menu management, and realtime orders.
--
-- Run after schema.sql. Re-runnable.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Reviews
--
-- One review per order, not per customer per restaurant: it ties the opinion
-- to a real transaction, which is what stops a rating being gamed by someone
-- who never ordered.
-- ---------------------------------------------------------------------------

create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null unique references public.orders(id) on delete cascade,
  restaurant_id text not null references public.restaurants(id) on delete cascade,
  user_id       uuid not null references auth.users(id) on delete cascade,
  rating        integer not null check (rating between 1 and 5),
  comment       text not null default '',
  created_at    timestamptz not null default now()
);

create index if not exists reviews_restaurant_idx on public.reviews(restaurant_id, created_at desc);
create index if not exists reviews_user_idx on public.reviews(user_id);

/**
 * Keeps restaurants.rating and review_count in step with the reviews table.
 *
 * Computed in the database rather than the client so every reader sees the
 * same number, and so a client cannot write an arbitrary rating onto a
 * restaurant row.
 */
create or replace function public.refresh_restaurant_rating()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target text := coalesce(new.restaurant_id, old.restaurant_id);
begin
  update public.restaurants r
  set rating = coalesce((
        select round(avg(rating)::numeric, 1) from public.reviews where restaurant_id = target
      ), 0),
      review_count = (
        select count(*) from public.reviews where restaurant_id = target
      )
  where r.id = target;
  return null;
end;
$$;

drop trigger if exists reviews_refresh_rating on public.reviews;
create trigger reviews_refresh_rating
  after insert or update or delete on public.reviews
  for each row execute function public.refresh_restaurant_rating();

-- ---------------------------------------------------------------------------
-- Catering requests
--
-- The landing page has advertised catering from the start with nothing behind
-- the button. These are leads, so the table is deliberately permissive about
-- who may insert: an enquiry should not require an account.
-- ---------------------------------------------------------------------------

create table if not exists public.catering_requests (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references auth.users(id) on delete set null,
  full_name     text not null,
  email         text not null,
  phone         text not null,
  occasion      text not null,
  event_date    date,
  guest_count   integer not null check (guest_count > 0),
  city          text not null default 'Kano',
  notes         text not null default '',
  status        text not null default 'new'
                  check (status in ('new','contacted','quoted','won','lost')),
  created_at    timestamptz not null default now()
);

create index if not exists catering_user_idx on public.catering_requests(user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------

alter table public.reviews            enable row level security;
alter table public.catering_requests  enable row level security;

-- Reviews are public reading material — that is the point of them.
drop policy if exists "reviews are publicly readable" on public.reviews;
create policy "reviews are publicly readable"
  on public.reviews for select using (true);

-- You may only review an order that is yours and has actually been delivered.
drop policy if exists "customers review their delivered orders" on public.reviews;
create policy "customers review their delivered orders"
  on public.reviews for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.orders o
      where o.id = reviews.order_id
        and o.user_id = auth.uid()
        and o.restaurant_id = reviews.restaurant_id
        and o.status = 'delivered'
    )
  );

drop policy if exists "customers edit their own reviews" on public.reviews;
create policy "customers edit their own reviews"
  on public.reviews for update using (auth.uid() = user_id);

drop policy if exists "customers delete their own reviews" on public.reviews;
create policy "customers delete their own reviews"
  on public.reviews for delete using (auth.uid() = user_id);

-- Anyone may submit a catering enquiry, signed in or not.
drop policy if exists "anyone can request catering" on public.catering_requests;
create policy "anyone can request catering"
  on public.catering_requests for insert with check (true);

-- But only the person who submitted it can read it back.
drop policy if exists "users read their catering requests" on public.catering_requests;
create policy "users read their catering requests"
  on public.catering_requests for select
  using (auth.uid() is not null and auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Owner menu management
--
-- schema.sql already lets an owner manage dishes for their restaurant. Owners
-- also need to create dishes, which requires a WITH CHECK clause — a policy
-- with only USING rejects inserts.
-- ---------------------------------------------------------------------------

drop policy if exists "owners manage their dishes" on public.dishes;
create policy "owners manage their dishes"
  on public.dishes for all
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = dishes.restaurant_id and r.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.restaurants r
      where r.id = dishes.restaurant_id and r.owner_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Realtime
--
-- Adds orders to the realtime publication so the tracking page and the
-- kitchen queue update on change instead of polling. RLS still applies to
-- realtime, so a customer only receives events for their own orders.
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'orders'
  ) then
    alter publication supabase_realtime add table public.orders;
  end if;
end $$;

-- Realtime sends only the primary key on UPDATE unless the replica identity
-- is full. The tracking page needs the changed status in the payload.
alter table public.orders replica identity full;
