/**
 * Runtime configuration.
 *
 * Every integration is optional. With no credentials the app still runs
 * end-to-end against local data, so a developer can clone and `npm run dev`
 * without a Supabase project. Each flag below says what degrades when it is off.
 */

const env = import.meta.env;

export const SUPABASE_URL: string = env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY: string = env.VITE_SUPABASE_ANON_KEY ?? '';

/** Without this, menus come from src/data.ts and auth/orders are unavailable. */
export const IS_SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const PAYSTACK_PUBLIC_KEY: string = env.VITE_PAYSTACK_PUBLIC_KEY ?? '';

/** Without this, checkout falls back to cash on delivery only. */
export const IS_PAYSTACK_CONFIGURED = Boolean(PAYSTACK_PUBLIC_KEY);

/** Delivery economics, in whole naira. */
export const DELIVERY_FEE = 1200;
export const FREE_DELIVERY_THRESHOLD = 15000;

/** Promo codes resolved client-side for display; the server recomputes on verify. */
export const PROMO_CODES: Record<string, { percent: number; label: string }> = {
  SUYA20: { percent: 20, label: '20% off suya and grills' },
  AREWA10: { percent: 10, label: '10% off your order' },
};

export const DELIVERY_ZONES = [
  { city: 'Kano', areas: ['Nassarawa', 'Fagge', 'Sabon Gari', 'Bompai', 'Dala'], live: true },
  { city: 'Kaduna', areas: ['Barnawa', 'Ungwan Rimi', 'Kawo'], live: true },
  { city: 'Abuja', areas: ['Wuse', 'Garki', 'Gwarinpa', 'Maitama'], live: true },
  { city: 'Lagos', areas: ['Lekki', 'Ikoyi', 'Victoria Island', 'Yaba'], live: false },
];
