import { ArrowLeft, BadgeCheck, Clock, MapPin, Search, ShoppingCart, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DishArt, { ART_BG } from '../components/DishArt';
import DishModal from '../components/DishModal';
import { useRestaurant } from '../hooks/useRestaurants';
import { formatNaira } from '../lib/format';
import type { Dish, DishCategory } from '../types';

const TABS: ('All' | DishCategory)[] = ['All', 'Starters', 'Mains', 'Drinks', 'Snacks'];

export default function RestaurantPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant, loading } = useRestaurant(restaurantId);
  const navigate = useNavigate();

  const [tab, setTab] = useState<'All' | DishCategory>('All');
  const [dishQuery, setDishQuery] = useState('');
  const [openDish, setOpenDish] = useState<Dish | null>(null);

  const dishes = useMemo(() => {
    if (!restaurant) return [];
    const q = dishQuery.trim().toLowerCase();
    return restaurant.dishes.filter((d) => {
      if (tab !== 'All' && d.category !== tab) return false;
      if (q && !`${d.name} ${d.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [restaurant, tab, dishQuery]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1280px]">
        <div className="h-[216px] animate-pulse rounded-3xl bg-[#EFE6D5]" />
        <div className="mt-4 h-[90px] animate-pulse rounded-2xl bg-[#EFE6D5]" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0A2E24]">Kitchen not found</h1>
        <p className="mt-2 text-sm text-[#6C7C73]">
          This kitchen may have closed or the link may be out of date.
        </p>
        <Link
          to="/kitchens"
          className="mt-6 inline-block rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22]"
        >
          Back to kitchens
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <button
        onClick={() => navigate('/kitchens')}
        className="mb-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#6C7C73] transition hover:text-[#14201B]"
      >
        <ArrowLeft size={16} />
        Back to kitchens
      </button>

      {/* ---------- Hero ---------- */}
      <div className="relative flex min-h-[216px] items-end overflow-hidden rounded-3xl bg-gradient-to-br from-[#6E2410] to-[#2E0C05] p-7">
        <DishArt art={restaurant.artKey} className="absolute -bottom-5 right-6 h-[210px] w-[210px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A140C]/90 via-[#0A140C]/55 to-[#0A140C]/15" />

        <span className="absolute right-5 top-5 z-[2] flex items-center gap-1.5 rounded-full bg-[#E9A93A] px-3.5 py-1.5 text-[11px] font-bold text-[#3A2A08]">
          <BadgeCheck size={13} />
          Halal verified
        </span>

        <div className="relative z-[2] flex items-center gap-5">
          <span className="grid h-[74px] w-[74px] shrink-0 place-items-center rounded-full border-[3px] border-white/85 bg-[#DF5F49] font-display text-[26px] font-extrabold text-white">
            {restaurant.logoText}
          </span>
          <div>
            <h1 className="font-display text-[clamp(23px,3vw,34px)] font-bold text-white">
              {restaurant.name}
            </h1>
            <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.13em] text-[#E9A93A]">
              {restaurant.cuisine}
            </p>
          </div>
        </div>
      </div>

      {/*
        Information bar. These labels are deliberately plain: an earlier build
        shipped "Surfer rating", "Transit Protocol" and "Stove coordinate",
        which read as nonsense to customers. Keep standard product language.
      */}
      <dl className="mt-4 grid grid-cols-1 overflow-hidden rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] sm:grid-cols-2 lg:grid-cols-4">
        <InfoCell label="Rating">
          <span className="flex items-center gap-1.5">
            <Star size={15} className="fill-[#E9A93A] text-[#E9A93A]" />
            {restaurant.rating}
            <span className="text-[12.5px] font-normal text-[#6C7C73]">
              ({restaurant.reviewCount.toLocaleString()} reviews)
            </span>
          </span>
        </InfoCell>
        <InfoCell label="Delivery options">
          Delivery &amp; pickup
          <span className="ml-1.5 text-[12.5px] font-normal text-[#6C7C73]">
            · approx. {restaurant.deliveryTime} min
          </span>
        </InfoCell>
        <InfoCell label="Opening hours">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#6C7C73]" />
            {restaurant.opens} – {restaurant.closes}
          </span>
        </InfoCell>
        <InfoCell label="Location">
          <span className="flex items-start gap-1.5 text-[13.5px] font-medium">
            <MapPin size={14} className="mt-0.5 shrink-0 text-[#6C7C73]" />
            {restaurant.address}
          </span>
        </InfoCell>
      </dl>

      {/* ---------- Menu controls ---------- */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                tab === t ? 'bg-[#0F4132] text-white' : 'text-[#4A5A52]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <label className="flex min-w-[220px] flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-2.5 sm:max-w-[280px] sm:flex-none lg:ml-auto">
          <Search size={16} className="shrink-0 text-[#9AA8A0]" />
          <input
            value={dishQuery}
            onChange={(e) => setDishQuery(e.target.value)}
            placeholder="Search dishes…"
            aria-label="Search this menu"
            className="w-full min-w-0 bg-transparent text-[13.5px] outline-none placeholder:text-[#9AA8A0]"
          />
        </label>
      </div>

      {/* ---------- Menu ---------- */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dishes.length === 0 ? (
          <div className="col-span-full rounded-3xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-14 text-center">
            <h3 className="font-display text-lg font-bold text-[#0A2E24]">
              Nothing on this part of the menu yet
            </h3>
            <p className="mt-1.5 text-sm text-[#6C7C73]">
              Try another category — the full menu is one tap away.
            </p>
          </div>
        ) : (
          dishes.map((dish) => (
            <article
              key={dish.id}
              className="group flex flex-col overflow-hidden rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] transition duration-300 hover:-translate-y-1.5 hover:border-[#E9A93A] hover:shadow-xl"
            >
              <button
                onClick={() => setOpenDish(dish)}
                aria-label={`View ${dish.name}`}
                className="relative grid h-[172px] place-items-center"
                style={{ background: ART_BG[dish.artKey] }}
              >
                {dish.spiceLevel > 0 && (
                  <span className="absolute left-3 top-3 z-[2] rounded-full bg-[#FFFDF8]/95 px-2.5 py-1.5 text-[10px] font-bold text-[#A83E2A]">
                    {'🌶'.repeat(dish.spiceLevel)}
                  </span>
                )}
                <DishArt
                  art={dish.artKey}
                  className="h-[120px] w-[120px] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
                />
              </button>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-[14.5px] font-bold uppercase leading-snug tracking-wide text-[#DF5F49]">
                  {dish.name}
                </h3>
                <p className="mb-3.5 mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-[#6C7C73]">
                  {dish.description}
                </p>
                <p className="mb-3 font-display text-xl font-bold text-[#0A2E24]">
                  {formatNaira(dish.price)}
                </p>
                <button
                  onClick={() => setOpenDish(dish)}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-[#DF5F49] py-2.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition hover:-translate-y-0.5"
                >
                  <ShoppingCart size={15} />
                  Add to cart
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      <DishModal
        dish={openDish}
        restaurantId={restaurant.id}
        restaurantName={restaurant.name}
        onClose={() => setOpenDish(null)}
      />
    </div>
  );
}

function InfoCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#E4DACA] px-5 py-5 last:border-b-0 sm:[&:nth-child(2)]:border-r-0 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:[&:nth-child(odd)]:border-r">
      <dt className="mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6C7C73]">
        {label}
      </dt>
      <dd className="text-sm font-semibold text-[#14201B]">{children}</dd>
    </div>
  );
}
