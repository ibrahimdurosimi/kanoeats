import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Gate for pages that need a signed-in user.
 *
 * Waits for the initial session check before redirecting — otherwise a page
 * refresh bounces an authenticated user to sign-in while Supabase is still
 * rehydrating the session from storage.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-[#E4DACA] border-t-[#DF5F49]"
          role="status"
          aria-label="Checking your session"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Remember where they were headed so sign-in can send them back.
    return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
