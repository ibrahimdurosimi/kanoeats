import DishArt from '../DishArt';
import { ArrowRight, Store } from 'lucide-react';

export default function PartnerCTA() {
  return (
    <section className="py-20 px-6 lg:px-20 bg-white border-t border-orange-50">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-50 to-amber-50 rounded-[40px] p-8 md:p-12 lg:p-16 border border-amber-100/50 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Decorative background shape */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#dfaf27] opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm mb-2 text-[#0b4a34]">
            <Store className="h-6 w-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-gray-900 leading-tight">
            Own an authentic kitchen? <br/>
            <span className="text-[#ca7d2d]">Grow with KanoEats.</span>
          </h2>
          <p className="text-gray-600 font-medium max-w-md mx-auto md:mx-0">
            Join our network of premium Arewa restaurants. Reach thousands of hungry customers, manage orders effortlessly, and increase your revenue.
          </p>
          <div className="pt-2">
            <button className="px-8 py-4 bg-[#0b4a34] hover:bg-[#083827] text-white font-black rounded-full shadow-lg transition-transform hover:-translate-y-1 inline-flex items-center gap-2 group">
              <span>Partner with us</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-5/12 relative z-10">
          <div className="aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full grid place-items-center bg-gradient-to-br from-[#0F4132] to-[#0A2E24]">
              <DishArt art="kitchen" className="w-1/2 h-1/2 max-w-[200px] max-h-[200px]" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
