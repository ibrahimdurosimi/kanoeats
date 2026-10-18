import { ArrowLeft, Banknote, Bike, CalendarClock, CreditCard, Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DishArt from '../components/DishArt';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { createOrder } from '../lib/api';
import { IS_PAYSTACK_CONFIGURED, IS_SUPABASE_CONFIGURED } from '../lib/config';
import { formatNaira, generateOrderReference } from '../lib/format';
import { payWithPaystack, verifyPayment } from '../lib/paystack';
import { ADDONS, SPICE_LABELS, type PaymentMethod } from '../types';

export default function CheckoutPage() {
  const { items, totals, promoCode, restaurantId, restaurantName, clear } = useCart();
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [address, setAddress] = useState('Nassarawa GRA, Kano');
  const [notes, setNotes] = useState('');
  const [scheduled, setScheduled] = useState('');
  const [method, setMethod] = useState<PaymentMethod>(
    IS_PAYSTACK_CONFIGURED ? 'paystack' : 'cash_on_delivery',
  );
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0A2E24]">Your cart is empty</h1>
        <p className="mt-2 text-sm text-[#6C7C73]">Add something from a kitchen to check out.</p>
        <button
          onClick={() => navigate('/kitchens')}
          className="mt-6 rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22]"
        >
          Browse kitchens
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!user || !restaurantId) return;

    if (!address.trim()) {
      toast('Add a delivery address first', 'error');
      return;
    }

    if (!IS_SUPABASE_CONFIGURED) {
      toast('Ordering needs a Supabase connection. See the README.', 'error');
      return;
    }

    setSubmitting(true);
    const reference = generateOrderReference();

    try {
      // The order is written first, unpaid. If payment then fails the row is
      // still there with payment_status 'unpaid', so nothing is lost and the
      // customer can retry from their order history.
      await createOrder({
        userId: user.id,
        reference,
        restaurantId,
        items,
        subtotal: totals.subtotal,
        deliveryFee: totals.deliveryFee,
        discount: totals.discount,
        total: totals.total,
        promoCode,
        deliveryAddress: address.trim(),
        deliveryNotes: notes.trim() || null,
        scheduledFor: scheduled ? new Date(scheduled).toISOString() : null,
        paymentMethod: method,
      });

      if (method === 'cash_on_delivery') {
        clear();
        toast('Order placed — pay the rider on delivery');
        navigate(`/orders/${reference}`);
        return;
      }

      const result = await payWithPaystack({
        email: user.email ?? '',
        amountNaira: totals.total,
        reference,
        metadata: { restaurant: restaurantName, customer: profile?.fullName },
      });

      if (result.status === 'cancelled') {
        toast('Payment cancelled — your order is saved as unpaid', 'info');
        clear();
        navigate(`/orders/${reference}`);
        return;
      }

      if (result.status === 'error') {
        toast(result.message, 'error');
        return;
      }

      // Paystack's client callback is not proof of payment — the Edge Function
      // confirms it server-side before the order counts as paid.
      const verification = await verifyPayment(reference);
      clear();

      if (verification.verified) {
        toast('Payment confirmed — your order is on its way');
      } else {
        toast(verification.message ?? 'We could not confirm the payment yet', 'info');
      }
      navigate(`/orders/${reference}`);
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not place your order', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1100px]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#6C7C73] transition hover:text-[#14201B]"
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <h1 className="font-display text-[clamp(26px,3.2vw,34px)] font-bold text-[#0A2E24]">Checkout</h1>
      <p className="mt-1 text-sm text-[#6C7C73]">Ordering from {restaurantName}</p>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* ---------- Delivery details ---------- */}
        <div className="space-y-5">
          <section className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-6">
            <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-[#0A2E24]">
              <MapPin size={18} className="text-[#DF5F49]" />
              Delivery address
            </h2>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House number, street, area"
              aria-label="Delivery address"
              className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Landmark or delivery notes (optional)"
              aria-label="Delivery notes"
              rows={2}
              className="mt-3 w-full resize-none rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
          </section>

          <section className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-6">
            <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-[#0A2E24]">
              <CalendarClock size={18} className="text-[#E9A93A]" />
              When should it arrive?
            </h2>
            <p className="mb-4 text-[13px] text-[#6C7C73]">
              Leave this empty to have it delivered as soon as it is ready. During Ramadan, set a
              time just before Maghrib for Iftar.
            </p>
            <input
              type="datetime-local"
              value={scheduled}
              onChange={(e) => setScheduled(e.target.value)}
              aria-label="Scheduled delivery time"
              className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
          </section>

          <section className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-6">
            <h2 className="mb-4 font-display text-lg font-bold text-[#0A2E24]">Payment method</h2>
            <div className="space-y-3">
              <PaymentOption
                selected={method === 'paystack'}
                onSelect={() => setMethod('paystack')}
                disabled={!IS_PAYSTACK_CONFIGURED}
                icon={CreditCard}
                title="Card, transfer or USSD"
                subtitle={
                  IS_PAYSTACK_CONFIGURED
                    ? 'Secured by Paystack'
                    : 'Unavailable — no Paystack key configured'
                }
              />
              <PaymentOption
                selected={method === 'cash_on_delivery'}
                onSelect={() => setMethod('cash_on_delivery')}
                icon={Banknote}
                title="Cash on delivery"
                subtitle="Pay the rider when your food arrives"
              />
            </div>
          </section>
        </div>

        {/* ---------- Summary ---------- */}
        <aside className="h-fit rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-6 lg:sticky lg:top-[100px]">
          <h2 className="mb-4 font-display text-lg font-bold text-[#0A2E24]">Order summary</h2>

          <div className="max-h-[260px] space-y-3 overflow-y-auto">
            {items.map((item) => {
              const addonNames = item.options.addons
                .map((id) => ADDONS.find((a) => a.id === id)?.name)
                .filter(Boolean);
              return (
                <div key={item.key} className="flex gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F2E8D7]">
                    <DishArt art={item.dish.artKey} className="h-8 w-8" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-snug">
                      {item.quantity} × {item.dish.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#6C7C73]">
                      {[SPICE_LABELS[item.options.spice], ...addonNames].join(' · ')}
                    </p>
                  </div>
                  <span className="shrink-0 text-[13px] font-bold">
                    {formatNaira(item.unitPrice * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className={`my-4 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
              totals.deliveryFee === 0 ? 'bg-[#DDEBE3] text-[#0F4132]' : 'bg-[#FBEFD6] text-[#7A5510]'
            }`}
          >
            <Bike size={15} className="shrink-0" />
            {totals.deliveryFee === 0
              ? 'Free dispatch on this order'
              : `Add ${formatNaira(totals.toFreeDelivery)} more for free dispatch`}
          </div>

          <dl className="space-y-2 border-t border-[#E4DACA] pt-4 text-[13.5px] text-[#6C7C73]">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatNaira(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Delivery</dt>
              <dd>{totals.deliveryFee ? formatNaira(totals.deliveryFee) : 'Free'}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-[#2C6B3A]">
                <dt>Discount ({promoCode})</dt>
                <dd>-{formatNaira(totals.discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between border-t border-dashed border-[#E4DACA] pt-3 text-[17px] font-bold text-[#14201B]">
              <dt>Total</dt>
              <dd className="font-display text-[23px]">{formatNaira(totals.total)}</dd>
            </div>
          </dl>

          <button
            onClick={handlePlaceOrder}
            disabled={submitting}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#DF5F49] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            {submitting
              ? 'Placing your order…'
              : method === 'paystack'
                ? `Pay ${formatNaira(totals.total)}`
                : 'Place order'}
          </button>

          <p className="mt-3 text-center text-[11.5px] text-[#6C7C73]">
            By ordering you agree to our terms. All kitchens are halal verified.
          </p>
        </aside>
      </div>
    </div>
  );
}

function PaymentOption({
  selected,
  onSelect,
  disabled,
  icon: Icon,
  title,
  subtitle,
}: {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  icon: typeof CreditCard;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3.5 rounded-xl border-[1.5px] px-4 py-3.5 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
        selected ? 'border-[#E9A93A] bg-[#FBEFD6]' : 'border-[#E4DACA] bg-[#FAF5EC] hover:border-[#F6CE7C]'
      }`}
    >
      <Icon size={20} className={selected ? 'text-[#8A5F10]' : 'text-[#6C7C73]'} />
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-[11.5px] text-[#6C7C73]">{subtitle}</span>
      </span>
      <span
        className={`ml-auto grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
          selected ? 'border-[#E9A93A]' : 'border-[#E4DACA]'
        }`}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#E9A93A]" />}
      </span>
    </button>
  );
}
