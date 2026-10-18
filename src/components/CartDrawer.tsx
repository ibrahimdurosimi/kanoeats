import { Bike, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatNaira } from '../lib/format';
import { SPICE_LABELS, ADDONS } from '../types';
import DishArt from './DishArt';

export default function CartDrawer() {
  const {
    items, count, totals, restaurantName, isOpen, closeCart,
    setQuantity, removeItem, applyPromo, promoCode, promoError, clearPromo,
  } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('');

  const handleApply = () => {
    if (applyPromo(codeInput)) {
      toast(`${codeInput.trim().toUpperCase()} applied`);
      setCodeInput('');
    }
  };

  const goToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[200] bg-[#0A2019]/50 backdrop-blur-[3px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`fixed inset-y-0 right-0 z-[210] flex w-[min(410px,100vw)] flex-col bg-[#FAF5EC] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-[#E4DACA] bg-[#FFFDF8] px-6 py-5">
          <div>
            <h2 className="font-display text-xl font-bold text-[#0A2E24]">Your cart</h2>
            <p className="mt-0.5 text-[12.5px] text-[#6C7C73]">
              {count ? restaurantName : 'Nothing added yet'}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-[#E4DACA] transition hover:border-[#DF5F49] hover:bg-[#DF5F49] hover:text-white"
          >
            <X size={17} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {count === 0 ? (
            <div className="flex flex-col items-center px-3 py-12 text-center">
              <ShoppingCart size={52} className="mb-4 text-[#6C7C73] opacity-50" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-bold text-[#0A2E24]">Your cart is empty</h3>
              <p className="mt-1.5 text-sm text-[#6C7C73]">
                Pick something from a kitchen and it will show up here.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/kitchens');
                }}
                className="mt-5 rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
              >
                Browse kitchens
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const addonNames = item.options.addons
                  .map((id) => ADDONS.find((a) => a.id === id)?.name)
                  .filter(Boolean);
                return (
                  <div key={item.key} className="flex gap-3.5 border-b border-[#E4DACA] py-3.5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#F2E8D7]">
                      <DishArt art={item.dish.artKey} className="h-11 w-11" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13.5px] font-semibold leading-snug">{item.dish.name}</p>
                      <p className="mt-1 text-[11.5px] text-[#6C7C73]">
                        {[SPICE_LABELS[item.options.spice], ...addonNames].join(' · ')}
                      </p>
                      <p className="mt-2 font-display text-[15px] font-bold text-[#0A2E24]">
                        {formatNaira(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2.5">
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remove ${item.dish.name}`}
                        className="text-[#14201B] opacity-50 transition hover:text-[#DF5F49] hover:opacity-100"
                      >
                        <Trash2 size={15} />
                      </button>
                      <div className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-1">
                        <button
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-6 w-6 place-items-center rounded-full bg-[#F2E8D7] transition hover:bg-[#E9A93A]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="min-w-[14px] text-center text-[13px] font-bold">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="grid h-6 w-6 place-items-center rounded-full bg-[#F2E8D7] transition hover:bg-[#E9A93A]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="mt-5">
                {promoCode ? (
                  <div className="flex items-center justify-between rounded-2xl bg-[#DDEBE3] px-4 py-3 text-sm font-semibold text-[#0F4132]">
                    <span>{promoCode} applied</span>
                    <button onClick={clearPromo} className="text-xs underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApply()}
                        placeholder="Promo code (try SUYA20)"
                        aria-label="Promo code"
                        className="min-w-0 flex-1 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-2.5 text-[13px] outline-none focus:border-[#E9A93A]"
                      />
                      <button
                        onClick={handleApply}
                        className="rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 text-sm font-semibold transition hover:border-[#166049]"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && <p className="mt-2 text-xs text-[#B23A26]">{promoError}</p>}
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <footer className="border-t border-[#E4DACA] bg-[#FFFDF8] px-6 py-5">
          <div
            className={`mb-3.5 flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-semibold ${
              totals.toFreeDelivery === 0 && totals.subtotal > 0
                ? 'bg-[#DDEBE3] text-[#0F4132]'
                : 'bg-[#FBEFD6] text-[#7A5510]'
            }`}
          >
            <Bike size={15} className="shrink-0" />
            {totals.subtotal > 0 && totals.toFreeDelivery === 0
              ? 'Free dispatch unlocked — nice one.'
              : `Add ${formatNaira(totals.toFreeDelivery)} more for free dispatch`}
          </div>

          <dl className="space-y-2 text-[13.5px] text-[#6C7C73]">
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
              <dd className="font-display text-[22px]">{formatNaira(totals.total)}</dd>
            </div>
          </dl>

          <button
            onClick={goToCheckout}
            disabled={count === 0}
            className="mt-4 w-full rounded-full bg-[#DF5F49] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Proceed to checkout
          </button>
        </footer>
      </aside>
    </>
  );
}
