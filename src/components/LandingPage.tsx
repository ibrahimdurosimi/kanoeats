import React, { useState } from 'react';
import { 
  Utensils, 
  MapPin, 
  Search, 
  Clock, 
  Star, 
  Flame, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  ChevronDown, 
  Store, 
  Phone, 
  Mail, 
  Heart, 
  ShoppingCart, 
  CheckCircle2, 
  Sparkles,
  Award,
  Truck
} from 'lucide-react';
import { Screen, Restaurant, User } from '../types';
import { RESTAURANTS } from '../data';
import Footer from './Footer';

interface LandingPageProps {
  onNavigate: (screen: Screen) => void;
  onSetAddress?: (address: string) => void;
  onSelectCategory?: (category: string) => void;
  onSelectRestaurant?: (restaurant: Restaurant) => void;
  cartCount?: number;
  user?: User;
}

export default function LandingPage({
  onNavigate,
  onSetAddress,
  onSelectCategory,
  onSelectRestaurant,
  cartCount = 0,
  user
}: LandingPageProps) {
  const [addressInput, setAddressInput] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [likedRestaurants, setLikedRestaurants] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedRestaurants(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim() && onSetAddress) {
      onSetAddress(addressInput.trim());
    }
    onNavigate('dashboard');
  };

  const handleCategoryClick = (category: string) => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    onNavigate('dashboard');
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    if (onSelectRestaurant) {
      onSelectRestaurant(restaurant);
      onNavigate('restaurant-details');
    } else {
      onNavigate('dashboard');
    }
  };

  const categories = [
    { name: 'All Dishes', icon: '🍽️', tag: 'All' },
    { name: 'Tsire Suya', icon: '🍢', tag: 'Spicy' },
    { name: 'Golden Masa', icon: '🥞', tag: 'Traditional' },
    { name: 'Tuwo Shinkafa', icon: '🍲', tag: 'Mains' },
    { name: 'Kunun Aya', icon: '🥛', tag: 'Drinks' },
    { name: 'Kilishi & Dambu', icon: '🥩', tag: 'Snacks' }
  ];

  const faqs = [
    {
      q: 'Do you deliver across all neighbourhoods in Kano?',
      a: 'Yes! We deliver across Kano Metropolis including Nassarawa GRA, Bompai, Tarauni, Fagge, Sabon Gari, Badawa, and Farm Centre. We also have express dispatch connecting partner hubs in Kaduna and Abuja.'
    },
    {
      q: 'Are all kitchens 100% Halal certified?',
      a: 'Absolutely. Every single kitchen on KanoEats is strictly Halal-verified, using prime meats prepared according to authentic Islamic standards and slow-roasted using genuine Arewa charcoal and spices.'
    },
    {
      q: 'Can I schedule orders for Iftar or special family events?',
      a: 'Yes. During Ramadan and festive occasions, you can choose "Deliver before Maghrib" at checkout or select a custom delivery window up to 3 days in advance.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept debit/credit cards, instant bank transfers, USSD, and cash on delivery. KanoEats promo codes (like SUYA20) can also be redeemed at checkout.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-gray-900 font-sans selection:bg-[#c64c38] selection:text-white">
      {/* Hausa Dagi Geometric SVG Pattern Header Accent */}
      <div className="bg-[#1e3f32] text-amber-200/90 text-xs py-2 px-4 text-center font-semibold tracking-wide border-b border-[#285342] flex items-center justify-center space-x-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Gidan Arewa Delights — Free dispatch on all orders over ₦15,000 with code <b>SUYA20</b></span>
      </div>

      {/* STICKY TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ecdccf] px-4 lg:px-12 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')} 
          className="flex items-center space-x-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c64c38] to-[#993424] flex items-center justify-center text-white shadow-md shadow-red-900/10 group-hover:scale-105 transition-transform">
            <Utensils className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black font-display text-[#2a2b2a] tracking-tight leading-none">
              kanoeats<span className="text-[#c64c38]">.</span>
            </span>
            <span className="text-[10px] font-bold text-[#c64c38] uppercase tracking-widest leading-none mt-0.5">
              Arewa Kitchen
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-gray-600">
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="hover:text-[#c64c38] transition-colors cursor-pointer flex items-center space-x-1"
          >
            <span>Kitchens</span>
            <span className="bg-[#c64c38]/10 text-[#c64c38] text-[10px] px-2 py-0.5 rounded-full font-black">48+</span>
          </button>
          <button 
            onClick={() => onNavigate('how-it-works')} 
            className="hover:text-[#c64c38] transition-colors cursor-pointer"
          >
            How KanoEats Works
          </button>
          <button 
            onClick={() => onNavigate('owner-dashboard')} 
            className="hover:text-[#c64c38] transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Store className="w-3.5 h-3.5 text-[#f2a640]" />
            <span>Partner With Us</span>
          </button>
        </nav>

        {/* Right Nav Actions */}
        <div className="flex items-center space-x-3">
          {user?.isLoggedIn ? (
            <button 
              onClick={() => onNavigate('dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-[#ecdccf] shadow-sm hover:border-[#c64c38] transition-all cursor-pointer text-sm font-bold text-[#2a2b2a]"
            >
              <div className="w-6 h-6 rounded-full bg-[#1e3f32] text-amber-300 flex items-center justify-center text-xs">
                {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </div>
              <span className="hidden sm:inline">{user.fullName || 'My Account'}</span>
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('register')}
              className="px-4 py-2 text-sm font-bold text-gray-700 hover:text-[#c64c38] hover:bg-white rounded-full transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={() => onNavigate('checkout')}
            className="relative p-2.5 rounded-full bg-white border border-[#ecdccf] hover:border-[#c64c38] text-gray-700 hover:text-[#c64c38] transition-all cursor-pointer shadow-sm"
            title="Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c64c38] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary CTA */}
          <button 
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 bg-gradient-to-r from-[#c64c38] to-[#b33a27] text-white text-xs sm:text-sm font-black rounded-full shadow-md shadow-[#c64c38]/20 hover:shadow-lg hover:from-[#b33a27] hover:to-[#993424] transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>Order Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#f3e6d8] border border-[#e2d0bf] text-[#993424] text-xs font-bold">
              <Flame className="w-4 h-4 text-[#c64c38]" />
              <span>Authentic Hausa Gourmet & Charcoal Tsire Suya</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#2a2b2a] leading-[1.1]">
              Flavours of Kano,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c64c38] via-[#e27329] to-[#f2a640]">
                Delivered Steaming Warm.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              From honey-soft pan-fried <b>Waina (Masa)</b> with Miyan Taushe to prime flame-seared <b>Tsire Beef Suya</b> and chilled <b>Kunun Aya</b>, enjoy authentic heritage cooking straight to your doorstep.
            </p>

            {/* Address Search Form */}
            <form onSubmit={handleSearchSubmit} className="bg-white p-2.5 rounded-2xl sm:rounded-full border-2 border-[#ecdccf] shadow-lg shadow-amber-900/5 flex flex-col sm:flex-row items-center gap-2 max-w-xl">
              <div className="flex items-center space-x-3 px-3 w-full py-1">
                <MapPin className="w-5 h-5 text-[#c64c38] shrink-0" />
                <input 
                  type="text" 
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Enter street, GRA, Bompai or Kano area..."
                  className="w-full bg-transparent border-none text-sm font-medium text-gray-800 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-[#c64c38] hover:bg-[#b33a27] text-white rounded-xl sm:rounded-full font-bold text-sm transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-md"
              >
                <span>Nemi Abinci</span>
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Quick stats banner */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-md border-t border-[#ecdccf]">
              <div>
                <p className="text-2xl font-black font-display text-[#c64c38]">48+</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Verified Kitchens</p>
              </div>
              <div>
                <p className="text-2xl font-black font-display text-[#1e3f32]">18 min</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Avg Delivery</p>
              </div>
              <div>
                <p className="text-2xl font-black font-display text-[#f2a640]">4.9 ★</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Trust</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f2a640]/30 to-[#c64c38]/30 rounded-[40px] filter blur-2xl transform rotate-3" />
              
              {/* Main Card */}
              <div className="relative bg-white rounded-[32px] p-5 shadow-2xl border border-[#ecdccf] space-y-4 overflow-hidden">
                <div className="relative h-60 rounded-2xl overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" 
                    alt="Flame Grilled Tsire Suya" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#1e3f32] text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Special Tsire Suya</span>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                    ₦3,500 / portion
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-black font-display text-[#2a2b2a]">Kano Suya Palace</h3>
                    <span className="flex items-center text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                      4.9 (1.2k)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Thin prime beef skewers, roasted over white-hot hardwood coals with fragrant yaji peanut spice.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-xs font-bold text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-[#c64c38]" />
                    <span>15-20 min delivery</span>
                  </div>
                  <button 
                    onClick={() => handleRestaurantClick(RESTAURANTS[1])}
                    className="px-4 py-2 bg-[#c64c38] hover:bg-[#b33a27] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center space-x-1"
                  >
                    <span>View Menu</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Floating Verified Halal Stamp */}
              <div className="absolute -bottom-6 -left-6 bg-[#1e3f32] text-white p-3.5 rounded-2xl shadow-xl flex items-center space-x-3 border border-[#2e5d4a] animate-bounce-gentle">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-black text-emerald-300">100% Halal Verified</p>
                  <p className="text-[10px] text-gray-300">Prepared fresh daily</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORY EXPLORER PILLS */}
      <section className="py-8 px-4 lg:px-12 bg-white/70 border-y border-[#ecdccf]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-black font-display text-[#2a2b2a]">Craving something specific?</h2>
              <p className="text-xs text-gray-500">Tap any Arewa specialty to explore active stoves</p>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-xs font-bold text-[#c64c38] hover:underline flex items-center space-x-1 cursor-pointer"
            >
              <span>Explore all</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(cat.tag)}
                className="p-3.5 rounded-2xl bg-white border border-[#ecdccf] hover:border-[#c64c38] hover:shadow-md transition-all flex flex-col items-center justify-center space-y-1.5 cursor-pointer group text-center"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-bold text-gray-800 group-hover:text-[#c64c38] transition-colors">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED KITCHENS GRID */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#c64c38] uppercase tracking-widest">Gidan Arewa Kitchens</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-[#2a2b2a] tracking-tight mt-1">
                Verified Kano Stoves
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Hand-picked authentic kitchens roasting live right now across Kano Metropolis
              </p>
            </div>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="px-5 py-2.5 bg-white border border-[#ecdccf] hover:border-[#c64c38] text-gray-800 hover:text-[#c64c38] rounded-full text-xs font-bold transition-all shadow-sm flex items-center space-x-2 self-start cursor-pointer"
            >
              <span>Browse All 48+ Kitchens</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESTAURANTS.map((restaurant) => (
              <div 
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant)}
                className="bg-white rounded-3xl border border-[#ecdccf] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Photo & Badge */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Like Button */}
                  <button 
                    onClick={(e) => toggleLike(restaurant.id, e)}
                    className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-gray-700 shadow-md transition-transform active:scale-90"
                  >
                    <Heart className={`w-4 h-4 ${likedRestaurants[restaurant.id] ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                  </button>

                  {/* Logo disk */}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#c64c38] border-2 border-white text-white font-black text-xs flex items-center justify-center shadow-md">
                      {restaurant.logoText}
                    </div>
                    <span className="text-white text-xs font-bold drop-shadow-md">{restaurant.cuisine}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black text-base text-[#2a2b2a] group-hover:text-[#c64c38] transition-colors leading-snug">
                        {restaurant.name}
                      </h3>
                      <div className="flex items-center text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                        {restaurant.rating}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                      <span className="truncate">{restaurant.address}</span>
                    </p>
                  </div>

                  {/* Sample Dishes preview */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Signature Special</p>
                    {restaurant.dishes.slice(0, 1).map((dish) => (
                      <div key={dish.id} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-gray-700 truncate pr-2">{dish.name}</span>
                        <span className="font-black text-[#c64c38] shrink-0 font-mono">₦{dish.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                    <span className="font-bold text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-[#c64c38]" />
                      <span>{restaurant.deliveryTime} mins</span>
                    </span>
                    <span className="font-bold text-[#c64c38] group-hover:underline flex items-center space-x-0.5">
                      <span>Order menu</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW KANOEATS WORKS 3-STEP TEASER */}
      <section className="py-16 px-4 lg:px-12 bg-gradient-to-b from-[#f5eee6] to-[#faf7f2] border-y border-[#ecdccf]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black text-[#c64c38] uppercase tracking-widest">Simple & Transparent</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-[#2a2b2a]">How KanoEats Works</h2>
            <p className="text-sm text-gray-500">
              From hearth flame to your door in three effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-7 border border-[#ecdccf] shadow-sm relative space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#c64c38]/10 text-[#c64c38] flex items-center justify-center font-display font-black text-xl">
                1
              </div>
              <h3 className="text-lg font-black text-[#2a2b2a]">Pick Your Authentic Craving</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Choose from 48+ verified kitchens. Customize yaji spice levels, masa sides, and chilled traditional drinks.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#ecdccf] shadow-sm relative space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f2a640]/10 text-[#d98829] flex items-center justify-center font-display font-black text-xl">
                2
              </div>
              <h3 className="text-lg font-black text-[#2a2b2a]">Express Local Dispatch</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our trusted dispatch riders navigate Kano streets swiftly. Insulated heat-lock bags keep everything piping hot.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#ecdccf] shadow-sm relative space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1e3f32]/10 text-[#1e3f32] flex items-center justify-center font-display font-black text-xl">
                3
              </div>
              <h3 className="text-lg font-black text-[#2a2b2a]">Savor Pure Arewa Warmth</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enjoy with family, friends, or office colleagues. Guaranteed freshly made or full replacement.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="px-6 py-3 bg-[#1e3f32] hover:bg-[#152e25] text-amber-200 font-bold rounded-full text-xs shadow-md transition-all inline-flex items-center space-x-2 cursor-pointer"
            >
              <span>See Full How KanoEats Works Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* PARTNER / RESTAURANT OWNER SECTION */}
      <section className="py-16 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#1e3f32] via-[#163127] to-[#0f221a] rounded-[36px] p-8 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-[#2d5846]">
            
            {/* Background Hausa Motif Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none flex items-center justify-center">
              <Utensils className="w-96 h-96 text-white" />
            </div>

            <div className="max-w-2xl relative z-10 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#f2a640]">For Kitchen Owners & Mai Suya</span>
              <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight leading-tight">
                Cook well? Let’s fill your grill.
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Join verified kitchens already feeding thousands of Arewa food lovers every week. Enjoy seamless order tracking, fast automated Friday payouts, and zero setup fees.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => onNavigate('owner-dashboard')}
                  className="px-8 py-3.5 bg-[#f2a640] hover:bg-[#e0942d] text-gray-900 font-black rounded-full text-sm shadow-xl transition-all cursor-pointer flex items-center space-x-2"
                >
                  <Store className="w-4 h-4" />
                  <span>Open Partner Dashboard</span>
                </button>
                <button 
                  onClick={() => onNavigate('register')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full text-sm border border-white/20 transition-all cursor-pointer"
                >
                  Register Kitchen
                </button>
              </div>

              {/* Verified Partner Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs">
                <div>
                  <p className="font-black text-amber-300 text-lg">0%</p>
                  <p className="text-gray-400">Setup cost</p>
                </div>
                <div>
                  <p className="font-black text-amber-300 text-lg">Weekly</p>
                  <p className="text-gray-400">Direct payouts</p>
                </div>
                <div>
                  <p className="font-black text-amber-300 text-lg">Live</p>
                  <p className="text-gray-400">Order management</p>
                </div>
                <div>
                  <p className="font-black text-amber-300 text-lg">Dedicated</p>
                  <p className="text-gray-400">Dispatch network</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section className="py-16 px-4 lg:px-12 bg-white/60 border-t border-[#ecdccf]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[#c64c38] uppercase tracking-widest">Got Questions?</span>
            <h2 className="text-3xl font-black font-display text-[#2a2b2a]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-[#ecdccf] overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center space-x-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-sm text-[#2a2b2a]">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#c64c38]' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIFIED SITE FOOTER */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
