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
import MenuEditor from '../src/components/MenuEditor';
import ReviewList from '../src/components/ReviewList';
import ReviewModal from '../src/components/ReviewModal';
import StarRating from '../src/components/StarRating';
import AuthPage from '../src/pages/AuthPage';
import CateringPage from '../src/pages/CateringPage';
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

const sampleReviews = [
  {
    id: 'r1', orderId: 'o1', restaurantId: 'kano-suya-palace', userId: 'u1',
    rating: 5, comment: 'Properly charred, arrived hot.',
    createdAt: new Date().toISOString(), authorName: 'Fatima A.',
  },
  {
    id: 'r2', orderId: 'o2', restaurantId: 'kano-suya-palace', userId: 'u2',
    rating: 4, comment: '', createdAt: new Date().toISOString(),
  },
];

const sampleOrder = {
  id: 'o1', reference: 'KE-TEST01', restaurantId: 'kano-suya-palace',
  restaurantName: 'Kano Suya Palace', status: 'delivered' as const,
  paymentStatus: 'paid' as const, paymentMethod: 'paystack' as const,
  subtotal: 3500, deliveryFee: 1200, discount: 0, total: 4700,
  promoCode: null, deliveryAddress: 'Nassarawa GRA, Kano', deliveryNotes: null,
  scheduledFor: null, createdAt: new Date().toISOString(),
  items: [{ id: 'i1', dishId: dish.id, dishName: dish.name, unitPrice: 3500, quantity: 1, options: {} }],
};

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
  CateringPage: () => wrap(<CateringPage />),
  StarRating: () => wrap(<StarRating value={4} />),
  'StarRating (input)': () => wrap(<StarRating value={3} onChange={() => {}} />),
  ReviewList: () => wrap(<ReviewList reviews={sampleReviews} loading={false} />),
  'ReviewList (empty)': () => wrap(<ReviewList reviews={[]} loading={false} />),
  ReviewModal: () => wrap(<ReviewModal order={sampleOrder} onClose={() => {}} onSaved={() => {}} />),
  MenuEditor: () => wrap(
    <MenuEditor restaurantId="kano-suya-palace" dishes={RESTAURANTS[1].dishes} onChange={() => {}} />,
  ),
  'MenuEditor (empty)': () => wrap(
    <MenuEditor restaurantId="kano-suya-palace" dishes={[]} onChange={() => {}} />,
  ),
};
