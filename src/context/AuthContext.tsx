import type { Session, User } from '@supabase/supabase-js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { fetchProfile } from '../lib/api';
import { IS_SUPABASE_CONFIGURED } from '../lib/config';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  /** True until the initial session check resolves — gate redirects on this. */
  loading: boolean;
  isAuthenticated: boolean;
  /** False when Supabase has no credentials; the UI explains rather than failing. */
  authAvailable: boolean;
  signUp: (input: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }) => Promise<{ error: string | null; needsConfirmation: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(IS_SUPABASE_CONFIGURED);

  const loadProfile = useCallback(async (u: User | null) => {
    if (!u) {
      setProfile(null);
      return;
    }
    setProfile(await fetchProfile(u.id));
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      void loadProfile(data.session?.user ?? null).finally(() => {
        if (active) setLoading(false);
      });
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!active) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      void loadProfile(newSession?.user ?? null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signUp: AuthContextValue['signUp'] = useCallback(async (input) => {
    if (!supabase) {
      return { error: 'Accounts need a Supabase connection. See README for setup.', needsConfirmation: false };
    }
    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      // Picked up by the handle_new_user trigger to populate profiles.
      options: { data: { full_name: input.fullName, phone: input.phone } },
    });
    if (error) return { error: error.message, needsConfirmation: false };

    // With email confirmation on, signUp returns a user but no session.
    return { error: null, needsConfirmation: Boolean(data.user && !data.session) };
  }, []);

  const signIn: AuthContextValue['signIn'] = useCallback(async (email, password) => {
    if (!supabase) {
      return { error: 'Sign in needs a Supabase connection. See README for setup.' };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(() => loadProfile(user), [loadProfile, user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      session,
      loading,
      isAuthenticated: Boolean(user),
      authAvailable: IS_SUPABASE_CONFIGURED,
      signUp,
      signIn,
      signOut,
      refreshProfile,
    }),
    [user, profile, session, loading, signUp, signIn, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
