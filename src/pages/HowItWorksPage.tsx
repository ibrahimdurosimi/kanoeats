import { ArrowLeft, Bike, ChefHat, CreditCard, HelpCircle, UtensilsCrossed } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteFooter from '../components/layout/SiteFooter';
import { DagiPattern } from './LandingPage';

const STEPS = [
  {
    icon: UtensilsCrossed,
    title: 'Choose a kitchen',
    body: 'Browse verified Arewa kitchens near you. Every kitchen on KanoEats is visited in person and halal certified before it is listed, and we re-check annually.',
  },
  {
    icon: ChefHat,
    title: 'Customise your plate',
    body: 'Set your yaji heat level from mild to wuta, add kilishi or extra sides, and choose portions. Your preferences travel with the order to the kitchen.',
  },
  {
    icon: CreditCard,
    title: 'Pay how you prefer',
    body: 'Card, bank transfer, USSD through Paystack, or cash to the rider on delivery. Promo codes apply at checkout, and catering orders can be split with a deposit.',
  },
  {
    icon: Bike,
    title: 'Track it to your gate',
    body: 'Follow your order from confirmation through preparation to the rider leaving the kitchen. Insulated packs keep suya hot and kunun cold.',
  },
];

const FAQS = [
  {
    q: 'Is all food listed on KanoEats 100% halal?',
    a: 'Yes. Every kitchen is physically visited and verified before listing, and each carries halal certification we re-check annually. Meat comes from certified abattoirs only. Kitchens that cannot demonstrate compliance are not listed — there are no exceptions.',
  },
  {
    q: 'What traditional Hausa delicacies can I get?',
    a: 'Tsire and balangu suya, masa (waina), tuwo shinkafa with miyan taushe or miyan kuka, dambun nama, kilishi, dankwa, kunun aya, kunun zaki and fura da nono — plus grills and sides from our fusion kitchens.',
  },
  {
    q: 'Do you deliver to my neighbourhood?',
    a: 'We currently ride across Kano Metropolis, Kaduna and Abuja, with Lagos opening soon. Enter your address in the app and you will see live kitchens and honest delivery times for your exact location before you order.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Card, bank transfer, USSD and cash on delivery. Promo codes can be applied at checkout. For catering orders above ₦150,000 we accept a 50% deposit with the balance on the day.',
  },
  {
    q: 'Can I schedule an order for Iftar or an event?',
    a: 'Yes. Pick a delivery slot at checkout. During Ramadan you can time delivery to land before Maghrib. Catering orders need 72 hours notice, though rush requests are often possible.',
  },
  {
    q: 'What if something is wrong with my order?',
    a: 'Message us on WhatsApp from the order tracking page. We handle replacements and refunds directly with the kitchen — you should not have to chase anyone.',
  },
];

export default function HowItWorksPage() {
  const [open, setOpen] = useState<number | null>(0);

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
          <div className="relative overflow-hidden rounded-[40px] border-2 border-[#E9A93A] bg-[#0A2E24] px-6 py-16 text-center sm:px-10">
            <DagiPattern />
            <Link
              to="/"
              className="relative inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to home
            </Link>
            <h1 className="relative mt-5 font-display text-[clamp(30px,5vw,56px)] font-bold text-white">
              How KanoEats works
            </h1>
            <p className="relative mx-auto mt-5 max-w-[580px] text-[16px] text-white/70">
              Four steps between you and a plate that tastes like home.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid w-[min(1200px,92vw)] gap-5 sm:grid-cols-2">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className="relative rounded-[20px] border border-[#E4DACA] bg-[#FFFDF8] p-7 transition hover:-translate-y-1 hover:border-[#E9A93A] hover:shadow-lg"
            >
              <span className="absolute right-6 top-6 grid h-8 w-8 place-items-center rounded-full bg-[#0F4132] text-sm font-bold text-[#E9A93A]">
                {i + 1}
              </span>
              <span className="mb-5 grid h-16 w-16 place-items-center rounded-[18px] bg-[#FBEFD6]">
                <Icon size={28} className="text-[#8A5F10]" strokeWidth={1.8} />
              </span>
              <h2 className="font-display text-xl font-bold text-[#0A2E24]">{title}</h2>
              <p className="mt-2.5 max-w-[90%] text-[14px] leading-relaxed text-[#6C7C73]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-[min(820px,92vw)]">
          <div className="mb-10 text-center">
            <span className="mb-3 block text-[11.5px] font-bold uppercase tracking-[0.19em] text-[#DF5F49]">
              Good to know
            </span>
            <h2 className="font-display text-[clamp(28px,3.6vw,40px)] font-bold text-[#0A2E24]">
              Questions &amp; answers
            </h2>
          </div>

          <div className="rounded-[26px] border border-[#E4DACA] bg-[#FFFDF8] px-7">
            {FAQS.map((faq, i) => (
              <div key={faq.q} className="border-b border-[#E4DACA] last:border-0">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-5 py-6 text-left font-semibold text-[#0A2E24]"
                >
                  {faq.q}
                  <HelpCircle
                    size={19}
                    className={`shrink-0 text-[#E9A93A] transition-transform duration-300 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300"
                  style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[14.5px] leading-relaxed text-[#6C7C73]">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
