import { Heart, Search, ShoppingCart, Truck, Utensils, Award } from 'lucide-react';
import Footer from './Footer';

interface HowItWorksProps {
  onNavigate: (screen: 'landing' | 'how-it-works' | 'dashboard' | 'restaurant-details' | 'checkout' | 'register') => void;
  cartCount: number;
}

export default function HowItWorks({ onNavigate, cartCount }: HowItWorksProps) {
  return (
    <div className="min-h-screen bg-[#fffefc] font-sans flex flex-col justify-between" id="how-it-works-root">
      
      {/* HEADER */}
      <header className="px-6 lg:px-20 py-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-9 h-9 bg-kanoeats-primary rounded-full flex items-center justify-center text-white font-bold">
            <Utensils className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold font-display text-gray-900 tracking-tight">KanoEats</span>
        </div>

        <nav className="hidden md:flex items-center space-x-10 text-gray-500 font-medium text-sm">
          <button onClick={() => onNavigate('how-it-works')} className="text-kanoeats-primary font-bold cursor-pointer">How It Works</button>
          <button onClick={() => onNavigate('dashboard')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">Restaurants</button>
          <button onClick={() => onNavigate('landing')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">About Us</button>
          <button onClick={() => onNavigate('landing')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">Contact</button>
        </nav>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('register')}
            className="px-5 py-2 hover:bg-gray-50 text-gray-600 rounded-full font-semibold transition-all cursor-pointer text-sm"
          >
            Sign In
          </button>
          
          <button
            onClick={() => onNavigate('checkout')}
            className="flex items-center space-x-2 px-4 py-2 bg-kanoeats-primary text-white font-semibold rounded-full hover:bg-opacity-95 shadow-md shadow-red-200 transition-all cursor-pointer text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-white text-kanoeats-primary font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] scale-105">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* CORE EXPLANATION SHEET */}
      <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-20 py-12 lg:py-16 space-y-16">
        <div className="text-center space-y-3">
          <h1 className="text-4xl lg:text-5xl font-extrabold font-display text-[#1e1e1e] tracking-tight">
            How KanoEats Works
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Get your hot meals from the top rated restaurant stoves in Kano under three simple steps.
          </p>
        </div>

        {/* STEP 1 & 2 ROWS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* STEP 1: CHOOSE YOUR FAVORITE FOOD */}
          <div className="bg-[#fff6f4] border border-red-50/60 rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-all group">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl lg:text-5xl font-extrabold text-kanoeats-primary font-display">1</span>
                <div>
                  <h2 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight">Choose Your Favorite Food</h2>
                  <p className="text-xs text-kanoeats-primary font-bold tracking-widest uppercase">Step One</p>
                </div>
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed">
                Browse hundreds of local restaurants and various cuisines. Select your savory cravings with just a few clicks.
              </p>

              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-2.5 bg-white text-kanoeats-primary font-bold rounded-full border border-red-100 hover:bg-kanoeats-primary hover:text-white hover:border-transparent transition-all shadow-sm cursor-pointer text-sm"
              >
                Explore Menu
              </button>
            </div>

            {/* Simulated Vector Grid with illustrations */}
            <div className="w-full md:w-1/2 h-44 bg-[#fde9e4] rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/70 rounded-full blur-xl -z-10" />
              <div className="flex space-x-4 items-center scale-95 md:scale-100">
                {/* Pizza Plate Mini Vector */}
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-red-100/30 hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-4xl">🍕</span>
                  <p className="text-[10px] font-bold text-gray-800 text-center mt-1">Pizza</p>
                </div>
                {/* Sushi Plate Mini Vector */}
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-red-100/30 hover:scale-110 transition-transform cursor-pointer relative -translate-y-3">
                  <span className="text-4xl">🍣</span>
                  <p className="text-[10px] font-bold text-gray-800 text-center mt-1">Sushi</p>
                  <span className="absolute -top-1 -right-1 bg-green-500 w-2.5 h-2.5 rounded-full ring-2 ring-white animate-ping" />
                </div>
                {/* Salad Bowl Mini Vector */}
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-red-100/30 hover:scale-110 transition-transform cursor-pointer">
                  <span className="text-4xl">🥗</span>
                  <p className="text-[10px] font-bold text-gray-800 text-center mt-1">Salads</p>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: FAST DELIVERY TO YOUR DOOR */}
          <div className="bg-[#fffbf0] border border-amber-50/60 rounded-[32px] p-8 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-all group">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-4xl lg:text-5xl font-extrabold text-[#e2a829] font-display">2</span>
                <div>
                  <h2 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight">Fast Delivery to Your Door</h2>
                  <p className="text-xs text-[#e2a829] font-bold tracking-widest uppercase">Step Two</p>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed">
                Our dedicated drivers ensure your food arrives hot, crisp, and fresh, tracked in real-time through standard maps.
              </p>

              <button 
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-2.5 bg-white text-[#e2a829] font-bold rounded-full border border-amber-100 hover:bg-[#e2a829] hover:text-white hover:border-transparent transition-all shadow-sm cursor-pointer text-sm"
              >
                Track an Order
              </button>
            </div>

            {/* Scooter driver Illustration card */}
            <div className="w-full md:w-1/2 h-44 bg-[#fbf3d3]/70 rounded-2xl relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-4 left-4 w-12 h-12 bg-[#ecd8a2]/20 rounded-full" />
              <div className="absolute bottom-4 right-4 w-16 h-16 bg-[#eedca9]/30 rounded-full" />
              
              <div className="text-center hover:scale-105 transition-transform duration-300">
                <span className="text-5xl block animate-bounce">🛵</span>
                <span className="inline-block mt-2 font-mono text-xs font-bold bg-white px-3 py-1 rounded-full shadow-md text-amber-800">
                  Dispatcher: active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3: FULL WIDTH BANNER */}
        <div className="bg-[#fcf7ee] border border-orange-100/50 rounded-[32px] p-8 lg:p-12 flex flex-col lg:flex-row items-center gap-12 shadow-sm hover:shadow-md transition-all">
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="text-5xl lg:text-6xl font-black text-[#d37725] font-display">3</span>
              <div>
                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 leading-tight">Enjoy Your Meal!</h2>
                <p className="text-xs text-[#d37725] font-bold tracking-widest uppercase">Step Three</p>
              </div>
            </div>

            <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
              Savor the rich firewood smoked flavors and seasoned gourmet ingredients that make mealtime effortless. Bon appétit! We guarantee absolute freshness or money back.
            </p>

            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-3.5 bg-kanoeats-primary text-white font-extrabold rounded-full hover:bg-opacity-95 shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
            >
              Start Ordering Now
            </button>
          </div>

          {/* Dining group Illustration visualizer */}
          <div className="w-full lg:w-1/2 bg-[#fdfaf5] border border-orange-50 p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center">
            <div className="flex -space-x-4 items-center">
              <div className="w-14 h-14 rounded-full border-4 border-white bg-[#f8d2cc] overflow-hidden flex items-center justify-center text-xl shadow-md">👨‍👩‍👧</div>
              <div className="w-16 h-16 rounded-full border-4 border-white bg-[#fbe7cf] overflow-hidden flex items-center justify-center text-2xl shadow-md z-10">👨‍🍳</div>
              <div className="w-14 h-14 rounded-full border-4 border-white bg-[#d1fad7] overflow-hidden flex items-center justify-center text-xl shadow-md">🍔</div>
            </div>
            
            <p className="text-xs font-semibold text-gray-500 text-center mt-3 scale-95 font-display italic">
              "Nothing brings family closer than freshly cooked, steaming Jollof."
            </p>
          </div>
        </div>
      </main>

      {/* SITE-WIDE UNIFIED FOOTER */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
