/**
 * Data access layer.
 *
 * Every function here works with or without Supabase: when it is unconfigured
 * the menu reads fall back to local data and the write paths throw a clear
 * error rather than silently pretending to succeed. Silent failure on an order
 * write is the worst outcome — the customer thinks food is coming.
 */
import type { ArtKey } from '../components/DishArt';
import { RESTAURANTS as LOCAL_RESTAURANTS } from '../data';
import type {
  Address,
  CartItem,
  CateringRequestInput,
  Dish,
  DishInput,
  Order,
  OrderStatus,
  PaymentMethod,
  Profile,
  RestaurantWithMenu,
  Review,
} from '../types';
import { IS_SUPABASE_CONFIGURED } from './config';
import { requireSupabase, supabase } from './supabase';

// ---------------------------------------------------------------------------
// Row shapes as they come back from Postgres (snake_case)
// ---------------------------------------------------------------------------

interface RestaurantRow {
  id: string;
  name: string;
  cuisine: string;
  rating: number | string;
  review_count: number;
  delivery_time: number;
  tags: string[] | null;
  logo_text: string;
  address: string;
  city: string;
  opens: string;
  closes: string;
  art_key: string;
}

interface DishRow {
  id: string;
  restaurant_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  art_key: string;
  spice_level: number;
  is_available?: boolean;
}

function mapRestaurant(r: RestaurantRow, dishes: DishRow[]): RestaurantWithMenu {
  return {
    id: r.id,
    name: r.name,
    cuisine: r.cuisine,
    rating: Number(r.rating),
    reviewCount: r.review_count ?? 0,
    deliveryTime: r.delivery_time,
    tags: r.tags ?? [],
    logoText: r.logo_text,
    address: r.address,
    city: r.city ?? 'Kano',
    opens: r.opens,
    closes: r.closes,
    artKey: (r.art_key as ArtKey) ?? 'kitchen',
    dishes: dishes
      .filter((d) => d.restaurant_id === r.id)
      .map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        price: d.price,
        category: d.category as RestaurantWithMenu['dishes'][number]['category'],
        artKey: (d.art_key as ArtKey) ?? 'kitchen',
        spiceLevel: d.spice_level ?? 0,
        isAvailable: d.is_available ?? true,
      })),
  };
}

// ---------------------------------------------------------------------------
// Menus
// ---------------------------------------------------------------------------

export async function fetchRestaurants(): Promise<{
  restaurants: RestaurantWithMenu[];
  source: 'supabase' | 'local';
}> {
  if (!IS_SUPABASE_CONFIGURED || !supabase) {
    return { restaurants: LOCAL_RESTAURANTS, source: 'local' };
  }

  const [{ data: rRows, error: rErr }, { data: dRows, error: dErr }] = await Promise.all([
    supabase.from('restaurants').select('*').eq('is_active', true).order('rating', { ascending: false }),
    supabase.from('dishes').select('*').eq('is_available', true),
  ]);

  // An empty database is a legitimate state before seeding, so fall back
  // rather than showing the user a blank app.
  if (rErr || dErr || !rRows?.length) {
    if (rErr || dErr) {
      console.warn('[kanoeats] Supabase menu read failed, using local data:', rErr ?? dErr);
    }
    return { restaurants: LOCAL_RESTAURANTS, source: 'local' };
  }

  return {
    restaurants: (rRows as RestaurantRow[]).map((r) => mapRestaurant(r, (dRows ?? []) as DishRow[])),
    source: 'supabase',
  };
}

// ---------------------------------------------------------------------------
// Profile and addresses
// ---------------------------------------------------------------------------

export async function fetchProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, phone, role')
    .eq('id', userId)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    fullName: data.full_name ?? '',
    phone: data.phone ?? '',
    role: (data.role as Profile['role']) ?? 'customer',
  };
}

export async function updateProfile(
  userId: string,
  patch: { fullName?: string; phone?: string },
): Promise<void> {
  const client = requireSupabase();
  const { error } = await client
    .from('profiles')
    .update({
      ...(patch.fullName !== undefined ? { full_name: patch.fullName } : {}),
      ...(patch.phone !== undefined ? { phone: patch.phone } : {}),
    })
    .eq('id', userId);
  if (error) throw new Error(error.message);
}

export async function fetchAddresses(userId: string): Promise<Address[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', userId)
    .order('is_default', { ascending: false });

  if (error || !data) return [];
  return data.map((a) => ({
    id: a.id,
    label: a.label,
    line1: a.line1,
    area: a.area ?? '',
    city: a.city ?? 'Kano',
    isDefault: a.is_default,
  }));
}

export async function saveAddress(
  userId: string,
  address: Omit<Address, 'id'>,
): Promise<Address> {
  const client = requireSupabase();

  // Only one default per user — clear the rest first.
  if (address.isDefault) {
    await client.from('addresses').update({ is_default: false }).eq('user_id', userId);
  }

  const { data, error } = await client
    .from('addresses')
    .insert({
      user_id: userId,
      label: address.label,
      line1: address.line1,
      area: address.area,
      city: address.city,
      is_default: address.isDefault,
    })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Could not save address');
  return {
    id: data.id,
    label: data.label,
    line1: data.line1,
    area: data.area ?? '',
    city: data.city ?? 'Kano',
    isDefault: data.is_default,
  };
}

export async function deleteAddress(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('addresses').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export interface CreateOrderInput {
  userId: string;
  reference: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  promoCode: string | null;
  deliveryAddress: string;
  deliveryNotes: string | null;
  scheduledFor: string | null;
  paymentMethod: PaymentMethod;
}

/**
 * Creates the order and its line items.
 *
 * The order row is written first so the items have a parent to reference; if
 * the items insert fails we delete the order rather than leave an empty one
 * that would show up in the customer's history as a phantom.
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const client = requireSupabase();

  const { data: orderRow, error: orderErr } = await client
    .from('orders')
    .insert({
      reference: input.reference,
      user_id: input.userId,
      restaurant_id: input.restaurantId,
      status: 'pending',
      payment_status: 'unpaid',
      payment_method: input.paymentMethod,
      subtotal: input.subtotal,
      delivery_fee: input.deliveryFee,
      discount: input.discount,
      total: input.total,
      promo_code: input.promoCode,
      delivery_address: input.deliveryAddress,
      delivery_notes: input.deliveryNotes,
      scheduled_for: input.scheduledFor,
    })
    .select()
    .single();

  if (orderErr || !orderRow) {
    throw new Error(orderErr?.message ?? 'Could not create your order');
  }

  const { error: itemsErr } = await client.from('order_items').insert(
    input.items.map((item) => ({
      order_id: orderRow.id,
      dish_id: item.dish.id,
      dish_name: item.dish.name,
      unit_price: item.unitPrice,
      quantity: item.quantity,
      options: item.options,
    })),
  );

  if (itemsErr) {
    await client.from('orders').delete().eq('id', orderRow.id);
    throw new Error(`Could not save your order items: ${itemsErr.message}`);
  }

  return {
    id: orderRow.id,
    reference: orderRow.reference,
    restaurantId: orderRow.restaurant_id,
    status: orderRow.status,
    paymentStatus: orderRow.payment_status,
    paymentMethod: orderRow.payment_method,
    subtotal: orderRow.subtotal,
    deliveryFee: orderRow.delivery_fee,
    discount: orderRow.discount,
    total: orderRow.total,
    promoCode: orderRow.promo_code,
    deliveryAddress: orderRow.delivery_address,
    deliveryNotes: orderRow.delivery_notes,
    scheduledFor: orderRow.scheduled_for,
    createdAt: orderRow.created_at,
    items: input.items.map((item, i) => ({
      id: `${orderRow.id}-${i}`,
      dishId: item.dish.id,
      dishName: item.dish.name,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      options: item.options,
    })),
  };
}

export async function fetchOrders(userId: string): Promise<Order[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), restaurants(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    if (error) console.warn('[kanoeats] Could not load orders:', error.message);
    return [];
  }

  return data.map(mapOrderRow);
}

export async function fetchOrderByReference(reference: string): Promise<Order | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), restaurants(name)')
    .eq('reference', reference)
    .maybeSingle();

  if (error || !data) return null;
  return mapOrderRow(data);
}

/** Kitchen-side status transitions. */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('orders').update({ status }).eq('id', orderId);
  if (error) throw new Error(error.message);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapOrderRow(row: any): Order {
  return {
    id: row.id,
    reference: row.reference,
    restaurantId: row.restaurant_id,
    restaurantName: row.restaurants?.name,
    status: row.status,
    paymentStatus: row.payment_status,
    paymentMethod: row.payment_method,
    subtotal: row.subtotal,
    deliveryFee: row.delivery_fee,
    discount: row.discount,
    total: row.total,
    promoCode: row.promo_code,
    deliveryAddress: row.delivery_address,
    deliveryNotes: row.delivery_notes,
    scheduledFor: row.scheduled_for,
    createdAt: row.created_at,
    items: (row.order_items ?? []).map((i: any) => ({
      id: i.id,
      dishId: i.dish_id,
      dishName: i.dish_name,
      unitPrice: i.unit_price,
      quantity: i.quantity,
      options: i.options ?? {},
    })),
  };
}

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export async function fetchReviews(restaurantId: string): Promise<Review[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(full_name)')
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error || !data) {
    if (error) console.warn('[kanoeats] Could not load reviews:', error.message);
    return [];
  }
  return data.map(mapReviewRow);
}

/** Reviews the signed-in user has written, keyed by order id. */
export async function fetchMyReviews(userId: string): Promise<Record<string, Review>> {
  if (!supabase) return {};
  const { data, error } = await supabase.from('reviews').select('*').eq('user_id', userId);
  if (error || !data) return {};
  return Object.fromEntries(data.map((r) => [r.order_id, mapReviewRow(r)]));
}

export async function submitReview(input: {
  orderId: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment: string;
}): Promise<Review> {
  const client = requireSupabase();

  // One review per order. Upsert so editing is the same call as creating and
  // a double submit cannot produce two rows.
  const { data, error } = await client
    .from('reviews')
    .upsert(
      {
        order_id: input.orderId,
        restaurant_id: input.restaurantId,
        user_id: input.userId,
        rating: input.rating,
        comment: input.comment.trim(),
      },
      { onConflict: 'order_id' },
    )
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'Could not save your review');
  }
  return mapReviewRow(data);
}

export async function deleteReview(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('reviews').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Catering
// ---------------------------------------------------------------------------

export async function submitCateringRequest(
  input: CateringRequestInput,
  userId: string | null,
): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('catering_requests').insert({
    user_id: userId,
    full_name: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    occasion: input.occasion,
    event_date: input.eventDate || null,
    guest_count: input.guestCount,
    city: input.city,
    notes: input.notes.trim(),
  });
  if (error) throw new Error(error.message);
}

// ---------------------------------------------------------------------------
// Owner menu management
// ---------------------------------------------------------------------------

/** The restaurant this user owns, if any. */
export async function fetchOwnedRestaurant(userId: string): Promise<RestaurantWithMenu | null> {
  if (!supabase) return null;

  const { data: r, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', userId)
    .maybeSingle();

  if (error || !r) return null;

  // Unavailable dishes are included here: the owner needs to see and re-enable
  // them, unlike a customer browsing the menu.
  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('restaurant_id', r.id)
    .order('category');

  return mapRestaurant(r as RestaurantRow, (dishes ?? []) as DishRow[]);
}

/** Slug built from the dish name; the id is the primary key, so it must be unique. */
function dishId(restaurantId: string, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  return `${restaurantId}-${slug}-${Math.random().toString(36).slice(2, 6)}`;
}

export async function createDish(restaurantId: string, input: DishInput): Promise<Dish> {
  const client = requireSupabase();
  const { data, error } = await client
    .from('dishes')
    .insert({
      id: dishId(restaurantId, input.name),
      restaurant_id: restaurantId,
      name: input.name.trim(),
      description: input.description.trim(),
      price: input.price,
      category: input.category,
      art_key: input.artKey,
      spice_level: input.spiceLevel,
      is_available: input.isAvailable,
    })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Could not add the dish');
  return mapDishRow(data as DishRow);
}

export async function updateDish(id: string, input: Partial<DishInput>): Promise<void> {
  const client = requireSupabase();
  const { error } = await client
    .from('dishes')
    .update({
      ...(input.name !== undefined ? { name: input.name.trim() } : {}),
      ...(input.description !== undefined ? { description: input.description.trim() } : {}),
      ...(input.price !== undefined ? { price: input.price } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.artKey !== undefined ? { art_key: input.artKey } : {}),
      ...(input.spiceLevel !== undefined ? { spice_level: input.spiceLevel } : {}),
      ...(input.isAvailable !== undefined ? { is_available: input.isAvailable } : {}),
    })
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteDish(id: string): Promise<void> {
  const client = requireSupabase();
  const { error } = await client.from('dishes').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

/** Orders placed with a given restaurant — the kitchen queue. */
export async function fetchRestaurantOrders(restaurantId: string): Promise<Order[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*), restaurants(name)')
    .eq('restaurant_id', restaurantId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(mapOrderRow);
}

function mapDishRow(d: DishRow): Dish {
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    price: d.price,
    category: d.category as Dish['category'],
    artKey: (d.art_key as ArtKey) ?? 'kitchen',
    spiceLevel: d.spice_level ?? 0,
    isAvailable: d.is_available ?? true,
  };
}

function mapReviewRow(row: any): Review {
  return {
    id: row.id,
    orderId: row.order_id,
    restaurantId: row.restaurant_id,
    userId: row.user_id,
    rating: row.rating,
    comment: row.comment ?? '',
    createdAt: row.created_at,
    authorName: row.profiles?.full_name || undefined,
  };
}
