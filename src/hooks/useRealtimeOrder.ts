import { useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';

/**
 * Live order updates over Supabase realtime.
 *
 * RLS applies to realtime as well as to queries, so a customer only receives
 * events for their own orders and an owner only for orders placed with their
 * kitchen. No filtering is needed on this side.
 *
 * A slow poll stays in place underneath as a safety net. Realtime drops
 * silently on a flaky mobile connection, and an order status that quietly
 * stops updating is worse than one that updates a minute late.
 */
export function useRealtimeOrder(
  orderId: string | null,
  onChange: (patch: Partial<Order>) => void,
  refetch?: () => void,
) {
  // Held in a ref so a new inline callback on every render does not tear the
  // subscription down and build it back up.
  const onChangeRef = useRef(onChange);
  const refetchRef = useRef(refetch);
  onChangeRef.current = onChange;
  refetchRef.current = refetch;

  useEffect(() => {
    if (!orderId) return;

    // Fall back to polling alone when there is no Supabase project.
    if (!supabase) {
      const timer = setInterval(() => refetchRef.current?.(), 20000);
      return () => clearInterval(timer);
    }

    const channel = supabase
      .channel(`order:${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          onChangeRef.current({
            status: row.status as Order['status'],
            paymentStatus: row.payment_status as Order['paymentStatus'],
          });
        },
      )
      .subscribe();

    // 60s rather than 20s: realtime carries the load, this only catches drops.
    const timer = setInterval(() => refetchRef.current?.(), 60000);

    return () => {
      clearInterval(timer);
      void supabase.removeChannel(channel);
    };
  }, [orderId]);
}

/**
 * Live updates for every order belonging to one kitchen, so the queue reacts
 * as customers place and pay for orders.
 */
export function useRealtimeRestaurantOrders(
  restaurantId: string | null,
  onInsert: () => void,
  onUpdate: (orderId: string, patch: Partial<Order>) => void,
) {
  const onInsertRef = useRef(onInsert);
  const onUpdateRef = useRef(onUpdate);
  onInsertRef.current = onInsert;
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (!restaurantId || !supabase) return;

    const channel = supabase
      .channel(`kitchen:${restaurantId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'orders',
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        // A new order arrives without its line items, so refetch rather than
        // push an incomplete row into the queue.
        () => onInsertRef.current(),
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        (payload) => {
          const row = payload.new as Record<string, unknown>;
          onUpdateRef.current(row.id as string, {
            status: row.status as Order['status'],
            paymentStatus: row.payment_status as Order['paymentStatus'],
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [restaurantId]);
}
