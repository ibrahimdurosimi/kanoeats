import { ClipboardList, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import DishArt, { artFor } from '../components/DishArt';
import { useOrders } from '../hooks/useOrders';
import { useRestaurants } from '../hooks/useRestaurants';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatNaira, formatRelative } from '../lib/format';
import type { OrderStatus } from '../types';

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-[#FBEFD6] text-[#7A5510]',
  confirmed: 'bg-[#DDEBE3] text-[#0F4132]',
  preparing: 'bg-[#FBEFD6] text-[#7A5510]',
  on_the_way: 'bg-[#DDEBE3] text-[#0F4132]',
  delivered: 'bg-[#E2F0E4] text-[#2C6B3A]',
  cancelled: 'bg-[#FBE4DE] text-[#A83E2A]',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  on_the_way: 'On the way',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function OrdersPage() {
  const { orders, loading } = useOrders();
  const { restaurants } = useRestaurants();
  const { addItem, openCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  /** Rebuilds the cart from a past order, skipping anything no longer on the menu. */
  const reorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const restaurant = restaurants.find((r) => r.id === order.restaurantId);
    if (!restaurant) {
      toast('That kitchen is no longer available', 'error');
      return;
    }

    let added = 0;
    let missing = 0;

    for (const item of order.items) {
      const dish = restaurant.dishes.find((d) => d.id === item.dishId);
      if (!dish) {
        missing++;
        continue;
      }
      const result = addItem(
        dish,
        restaurant.id,
        restaurant.name,
        {
          spice: item.options?.spice ?? 'medium',
          addons: item.options?.addons ?? [],
        },
        item.quantity,
      );
      if (!result.ok) {
        toast(`Clear your cart first — it has items from ${result.conflict}`, 'error');
        return;
      }
      added++;
    }

    if (added === 0) {
      toast('None of those dishes are on the menu right now', 'error');
      return;
    }
    toast(missing ? `Added ${added} items — ${missing} unavailable` : 'Added to your cart');
    openCart();
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-[900px] space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-[#EFE6D5]" />
        ))}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[900px]">
      <h1 className="font-display text-[clamp(26px,3.2vw,34px)] font-bold text-[#0A2E24]">
        Your orders
      </h1>
      <p className="mt-1 text-sm text-[#6C7C73]">Track what is on its way and reorder past favourites.</p>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-3xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-16 text-center">
          <ClipboardList size={52} className="mx-auto mb-4 text-[#6C7C73] opacity-50" strokeWidth={1.4} />
          <h2 className="font-display text-lg font-bold text-[#0A2E24]">No orders yet</h2>
          <p className="mx-auto mt-1.5 max-w-sm text-sm text-[#6C7C73]">
            Once you order from a kitchen it will appear here, ready to track or reorder.
          </p>
          <button
            onClick={() => navigate('/kitchens')}
            className="mt-5 rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
          >
            Browse kitchens
          </button>
        </div>
      ) : (
        <div className="mt-7 space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-5 transition hover:border-[#E9A93A]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    to={`/orders/${order.reference}`}
                    className="font-display text-lg font-bold text-[#0A2E24] hover:underline"
                  >
                    {order.restaurantName ?? 'Order'}
                  </Link>
                  <p className="mt-0.5 text-[12.5px] text-[#6C7C73]">
                    {order.reference} · {formatRelative(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold ${STATUS_STYLES[order.status]}`}
                >
                  {STATUS_LABELS[order.status].toUpperCase()}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {order.items.slice(0, 4).map((item) => (
                  <span
                    key={item.id}
                    className="flex items-center gap-2 rounded-full bg-[#FAF5EC] py-1.5 pl-1.5 pr-3.5"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#F2E8D7]">
                      <DishArt art={artFor(item.dishName)} className="h-5 w-5" />
                    </span>
                    <span className="text-[12px] font-medium">
                      {item.quantity}× {item.dishName}
                    </span>
                  </span>
                ))}
                {order.items.length > 4 && (
                  <span className="text-[12px] text-[#6C7C73]">
                    +{order.items.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-[#E4DACA] pt-4">
                <span className="font-display text-xl font-bold text-[#0A2E24]">
                  {formatNaira(order.total)}
                </span>
                <div className="flex gap-2.5">
                  <Link
                    to={`/orders/${order.reference}`}
                    className="rounded-full border-[1.5px] border-[#E4DACA] px-4 py-2 text-[13px] font-semibold transition hover:border-[#166049]"
                  >
                    Track order
                  </Link>
                  <button
                    onClick={() => reorder(order.id)}
                    className="flex items-center gap-1.5 rounded-full bg-[#E9A93A] px-4 py-2 text-[13px] font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
                  >
                    <RotateCcw size={14} />
                    Order again
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
