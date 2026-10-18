import {
  ArrowRight,
  BadgeCheck,
  Bike,
  ChefHat,
  Clock,
  CreditCard,
  Search,
  Star,
  UtensilsCrossed,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DishArt, { ART_BG } from '../components/DishArt';
import CateringSection from '../components/landing/CateringSection';
import MeetTheKitchens from '../components/landing/MeetTheKitchens';
import PartnerCTA from '../components/landing/PartnerCTA';
import SeasonalSpecials from '../components/landing/SeasonalSpecials';
import TestimonialsCarousel from '../components/landing/TestimonialsCarousel';
import { useRestaurants } from '../hooks/useRestaurants';
import { useSearch } from '../context/SearchContext';
import { DELIVERY_ZONES } from '../lib/config';
import SiteFooter from '../components/layout/SiteFooter';

const STEPS = [
  {
    icon: UtensilsCrossed,
    title: 'Choose a kitchen',
    body: 'Browse verified Arewa kitchens near you — suya spots, masa houses, tuwo joints and more.',
  },
  {
    icon: ChefHat,
    title: 'Customise your plate',
    body: 'Set your yaji heat level, add kilishi on the side, and pick portions made how you like.',
  },
  {
    icon: CreditCard,
    title: 'Place your order',
    body: 'Pay by card, transfer or on delivery. Schedule ahead for Iftar or a Sallah gathering.',
  },
  {
    icon: Bike,
    title: 'Delivered hot',
    body: 'Track your rider from the grill to your gate. Insulated packs keep everything steaming.',
  },
];

export default function LandingPage() {
  const { restaurants } = useRestaurants();
  const { setQuery } = useSearch();
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState('');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(heroQuery);
    navigate('/kitchens');
  };

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#14201B]">
      {/* ---------- Nav ---------- */}
      <header className="sticky top-0 z-50 border-b border-[#E4DACA] bg-[#FAF5EC]/85 backdrop-blur">
        <div className="mx-auto flex h-[74px] w-[min(1200px,92vw)] items-center gap-9">
          <Link to="/" className="font-display text-[26px] font-extrabold tracking-tight text-[#DF5F49]">
            kanoeats
            <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-[#E9A93A] align-baseline" />
          </Link>
          <nav className="ml-auto hidden gap-7 text-[14.5px] font-medium text-[#33463D] md:flex">
            <Link to="/how-it-works" className="transition hover:text-[#14201B]">How it works</Link>
            <a href="#kitchens" className="transition hover:text-[#14201B]">Kitchens</a>
            <a href="#catering" className="transition hover:text-[#14201B]">Catering</a>
            <a href="#coverage" className="transition hover:text-[#14201B]">Coverage</a>
          </nav>
          <div className="ml-auto flex items-center gap-2.5 md:ml-0">
            <Link
              to="/signin"
              className="hidden rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-5 py-3 text-[14.5px] font-semibold transition hover:border-[#166049] sm:block"
            >
              Sign in
            </Link>
            <Link
              to="/kitchens"
              className="flex items-center gap-2 rounded-full bg-[#DF5F49] px-5 py-3 text-[14.5px] font-semibold text-white shadow-[0_3px_0_#B94733] transition hover:-translate-y-0.5"
            >
              Order now
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="pt-7">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <div className="relative overflow-hidden rounded-[40px] border-2 border-[#E9A93A] bg-[#0A2E24] px-6 py-16 text-center sm:px-10 sm:py-20">
            <DagiPattern />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-[#E9A93A]/40 bg-[#E9A93A]/15 px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.15em] text-[#F6CE7C]">
              <Star size={12} className="fill-current" />
              Kano · Kaduna · Abuja
            </span>
            <h1 className="relative mt-6 font-display text-[clamp(34px,6vw,70px)] font-bold leading-[1.08] text-white">
              Your favourite Northern
              <br />
              delicacies, served{' '}
              <span className="relative inline-block px-7 py-0.5 text-[#E9A93A]">
                <span className="absolute inset-[-6px_-4px] rounded-full border-2 border-dashed border-[#E9A93A]/55 bg-[#E9A93A]/10" />
                <span className="relative">hot</span>
                <span className="absolute -right-6 -top-4 rotate-[9deg] rounded-full bg-[#DF5F49] px-2.5 py-1 font-sans text-[9.5px] font-bold tracking-wide text-white">
                  100% HALAL
                </span>
              </span>
            </h1>
            <p className="relative mx-auto mt-7 max-w-[620px] text-[16.5px] leading-relaxed text-white/75">
              From fluffy pan-fired masa to charcoal-roasted tsire suya and thick miyan taushe —
              real Arewa kitchens, delivered with pristine hospitality.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative mx-auto mt-9 flex max-w-[660px] flex-wrap items-center gap-2.5 rounded-[24px] bg-white p-3.5 shadow-2xl sm:flex-nowrap sm:rounded-full sm:py-2 sm:pl-6 sm:pr-2"
            >
              <Search size={19} className="hidden shrink-0 text-[#9AA8A0] sm:block" />
              <input
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="Search masa, suya, tuwo shinkafa, or kilishi…"
                aria-label="Search dishes"
                className="w-full min-w-0 bg-transparent py-3 text-center text-[15px] outline-none placeholder:text-[#9AA8A0] sm:flex-1 sm:text-left"
              />
              <button
                type="submit"
                className="w-full shrink-0 rounded-full bg-[#E9A93A] px-6 py-3 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5 sm:w-auto"
              >
                Nemi Abinci
              </button>
            </form>

            <p className="relative mt-4 text-sm text-white/60">
              or{' '}
              <Link to="/kitchens" className="border-b border-[#E9A93A]/40 font-semibold text-[#E9A93A]">
                explore all kitchens →
              </Link>
            </p>
          </div>

          {/* Floating dish cards */}
          <div className="relative z-[5] -mt-11 grid gap-5 md:grid-cols-3">
            {[
              { art: 'suya' as const, kick: 'Hot charcoal', title: 'Tsire Beef Suya', body: 'Charcoal-roasted beef dusted with freshly milled groundnut yaji.', grad: 'from-[#7E2A18] to-[#4A1409]', badge: 'Yaji spiced', badgeClass: 'bg-[#E9A93A] text-[#3A2A08]' },
              { art: 'masa' as const, kick: 'Pumpkin feast', title: 'Fluffy Rice Masa', body: 'Fermented rice cakes fired in authentic oil pan grillers.', grad: 'from-[#D79A2B] to-[#9A6612]', badge: 'Arewa classic', badgeClass: 'bg-[#166049] text-[#CFEBDD]' },
              { art: 'fura' as const, kick: '100% creamy', title: 'Fura da Nono', body: 'Millet grain cakes folded into thick, cold cow-milk yoghurt.', grad: 'from-[#14503C] to-[#082A20]', badge: 'Smooth & chill', badgeClass: 'bg-[#FAF5EC] text-[#0F4132]' },
            ].map((d) => (
              <article
                key={d.title}
                className={`relative flex min-h-[230px] flex-col justify-end overflow-hidden rounded-[28px] bg-gradient-to-br ${d.grad} p-7 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
              >
                <span className={`absolute right-5 top-5 z-[2] rounded-full px-3 py-1.5 text-[10.5px] font-bold ${d.badgeClass}`}>
                  {d.badge}
                </span>
                <DishArt art={d.art} className="absolute -bottom-6 -right-6 h-[172px] w-[172px] opacity-90" />
                <span className="relative text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/65">
                  {d.kick}
                </span>
                <h3 className="relative mb-2 mt-2 max-w-[70%] font-display text-[26px] font-bold text-white">
                  {d.title}
                </h3>
                <p className="relative max-w-[74%] text-[13px] leading-relaxed text-white/70">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="py-24">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <SectionHead
            kicker="Simple as it gets"
            title={<>From the grill to your <Mark>doorstep</Mark></>}
            blurb="Four steps between you and a plate that tastes like home."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, body }, i) => (
              <article
                key={title}
                className="relative rounded-[20px] border border-[#E4DACA] bg-[#FFFDF8] p-7 transition duration-300 hover:-translate-y-1.5 hover:border-[#E9A93A] hover:shadow-lg"
              >
                <span className="absolute right-5 top-5 grid h-7 w-7 place-items-center rounded-full bg-[#0F4132] text-[12.5px] font-bold text-[#E9A93A]">
                  {i + 1}
                </span>
                <span className="mb-5 grid h-16 w-16 place-items-center rounded-[18px] bg-[#FBEFD6]">
                  <Icon size={28} className="text-[#8A5F10]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-[19px] font-bold text-[#0A2E24]">{title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#6C7C73]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Featured kitchens ---------- */}
      <section id="kitchens" className="pb-24">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="mb-3 block text-[11.5px] font-bold uppercase tracking-[0.19em] text-[#DF5F49]">
                Trusted grills
              </span>
              <h2 className="font-display text-[clamp(28px,3.4vw,40px)] font-bold text-[#0A2E24]">
                Featured kitchens
              </h2>
            </div>
            <Link
              to="/kitchens"
              className="rounded-full bg-[#E9A93A] px-5 py-3 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
            >
              Explore all
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {restaurants.slice(0, 4).map((r) => (
              <Link
                key={r.id}
                to={`/kitchens/${r.id}`}
                className="group overflow-hidden rounded-[20px] border border-[#E4DACA] bg-[#FFFDF8] transition duration-300 hover:-translate-y-1.5 hover:border-[#E9A93A] hover:shadow-xl"
              >
                <div className="relative grid h-[184px] place-items-center" style={{ background: ART_BG[r.artKey] }}>
                  <span className="absolute left-3.5 top-3.5 z-[2] flex items-center gap-1.5 rounded-full bg-[#FFFDF8]/95 px-3 py-1.5 text-[12.5px] font-bold backdrop-blur">
                    <Star size={12} className="fill-[#E9A93A] text-[#E9A93A]" />
                    {r.rating}
                  </span>
                  <DishArt art={r.artKey} className="h-[132px] w-[132px] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3" />
                </div>
                <div className="px-5 pb-5 pt-4">
                  <h3 className="font-display text-[17.5px] font-bold leading-tight text-[#0A2E24]">
                    {r.name}
                  </h3>
                  <p className="my-2 flex items-center gap-2 text-[12.5px] text-[#6C7C73]">
                    {r.cuisine}
                    <span className="h-[3px] w-[3px] rounded-full bg-[#C3CCC7]" />
                    <Clock size={12} /> {r.deliveryTime} min
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {r.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#DDEBE3] px-2.5 py-1 text-[10.5px] font-bold text-[#0F4132]">
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MeetTheKitchens />
      <div id="catering">
        <CateringSection />
      </div>
      <SeasonalSpecials />

      {/* ---------- Coverage ---------- */}
      <section id="coverage" className="py-24">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <div className="grid gap-12 rounded-[40px] border border-[#E4DACA] bg-[#FFFDF8] p-8 sm:p-11 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="mb-3 block text-[11.5px] font-bold uppercase tracking-[0.19em] text-[#DF5F49]">
                Where we ride
              </span>
              <h2 className="font-display text-[clamp(26px,3.2vw,38px)] font-bold text-[#0A2E24]">
                Delivery coverage
              </h2>
              <p className="mt-3.5 text-[15px] text-[#6C7C73]">
                Free dispatch on orders above ₦15,000 within Kano Metropolis. Riders run from 8:00am
                to 11:00pm daily.
              </p>
              <ul className="mt-6 space-y-2.5">
                {DELIVERY_ZONES.map((zone) => (
                  <li
                    key={zone.city}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[#E4DACA] bg-[#FAF5EC] px-5 py-3.5 transition hover:translate-x-1 hover:border-[#E9A93A]"
                  >
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-bold">{zone.city}</span>
                      <span className="block truncate text-[12.5px] text-[#6C7C73]">
                        {zone.areas.join(', ')}
                      </span>
                    </span>
                    {zone.live ? (
                      <span className="flex shrink-0 items-center gap-2 text-[11.5px] font-bold text-[#166049]">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-[#2FA36B]" />
                        LIVE
                      </span>
                    ) : (
                      <span className="shrink-0 text-[11.5px] font-bold text-[#B08320]">SOON</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative grid min-h-[330px] place-items-center overflow-hidden rounded-[28px] bg-[#0A2E24]">
              <DagiPattern />
              <svg viewBox="0 0 320 260" className="relative w-full max-w-[340px]">
                <g stroke="rgba(233,169,58,.28)" strokeWidth="1" fill="none">
                  <path d="M0 70h320M0 130h320M0 190h320M80 0v260M160 0v260M240 0v260" />
                </g>
                <path
                  d="M60 180c30-40 60-20 90-60s70-30 100-10"
                  stroke="#E9A93A"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="7 7"
                >
                  <animate attributeName="stroke-dashoffset" from="28" to="0" dur="1.1s" repeatCount="indefinite" />
                </path>
                <circle cx="60" cy="180" r="17" fill="#DF5F49" opacity=".24" />
                <circle cx="60" cy="180" r="9" fill="#DF5F49" />
                <circle cx="250" cy="110" r="9" fill="#E9A93A" />
                <g fill="#F6CE7C" opacity=".85">
                  <circle cx="130" cy="140" r="4.5" />
                  <circle cx="190" cy="90" r="4.5" />
                  <circle cx="105" cy="200" r="4.5" />
                  <circle cx="215" cy="175" r="4.5" />
                </g>
                <text x="60" y="212" fill="#F6CE7C" fontSize="11" textAnchor="middle">Kitchen</text>
                <text x="250" y="142" fill="#F6CE7C" fontSize="11" textAnchor="middle">You</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />
      <PartnerCTA />

      {/* ---------- Trust strip ---------- */}
      <section className="border-y border-[#E4DACA] bg-[#F2E8D7] py-12">
        <div className="mx-auto flex w-[min(1200px,92vw)] flex-wrap items-center justify-center gap-x-14 gap-y-7 text-center">
          {[
            { icon: BadgeCheck, value: '48+', label: 'VERIFIED KITCHENS' },
            { icon: Bike, value: '18min', label: 'AVERAGE DELIVERY' },
            { icon: Star, value: '4.8★', label: 'AVERAGE RATING' },
            { icon: ChefHat, value: '26k', label: 'ORDERS DELIVERED' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon size={20} className="mx-auto mb-2 text-[#DF5F49]" />
              <p className="font-display text-[32px] font-bold text-[#0A2E24]">{value}</p>
              <p className="text-[11.5px] font-semibold tracking-wide text-[#6C7C73]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  blurb,
}: {
  kicker: string;
  title: React.ReactNode;
  blurb: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-[640px] text-center">
      <span className="mb-3.5 block text-[11.5px] font-bold uppercase tracking-[0.19em] text-[#DF5F49]">
        {kicker}
      </span>
      <h2 className="font-display text-[clamp(30px,4vw,46px)] font-bold text-[#0A2E24]">{title}</h2>
      <p className="mt-4 text-[15.5px] text-[#6C7C73]">{blurb}</p>
    </div>
  );
}

function Mark({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-[#E9A93A]">
      <span className="absolute inset-x-[-6px] bottom-0.5 -z-10 h-[34%] rounded-md bg-[#E9A93A]/25" />
      {children}
    </span>
  );
}

/** Hausa dagi interlace motif used as a background texture on dark panels. */
export function DagiPattern() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]" aria-hidden="true">
      <defs>
        <pattern id="dagi" width="90" height="90" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#E9A93A" strokeWidth="1.5">
            <rect x="22" y="22" width="46" height="46" transform="rotate(45 45 45)" />
            <rect x="30" y="30" width="30" height="30" />
            <circle cx="45" cy="45" r="6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dagi)" />
    </svg>
  );
}
