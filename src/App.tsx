import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import RequireAuth from './components/layout/RequireAuth';

/**
 * Routes are lazy-loaded so a first-time visitor landing on the marketing page
 * does not download the checkout, orders and kitchen-admin code they may never
 * open. The landing page is eager because it is the most common entry point.
 */
import LandingPage from './pages/LandingPage';

const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const CateringPage = lazy(() => import('./pages/CateringPage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const RestaurantPage = lazy(() => import('./pages/RestaurantPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OwnerDashboardPage = lazy(() => import('./pages/OwnerDashboardPage'));

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-[#E4DACA] border-t-[#DF5F49]"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public marketing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/catering" element={<CateringPage />} />
        <Route path="/signin" element={<AuthPage mode="signin" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />

        {/* The ordering app — browsing is open, checkout and orders are not */}
        <Route element={<AppShell />}>
          <Route path="/kitchens" element={<DiscoverPage />} />
          <Route path="/kitchens/:restaurantId" element={<RestaurantPage />} />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <CheckoutPage />
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <OrdersPage />
              </RequireAuth>
            }
          />
          <Route
            path="/orders/:reference"
            element={
              <RequireAuth>
                <OrderTrackingPage />
              </RequireAuth>
            }
          />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path="/kitchen-admin"
            element={
              <RequireAuth>
                <OwnerDashboardPage />
              </RequireAuth>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
