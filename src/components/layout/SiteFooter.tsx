import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A2E24] pt-16 text-white">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <div className="grid gap-11 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1.3fr_1fr]">
          <div>
            <Link to="/" className="font-display text-[26px] font-extrabold tracking-tight text-[#F6CE7C]">
              kanoeats
              <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-[#E9A93A] align-baseline" />
            </Link>
            <p className="mt-4 max-w-[330px] text-[13.5px] leading-relaxed text-white/60">
              KanoEats serves the vibrant Hausa community and Arewa food lovers with warm
              hospitality. From fluffy pan-fried waina to charcoal-roasted tsire suya, we serve our
              heritage with pure trust.
            </p>
            <div className="mt-4 flex gap-2.5">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#E9A93A]/30 bg-[#E9A93A]/15 transition hover:-translate-y-0.5 hover:bg-[#E9A93A] hover:text-[#0A2E24]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#E9A93A]">
              Navigation
            </p>
            {[
              { to: '/how-it-works', label: 'How it works' },
              { to: '/kitchens', label: 'Kitchens' },
              { to: '/orders', label: 'Your orders' },
              { to: '/account', label: 'Account' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="mb-3 block text-sm text-white/65 transition hover:translate-x-1 hover:text-[#E9A93A]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div>
            <p className="mb-5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#E9A93A]">
              Contact us
            </p>
            <address className="text-[13.5px] not-italic leading-relaxed text-white/65">
              <strong className="mb-2 block font-semibold text-white">Gidan Arewa Mansion</strong>
              Post Office Road, Fagge
              <br />
              Kano State, Nigeria
              <br />
              <br />
              +234 812 345 6789
              <br />
              <a href="mailto:hello@kanoeats.com.ng" className="text-[#F6CE7C] hover:underline">
                hello@kanoeats.com.ng
              </a>
              <br />
              <a
                href="https://wa.me/2348123456789"
                target="_blank"
                rel="noreferrer"
                className="text-[#7ED9A8] hover:underline"
              >
                WhatsApp support →
              </a>
            </address>
          </div>

          <div>
            <p className="mb-5 text-[11.5px] font-bold uppercase tracking-[0.16em] text-[#E9A93A]">
              Company
            </p>
            {['Partner with us', 'Ride with us', 'Careers', 'Privacy policy', 'Terms of service'].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  className="mb-3 block text-sm text-white/65 transition hover:translate-x-1 hover:text-[#E9A93A]"
                >
                  {label}
                </a>
              ),
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-white/10 py-7 text-[12.5px] text-white/50">
          <span>© {new Date().getFullYear()} KanoEats. All rights reserved.</span>
          <span>Made with warmth in Kano</span>
        </div>
      </div>
    </footer>
  );
}
