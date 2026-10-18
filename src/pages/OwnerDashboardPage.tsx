import { ChefHat, PackageCheck, Store, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { fetchOrders, updateOrderStatus } from '../lib/api';
import { formatNaira, formatRelative } from '../lib/format';
import type { Order, OrderStatus } from '../types';

/** The next status a kitchen can move an order to. */
const NEXT_STATUS: Partial<Record<OrderStatus, { to: OrderStatus; label: string }>> = {
  pending: { to: 'confirmed', label: 'Accept order' },
  confirmed: { to: 'preparing', label: 'Start preparing' },
  preparing: { to: 'on_the_way', label: 'Hand to rider' },
  on_the_way: { to: 'delivered', label: 'Mark delivered' },
};

export default function OwnerDashboardPage() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    void fetchOrders(user.id)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [user]);

  const stats = useMemo(() => {
    const delivered = orders.filter((o) => o.status === 'delivered');
    const active = orders.filter(
      (o) => !['delivered', 'cancelled'].includes(o.status),
    );
    const revenue = delivered.reduce((sum, o) => sum + o.total, 0);
    return { delivered: delivered.length, active: active.length, revenue, total: orders.length };
  }, [orders]);

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

  return (
    <div className="mx-auto max-w-[1100px]">
      <h1 className="font-display text-[clamp(26px,3.2vw,34px)] font-bold text-[#0A2E24]">
        Kitchen dashboard
      </h1>
      <p className="mt-1 text-sm text-[#6C7C73]">Orders placed with your kitchen.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ChefHat} label="Active orders" value={String(stats.active)} />
        <StatCard icon={PackageCheck} label="Delivered" value={String(stats.delivered)} />
        <StatCard icon={TrendingUp} label="Revenue" value={formatNaira(stats.revenue)} />
        <StatCard icon={Store} label="Total orders" value={String(stats.total)} />
      </div>

      <h2 className="mb-4 mt-9 font-display text-xl font-bold text-[#0A2E24]">Order queue</h2>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-[#EFE6D5]" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-14 text-center">
          <h3 className="font-display text-lg font-bold text-[#0A2E24]">No orders yet</h3>
          <p className="mt-1.5 text-sm text-[#6C7C73]">
            New orders for your kitchen will appear here as they come in.
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
                  <p className="mt-1 truncate text-[12px] text-[#6C7C73]">{order.deliveryAddress}</p>
                </div>
                <span className="font-display text-lg font-bold">{formatNaira(order.total)}</span>
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
      )}
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
