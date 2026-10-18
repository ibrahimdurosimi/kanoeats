import React from 'react';
import { Calendar, Users, HeartHandshake } from 'lucide-react';

export default function CateringSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#dfaf27] to-[#b88c16] relative overflow-hidden" id="catering-sec">
      {/* Abstract geometric background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-8 text-white">
          <div>
            <span className="inline-block py-1 px-3 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-sm border border-white/30">
              Bulk & Event Orders
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-black leading-tight tracking-tight">
              Catering for your special moments.
            </h2>
          </div>
          
          <p className="text-white/90 text-sm sm:text-base leading-relaxed font-medium max-w-lg">
            Whether it’s a Wedding (Fatiha), a Naming Ceremony, or a family Sallah feast, our partner kitchens are equipped to deliver bulk orders of premium Masa, Tuwo, and whole Balangu Rams.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="font-bold text-sm">Serves 50 to 500+ guests with ease</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <p className="font-bold text-sm">Pre-schedule delivery dates weeks in advance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                <HeartHandshake className="h-5 w-5 text-white" />
              </div>
              <p className="font-bold text-sm">Dedicated event support team</p>
            </div>
          </div>
          
          <button className="mt-4 px-8 py-4 bg-white text-[#dfaf27] hover:bg-gray-50 rounded-full font-black text-sm shadow-xl transition-transform hover:-translate-y-1">
            Request a Catering Quote
          </button>
        </div>
        
        <div className="relative h-[400px] lg:h-[550px] w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/20">
          <img 
            src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80" 
            alt="Beautifully catered event feast" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#b88c16]/80 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-2xl font-display font-bold italic">"KanoEats handled the food for our 300-guest Fatiha seamlessly."</p>
          </div>
        </div>

      </div>
    </section>
  );
}
