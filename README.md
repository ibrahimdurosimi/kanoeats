# KanoEats

Food delivery for Northern Nigerian (Arewa) cuisine — tsire suya, masa, tuwo
shinkafa, kilishi and kunun aya from verified halal kitchens in Kano.

React 19 · TypeScript · Vite · Tailwind 4 · Supabase · Paystack

---

## Quick start

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` with no configuration. Menus come from
`src/data.ts`, so you can browse kitchens, build a cart and open the checkout
immediately. Accounts, orders and payments need the setup below.

---

## Full setup

### 1. Supabase

Enables accounts, saved addresses, orders and the kitchen dashboard.

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run in order:
   - `supabase/schema.sql`
   - `supabase/migrations/002_reviews_catering_realtime.sql`
   - `supabase/seed.sql`

   All three are re-runnable — the seed updates existing rows rather than
   duplicating them.
3. Copy `.env.example` to `.env.local` and fill in:

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

   Both come from Project Settings → API.

`schema.sql` enables row level security on every table. Customers can read only
their own profile, addresses and orders; kitchen owners can additionally read
orders placed with their kitchen and move those orders through the fulfilment
statuses. Menus are publicly readable.

### 2. Paystack

Enables card, bank transfer and USSD payment. Without it, checkout still works
but offers cash on delivery only.

1. Get your keys from the Paystack dashboard → Settings → API Keys. Use the
   **test** keys while developing.
2. Put the **public** key in `.env.local`:

   ```
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxx
   ```

3. Deploy the verification function and give it the **secret** key:

   ```bash
   supabase functions deploy verify-payment
   supabase secrets set PAYSTACK_SECRET_KEY=sk_test_xxx
   ```

**The secret key must never go in `.env.local`.** Every `VITE_`-prefixed
variable is compiled into the browser bundle and is readable by anyone who
opens devtools.

#### Why payment verification is server-side

Paystack's browser callback says a payment *appears* to have succeeded. It is
not proof — a determined user can call it themselves. So the client never
writes `payment_status`; no RLS policy allows it. Instead the
`verify-payment` Edge Function asks Paystack what actually happened, checks the
amount matches the order total (catching a tampered client-side amount), and
only then marks the order paid using the service role key. It is idempotent, so
a refresh or a duplicate callback cannot double-process an order.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload on port 5173 |
| `npm run build` | Production build to `dist/` |
| `npm run start` | Serve the production build on port 3000 |
| `npm run cf:preview` | Build, then serve on the Cloudflare Workers runtime locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |
| `npm run lint` | TypeScript check, no emit |
| `npm test` | Render every page server-side and assert on the markup |
| `npm run verify` | lint + build + test |

---

## Deployment (Cloudflare)

### Option A — connect the repo (recommended for previews)

In the Cloudflare dashboard, create a Worker (or Pages project) from this
GitHub repo and set:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 or later |

Every push then gets its own preview URL, and the production branch deploys
automatically.

### Option B — deploy from your machine

```bash
npx wrangler login
npm run deploy
```

`wrangler.jsonc` holds the configuration. To check it on the real Workers
runtime before shipping:

```bash
npm run cf:preview
```

### Environment variables

Add these in the Cloudflare dashboard under the project's **Variables and
Secrets**, for both production and preview:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_PAYSTACK_PUBLIC_KEY
```

They are read at **build** time, not run time, so changing one requires a
redeploy to take effect.

With none of them set the deploy still works — you get a browsable site
running on the local menu data, which is enough for a design preview. Sign-in
and checkout will tell the user they are unavailable rather than failing
silently.

`PAYSTACK_SECRET_KEY` does **not** belong here. It goes to Supabase
(`supabase secrets set`), because every `VITE_`-prefixed variable is compiled
into the browser bundle.

### Why SPA fallback matters

`not_found_handling: "single-page-application"` in `wrangler.jsonc` (and
`public/_redirects` for Pages) returns `index.html` for any path that is not a
real file. Without it, `/kitchens/kano-suya-palace` 404s on refresh and on any
shared link — the site works only for people who enter through the home page.

One consequence worth knowing: a missing asset also returns `index.html` with
a 200 rather than a 404. After a redeploy, a tab left open may request a code
chunk that no longer exists and receive HTML where it expects JavaScript.
`ErrorBoundary` detects that specific failure and reloads onto the new
version, once, rather than showing a cryptic MIME-type error.

---

## Project structure

```
src/
  components/
    DishArt.tsx        Inline SVG dish illustrations
    Avatar.tsx         Generated avatars (deterministic per name)
    CartDrawer.tsx     Slide-out cart
    DishModal.tsx      Dish options: spice level, add-ons, quantity
    RestaurantCard.tsx
    landing/           Marketing page sections
    layout/
      AppShell.tsx     Sidebar, topbar, bottom nav — one chrome for all in-app routes
      RequireAuth.tsx  Auth gate
      SiteFooter.tsx
  context/
    AuthContext.tsx    Supabase session and profile
    CartContext.tsx    Cart state, persisted to localStorage
    SearchContext.tsx  Search query shared between shell and pages
    ToastContext.tsx
  hooks/
    useRestaurants.ts  Menus, cached at module level
    useOrders.ts
  lib/
    api.ts             All data access
    config.ts          Env flags and delivery economics
    format.ts          Naira and date formatting
    paystack.ts        Inline checkout + verification call
    supabase.ts        Client, or null when unconfigured
  pages/               One file per route
  data.ts              Local menu data and seed source
  types.ts
supabase/
  schema.sql           Tables, triggers, RLS policies
  seed.sql             Generated from src/data.ts
  functions/verify-payment/
```

---

## Conventions worth keeping

**Money is integer naira.** Never a float — `0.1 + 0.2` problems become
customer-visible on an order total. Format with `formatNaira()`. Paystack is
the only place kobo appears, and the conversion happens at the boundary in
`lib/paystack.ts`.

**Imagery is inline SVG, not photography.** `DishArt.tsx` draws each dish.
This is deliberate: external photo URLs produced broken-image states, cost
bandwidth on mobile networks, and the stock photos previously used showed
Western cafés and cream-sauce dishes standing in for Hausa kitchens. If you
add real photography later, commission it — do not reach for stock.

**UI labels use plain product language.** An earlier build shipped "Surfer
rating", "Transit Protocol" and "Stove coordinate" where it meant Rating,
Delivery options and Location. If a label sounds inventive, it is wrong.

**Addresses must be internally consistent.** Every kitchen in `src/data.ts`
operates in Kano and has a real Kano address. An earlier build had
"Post Office Road, Kano / 12 Admiralty Way, Lekki, Lagos" in one field and
Lagos addresses on Kano kitchens.

**One kitchen per cart.** A rider collects from one place. `CartContext`
enforces this and surfaces a clear message rather than silently mixing.

**Supabase may be absent.** `supabase` is `null` when unconfigured rather than
a client pointed at a placeholder URL, so each call site has to decide what to
do without a backend. Read paths fall back to local data; write paths throw a
clear error instead of pretending to succeed.

---

## How a few things work

**Ratings are computed in the database.** A trigger on `reviews` recalculates
`restaurants.rating` and `review_count` on every insert, update and delete.
Doing it in Postgres rather than the client means every reader sees the same
number and no client can write an arbitrary rating onto a restaurant row.

**A review is tied to an order, not to a person.** One review per order,
enforced by a unique constraint, and the RLS policy only permits it when that
order belongs to you *and* has status `delivered`. That is what stops a rating
being written by someone who never ordered.

**Order updates arrive over realtime.** `useRealtimeOrder` subscribes to the
`orders` table; RLS applies to realtime too, so a customer receives events only
for their own orders and a kitchen only for orders placed with it. A slow
60-second poll stays underneath as a safety net, because a socket that drops
silently on a patchy mobile connection is worse than one update arriving late.
`orders` is set to `replica identity full` so updates carry the changed row,
not just its primary key.

**Catering enquiries do not require an account.** The insert policy is open;
the select policy is not, so only the person who submitted a request can read
it back.

---

## Not yet built

- Rider app and live GPS tracking
- Push notifications
- Admin view for catering requests (they land in the table; no UI yet)
- Owner self-service for restaurant details — only the menu is editable
- Component-level tests beyond the render smoke test
