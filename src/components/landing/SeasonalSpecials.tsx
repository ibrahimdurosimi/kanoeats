import React from 'react';
import { Gift, Star } from 'lucide-react';

export default function SeasonalSpecials() {
  return (
    <section className="py-12 px-6 lg:px-20 bg-[#0b4a34] relative overflow-hidden" id="seasonal-sec">
      {/* Subtle festive pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="stars" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 2L12 8h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="#dfaf27" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 bg-[#dfaf27] rounded-full flex items-center justify-center shrink-0 shadow-lg animate-bounce-gentle">
            <Gift className="h-8 w-8 text-[#0b4a34]" />
          </div>
          <div className="text-white">
            <h3 className="text-2xl font-display font-black flex items-center gap-2">
              Holiday Masa Gift Boxes <Star className="h-5 w-5 fill-[#dfaf27] text-[#dfaf27]" />
            </h3>
            <p className="text-emerald-100 text-sm mt-1 max-w-lg font-medium">
              Share the joy this season! Pre-order our beautifully packaged premium Masa and Suya combo boxes for friends and family.
            </p>
          </div>
        </div>

        <button className="px-6 py-3 bg-white hover:bg-gray-50 text-[#0b4a34] font-black rounded-full shadow-lg transition-transform hover:-translate-y-1 shrink-0">
          Order a Gift Box
        </button>
      </div>
    </section>
  );
}
