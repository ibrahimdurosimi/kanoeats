import {
  ArrowLeft,
  Bike,
  CheckCircle2,
  ChefHat,
  CircleDashed,
  Clock,
  MapPin,
  PackageCheck,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DishArt from '../components/DishArt';
import { fetchOrderByReference } from '../lib/api';
import { formatNaira, formatOrderDate } from '../lib/format';
import type { Order, OrderStatus } from '../types';
import { artFor } from '../components/DishArt';

const STEPS: { status: OrderStatus; label: string; blurb: string; icon: typeof ChefHat }[] = [
  { status: 'confirmed', label: 'Order confirmed', blurb: 'The kitchen has your order', icon: CheckCircle2 },
  { status: 'preparing', label: 'Being prepared', blurb: 'On the grill now', icon: ChefHat },
  { status: 'on_the_way', label: 'Rider on the way', blurb: 'Your food has left the kitchen', icon: Bike },
  { status: 'delivered', label: 'Delivered', blurb: 'Enjoy your meal', icon: PackageCheck },
];

const ORDER_OF: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  on_the_way: 3,
  delivered: 4,
  cancelled: -1,
};

export default function OrderTrackingPage() {
  const { reference } = useParams<{ reference: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reference) return;
    let active = true;

    const load = async () => {
      const result = await fetchOrderByReference(reference);
      if (active) {
        setOrder(result);
        setLoading(false);
      }
    };

    void load();
    // Poll while the order is in flight. Realtime would be better, but polling
    // is resilient on a patchy mobile connection and costs little at this rate.
    const timer = setInterval(load, 20000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [reference]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <CircleDashed size={40} className="mx-auto animate-spin text-[#E9A93A]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0A2E24]">Order not found</h1>
        <p className="mt-2 text-sm text-[#6C7C73]">
          We could not find an order with reference {reference}.
        </p>
        <Link
          to="/orders"
          className="mt-6 inline-block rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22]"
        >
          View your orders
        </Link>
      </div>
    );
  }

  const currentStep = ORDER_OF[order.status];
  const cancelled = order.status === 'cancelled';

  return (
    <div className="mx-auto max-w-[900px]">
      <button
        onClick={() => navigate('/orders')}
        className="mb-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#6C7C73] transition hover:text-[#14201B]"
      >
        <ArrowLeft size={16} />
        All orders
      </button>

      <div className="rounded-3xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6C7C73]">
              Order {order.reference}
            </p>
            <h1 className="mt-1.5 font-display text-[clamp(22px,2.8vw,30px)] font-bold text-[#0A2E24]">
              {order.restaurantName ?? 'Your order'}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] text-[#6C7C73]">
              <Clock size={14} />
              Placed {formatOrderDate(order.createdAt)}
            </p>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              order.paymentStatus === 'paid'
                ? 'bg-[#DDEBE3] text-[#0F4132]'
                : order.paymentStatus === 'failed'
                  ? 'bg-[#FBE4DE] text-[#A83E2A]'
                  : 'bg-[#FBEFD6] text-[#7A5510]'
            }`}
          >
            {order.paymentStatus === 'paid'
              ? 'PAID'
              : order.paymentMethod === 'cash_on_delivery'
                ? 'PAY ON DELIVERY'
                : order.paymentStatus.toUpperCase()}
          </span>
        </div>

        {/* ---------- Progress ---------- */}
        {cancelled ? (
          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-[#FBE4DE] px-5 py-4 text-[#A83E2A]">
            <XCircle size={20} />
            <p className="text-sm font-semibold">This order was cancelled.</p>
          </div>
        ) : (
          <ol className="mt-8 space-y-0">
            {STEPS.map((step, i) => {
              const stepIndex = ORDER_OF[step.status];
              const done = currentStep >= stepIndex;
              const active = currentStep === stepIndex;
              const Icon = step.icon;
              return (
                <li key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition ${
                        done
                          ? 'border-[#166049] bg-[#166049] text-white'
                          : 'border-[#E4DACA] bg-[#FAF5EC] text-[#A9B4AE]'
                      } ${active ? 'ring-4 ring-[#DDEBE3]' : ''}`}
                    >
                      <Icon size={18} />
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        className={`my-1 w-0.5 flex-1 rounded ${
                          currentStep > stepIndex ? 'bg-[#166049]' : 'bg-[#E4DACA]'
                        }`}
                        style={{ minHeight: 28 }}
                      />
                    )}
                  </div>
                  <div className={`pb-6 ${done ? '' : 'opacity-55'}`}>
                    <p className="text-sm font-bold text-[#0A2E24]">{step.label}</p>
                    <p className="mt-0.5 text-[12.5px] text-[#6C7C73]">{step.blurb}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {/* ---------- Items ---------- */}
        <div className="mt-6 border-t border-[#E4DACA] pt-6">
          <h2 className="mb-4 font-display text-lg font-bold text-[#0A2E24]">What you ordered</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-3.5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#F2E8D7]">
                  <DishArt art={artFor(item.dishName)} className="h-9 w-9" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-semibold leading-snug">
                    {item.quantity} × {item.dishName}
                  </p>
                  {item.options?.spice && (
                    <p className="mt-0.5 text-[11.5px] capitalize text-[#6C7C73]">
                      {item.options.spice}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-[13.5px] font-bold">
                  {formatNaira(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <dl className="mt-5 space-y-2 border-t border-dashed border-[#E4DACA] pt-4 text-[13.5px] text-[#6C7C73]">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatNaira(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd>{order.deliveryFee ? formatNaira(order.deliveryFee) : 'Free'}</dd>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#2C6B3A]">
                <dt>Discount {order.promoCode ? `(${order.promoCode})` : ''}</dt>
                <dd>-{formatNaira(order.discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between pt-2 text-[16px] font-bold text-[#14201B]">
              <dt>Total</dt>
              <dd className="font-display text-xl">{formatNaira(order.total)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-[#FAF5EC] px-4 py-3.5 text-[13px] text-[#6C7C73]">
          <MapPin size={15} className="mt-0.5 shrink-0 text-[#DF5F49]" />
          <span>
            {order.deliveryAddress}
            {order.deliveryNotes && <span className="block mt-0.5 italic">{order.deliveryNotes}</span>}
          </span>
        </div>

        <a
          href="https://wa.me/2348123456789"
          target="_blank"
          rel="noreferrer"
          className="mt-5 block w-full rounded-full border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] py-3 text-center text-sm font-semibold transition hover:border-[#166049]"
        >
          Need help with this order? Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}
