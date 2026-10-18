import {
  Bell,
  ChevronDown,
  CircleUser,
  ClipboardList,
  LifeBuoy,
  MapPin,
  Search,
  ShoppingCart,
  UtensilsCrossed,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatNaira } from '../../lib/format';
import CartDrawer from '../CartDrawer';
import { useSearch } from '../../context/SearchContext';

const NAV_ITEMS = [
  { to: '/kitchens', label: 'Kitchens', icon: UtensilsCrossed },
  { to: '/orders', label: 'Orders', icon: ClipboardList },
  { to: '/account', label: 'Account', icon: CircleUser },
];

/**
 * The single app chrome for every in-app route.
 *
 * Previously each screen rendered its own header, so the restaurant page fell
 * back to the marketing navigation. One shell, rendered once, makes that
 * inconsistency impossible.
 */
export default function AppShell() {
  const { count, totals, openCart } = useCart();
  const { profile, isAuthenticated } = useAuth();
  const { query, setQuery } = useSearch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const firstName = profile?.fullName?.split(' ')[0] || 'Guest';

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#14201B]">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[236px] flex-col gap-1 border-r border-[#E4DACA] bg-[#FFFDF8] p-4 lg:flex">
        <NavLink to="/" className="px-2 pb-6 pt-1 font-display text-2xl font-extrabold tracking-tight text-[#DF5F49]">
          kanoeats<span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-[#E9A93A] align-baseline" />
        </NavLink>

        <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A9B4AE]">Discover</p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-[#DF5F49] text-white shadow-[0_3px_10px_rgba(223,95,73,0.3)]'
                  : 'text-[#3D4E46] hover:bg-[#F2E8D7]'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        <p className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#A9B4AE]">Help</p>
        <a
          href="https://wa.me/2348123456789"
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#3D4E46] transition hover:bg-[#F2E8D7]"
        >
          <LifeBuoy size={18} />
          WhatsApp support
        </a>

        <div className="relative mt-auto overflow-hidden rounded-2xl bg-[#0A2E24] p-5 text-white">
          <p className="font-display text-base font-bold">Iftar delivery</p>
          <p className="mt-1.5 text-[11.5px] text-white/60">
            Schedule your box to land before Maghrib — timed for your city.
          </p>
          <button
            onClick={() => navigate('/kitchens')}
            className="mt-3 rounded-full bg-[#E9A93A] px-4 py-2 text-xs font-bold text-[#3A2A08] transition hover:brightness-105"
          >
            Browse boxes
          </button>
        </div>
      </aside>

      {/* ---------- Desktop topbar ---------- */}
      <header className="fixed inset-x-0 top-0 z-30 hidden h-[72px] items-center gap-3.5 border-b border-[#E4DACA] bg-[#FAF5EC]/90 px-6 backdrop-blur lg:left-[236px] lg:flex">
        <button
          onClick={() => navigate('/account')}
          className="flex max-w-[230px] items-center gap-2 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-3.5 py-2 text-left transition hover:border-[#E9A93A]"
        >
          <MapPin size={16} className="shrink-0 text-[#DF5F49]" />
          <span className="min-w-0">
            <span className="block text-[10.5px] leading-tight text-[#6C7C73]">Deliver to</span>
            <span className="block truncate text-[13px] font-semibold">Nassarawa GRA, Kano</span>
          </span>
          <ChevronDown size={14} className="shrink-0 text-[#6C7C73]" />
        </button>

        <label className="flex max-w-[440px] flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-2.5 transition focus-within:border-[#E9A93A]">
          <Search size={17} className="shrink-0 text-[#9AA8A0]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search kitchens, suya, masa, kunun…"
            aria-label="Search kitchens and dishes"
            className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#9AA8A0]"
          />
        </label>

        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={() => toast('No new notifications', 'info')}
            aria-label="Notifications"
            className="grid h-[42px] w-[42px] place-items-center rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] transition hover:-translate-y-0.5 hover:border-[#E9A93A]"
          >
            <Bell size={18} className="text-[#3D4E46]" />
          </button>

          <button
            onClick={openCart}
            className="flex items-center gap-2.5 rounded-full bg-[#0F4132] px-5 py-2.5 text-[13.5px] font-semibold text-white transition hover:-translate-y-0.5"
          >
            <ShoppingCart size={17} />
            Cart
            <span className="rounded-full bg-[#E9A93A] px-2 py-0.5 text-[11.5px] font-bold text-[#3A2A08]">
              {count}
            </span>
          </button>

          <NavLink
            to={isAuthenticated ? '/account' : '/signin'}
            className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] py-1.5 pl-1.5 pr-3.5 transition hover:border-[#E9A93A]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#166049] text-xs font-bold text-[#E9A93A]">
              {firstName.charAt(0).toUpperCase()}
            </span>
            <span>
              <span className="block text-[12.5px] font-bold leading-tight">{firstName}</span>
              <span className="text-[10.5px] text-[#6C7C73]">
                {isAuthenticated ? 'Kano' : 'Sign in'}
              </span>
            </span>
          </NavLink>
        </div>
      </header>

      {/* ---------- Mobile header ---------- */}
      <header className="fixed inset-x-0 top-0 z-30 flex flex-col gap-2.5 border-b border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2.5">
          <NavLink to="/" className="font-display text-xl font-extrabold tracking-tight text-[#DF5F49]">
            kanoeats
          </NavLink>
          <button
            onClick={() => navigate('/account')}
            className="ml-auto flex min-w-0 items-center gap-1.5 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-3 py-1.5"
          >
            <MapPin size={13} className="shrink-0 text-[#DF5F49]" />
            <span className="truncate text-[11.5px] font-semibold">Nassarawa, Kano</span>
          </button>
        </div>
        <label className="flex items-center gap-2.5 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-2.5">
          <Search size={16} className="shrink-0 text-[#9AA8A0]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cuisine, kitchen, dish…"
            aria-label="Search kitchens and dishes"
            className="w-full min-w-0 bg-transparent text-[13.5px] outline-none placeholder:text-[#9AA8A0]"
          />
        </label>
      </header>

      {/* ---------- Page body ---------- */}
      <main className="px-4 pb-40 pt-[118px] lg:ml-[236px] lg:px-6 lg:pb-24 lg:pt-[100px]">
        <Outlet />
      </main>

      {/* ---------- Mobile sticky cart bar ---------- */}
      {count > 0 && (
        <button
          onClick={openCart}
          className="fixed inset-x-3 bottom-[78px] z-40 flex items-center gap-3 rounded-full bg-[#0F4132] py-3 pl-5 pr-3 text-white shadow-2xl lg:hidden"
        >
          <ShoppingCart size={20} className="text-[#E9A93A]" />
          <span className="text-left">
            <span className="block font-display text-sm font-bold">{formatNaira(totals.subtotal)}</span>
            <span className="block text-[11px] text-white/65">
              {count} item{count === 1 ? '' : 's'}
            </span>
          </span>
          <span className="ml-auto rounded-full bg-[#E9A93A] px-4 py-2 text-[13px] font-bold text-[#3A2A08]">
            View cart
          </span>
        </button>
      )}

      {/* ---------- Mobile bottom nav ---------- */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#E4DACA] bg-[#FFFDF8] px-1 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 lg:hidden">
        {NAV_ITEMS.slice(0, 2).map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1.5 text-[10.5px] font-semibold ${
                isActive ? 'text-[#DF5F49]' : 'text-[#6C7C73]'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 py-1.5 text-[10.5px] font-semibold text-[#6C7C73]"
        >
          <ShoppingCart size={20} />
          Cart
          {count > 0 && (
            <span className="absolute right-[calc(50%-20px)] top-0.5 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[#DF5F49] px-1 text-[9.5px] font-bold text-white">
              {count}
            </span>
          )}
        </button>
        <NavLink
          to={isAuthenticated ? '/account' : '/signin'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 py-1.5 text-[10.5px] font-semibold ${
              isActive ? 'text-[#DF5F49]' : 'text-[#6C7C73]'
            }`
          }
        >
          <CircleUser size={20} />
          Account
        </NavLink>
      </nav>

      <CartDrawer />
    </div>
  );
}
