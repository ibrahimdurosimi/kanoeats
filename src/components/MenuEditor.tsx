import { Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { createDish, deleteDish, updateDish } from '../lib/api';
import { formatNaira } from '../lib/format';
import type { Dish, DishCategory, DishInput } from '../types';
import DishArt, { ART_BG, type ArtKey } from './DishArt';

const CATEGORIES: DishCategory[] = ['Starters', 'Mains', 'Drinks', 'Snacks'];
const ART_KEYS: ArtKey[] = [
  'suya', 'masa', 'fura', 'kilishi', 'tuwo', 'kunun', 'balangu', 'dambu', 'kitchen',
];

const BLANK: DishInput = {
  name: '',
  description: '',
  price: 1000,
  category: 'Mains',
  artKey: 'kitchen',
  spiceLevel: 0,
  isAvailable: true,
};

/**
 * Menu management for a kitchen owner.
 *
 * Availability is a toggle rather than a delete, because a kitchen running out
 * of ram for the day should not have to retype the dish tomorrow. Delete stays
 * available for dishes genuinely off the menu.
 */
export default function MenuEditor({
  restaurantId,
  dishes,
  onChange,
}: {
  restaurantId: string;
  dishes: Dish[];
  onChange: () => void;
}) {
  const { toast } = useToast();
  const [editing, setEditing] = useState<Dish | null>(null);
  const [creating, setCreating] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const close = () => {
    setEditing(null);
    setCreating(false);
  };

  const toggleAvailability = async (dish: Dish, available: boolean) => {
    setBusyId(dish.id);
    try {
      await updateDish(dish.id, { isAvailable: available });
      toast(available ? `${dish.name} is back on the menu` : `${dish.name} marked sold out`);
      onChange();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not update the dish', 'error');
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (dish: Dish) => {
    // Deleting a dish is not reversible from the UI, so confirm first.
    if (!window.confirm(`Remove "${dish.name}" from the menu permanently?`)) return;
    setBusyId(dish.id);
    try {
      await deleteDish(dish.id);
      toast(`${dish.name} removed`);
      onChange();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not remove the dish', 'error');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-[#0A2E24]">Your menu</h2>
          <p className="mt-0.5 text-[13px] text-[#6C7C73]">
            {dishes.length} dish{dishes.length === 1 ? '' : 'es'} · changes are live immediately
          </p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 rounded-full bg-[#E9A93A] px-4 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
        >
          <Plus size={16} />
          Add a dish
        </button>
      </div>

      {dishes.length === 0 ? (
        <div className="rounded-2xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-14 text-center">
          <h3 className="font-display text-lg font-bold text-[#0A2E24]">Your menu is empty</h3>
          <p className="mt-1.5 text-sm text-[#6C7C73]">
            Add your first dish and it appears to customers straight away.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {dishes.map((dish) => (
            <article
              key={dish.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-4"
            >
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-xl"
                style={{ background: ART_BG[dish.artKey] }}
              >
                <DishArt art={dish.artKey} className="h-10 w-10" />
              </span>

              <div className="min-w-[160px] flex-1">
                <p className="text-sm font-semibold">{dish.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[12px] text-[#6C7C73]">{dish.description}</p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#6C7C73]">
                  {dish.category}
                  {dish.spiceLevel > 0 && ` · ${'🌶'.repeat(dish.spiceLevel)}`}
                </p>
              </div>

              <span className="font-display text-lg font-bold">{formatNaira(dish.price)}</span>

              <label className="flex shrink-0 cursor-pointer items-center gap-2 text-[12.5px] font-semibold">
                <input
                  type="checkbox"
                  checked={dish.isAvailable !== false}
                  disabled={busyId === dish.id}
                  onChange={(e) => toggleAvailability(dish, e.target.checked)}
                  className="h-4 w-4 accent-[#166049]"
                />
                {dish.isAvailable === false ? (
                  <span className="text-[#A83E2A]">Sold out</span>
                ) : (
                  <span className="text-[#166049]">Available</span>
                )}
              </label>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditing(dish)}
                  aria-label={`Edit ${dish.name}`}
                  className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-[#E4DACA] transition hover:border-[#E9A93A]"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => remove(dish)}
                  disabled={busyId === dish.id}
                  aria-label={`Remove ${dish.name}`}
                  className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-[#E4DACA] transition hover:border-[#DF5F49] hover:text-[#DF5F49]"
                >
                  {busyId === dish.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {(editing || creating) && (
        <DishForm
          restaurantId={restaurantId}
          dish={editing}
          onClose={close}
          onSaved={() => {
            close();
            onChange();
          }}
        />
      )}
    </>
  );
}

function DishForm({
  restaurantId,
  dish,
  onClose,
  onSaved,
}: {
  restaurantId: string;
  dish: Dish | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = useState<DishInput>(
    dish
      ? {
          name: dish.name,
          description: dish.description,
          price: dish.price,
          category: dish.category,
          artKey: dish.artKey,
          spiceLevel: dish.spiceLevel,
          isAvailable: dish.isAvailable !== false,
        }
      : BLANK,
  );
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof DishInput>(key: K, value: DishInput[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    if (!form.name.trim()) {
      toast('Give the dish a name', 'error');
      return;
    }
    if (!Number.isFinite(form.price) || form.price < 0) {
      toast('Enter a valid price', 'error');
      return;
    }

    setSaving(true);
    try {
      if (dish) {
        await updateDish(dish.id, form);
        toast(`${form.name} updated`);
      } else {
        await createDish(restaurantId, form);
        toast(`${form.name} added to your menu`);
      }
      onSaved();
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not save the dish', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[220] grid place-items-center p-5" role="dialog" aria-modal="true">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-[#0A2019]/50 backdrop-blur-[3px]" />

      <div className="relative max-h-[90vh] w-[min(520px,100%)] overflow-y-auto rounded-3xl bg-[#FAF5EC] p-6 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-[#E4DACA] transition hover:border-[#DF5F49] hover:bg-[#DF5F49] hover:text-white"
        >
          <X size={17} />
        </button>

        <h3 className="pr-10 font-display text-xl font-bold text-[#0A2E24]">
          {dish ? 'Edit dish' : 'Add a dish'}
        </h3>

        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">Name</span>
            <input
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              placeholder="Signature Tsire Beef Suya"
              className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">Description</span>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={3}
              maxLength={400}
              placeholder="What is in it, how it is cooked, what it is served with."
              className="w-full resize-none rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">
                Price (₦)
              </span>
              <input
                type="number"
                min={0}
                step={50}
                value={form.price}
                onChange={(e) => set('price', Number(e.target.value))}
                className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">Category</span>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value as DishCategory)}
                className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <span className="mb-2 block text-[12.5px] font-semibold text-[#3D4E46]">
              Spice level
            </span>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((level) => (
                <button
                  key={level}
                  onClick={() => set('spiceLevel', level)}
                  aria-pressed={form.spiceLevel === level}
                  className={`rounded-full border-[1.5px] px-4 py-2 text-[13px] font-medium transition ${
                    form.spiceLevel === level
                      ? 'border-[#DF5F49] bg-[#DF5F49] text-white'
                      : 'border-[#E4DACA] bg-[#FFFDF8] hover:border-[#E9A93A]'
                  }`}
                >
                  {level === 0 ? 'None' : '🌶'.repeat(level)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2 block text-[12.5px] font-semibold text-[#3D4E46]">
              Illustration
            </span>
            <div className="flex flex-wrap gap-2">
              {ART_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => set('artKey', key)}
                  aria-label={key}
                  aria-pressed={form.artKey === key}
                  className={`grid h-14 w-14 place-items-center rounded-xl border-2 transition ${
                    form.artKey === key ? 'border-[#E9A93A]' : 'border-transparent hover:border-[#E4DACA]'
                  }`}
                  style={{ background: ART_BG[key] }}
                >
                  <DishArt art={key} className="h-10 w-10" />
                </button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) => set('isAvailable', e.target.checked)}
              className="h-4 w-4 accent-[#166049]"
            />
            Available to order now
          </label>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DF5F49] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition enabled:hover:-translate-y-0.5 disabled:opacity-60"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          {dish ? 'Save changes' : 'Add to menu'}
        </button>
      </div>
    </div>
  );
}
