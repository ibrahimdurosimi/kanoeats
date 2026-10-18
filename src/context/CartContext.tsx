import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD, PROMO_CODES } from '../lib/config';
import { ADDONS, type CartItem, type CartItemOptions, type Dish, type SpiceLevel } from '../types';

const STORAGE_KEY = 'kanoeats.cart.v1';

interface CartTotals {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  /** Naira still needed to unlock free dispatch; 0 once unlocked. */
  toFreeDelivery: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  totals: CartTotals;
  /** All items must come from one kitchen — riders collect from one place. */
  restaurantId: string | null;
  restaurantName: string | null;
  promoCode: string | null;
  promoError: string | null;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (
    dish: Dish,
    restaurantId: string,
    restaurantName: string,
    options: CartItemOptions,
    quantity?: number,
  ) => { ok: boolean; conflict?: string };
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function addonTotal(addonIds: string[]): number {
  return addonIds.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0);
}

/** Same dish with different spice or add-ons is a separate line, not a quantity bump. */
function itemKey(dishId: string, spice: SpiceLevel, addons: string[]): string {
  return `${dishId}::${spice}::${[...addons].sort().join(',')}`;
}

function loadStored(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    // Private mode, cleared storage, or a corrupted value — an empty cart is
    // the safe recovery. Never let storage break the app.
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadStored);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — the cart still works for this session */
    }
  }, [items]);

  const restaurantId = items[0]?.restaurantId ?? null;
  const restaurantName = items[0]?.restaurantName ?? null;

  const addItem = useCallback<CartContextValue['addItem']>(
    (dish, rId, rName, options, quantity = 1) => {
      let conflict: string | undefined;

      setItems((prev) => {
        if (prev.length && prev[0].restaurantId !== rId) {
          conflict = prev[0].restaurantName;
          return prev;
        }

        const key = itemKey(dish.id, options.spice, options.addons);
        const existing = prev.findIndex((i) => i.key === key);

        if (existing > -1) {
          const next = [...prev];
          next[existing] = { ...next[existing], quantity: next[existing].quantity + quantity };
          return next;
        }

        return [
          ...prev,
          {
            key,
            dish,
            restaurantId: rId,
            restaurantName: rName,
            quantity,
            options,
            unitPrice: dish.price + addonTotal(options.addons),
          },
        ];
      });

      return conflict ? { ok: false, conflict } : { ok: true };
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const applyPromo = useCallback((code: string) => {
    const normalised = code.trim().toUpperCase();
    if (PROMO_CODES[normalised]) {
      setPromoCode(normalised);
      setPromoError(null);
      return true;
    }
    setPromoError(`"${normalised}" is not a valid code`);
    return false;
  }, []);

  const clearPromo = useCallback(() => {
    setPromoCode(null);
    setPromoError(null);
  }, []);

  const count = useMemo(() => items.reduce((n, i) => n + i.quantity, 0), [items]);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
    const discount = promoCode
      ? Math.round((subtotal * (PROMO_CODES[promoCode]?.percent ?? 0)) / 100)
      : 0;
    // An empty cart has no delivery fee; a qualifying order rides free.
    const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
    return {
      subtotal,
      deliveryFee,
      discount,
      total: Math.max(0, subtotal + deliveryFee - discount),
      toFreeDelivery: Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal),
    };
  }, [items, promoCode]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      totals,
      restaurantId,
      restaurantName,
      promoCode,
      promoError,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      setQuantity,
      removeItem,
      clear,
      applyPromo,
      clearPromo,
    }),
    [
      items, count, totals, restaurantId, restaurantName, promoCode, promoError,
      isOpen, addItem, setQuantity, removeItem, clear, applyPromo, clearPromo,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
