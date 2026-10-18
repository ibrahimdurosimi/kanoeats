import React, { useState, useMemo } from 'react';
import { 
  Utensils, 
  MapPin, 
  Search, 
  Clock, 
  Star, 
  Flame, 
  ShoppingCart, 
  ArrowRight, 
  Plus, 
  Minus, 
  Trash2, 
  X, 
  Check, 
  Tag, 
  ShieldCheck, 
  ChevronDown, 
  User as UserIcon, 
  LogOut, 
  Store, 
  Sparkles,
  Info,
  Filter,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { Screen, Restaurant, Dish, CartItem, User } from '../types';
import { RESTAURANTS } from '../data';

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onSelectRestaurant: (restaurant: Restaurant) => void;
  onNavigate: (screen: Screen) => void;
  selectedCategory: string;
  onSetSelectedCategory: (cat: string) => void;
  cart: CartItem[];
  onAddToCart?: (dish: Dish, restaurantId: string, restaurantName: string) => void;
  onRemoveFromCart?: (dishId: string) => void;
  onClearCart: () => void;
  onUpdateUser?: (user: User) => void;
  onSetAddress?: (address: string) => void;
}

export default function Dashboard({
  user,
  onLogout,
  onSelectRestaurant,
  onNavigate,
  selectedCategory,
  onSetSelectedCategory,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onUpdateUser,
  onSetAddress
}: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'delivery' | 'recommended'>('recommended');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [customAddress, setCustomAddress] = useState(user.address || '38, Bompai Road, Kano');

  // Pre-configured Kano popular locations
  const kanoLocations = [
    '38, Bompai Road, Kano',
    '14, Race Course Road, Nassarawa GRA, Kano',
    'Suite 4, Murtala Mohammed Way, Tarauni, Kano',
    'Post Office Road, Fagge, Kano',
    'Court Road, Sabon Gari, Kano'
  ];

  const totalCartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Cart calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = subtotal >= 15000 || subtotal === 0 ? 0 : 1200;
  const discount = isPromoApplied ? Math.round(subtotal * 0.2) : 0;
  const taxes = Math.round(subtotal * 0.075); // 7.5% VAT
  const total = Math.max(0, subtotal + deliveryFee + taxes - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'SUYA20') {
      setIsPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Use SUYA20 for 20% off.');
    }
  };

  const handleSelectAddress = (addr: string) => {
    setCustomAddress(addr);
    if (onSetAddress) onSetAddress(addr);
    if (onUpdateUser) onUpdateUser({ ...user, address: addr });
    setIsAddressModalOpen(false);
  };

  // Filtered restaurants
  const filteredRestaurants = useMemo(() => {
    let list = [...RESTAURANTS];

    // Filter by category tag
    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(r => 
        r.tags.includes(selectedCategory) || 
        r.cuisine.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        r.dishes.some(d => d.category === selectedCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q) ||
        r.dishes.some(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'delivery') {
      list.sort((a, b) => a.deliveryTime - b.deliveryTime);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  const categories = [
    { label: 'All Stoves', value: 'All' },
    { label: 'Traditional Mains', value: 'Mains' },
    { label: 'Flame Tsire & BBQ', value: 'Spicy' },
    { label: 'Savory Snacks & Floss', value: 'Snacks' },
    { label: 'Chilled Arewa Drinks', value: 'Drinks' },
    { label: '100% Halal Verified', value: 'Halal' }
  ];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-gray-900 font-sans pb-28">
      
      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#1e3f32] text-amber-200 text-xs py-2 px-4 flex items-center justify-between border-b border-[#295443]">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Ramadan & Weekend Special: Use promo code <b>SUYA20</b> for 20% off</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-xs text-amber-100/80 font-bold">
            <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
              How It Works
            </button>
            <button onClick={() => onNavigate('owner-dashboard')} className="hover:text-white transition-colors cursor-pointer flex items-center space-x-1">
              <Store className="w-3 h-3 text-amber-400" />
              <span>Partner Stoves</span>
            </button>
          </div>
        </div>
      </div>

      {/* STICKY APP HEADER */}
      <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#ecdccf] px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Address Picker */}
        <div className="flex items-center space-x-4 shrink-0">
          <div 
            onClick={() => onNavigate('landing')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#c64c38] flex items-center justify-center text-white shadow-md shadow-red-900/10 group-hover:scale-105 transition-transform">
              <Utensils className="w-4 h-4" />
            </div>
            <span className="text-xl font-black font-display text-[#2a2b2a] tracking-tight">
              kanoeats<span className="text-[#c64c38]">.</span>
            </span>
          </div>

          {/* Location Picker Pill */}
          <div 
            onClick={() => setIsAddressModalOpen(true)}
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#ecdccf] hover:border-[#c64c38] rounded-full text-xs font-bold text-gray-700 cursor-pointer shadow-sm transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c64c38]" />
            <span className="max-w-[160px] truncate">{customAddress}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suya, masa, tuwo, drinks, or kitchens..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-[#ecdccf] focus:border-[#c64c38] focus:outline-none text-xs sm:text-sm font-medium placeholder:text-gray-400 shadow-sm transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Cart & User Account */}
        <div className="flex items-center space-x-3 shrink-0">
          
          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 py-2 rounded-full bg-white border border-[#ecdccf] hover:border-[#c64c38] text-gray-800 hover:text-[#c64c38] transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-[#c64c38]" />
            <span className="text-xs font-bold hidden md:inline">Cart</span>
            {totalCartCount > 0 && (
              <span className="bg-[#c64c38] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-4 text-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Account Button & Dropdown */}
          <div className="relative">
            {user.isLoggedIn ? (
              <div>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#ecdccf] hover:border-gray-400 rounded-full cursor-pointer shadow-sm text-xs font-bold text-gray-800"
                >
                  <div className="w-6 h-6 rounded-full bg-[#1e3f32] text-amber-300 flex items-center justify-center text-xs font-bold">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline">{user.fullName.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#ecdccf] p-2 z-50 text-xs font-semibold animate-scale">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <p className="font-bold text-gray-900">{user.fullName}</p>
                      <p className="text-gray-400 truncate">{user.email || user.phone}</p>
                    </div>
                    <button 
                      onClick={() => { setIsProfileOpen(false); onNavigate('owner-dashboard'); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-xl flex items-center space-x-2 text-gray-700 cursor-pointer"
                    >
                      <Store className="w-4 h-4 text-[#f2a640]" />
                      <span>Partner Portal</span>
                    </button>
                    <button 
                      onClick={() => { setIsProfileOpen(false); onNavigate('checkout'); }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-xl flex items-center space-x-2 text-gray-700 cursor-pointer"
                    >
                      <ShoppingCart className="w-4 h-4 text-[#c64c38]" />
                      <span>View Orders & Checkout</span>
                    </button>
                    <button 
                      onClick={() => { setIsProfileOpen(false); onLogout(); }}
                      className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-xl flex items-center space-x-2 text-red-600 font-bold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onNavigate('register')}
                className="px-4 py-2 bg-[#c64c38] text-white rounded-full text-xs font-bold hover:bg-[#b33a27] transition-all cursor-pointer shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>

        </div>
      </header>

      {/* CORE DISCOVERY BODY */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-6">
        
        {/* HERO PROMOTIONAL BANNER */}
        <div className="bg-gradient-to-r from-[#1e3f32] to-[#142d24] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-lg border border-[#2b5846] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full font-bold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Mai Suya Night Special</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight leading-snug">
              Crisp Waina & Charcoal Tsire Suya
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Order fresh from Kano’s heritage kitchens. Apply code <b>SUYA20</b> in your cart for an instant 20% discount on orders over ₦5,000.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 z-10">
            <button
              onClick={() => {
                setPromoCode('SUYA20');
                setIsPromoApplied(true);
                setIsCartOpen(true);
              }}
              className="px-6 py-3 bg-[#f2a640] hover:bg-[#e0942d] text-gray-950 font-black rounded-full text-xs shadow-md transition-all cursor-pointer"
            >
              Claim SUYA20 Discount
            </button>
            <button 
              onClick={() => onNavigate('how-it-works')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              How It Works
            </button>
          </div>

          {/* Decorative Background graphic */}
          <div className="absolute right-[-20px] top-[-20px] opacity-10 pointer-events-none">
            <Utensils className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* CATEGORY & SORT CONTROLS BAR */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
          
          {/* Category Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => onSetSelectedCategory(c.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer border ${
                  selectedCategory === c.value
                    ? 'bg-[#c64c38] text-white border-[#c64c38] shadow-sm'
                    : 'bg-white text-gray-700 border-[#ecdccf] hover:border-gray-400'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto text-xs font-bold text-gray-600">
            <span className="text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#ecdccf] rounded-full px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#c64c38] cursor-pointer shadow-sm"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Top Rated (★)</option>
              <option value="delivery">Fastest Delivery</option>
            </select>
          </div>

        </div>

        {/* KITCHENS AND DISHES SHOWCASE */}
        <div className="space-y-10 pt-4">
          
          {filteredRestaurants.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#ecdccf] space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">No stoves match your search</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try searching for another dish like "suya", "masa", or clear your category filter.
              </p>
              <button
                onClick={() => { setSearchQuery(''); onSetSelectedCategory('All'); }}
                className="px-5 py-2 bg-[#c64c38] text-white text-xs font-bold rounded-full cursor-pointer"
              >
                Reset Stoves Filter
              </button>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="bg-white rounded-3xl border border-[#ecdccf] overflow-hidden shadow-sm hover:shadow-md transition-shadow p-6 space-y-6"
              >
                {/* Restaurant Banner Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="w-16 h-16 rounded-2xl object-cover border border-[#ecdccf] shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-black font-display text-[#2a2b2a]">{restaurant.name}</h2>
                        <span className="flex items-center text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                          {restaurant.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center space-x-2">
                        <span className="font-semibold text-[#c64c38]">{restaurant.cuisine}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 text-gray-400 mr-0.5" />
                          {restaurant.address}
                        </span>
                        <span>•</span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 text-gray-400 mr-0.5" />
                          {restaurant.deliveryTime} mins
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-end md:self-auto">
                    <button
                      onClick={() => {
                        onSelectRestaurant(restaurant);
                        onNavigate('restaurant-details');
                      }}
                      className="px-5 py-2.5 bg-[#faf7f2] hover:bg-[#f3ede4] text-[#c64c38] font-bold text-xs rounded-full border border-[#ecdccf] transition-all cursor-pointer flex items-center space-x-1"
                    >
                      <span>View Full Menu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Popular Dishes Carousel for this Restaurant */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {restaurant.dishes.map((dish) => {
                    const cartItem = cart.find(ci => ci.dish.id === dish.id);
                    const qty = cartItem ? cartItem.quantity : 0;

                    return (
                      <div 
                        key={dish.id}
                        className="bg-[#faf7f2]/60 rounded-2xl p-3.5 border border-[#ecdccf]/80 flex flex-col justify-between space-y-3 hover:bg-[#faf7f2] transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="h-32 rounded-xl overflow-hidden relative">
                            <img 
                              src={dish.image} 
                              alt={dish.name} 
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                              {dish.category}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-gray-900 leading-snug line-clamp-1">{dish.name}</h4>
                            <p className="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                              {dish.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between border-t border-[#ecdccf]/50">
                          <span className="font-mono font-black text-xs text-[#c64c38]">
                            ₦{dish.price.toLocaleString()}
                          </span>

                          {qty > 0 ? (
                            <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-full border border-[#ecdccf] shadow-xs">
                              <button
                                onClick={() => onRemoveFromCart && onRemoveFromCart(dish.id)}
                                className="p-1 hover:text-[#c64c38] cursor-pointer"
                                title="Remove"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold font-mono px-1">{qty}</span>
                              <button
                                onClick={() => onAddToCart && onAddToCart(dish, restaurant.id, restaurant.name)}
                                className="p-1 hover:text-[#c64c38] cursor-pointer"
                                title="Add another"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                if (onAddToCart) onAddToCart(dish, restaurant.id, restaurant.name);
                              }}
                              className="px-3 py-1.5 bg-[#c64c38] hover:bg-[#b33a27] text-white rounded-full text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer shadow-xs"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            ))
          )}

        </div>

      </main>

      {/* FLOATING ACTIVE BASKET SUMMARY BAR (when cart has items & drawer is closed) */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-scale">
          <div className="bg-[#1e3f32] text-white rounded-2xl p-4 shadow-2xl border border-[#2b5846] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center font-black text-sm">
                {totalCartCount}
              </div>
              <div>
                <p className="text-xs text-amber-200 font-bold uppercase tracking-wider">Your Kano Basket</p>
                <p className="text-sm font-black font-mono">₦{subtotal.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-amber-100 transition-colors cursor-pointer"
              >
                View Items
              </button>
              <button
                onClick={() => onNavigate('checkout')}
                className="px-5 py-2.5 bg-[#c64c38] hover:bg-[#b33a27] text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center space-x-1 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Scrim */}
          <div 
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Sheet */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slideLeft">
            
            {/* Drawer Top */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#faf7f2]">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-[#c64c38]" />
                <h3 className="font-black text-lg font-display text-gray-900">Your Kano Basket</h3>
                <span className="bg-[#c64c38]/10 text-[#c64c38] text-xs font-black px-2 py-0.5 rounded-full">
                  {totalCartCount}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-200/60 rounded-full text-gray-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-[#c64c38] flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-gray-800">Your basket is empty</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Choose delicious dishes from Kano Suya Palace, Gidan Arewa or Bukkah Palace to start your order.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-5 py-2 bg-[#c64c38] text-white text-xs font-bold rounded-full cursor-pointer"
                  >
                    Browse Stoves
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div 
                      key={item.dish.id}
                      className="p-3 bg-[#faf7f2] rounded-2xl border border-[#ecdccf] flex items-center space-x-3"
                    >
                      <img 
                        src={item.dish.image} 
                        alt={item.dish.name} 
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-900 truncate">{item.dish.name}</h4>
                        <p className="text-[10px] text-gray-400 truncate">{item.restaurantName}</p>
                        <p className="text-xs font-mono font-black text-[#c64c38] mt-0.5">
                          ₦{(item.dish.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center space-x-1.5 bg-white border border-[#ecdccf] rounded-lg px-2 py-1 shrink-0">
                        <button
                          onClick={() => onRemoveFromCart && onRemoveFromCart(item.dish.id)}
                          className="text-gray-500 hover:text-red-500 p-0.5 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                        <button
                          onClick={() => onAddToCart && onAddToCart(item.dish, item.restaurantId, item.restaurantName)}
                          className="text-gray-500 hover:text-green-600 p-0.5 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Promo Input */}
                  <form onSubmit={handleApplyPromo} className="pt-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo code (try SUYA20)"
                          className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold uppercase focus:outline-none focus:border-[#c64c38]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {isPromoApplied && (
                      <p className="text-[11px] text-emerald-600 font-bold mt-1.5 flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>SUYA20 applied: 20% discount added!</span>
                      </p>
                    )}
                    {promoError && (
                      <p className="text-[11px] text-red-500 font-bold mt-1.5">{promoError}</p>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* Drawer Bottom Checkout Calculation */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100 bg-[#faf7f2] space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery dispatch</span>
                    <span className="font-mono font-bold">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-600 font-black">Free</span>
                      ) : (
                        `₦${deliveryFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  {isPromoApplied && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Discount (20%)</span>
                      <span className="font-mono">-₦{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>VAT (7.5%)</span>
                    <span className="font-mono font-bold">₦{taxes.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between text-base font-black text-gray-900">
                    <span>Total Amount</span>
                    <span className="font-mono text-[#c64c38]">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      onNavigate('checkout');
                    }}
                    className="w-full py-3.5 bg-[#c64c38] hover:bg-[#b33a27] text-white font-black text-sm rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onClearCart}
                    className="w-full py-2 text-xs font-bold text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    Clear Entire Basket
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ADDRESS SELECTOR MODAL */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#ecdccf] space-y-4 animate-scale">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-black text-base text-gray-900 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#c64c38]" />
                <span>Select Kano Delivery Area</span>
              </h3>
              <button 
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-500">Pick from popular Kano neighbourhoods:</p>
              {kanoLocations.map((loc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAddress(loc)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    customAddress === loc 
                      ? 'bg-[#c64c38]/10 border-[#c64c38] text-[#c64c38]'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="truncate pr-2">{loc}</span>
                  {customAddress === loc && <Check className="w-4 h-4 text-[#c64c38] shrink-0" />}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="text-[11px] font-bold text-gray-500 block mb-1">Or enter custom address:</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  placeholder="e.g. 10 Zaria Road, Gyadi-Gyadi, Kano"
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#c64c38]"
                />
                <button
                  onClick={() => handleSelectAddress(customAddress)}
                  className="px-4 py-2 bg-[#c64c38] text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
