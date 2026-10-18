import { ArrowLeft, CheckCircle2, Loader2, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import DishArt from '../components/DishArt';
import SiteFooter from '../components/layout/SiteFooter';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { submitCateringRequest } from '../lib/api';
import { DELIVERY_ZONES, IS_SUPABASE_CONFIGURED } from '../lib/config';
import { CATERING_OCCASIONS } from '../types';
import { DagiPattern } from './LandingPage';

export default function CateringPage() {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(profile?.fullName ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [occasion, setOccasion] = useState<string>(CATERING_OCCASIONS[0]);
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('50');
  const [city, setCity] = useState('Kano');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const guests = Number(guestCount);
    if (!Number.isFinite(guests) || guests < 1) {
      toast('Enter how many guests you expect', 'error');
      return;
    }

    if (!IS_SUPABASE_CONFIGURED) {
      toast('Catering requests need a Supabase connection. See the README.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await submitCateringRequest(
        {
          fullName,
          email,
          phone,
          occasion,
          eventDate: eventDate || null,
          guestCount: guests,
          city,
          notes,
        },
        user?.id ?? null,
      );
      setSent(true);
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Could not send your request', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EC] text-[#14201B]">
      <header className="sticky top-0 z-50 border-b border-[#E4DACA] bg-[#FAF5EC]/85 backdrop-blur">
        <div className="mx-auto flex h-[74px] w-[min(1200px,92vw)] items-center">
          <Link to="/" className="font-display text-[26px] font-extrabold tracking-tight text-[#DF5F49]">
            kanoeats
          </Link>
          <Link
            to="/kitchens"
            className="ml-auto rounded-full bg-[#DF5F49] px-5 py-3 text-[14.5px] font-semibold text-white shadow-[0_3px_0_#B94733] transition hover:-translate-y-0.5"
          >
            Order now
          </Link>
        </div>
      </header>

      <section className="pt-7">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <div className="relative overflow-hidden rounded-[40px] border-2 border-[#E9A93A] bg-[#0A2E24] px-6 py-14 text-center sm:px-10">
            <DagiPattern />
            <Link
              to="/"
              className="relative inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to home
            </Link>
            <h1 className="relative mt-5 font-display text-[clamp(30px,5vw,54px)] font-bold text-white">
              Catering &amp; bulk orders
            </h1>
            <p className="relative mx-auto mt-5 max-w-[580px] text-[16px] text-white/70">
              Weddings, naming ceremonies, Sallah gatherings and corporate iftar. Our kitchens cook
              at scale without losing what makes the food taste like home.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid w-[min(1100px,92vw)] gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          {sent ? (
            <div className="rounded-3xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-6 py-16 text-center">
              <CheckCircle2 size={52} className="mx-auto mb-4 text-[#166049]" strokeWidth={1.5} />
              <h2 className="font-display text-2xl font-bold text-[#0A2E24]">Request received</h2>
              <p className="mx-auto mt-2.5 max-w-sm text-sm text-[#6C7C73]">
                We will reach out on {phone || 'your phone'} within one working day with a quote.
                For anything urgent, message us on WhatsApp and quote your name.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                <a
                  href="https://wa.me/2348123456789"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#E9A93A] px-5 py-3 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition hover:-translate-y-0.5"
                >
                  Message on WhatsApp
                </a>
                <Link
                  to="/kitchens"
                  className="rounded-full border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-5 py-3 text-sm font-semibold transition hover:border-[#166049]"
                >
                  Browse kitchens
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-7"
            >
              <h2 className="font-display text-xl font-bold text-[#0A2E24]">Request a quote</h2>
              <p className="mt-1.5 text-[13.5px] text-[#6C7C73]">
                Tell us about the event and we will come back with a menu and a price.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Your name" value={fullName} onChange={setFullName} required autoComplete="name" />
                <Field label="Phone number" value={phone} onChange={setPhone} type="tel" required autoComplete="tel" />
                <Field label="Email" value={email} onChange={setEmail} type="email" required autoComplete="email" />

                <label className="block">
                  <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">Occasion</span>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
                  >
                    {CATERING_OCCASIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>

                <Field
                  label="Event date"
                  value={eventDate}
                  onChange={setEventDate}
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                />
                <Field
                  label="Number of guests"
                  value={guestCount}
                  onChange={setGuestCount}
                  type="number"
                  min={1}
                  required
                />

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">City</span>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
                  >
                    {DELIVERY_ZONES.filter((z) => z.live).map((z) => (
                      <option key={z.city}>{z.city}</option>
                    ))}
                  </select>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">
                    What are you thinking of? (optional)
                  </span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    maxLength={800}
                    placeholder="Suya and masa stations, vegetarian options, serving staff needed…"
                    className="w-full resize-none rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#DF5F49] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition enabled:hover:-translate-y-0.5 disabled:opacity-60"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                Send request
              </button>

              <p className="mt-3 text-center text-[11.5px] text-[#6C7C73]">
                No account needed. We reply within one working day.
              </p>
            </form>
          )}

          <aside className="space-y-4">
            <div className="relative grid min-h-[200px] place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#E9A93A] to-[#9A6318]">
              <DishArt art="masa" className="h-32 w-32" />
            </div>

            <div className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-5">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-[#0A2E24]">
                <Users size={17} className="text-[#DF5F49]" />
                How it works
              </h3>
              <ul className="mt-3 space-y-2.5 text-[13px] text-[#6C7C73]">
                <li>Serves 50 to 500 guests — trays, warmers and servers included.</li>
                <li>72 hours notice preferred; rush orders often possible.</li>
                <li>
                  Orders above ₦150,000 can be split: 50% deposit, balance on the day.
                </li>
                <li>Every kitchen is halal verified, same as the main menu.</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none transition focus:border-[#E9A93A]"
        {...rest}
      />
    </label>
  );
}
