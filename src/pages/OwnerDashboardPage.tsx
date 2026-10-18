import { ChefHat, PackageCheck, Star, Store, TrendingUp } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import MenuEditor from '../components/MenuEditor';
import ReviewList from '../components/ReviewList';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useRealtimeRestaurantOrders } from '../hooks/useRealtimeOrder';
import {
  fetchOwnedRestaurant,
  fetchRestaurantOrders,
  fetchReviews,
  updateOrderStatus,
} from '../lib/api';
import { formatNaira, formatRelative } from '../lib/format';
import type { Order, OrderStatus, RestaurantWithMenu, Review } from '../types';

/** The next status a kitchen can move an order to. */
const NEXT_STATUS: Partial<Record<OrderStatus, { to: OrderStatus; label: string }>> = {
  pending: { to: 'confirmed', label: 'Accept order' },
  confirmed: { to: 'preparing', label: 'Start preparing' },
  preparing: { to: 'on_the_way', label: 'Hand to rider' },
  on_the_way: { to: 'delivered', label: 'Mark delivered' },
};

type Tab = 'queue' | 'menu' | 'reviews';

export default function OwnerDashboardPage() {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [restaurant, setRestaurant] = useState<RestaurantWithMenu | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('queue');

  const loadRestaurant = useCallback(async () => {
    if (!user) return;
    const owned = await fetchOwnedRestaurant(user.id);
    setRestaurant(owned);
    return owned;
  }, [user]);

  const loadOrders = useCallback(async (restaurantId: string) => {
    setOrders(await fetchRestaurantOrders(restaurantId));
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
      const owned = await loadRestaurant();
      if (!active) return;
      if (owned) {
        await Promise.all([
          loadOrders(owned.id),
          fetchReviews(owned.id).then((r) => active && setReviews(r)),
        ]);
      }
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [loadRestaurant, loadOrders]);

  // New orders and payment confirmations arrive without a refresh, which is
  // the difference between a kitchen screen you watch and one you reload.
  useRealtimeRestaurantOrders(
    restaurant?.id ?? null,
    () => {
      if (restaurant) void loadOrders(restaurant.id);
      toast('New order received', 'info');
    },
    (orderId, patch) =>
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...patch } : o))),
  );

  const stats = useMemo(() => {
    const delivered = orders.filter((o) => o.status === 'delivered');
    const active = orders.filter((o) => !['delivered', 'cancelled'].includes(o.status));
    // Revenue counts delivered orders only — an accepted order is not money.
    const revenue = delivered.reduce((sum, o) => sum + o.total, 0);
    const avgRating = reviews.length
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;
    return { delivered: delivered.length, active: active.length, revenue, avgRating };
  }, [orders, reviews]);

  const advance = async (order: Order) => {
    const next = NEXT_STATUS[order.status];
    if (!next) return;
    try {
      await updateOrderStatus(order.id, next.to);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: next.to } : o)));
      toast(`${order.reference} → ${next.to.replace('_', ' ')}`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not update the order', 'error');
    }
  };

  if (profile && profile.role !== 'owner') {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <Store size={48} className="mx-auto mb-4 text-[#6C7C73] opacity-50" strokeWidth={1.5} />
        <h1 className="font-display text-2xl font-bold text-[#0A2E24]">Kitchen owners only</h1>
        <p className="mt-2 text-sm text-[#6C7C73]">
          This dashboard is for partner kitchens. Contact us to list your kitchen on KanoEats.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[1100px] space-y-4">
        <div className="h-10 w-64 animate-pulse rounded bg-[#EFE6D5]" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-[#EFE6D5]" />
          ))}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <Store size={48} className="mx-auto mb-4 text-[#6C7C73] opacity-50" strokeWidth={1.5} />
        <h1 className="font-display text-2xl font-bold text-[#0A2E24]">No kitchen linked yet</h1>
        <p className="mt-2 text-sm text-[#6C7C73]">
          Your account is marked as an owner, but no kitchen is assigned to it. We set that link up
          when a kitchen is onboarded — message support and we will sort it.
        </p>
        <a
          href="https://wa.me/2348123456789"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22]"
        >
          Message support
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1100px]">
      <h1 className="font-display text-[clamp(26px,3.2vw,34px)] font-bold text-[#0A2E24]">
        {restaurant.name}
      </h1>
      <p className="mt-1 text-sm text-[#6C7C73]">{restaurant.address}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ChefHat} label="Active orders" value={String(stats.active)} />
        <StatCard icon={PackageCheck} label="Delivered" value={String(stats.delivered)} />
        <StatCard icon={TrendingUp} label="Revenue" value={formatNaira(stats.revenue)} />
        <StatCard
          icon={Star}
          label={`${reviews.length} review${reviews.length === 1 ? '' : 's'}`}
          value={stats.avgRating ? stats.avgRating.toFixed(1) : '—'}
        />
      </div>

      <div className="mt-8 flex w-fit rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-1">
        {(
          [
            ['queue', `Order queue${stats.active ? ` (${stats.active})` : ''}`],
            ['menu', 'Menu'],
            ['reviews', 'Reviews'],
          ] as [Tab, string][]
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
              tab === key ? 'bg-[#0F4132] text-white' : 'text-[#4A5A52]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'queue' &&
          (orders.length === 0 ? (
            <div className="rounded-3xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-14 text-center">
              <h3 className="font-display text-lg font-bold text-[#0A2E24]">No orders yet</h3>
              <p className="mt-1.5 text-sm text-[#6C7C73]">
                New orders appear here the moment they are placed — no need to refresh.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => {
                const next = NEXT_STATUS[order.status];
                return (
                  <article
                    key={order.id}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-5"
                  >
                    <div className="min-w-[180px] flex-1">
                      <p className="font-display text-base font-bold text-[#0A2E24]">
                        {order.reference}
                      </p>
                      <p className="mt-0.5 text-[12.5px] text-[#6C7C73]">
                        {order.items.length} item{order.items.length === 1 ? '' : 's'} ·{' '}
                        {formatRelative(order.createdAt)}
                      </p>
                      <p className="mt-1 truncate text-[12px] text-[#6C7C73]">
                        {order.deliveryAddress}
                      </p>
                    </div>

                    <span className="font-display text-lg font-bold">
                      {formatNaira(order.total)}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase ${
                        order.paymentStatus === 'paid'
                          ? 'bg-[#DDEBE3] text-[#0F4132]'
                          : 'bg-[#FBEFD6] text-[#7A5510]'
                      }`}
                    >
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                    </span>

                    <span className="rounded-full bg-[#F2E8D7] px-3.5 py-1.5 text-[11px] font-bold uppercase text-[#6C7C73]">
                      {order.status.replace('_', ' ')}
                    </span>

                    {next && (
                      <button
                        onClick={() => advance(order)}
                        className="rounded-full bg-[#0F4132] px-4 py-2.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5"
                      >
                        {next.label}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          ))}

        {tab === 'menu' && (
          <MenuEditor
            restaurantId={restaurant.id}
            dishes={restaurant.dishes}
            onChange={() => void loadRestaurant()}
          />
        )}

        {tab === 'reviews' && <ReviewList reviews={reviews} loading={false} />}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof ChefHat;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-5">
      <Icon size={20} className="mb-3 text-[#E9A93A]" />
      <p className="font-display text-2xl font-bold text-[#0A2E24]">{value}</p>
      <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide text-[#6C7C73]">
        {label}
      </p>
    </div>
  );
}
