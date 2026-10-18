/**
 * verify-payment — Supabase Edge Function (Deno).
 *
 * The only component permitted to mark an order paid. It asks Paystack what
 * actually happened, checks the amount matches the order total, and only then
 * updates the row using the service role key.
 *
 * Deploy:
 *   supabase functions deploy verify-payment
 *   supabase secrets set PAYSTACK_SECRET_KEY=sk_live_or_test_xxx
 *
 * PAYSTACK_SECRET_KEY must never appear in client code or in VITE_* variables —
 * anything prefixed VITE_ is compiled into the browser bundle.
 */

// @ts-expect-error — resolved by Deno at deploy time, not by the app's tsconfig.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

declare const Deno: { env: { get(key: string): string | undefined } };

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

Deno.env.get('PAYSTACK_SECRET_KEY');

// @ts-expect-error — Deno global serve
Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ verified: false, message: 'Method not allowed' }, 405);

  const paystackSecret = Deno.env.get('PAYSTACK_SECRET_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!paystackSecret || !supabaseUrl || !serviceKey) {
    return json({ verified: false, message: 'Payment verification is not configured' }, 500);
  }

  let reference: string | undefined;
  try {
    ({ reference } = await req.json());
  } catch {
    return json({ verified: false, message: 'Invalid request body' }, 400);
  }

  if (!reference || typeof reference !== 'string') {
    return json({ verified: false, message: 'A payment reference is required' }, 400);
  }

  // Service role bypasses RLS — required to write payment_status, which no
  // client-side policy allows.
  const admin = createClient(supabaseUrl, serviceKey);

  const { data: order, error: orderErr } = await admin
    .from('orders')
    .select('id, total, payment_status')
    .eq('reference', reference)
    .maybeSingle();

  if (orderErr || !order) {
    return json({ verified: false, message: 'Order not found' }, 404);
  }

  // Idempotent: a double callback or a page refresh must not re-process.
  if (order.payment_status === 'paid') {
    return json({ verified: true, message: 'Payment already confirmed' });
  }

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${paystackSecret}` },
  });

  if (!res.ok) {
    return json({ verified: false, message: 'Could not reach Paystack' }, 502);
  }

  const payload = await res.json();
  const tx = payload?.data;

  if (!payload?.status || tx?.status !== 'success') {
    await admin.from('orders').update({ payment_status: 'failed' }).eq('id', order.id);
    return json({ verified: false, message: 'Payment was not successful' });
  }

  // Paystack reports kobo. A mismatch means the amount was tampered with
  // client-side, so refuse rather than fulfil an underpaid order.
  const expectedKobo = Math.round(Number(order.total) * 100);
  if (Number(tx.amount) !== expectedKobo) {
    await admin.from('orders').update({ payment_status: 'failed' }).eq('id', order.id);
    return json({ verified: false, message: 'Payment amount did not match the order total' });
  }

  const { error: updateErr } = await admin
    .from('orders')
    .update({ payment_status: 'paid', status: 'confirmed' })
    .eq('id', order.id);

  if (updateErr) {
    return json({ verified: false, message: 'Payment succeeded but the order could not be updated' }, 500);
  }

  return json({ verified: true, message: 'Payment confirmed' });
});
