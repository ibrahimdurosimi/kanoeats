import { renderToString } from 'react-dom/server';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import { CartProvider } from '../src/context/CartContext';
import { SearchProvider } from '../src/context/SearchContext';
import { ToastProvider } from '../src/context/ToastContext';

import AppShell from '../src/components/layout/AppShell';
import CartDrawer from '../src/components/CartDrawer';
import DishModal from '../src/components/DishModal';
import RestaurantCard from '../src/components/RestaurantCard';
import AuthPage from '../src/pages/AuthPage';
import CheckoutPage from '../src/pages/CheckoutPage';
import DiscoverPage from '../src/pages/DiscoverPage';
import HowItWorksPage from '../src/pages/HowItWorksPage';
import OrderTrackingPage from '../src/pages/OrderTrackingPage';
import OrdersPage from '../src/pages/OrdersPage';
import OwnerDashboardPage from '../src/pages/OwnerDashboardPage';
import ProfilePage from '../src/pages/ProfilePage';
import RestaurantPage from '../src/pages/RestaurantPage';
import { RESTAURANTS } from '../src/data';

function wrap(node: React.ReactNode, path = '/') {
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider><CartProvider><ToastProvider><SearchProvider>
        {node}
      </SearchProvider></ToastProvider></CartProvider></AuthProvider>
    </MemoryRouter>,
  );
}

const dish = RESTAURANTS[1].dishes[0];

export const CASES: Record<string, () => string> = {
  DiscoverPage: () => wrap(<Routes><Route element={<AppShell />}><Route path="/" element={<DiscoverPage />} /></Route></Routes>),
  RestaurantPage: () => wrap(<Routes><Route element={<AppShell />}><Route path="/kitchens/:restaurantId" element={<RestaurantPage />} /></Route></Routes>, '/kitchens/kano-suya-palace'),
  'RestaurantPage (404)': () => wrap(<Routes><Route element={<AppShell />}><Route path="/kitchens/:restaurantId" element={<RestaurantPage />} /></Route></Routes>, '/kitchens/nope'),
  CheckoutPage: () => wrap(<CheckoutPage />),
  OrdersPage: () => wrap(<OrdersPage />),
  OrderTrackingPage: () => wrap(<Routes><Route path="/orders/:reference" element={<OrderTrackingPage />} /></Routes>, '/orders/KE-TEST'),
  ProfilePage: () => wrap(<ProfilePage />),
  OwnerDashboardPage: () => wrap(<OwnerDashboardPage />),
  HowItWorksPage: () => wrap(<HowItWorksPage />),
  'AuthPage signin': () => wrap(<AuthPage mode="signin" />),
  'AuthPage signup': () => wrap(<AuthPage mode="signup" />),
  CartDrawer: () => wrap(<CartDrawer />),
  DishModal: () => wrap(<DishModal dish={dish} restaurantId="kano-suya-palace" restaurantName="Kano Suya Palace" onClose={() => {}} />),
  RestaurantCard: () => wrap(<RestaurantCard restaurant={RESTAURANTS[0]} />),
};
