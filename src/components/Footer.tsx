import React, { useState } from 'react';
import { Mail, CheckCircle2, ChevronRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Screen } from '../types';

interface FooterProps {
  onNavigate?: (screen: Screen) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <div className="relative w-full bg-[#faf8f5] overflow-hidden border-t border-orange-100/60 pt-16" id="site-unified-footer">
      
      {/* 1. NEWSLETTER & DELIVERY HIGHLIGHT BLOCK (Matches Image 2 exactly) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16 relative">
        
        {/* Left Side: Delivery courier inside smartphone with a floral golden rosette badge */}
        <div className="lg:col-span-6 flex justify-center items-center relative h-[360px]">
          
          {/* Floral star/rosette yellow backdrop - high precision inline SVG */}
          <div className="absolute inset-x-0 mx-auto flex justify-center items-center w-full z-0 select-none animate-spin-slow">
            <svg viewBox="0 0 200 200" className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] text-amber-400 fill-current opacity-95">
              <path d="M100,10 C115,22 135,10 148,24 C161,38 152,58 167,70 C182,82 198,90 196,108 C194,126 174,132 168,148 C162,164 168,185 151,192 C134,199 122,182 105,188 C88,194 72,204 57,194 C42,184 50,164 40,150 C30,136 10,132 8,114 C6,96 24,88 28,70 C32,52 24,32 38,22 C52,12 70,22 86,12 Z" />
            </svg>
          </div>

          {/* Smartphone Frame containing Delivery guy */}
          <div className="relative w-[180px] h-[280px] sm:w-[210px] sm:h-[310px] bg-black rounded-[36px] p-2 shadow-2xl z-10 border-[5px] border-zinc-800 transition-transform duration-500 hover:scale-105">
            {/* Dynamic camera notch pinhole */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-blue-900 rounded-full" />
            </div>

            {/* Internal screen content */}
            <div className="relative w-full h-full bg-slate-900 rounded-[28px] overflow-hidden flex items-end">
              {/* Vibrant gradient sky inside the phone */}
              <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-amber-200 z-0" />
              
              {/* Delivery courier photo */}
              <img 
                src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=400&q=80"
                alt="Delivery driver holding fresh food" 
                referrerPolicy="no-referrer"
                className="w-full h-[95%] object-cover z-10 transition-transform duration-700 hover:scale-105"
              />

              {/* Float Pizza slices stamp */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md rounded-2xl py-1 px-3 z-20 flex items-center justify-between shadow border border-orange-100 select-none">
                <span className="text-[10px] font-black text-gray-900">KanoEats Swift</span>
                <span className="text-[10px] text-[#c64c38] font-black animate-pulse">⚡ Instant</span>
              </div>
            </div>
          </div>

          {/* Absolute floating pizza boxes on left overlapping out of phone - like in the concept screenshot! */}
          <div className="absolute bottom-8 left-10 sm:left-20 bg-white border border-[#faf1ec] rounded-2xl p-2.5 shadow-xl z-20 rotate-[-12deg] flex items-center space-x-2.5 animate-bounce-gentle select-none hover:-translate-y-2 transition-transform">
            <span className="text-xl">🍲</span>
            <div>
              <p className="text-[10px] font-black leading-none text-gray-900">Arrived Hot</p>
              <p className="text-[8px] text-gray-400 font-bold mt-0.5">38 Bompai Rd.</p>
            </div>
          </div>

          {/* Absolute floating thumb sticker on the right */}
          <div className="absolute top-16 right-10 sm:right-24 bg-amber-400 text-white rounded-full p-2.5 shadow-xl z-20 rotate-[15deg] font-bold text-xs select-none hover:rotate-0 transition-transform">
            👍 Delivery OK!
          </div>
        </div>

        {/* Right Side: Copywriting & newsletter card */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <h2 className="text-3xl sm:text-4xl lg:text-4.5xl font-display font-black text-[#042d1c] tracking-tight leading-tight">
            Subscribe for <br className="hidden sm:inline" /> Gidan Arewa Deals!
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed max-w-lg font-medium">
            Receive premium weekly updates about traditional Northern Nigerian culinary recipes, special discounts on flame-grilled Tsire Suya, holiday Masa gift boxes, and live kitchen events.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-4 max-w-sm">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email here"
                className="w-full h-12 rounded-full border border-orange-100 bg-white px-5 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-red-100 placeholder-gray-400"
              />
            </div>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs p-3 bg-emerald-50 rounded-xl border border-emerald-100 animate-slideUp">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Success! Welcome inside the KanoEats inner circle.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full px-8 py-3 bg-amber-400 hover:bg-amber-500 active:scale-95 text-gray-950 font-black rounded-full text-xs shadow-md tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Subscribe</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>

      </div>

      {/* 2. THE FOUR-COLUMN FOOTER LINKS SECTION (Styled from screenshot layout) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-sm pt-8 pb-12 border-t border-orange-100/60 font-medium text-gray-700">
        
        {/* Column 1: Culinary overview (spans 5 columns on lg) */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <p className="text-xs sm:text-[13px] leading-relaxed text-gray-500 max-w-sm">
            KanoEats is Nigeria's premier service dedicating warm hospitality to the vibrant Hausa community and Arewa food lovers. From fluffy pan-fried Waina (Masa) cakes to juicy charcoal-roasted Tsire Suya, we serve our heritage with pure trust.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2 text-left space-y-3">
          <p className="text-xs font-black uppercase text-gray-500 tracking-wider">Navigation</p>
          <div className="flex flex-col space-y-2 text-xs font-bold text-gray-600">
            <button onClick={() => onNavigate?.('landing')} className="hover:text-[#c64c38] text-left transition-colors cursor-pointer">About Us</button>
            <button onClick={() => onNavigate?.('how-it-works')} className="hover:text-[#c64c38] text-left transition-colors cursor-pointer">Testimonials</button>
            <button onClick={() => onNavigate?.('landing')} className="hover:text-[#c64c38] text-left transition-colors cursor-pointer font-bold">FAQs</button>
          </div>
        </div>

        {/* Column 3: Contact Info (High fidelity info) */}
        <div className="lg:col-span-3 text-left space-y-3">
          <p className="text-xs font-black uppercase text-gray-500 tracking-wider">Contact Us</p>
          <ul className="space-y-2 text-xs text-gray-600 font-bold">
            <li>Gidan Arewa Mansion, Kano / 38, Bompai Road, Kano</li>
            <li className="text-gray-400 font-normal hover:text-gray-600 transition-colors">+234 812 345 6789</li>
            <li className="text-[#c64c38]">hello@kanoeats.com.ng</li>
            <li>
              <a 
                href="https://wa.me/2348123456789" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center space-x-1 hover:underline text-[#25d366]"
              >
                <span>WhatsApp support [link]</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Stay Connected & Social Vectors */}
        <div className="lg:col-span-2 text-left space-y-3">
          <p className="text-xs font-black uppercase text-gray-500 tracking-wider">Stay Connected</p>
          <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
            Follow us for updates, offers, and new listings
          </p>
          
          {/* Round Orange-yellow social circle triggers */}
          <div className="flex items-center space-x-2.5 pt-1 select-none">
            <a href="#" className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-90 shadow-sm flex items-center justify-center text-white transition-transform">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-90 shadow-sm flex items-center justify-center text-white transition-transform">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-90 shadow-sm flex items-center justify-center text-white transition-transform">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 active:scale-90 shadow-sm flex items-center justify-center text-white transition-transform">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>

      </div>

      {/* 3. COPYRIGHT STRAPPER WITH THE THREE FOOD PLATES DECORATIVE OVERLAY */}
      <div className="relative border-t border-orange-100/60 bg-white/40 pt-10 pb-20 mt-8">
        
        {/* Simple copyright stamp centered/left based */}
        <div className="max-w-7xl mx-auto px-6 lg:px-20 text-left text-xs text-gray-450 font-bold relative z-10 select-none">
          © 2026 KanoEats. All rights reserved.
        </div>

        {/* --- ARTISTIC GOURMET FOOTER plates row aligned with negative margin overlap bottom --- */}
        <div className="absolute bottom-[-10px] right-0 left-0 w-full flex items-end justify-center pointer-events-none select-none overflow-hidden z-20 h-28 sm:h-36">
          <div className="w-full max-w-2xl px-4 flex items-end justify-between opacity-95">
            
            {/* Left dish: Healthy salad bowl, half cropped */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white/60 shadow-lg overflow-hidden translate-y-6 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=250&q=80" 
                alt="Mini salad" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Middle dish: Gourmet pasta bowl, centered, larger, slightly tilted */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-[6px] border-white shadow-xl overflow-hidden translate-y-5 rotate-6 shrink-0 z-30">
              <img 
                src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=250&q=80" 
                alt="Centering gourmet pasta" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right dish: Sizzling shrimp curry bowl, half cropped */}
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white/60 shadow-lg overflow-hidden translate-y-6 shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=250&q=80" 
                alt="Gourmet prawns" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>
        </div>

        {/* Green basil leaves floating visual decoration decorations! */}
        <div className="absolute bottom-16 left-[20%] text-xl transform -rotate-45 animate-bounce-gentle select-none opacity-80 pointer-events-none">🍃</div>
        <div className="absolute bottom-10 right-[25%] text-lg transform rotate-12 scale-90 select-none opacity-80 pointer-events-none">🍃</div>
        <div className="absolute bottom-4 left-[35%] text-sm transform rotate-45 scale-75 select-none opacity-60 pointer-events-none">🍃</div>
        <div className="absolute bottom-24 right-[15%] text-base transform -rotate-12 select-none opacity-70 pointer-events-none">🍃</div>

      </div>

    </div>
  );
}
