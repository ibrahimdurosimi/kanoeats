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
  Order,
  OrderStatus,
  PaymentMethod,
  Profile,
  RestaurantWithMenu,
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
