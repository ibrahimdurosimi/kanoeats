/**
 * Paystack inline checkout.
 *
 * Only the PUBLIC key is used here. Payment verification happens in the
 * `verify-payment` Edge Function, which holds the secret key — a browser that
 * can mark its own order paid is a browser that can order free food, so the
 * client never writes payment_status.
 */
import { PAYSTACK_PUBLIC_KEY } from './config';
import { supabase } from './supabase';

const PAYSTACK_SCRIPT = 'https://js.paystack.co/v1/inline.js';

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackSetupOptions {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  metadata?: Record<string, unknown>;
  channels?: string[];
  onClose: () => void;
  callback: (response: { reference: string; status?: string }) => void;
}

declare global {
  interface Window {
    PaystackPop?: { setup: (options: PaystackSetupOptions) => PaystackHandler };
  }
}

let scriptPromise: Promise<void> | null = null;

/** Loads the Paystack script once and reuses the promise on later calls. */
function loadPaystackScript(): Promise<void> {
  if (window.PaystackPop) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PAYSTACK_SCRIPT}"]`);
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Paystack failed to load')));
      return;
    }

    const script = document.createElement('script');
    script.src = PAYSTACK_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null; // allow a retry on a flaky connection
      reject(new Error('Could not reach Paystack. Check your connection and try again.'));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export interface PayOptions {
  email: string;
  /** Whole naira. Converted to kobo here — Paystack bills in the minor unit. */
  amountNaira: number;
  reference: string;
  metadata?: Record<string, unknown>;
}

export type PayResult =
  | { status: 'success'; reference: string }
  | { status: 'cancelled' }
  | { status: 'error'; message: string };

/** Opens the Paystack modal and resolves once the customer finishes or closes it. */
export async function payWithPaystack(options: PayOptions): Promise<PayResult> {
  if (!PAYSTACK_PUBLIC_KEY) {
    return { status: 'error', message: 'Card payment is not configured. Choose cash on delivery.' };
  }

  try {
    await loadPaystackScript();
  } catch (e) {
    return { status: 'error', message: e instanceof Error ? e.message : 'Paystack failed to load' };
  }

  if (!window.PaystackPop) {
    return { status: 'error', message: 'Paystack is unavailable right now.' };
  }

  return new Promise<PayResult>((resolve) => {
    let settled = false;
    const settle = (result: PayResult) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    const handler = window.PaystackPop!.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: options.email,
      amount: Math.round(options.amountNaira * 100),
      currency: 'NGN',
      ref: options.reference,
      metadata: options.metadata,
      channels: ['card', 'bank', 'ussd', 'bank_transfer'],
      // Fires on dismissal. If the callback already ran this is a no-op.
      onClose: () => settle({ status: 'cancelled' }),
      callback: (response) => settle({ status: 'success', reference: response.reference }),
    });

    handler.openIframe();
  });
}

/**
 * Asks the Edge Function to confirm the transaction with Paystack and flip the
 * order to paid. Returns false if anything is off — never assume success.
 */
export async function verifyPayment(
  reference: string,
): Promise<{ verified: boolean; message?: string }> {
  if (!supabase) return { verified: false, message: 'Supabase is not configured' };

  try {
    const { data, error } = await supabase.functions.invoke('verify-payment', {
      body: { reference },
    });
    if (error) return { verified: false, message: error.message };
    return { verified: Boolean(data?.verified), message: data?.message };
  } catch (e) {
    return {
      verified: false,
      message: e instanceof Error ? e.message : 'Could not verify the payment',
    };
  }
}
