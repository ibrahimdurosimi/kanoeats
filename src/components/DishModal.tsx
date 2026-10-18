import { Check, Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatNaira } from '../lib/format';
import { ADDONS, SPICE_LABELS, type Dish, type SpiceLevel } from '../types';
import DishArt, { ART_BG } from './DishArt';

const SPICE_ORDER: SpiceLevel[] = ['mild', 'medium', 'hot', 'extra'];

interface DishModalProps {
  dish: Dish | null;
  restaurantId: string;
  restaurantName: string;
  onClose: () => void;
}

export default function DishModal({ dish, restaurantId, restaurantName, onClose }: DishModalProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [spice, setSpice] = useState<SpiceLevel>('medium');
  const [addons, setAddons] = useState<string[]>([]);

  // Reset whenever a different dish opens, so options never leak between dishes.
  useEffect(() => {
    if (dish) {
      setQuantity(1);
      setSpice('medium');
      setAddons([]);
    }
  }, [dish]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!dish) return null;

  const addonSum = addons.reduce((s, id) => s + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
  const lineTotal = (dish.price + addonSum) * quantity;

  const toggleAddon = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const handleAdd = () => {
    const result = addItem(dish, restaurantId, restaurantName, { spice, addons }, quantity);
    if (!result.ok) {
      toast(`Your cart already has items from ${result.conflict}. Clear it to order here.`, 'error');
      return;
    }
    toast(`${dish.name} added to cart`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[220] grid place-items-center p-5" role="dialog" aria-modal="true">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-[#0A2019]/50 backdrop-blur-[3px]" />

      <div className="relative max-h-[90vh] w-[min(520px,100%)] overflow-y-auto rounded-3xl bg-[#FAF5EC] shadow-2xl">
        <div
          className="relative grid h-[190px] place-items-center"
          style={{ background: ART_BG[dish.artKey] }}
        >
          <DishArt art={dish.artKey} className="h-36 w-36" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-[#FFFDF8]/95 transition hover:bg-[#DF5F49] hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="font-display text-[23px] font-bold text-[#0A2E24]">{dish.name}</h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#6C7C73]">{dish.description}</p>

          <p className="mb-3 mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6C7C73]">
            Yaji heat level
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SPICE_ORDER.map((level) => (
              <button
                key={level}
                onClick={() => setSpice(level)}
                aria-pressed={spice === level}
                className={`rounded-full border-[1.5px] px-4 py-2.5 text-[13px] font-medium transition ${
                  spice === level
                    ? 'border-[#DF5F49] bg-[#DF5F49] text-white'
                    : 'border-[#E4DACA] bg-[#FFFDF8] hover:border-[#E9A93A]'
                }`}
              >
                {SPICE_LABELS[level]}
              </button>
            ))}
          </div>

          <p className="mb-3 mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6C7C73]">
            Add-ons
          </p>
          <div className="space-y-2.5">
            {ADDONS.map((addon) => {
              const on = addons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  aria-pressed={on}
                  className={`flex w-full items-center gap-3 rounded-2xl border-[1.5px] px-4 py-3 text-left transition ${
                    on ? 'border-[#E9A93A] bg-[#FBEFD6]' : 'border-[#E4DACA] bg-[#FFFDF8] hover:border-[#F6CE7C]'
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition ${
                      on ? 'border-[#E9A93A] bg-[#E9A93A]' : 'border-[#E4DACA]'
                    }`}
                  >
                    {on && <Check size={12} className="text-white" strokeWidth={3.5} />}
                  </span>
                  <span className="text-[13.5px] font-semibold">{addon.name}</span>
                  <span className="ml-auto text-[13px] font-bold text-[#0F4132]">
                    +{formatNaira(addon.price)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-3.5 border-t border-dashed border-[#E4DACA] pt-5">
            <div className="flex items-center gap-3 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-7 w-7 place-items-center rounded-full bg-[#F2E8D7] transition hover:bg-[#E9A93A]"
              >
                <Minus size={13} />
              </button>
              <span className="min-w-[16px] text-center text-sm font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid h-7 w-7 place-items-center rounded-full bg-[#F2E8D7] transition hover:bg-[#E9A93A]"
              >
                <Plus size={13} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 rounded-full bg-[#DF5F49] px-5 py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition hover:-translate-y-0.5"
            >
              Add to cart · {formatNaira(lineTotal)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
