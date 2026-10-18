import type { ArtKey } from './components/DishArt';

export type DishCategory = 'Starters' | 'Mains' | 'Drinks' | 'Snacks';

export interface Dish {
  id: string;
  name: string;
  description: string;
  /** Whole naira — no kobo. Format with formatNaira(). */
  price: number;
  category: DishCategory;
  artKey: ArtKey;
  /** 0 = not spicy, 3 = wuta. */
  spiceLevel: number;
  /** Owner-controlled. Absent on local data, where everything is available. */
  isAvailable?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  /** Minutes. */
  deliveryTime: number;
  tags: string[];
  logoText: string;
  address: string;
  city: string;
  opens: string;
  closes: string;
  artKey: ArtKey;
}

export interface RestaurantWithMenu extends Restaurant {
  dishes: Dish[];
}

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra';

export interface CartItemOptions {
  spice: SpiceLevel;
  addons: string[];
}

export interface CartItem {
  /** Stable key for a dish + options combination. */
  key: string;
  dish: Dish;
  restaurantId: string;
  restaurantName: string;
  quantity: number;
  options: CartItemOptions;
  /** Dish price plus any add-ons, per unit. */
  unitPrice: number;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  area: string;
  city: string;
  isDefault: boolean;
}

export interface Profile {
  id: string;
  fullName: string;
  phone: string;
  role: 'customer' | 'owner';
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'unpaid' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'paystack' | 'cash_on_delivery';

export interface OrderItem {
  id: string;
  dishId: string;
  dishName: string;
  unitPrice: number;
  quantity: number;
  options: Partial<CartItemOptions>;
}

export interface Order {
  id: string;
  reference: string;
  restaurantId: string;
  restaurantName?: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode: string | null;
  deliveryAddress: string;
  deliveryNotes: string | null;
  scheduledFor: string | null;
  createdAt: string;
  items: OrderItem[];
}

export interface Review {
  id: string;
  orderId: string;
  restaurantId: string;
  userId: string;
  /** 1–5. */
  rating: number;
  comment: string;
  createdAt: string;
  /** Display name of the reviewer, when the join returned one. */
  authorName?: string;
}

export const CATERING_OCCASIONS = [
  'Wedding fatiha',
  'Naming ceremony',
  'Sallah gathering',
  'Corporate lunch',
  'Ramadan iftar',
  'Birthday',
  'Other',
] as const;

export type CateringOccasion = (typeof CATERING_OCCASIONS)[number];

export type CateringStatus = 'new' | 'contacted' | 'quoted' | 'won' | 'lost';

export interface CateringRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  occasion: string;
  eventDate: string | null;
  guestCount: number;
  city: string;
  notes: string;
  status: CateringStatus;
  createdAt: string;
}

/** Fields a customer fills in on the catering form. */
export type CateringRequestInput = Omit<CateringRequest, 'id' | 'status' | 'createdAt'>;

/** Fields an owner may change on a dish. */
export interface DishInput {
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  artKey: ArtKey;
  spiceLevel: number;
  isAvailable: boolean;
}

/** Add-ons offered on every dish. Priced in whole naira. */
export const ADDONS: { id: string; name: string; price: number }[] = [
  { id: 'extra-yaji', name: 'Extra yaji spice', price: 200 },
  { id: 'kilishi-side', name: 'Kilishi side portion', price: 1200 },
  { id: 'onion-tomato', name: 'Sliced onion & tomato', price: 300 },
  { id: 'kunun-aya', name: 'Chilled kunun aya (50cl)', price: 800 },
];

export const SPICE_LABELS: Record<SpiceLevel, string> = {
  mild: 'Mild',
  medium: 'Medium',
  hot: 'Hot',
  extra: 'Wuta! (extra hot)',
};
