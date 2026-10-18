import {
  ArrowRight,
  Bike,
  Coffee,
  Cookie,
  Flame,
  Leaf,
  Search as SearchIcon,
  SlidersHorizontal,
  Soup,
  Star,
  UtensilsCrossed,
  Wheat,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DishArt, { ART_BG } from '../components/DishArt';
import RestaurantCard from '../components/RestaurantCard';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useToast } from '../context/ToastContext';
import { useRestaurants } from '../hooks/useRestaurants';
import { useOrders } from '../hooks/useOrders';
import { formatNaira } from '../lib/format';

const CATEGORIES = [
  { id: 'all', label: 'All', icon: UtensilsCrossed },
  { id: 'traditional', label: 'Traditional', icon: Soup },
  { id: 'suya', label: 'Suya', icon: Flame },
  { id: 'masa', label: 'Masa', icon: Wheat },
  { id: 'snacks', label: 'Snacks', icon: Cookie },
  { id: 'drinks', label: 'Drinks', icon: Coffee },
  { id: 'vegan', label: 'Vegan', icon: Leaf },
];

type SortKey = 'featured' | 'rating' | 'time';

export default function DiscoverPage() {
  const { restaurants, loading } = useRestaurants();
  const { query } = useSearch();
  const { isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const { toast } = useToast();
  const { openCart } = useCart();
  const navigate = useNavigate();

  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState<SortKey>('featured');
  const [filters, setFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (f: string) =>
    setFilters((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });

  const clearAll = () => {
    setFilters(new Set());
    setCategory('all');
    setSort('featured');
  };

  const matchesCategory = (r: (typeof restaurants)[number]) => {
    if (category === 'all') return true;
    const haystack = `${r.cuisine} ${r.tags.join(' ')} ${r.dishes.map((d) => d.name).join(' ')}`.toLowerCase();
    if (category === 'vegan') return r.tags.includes('Vegan');
    if (category === 'traditional') return r.tags.includes('Traditional') || haystack.includes('tuwo');
    if (category === 'drinks') return r.dishes.some((d) => d.category === 'Drinks');
    if (category === 'snacks') return r.dishes.some((d) => d.category === 'Snacks');
    return haystack.includes(category);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = restaurants.filter((r) => {
      if (!matchesCategory(r)) return false;
      if (filters.has('halal') && !r.tags.includes('Halal')) return false;
      if (filters.has('vegan') && !r.tags.includes('Vegan')) return false;
      if (filters.has('rating') && r.rating < 4.5) return false;
      if (q) {
        const hay = `${r.name} ${r.cuisine} ${r.dishes.map((d) => d.name).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sort === 'rating') return [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'time') return [...list].sort((a, b) => a.deliveryTime - b.deliveryTime);
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants, query, category, filters, sort]);

  const fastest = useMemo(
    () => [...restaurants].sort((a, b) => a.deliveryTime - b.deliveryTime).slice(0, 3),
    [restaurants],
  );

  const recentOrders = orders.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1280px]">
      <header>
        <h1 className="font-display text-[clamp(26px,3.2vw,36px)] font-bold text-[#0A2E24]">
          Kitchen discovery
        </h1>
        <p className="mt-1 text-sm text-[#6C7C73]">
          What authentic Arewa flavour are you craving today?
        </p>
      </header>

      {/* ---------- Promos ---------- */}
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <article className="relative flex min-h-[214px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-[#6E2410] to-[#3A1006] p-7 transition hover:-translate-y-1 hover:shadow-xl">
          <DishArt art="suya" className="absolute -bottom-5 -right-4 h-[186px] w-[186px] opacity-95" />
          {/* Scrim keeps the headline legible over the artwork */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A140C]/90 via-[#0A140C]/60 to-[#0A140C]/15" />
          <div className="relative">
            <span className="inline-block rounded-full bg-[#E9A93A] px-3.5 py-1.5 text-[10.5px] font-bold tracking-[0.1em] text-[#3A2A08]">
              DEAL OF THE DAY
            </span>
            <h2 className="mt-3.5 max-w-[72%] font-display text-[clamp(21px,2.4vw,30px)] font-bold text-white">
              Experience authentic flavour
            </h2>
            <p className="mb-4 mt-2 max-w-[74%] text-[13.5px] text-white/80">
              20% off all suya and grills from Kano Suya Palace this weekend.
            </p>
            <button
              onClick={() => {
                toast('Use code SUYA20 at checkout');
                openCart();
              }}
              className="rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
            >
              Claim offer
            </button>
          </div>
        </article>

        <article className="relative flex min-h-[214px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F4132] to-[#0A2E24] p-7 transition hover:-translate-y-1 hover:shadow-xl">
          <Bike className="absolute -bottom-4 -right-2 h-[150px] w-[150px] text-white/10" strokeWidth={1} />
          <div className="relative">
            <span className="inline-block rounded-full bg-[#E9A93A]/20 px-3.5 py-1.5 text-[10.5px] font-bold tracking-[0.1em] text-[#F6CE7C]">
              FREE DISPATCH
            </span>
            <h2 className="mt-3.5 font-display text-[clamp(20px,2.2vw,27px)] font-bold text-white">
              Free delivery in Kano Metropolis
            </h2>
            <p className="mb-4 mt-2 text-[13.5px] text-white/75">
              Order above {formatNaira(15000)} and we cover the rider.
            </p>
            <button
              onClick={() => document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0A2E24] transition hover:-translate-y-0.5"
            >
              Browse kitchens
            </button>
          </div>
        </article>
      </div>

      {/* ---------- Categories ---------- */}
      <h2 className="mb-4 mt-11 font-display text-[22px] font-bold text-[#0A2E24]">
        Cuisines &amp; categories
      </h2>
      <div className="relative">
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-3.5 pt-1">
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const on = category === id;
            return (
              <button
                key={id}
                onClick={() => setCategory(id)}
                aria-pressed={on}
                className={`flex w-[104px] shrink-0 flex-col items-center gap-2.5 rounded-2xl border-[1.5px] p-4 transition duration-300 ${
                  on
                    ? '-translate-y-1 border-[#0F4132] bg-[#0F4132] text-white shadow-lg'
                    : 'border-[#E4DACA] bg-[#FFFDF8] hover:-translate-y-1 hover:border-[#F6CE7C]'
                }`}
              >
                <span
                  className={`grid h-[42px] w-[42px] place-items-center rounded-xl transition ${
                    on ? 'bg-white/15' : 'bg-[#FBEFD6]'
                  }`}
                >
                  <Icon size={21} className={on ? 'text-[#F6CE7C]' : 'text-[#8A5F10]'} />
                </span>
                <span className="text-[12.5px] font-semibold">{label}</span>
              </button>
            );
          })}
        </div>
        <div className="pointer-events-none absolute bottom-3.5 right-0 top-0 w-10 bg-gradient-to-l from-[#FAF5EC] to-transparent" />
      </div>

      {/* ---------- Order again ---------- */}
      {isAuthenticated && recentOrders.length > 0 && (
        <>
          <div className="mb-4 mt-11 flex items-center justify-between gap-4">
            <h2 className="font-display text-[22px] font-bold text-[#0A2E24]">Order again</h2>
            <Link to="/orders" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[#E9A93A] hover:underline">
              View all orders <ArrowRight size={14} />
            </Link>
          </div>
          <div className="hide-scrollbar flex gap-3.5 overflow-x-auto pb-3.5 pt-1">
            {recentOrders.map((order) => (
              <button
                key={order.id}
                onClick={() => navigate(`/kitchens/${order.restaurantId}`)}
                className="flex w-[286px] shrink-0 items-center gap-3.5 rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-3.5 text-left transition hover:-translate-y-1 hover:border-[#E9A93A]"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-[#F2E8D7]">
                  <DishArt art="kitchen" className="h-11 w-11" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {order.items[0]?.dishName ?? 'Previous order'}
                    {order.items.length > 1 && ` +${order.items.length - 1}`}
                  </span>
                  <span className="mt-0.5 block truncate text-[11.5px] text-[#6C7C73]">
                    {order.restaurantName ?? 'Kitchen'} · {formatNaira(order.total)}
                  </span>
                </span>
                <ArrowRight size={16} className="ml-auto shrink-0 text-[#8A5F10]" />
              </button>
            ))}
          </div>
        </>
      )}

      {/* ---------- Fastest ---------- */}
      <div className="mb-4 mt-11 flex items-center justify-between gap-4">
        <h2 className="font-display text-[22px] font-bold text-[#0A2E24]">Fastest near you</h2>
        <span className="text-[13.5px] font-semibold text-[#6C7C73]">Under 25 minutes</span>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : fastest.map((r) => (
              <Link
                key={r.id}
                to={`/kitchens/${r.id}`}
                className="group overflow-hidden rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] transition duration-300 hover:-translate-y-1.5 hover:border-[#E9A93A] hover:shadow-xl"
              >
                <div className="relative grid h-[132px] place-items-center" style={{ background: ART_BG[r.artKey] }}>
                  <span className="absolute left-3 top-3 z-[2] flex items-center gap-1.5 rounded-full bg-[#FFFDF8]/95 px-2.5 py-1.5 text-[10.5px] font-bold backdrop-blur">
                    <Flame size={11} className="fill-[#DF5F49] text-[#DF5F49]" />
                    {r.deliveryTime} MIN
                  </span>
                  <DishArt art={r.artKey} className="h-[104px] w-[104px] transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="px-4 pb-4 pt-3.5">
                  <h3 className="font-display text-base font-bold text-[#0A2E24]">{r.name}</h3>
                  <p className="mb-2.5 mt-1 text-[10.5px] font-bold uppercase tracking-[0.09em] text-[#6C7C73]">
                    {r.cuisine}
                  </p>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="flex items-center gap-1 font-bold">
                      <Star size={13} className="fill-[#E9A93A] text-[#E9A93A]" />
                      {r.rating}
                    </span>
                    <span className="text-[#6C7C73]">{r.deliveryTime} mins</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>

      {/* ---------- Browse all ---------- */}
      <h2 id="browse" className="mb-4 mt-11 scroll-mt-28 font-display text-[22px] font-bold text-[#0A2E24]">
        Browse all kitchens
      </h2>
      <div className="mb-6 flex flex-wrap items-center gap-2.5">
        <div className="flex rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-1">
          {(['featured', 'rating', 'time'] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              aria-pressed={sort === key}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition ${
                sort === key ? 'bg-[#0F4132] text-white' : 'text-[#4A5A52]'
              }`}
            >
              {key === 'featured' ? 'Featured' : key === 'rating' ? 'Top rated' : 'Fastest'}
            </button>
          ))}
        </div>

        {[
          { id: 'halal', label: 'Halal only' },
          { id: 'vegan', label: 'Vegan' },
          { id: 'rating', label: '4.5+ rating' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => toggleFilter(f.id)}
            aria-pressed={filters.has(f.id)}
            className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2.5 text-[13px] font-medium transition ${
              filters.has(f.id)
                ? 'border-[#E9A93A] bg-[#FBEFD6] font-semibold text-[#7A5510]'
                : 'border-[#E4DACA] bg-[#FFFDF8] hover:border-[#E9A93A]'
            }`}
          >
            <SlidersHorizontal size={13} />
            {f.label}
          </button>
        ))}

        <span className="ml-auto text-[12.5px] text-[#6C7C73]">
          {loading ? 'Loading…' : `${filtered.length} kitchen${filtered.length === 1 ? '' : 's'} found`}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full rounded-3xl border-[1.5px] border-dashed border-[#E4DACA] bg-[#FFFDF8] px-5 py-16 text-center">
            <SearchIcon size={52} className="mx-auto mb-4 text-[#6C7C73] opacity-50" strokeWidth={1.4} />
            <h3 className="font-display text-lg font-bold text-[#0A2E24]">No kitchens match that</h3>
            <p className="mx-auto mt-1.5 max-w-sm text-sm text-[#6C7C73]">
              Try clearing a filter or widening your search — we add new Arewa kitchens every week.
            </p>
            <button
              onClick={clearAll}
              className="mt-5 rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filtered.map((r) => <RestaurantCard key={r.id} restaurant={r} />)
        )}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8]">
      <div className="h-[132px] animate-pulse bg-[#EFE6D5]" />
      <div className="space-y-2.5 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-[#EFE6D5]" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-[#EFE6D5]" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#EFE6D5]" />
      </div>
    </div>
  );
}
