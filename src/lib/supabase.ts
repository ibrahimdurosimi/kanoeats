import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { IS_SUPABASE_CONFIGURED, SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

/**
 * The Supabase client, or null when the project has no credentials.
 *
 * Null rather than a client pointed at a placeholder URL: a placeholder client
 * produces confusing network errors at call sites, whereas null forces each
 * caller to decide explicitly what to do without a backend.
 */
export const supabase: SupabaseClient | null = IS_SUPABASE_CONFIGURED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

/** Narrowing helper so call sites get a non-null client or a clear throw. */
export function requireSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local.',
    );
  }
  return supabase;
}
