import { useState, useMemo } from 'react';
import { ArrowLeft, Clock, MapPin, ShoppingCart, Star, Heart, Award, ShieldAlert, Plus, Minus, Check, Search } from 'lucide-react';
import { Restaurant, Dish, CartItem, User } from '../types';

interface RestaurantDetailProps {
  user: User;
  restaurant: Restaurant;
  onBackToDashboard: () => void;
  onAddToCart: (dish: Dish, restaurantId: string, restaurantName: string) => void;
  onRemoveFromCart: (dishId: string) => void;
  cart: CartItem[];
  onNavigate: (screen: 'landing' | 'how-it-works' | 'dashboard' | 'restaurant-details' | 'checkout' | 'register') => void;
}

export default function RestaurantDetail({ 
  user, restaurant, onBackToDashboard, onAddToCart, onRemoveFromCart, cart, onNavigate 
}: RestaurantDetailProps) {
  const [selectedTab, setSelectedTab] = useState<'All' | 'Starters' | 'Mains' | 'Drinks' | 'Snacks'>('All');
  const [isLiked, setIsLiked] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart helper maps
  const cartItemQuantities = useMemo(() => {
    const map: Record<string, number> = {};
    cart.forEach(item => {
      if (item.restaurantId === restaurant.id) {
        map[item.dish.id] = item.quantity;
      }
    });
    return map;
  }, [cart, restaurant.id]);

  // Active subtotal in the cart for this restaurant
  const restaurantSubtotal = useMemo(() => {
    return cart
      .filter(item => item.restaurantId === restaurant.id)
      .reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
  }, [cart, restaurant.id]);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    let dishes = restaurant.dishes;
    if (selectedTab !== 'All') {
      dishes = dishes.filter(dish => dish.category === selectedTab);
    }
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      dishes = dishes.filter(dish => 
        dish.name.toLowerCase().includes(lowerQuery) || 
        dish.description.toLowerCase().includes(lowerQuery)
      );
    }
    return dishes;
  }, [restaurant, selectedTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans pb-32" id="restaurant-detail-root">
      
      {/* STICKY TOP NAVIGATION BAR (Screen 2) */}
      <header className="px-6 lg:px-20 py-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={onBackToDashboard}>
          <div className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </div>
          <span className="text-xl font-black font-display text-gray-900 tracking-tight">kanoeats</span>
        </div>

        <nav className="hidden md:flex items-center space-x-10 text-gray-500 font-medium text-sm">
          <button onClick={() => onNavigate('landing')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">About</button>
          <button onClick={() => onNavigate('how-it-works')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">Testimonials</button>
          <button onClick={() => onNavigate('how-it-works')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">FAQs</button>
        </nav>

        <div>
          <button 
            onClick={() => onNavigate('register')}
            className="px-6 py-2 bg-kanoeats-primary text-white font-extrabold rounded-full hover:bg-opacity-95 text-xs shadow-md shadow-red-200 transition-all cursor-pointer"
          >
            Register
          </button>
        </div>
      </header>

      {/* COMPACT RESTAURANT TITLE HEADER BANNER (Screen 2) */}
      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-20 mt-8">
        
        {/* Background photo block */}
        <div 
          className="h-64 rounded-3xl relative overflow-hidden flex items-end p-8 border border-gray-200"
          style={{ 
            backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.2) 90%), url('https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Heart indicator medal */}
          <div className="absolute top-6 right-6 p-3 bg-yellow-400 hover:scale-110 shadow-lg text-white rounded-2xl cursor-pointer transition-transform">
            <Award className="h-6 w-6 fill-white/10" />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 w-full">
            
            {/* Abbreviation Float Disk (KF / TP etc) */}
            <div className="w-20 h-20 rounded-full bg-kanoeats-primary border-4 border-white flex items-center justify-center text-white text-3xl font-black shadow-xl shrink-0">
              {restaurant.logoText}
            </div>

            <div className="text-center sm:text-left text-white space-y-1">
              <h1 className="text-3xl font-black tracking-tight font-display">{restaurant.name}</h1>
              <p className="text-xs font-bold text-red-200 uppercase tracking-widest">{restaurant.cuisine}</p>
            </div>
          </div>
        </div>

        {/* METADATA SUMMARY BAR STRIP (Screen 2) */}
        <div className="bg-white border border-[#eddcd2] rounded-2xl p-6 shadow-sm mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100 text-sm font-semibold text-gray-700">
          
          {/* Star and Dispatch speed */}
          <div className="py-2 md:py-0 flex flex-col justify-center items-center space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Surfer rating</span>
            <div className="flex items-center space-x-1">
              <span className="text-gray-900 font-bold">{restaurant.rating} ★</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-600 font-bold">Delivery in {restaurant.deliveryTime} min</span>
            </div>
          </div>

          {/* Mode */}
          <div className="py-2 md:py-0 pt-4 md:pt-0 flex flex-col justify-center items-center space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Transit Protocol</span>
            <span className="text-gray-900 font-bold">Delivery and pickup</span>
          </div>

          {/* Opening specs */}
          <div className="py-2 md:py-0 pt-4 md:pt-0 flex flex-col justify-center items-center space-y-1">
            <span className="text-xs text-gray-400 font-bold uppercase">Operating times</span>
            <span className="text-gray-900 font-bold">Opens {restaurant.opens}, Close {restaurant.closes}</span>
          </div>

          {/* Location coordinate */}
          <div className="py-2 md:py-0 pt-4 md:pt-0 flex flex-col justify-center items-center space-y-1 px-4">
            <span className="text-xs text-gray-400 font-bold uppercase">Stove coordinate</span>
            <span className="text-gray-900 text-xs font-bold leading-tight line-clamp-2">{restaurant.address}</span>
          </div>
        </div>

        {/* CATEGORY SELECTOR TABS & SEARCH (Screen 2) */}
        <div className="mt-12 flex flex-col lg:flex-row lg:items-center justify-between border-b border-gray-100 pb-3 gap-4">
          <div className="flex space-x-4 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {(['All', 'Starters', 'Mains', 'Drinks', 'Snacks'] as const).map((tab) => {
              const isActive = selectedTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-6 py-2 rounded-full font-bold text-sm select-none transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-kanoeats-primary text-white shadow-md' 
                      : 'text-gray-500 bg-white border border-[#eedfd6] hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-white border border-[#eedfd6] rounded-full text-sm font-medium focus:outline-none focus:border-kanoeats-primary focus:ring-1 focus:ring-kanoeats-primary transition-all"
            />
          </div>
        </div>

        {/* DOMED ARCH DISH CARDS GRID (Screen 2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {filteredDishes.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500 font-bold">
              No dishes found matching your search.
            </div>
          ) : (
            filteredDishes.map((dish) => {
            const quantity = cartItemQuantities[dish.id] || 0;

            return (
              <div 
                key={dish.id}
                className="bg-white border border-[#ecdcd2] rounded-b-[24px] rounded-t-[9999px] shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-xl hover:border-kanoeats-primary/30 group transition-all duration-300"
              >
                {/* Custom Arched dome cutout for food photograph (food-arc-card) */}
                <div className="h-56 overflow-hidden relative border-b border-gray-50">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-t-[9999px] group-hover:scale-108 transition-transform duration-750"
                  />
                  
                  {/* Quantity pill indicator overlay */}
                  {quantity > 0 && (
                    <div className="absolute bottom-3 right-3 bg-kanoeats-primary text-white font-extrabold w-7 h-7 flex items-center justify-center rounded-full text-xs shadow-md border-2 border-white animate-scale">
                      {quantity}
                    </div>
                  )}
                </div>

                {/* Arched card bottom content body */}
                <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-1.5">
                    {/* Pink uppercase upper typography label */}
                    <h3 className="font-black text-rose-500 text-xs tracking-wider uppercase leading-none mt-1">
                      {dish.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Pricing and Action button */}
                  <div className="space-y-3 pt-2">
                    {/* NGN currency design */}
                    <p className="text-sm font-extrabold text-gray-800 tracking-tight font-mono">
                      NGN {dish.price.toLocaleString()}
                    </p>

                    {/* Pink/Red add to cart button with Shopping Cart icon */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onAddToCart(dish, restaurant.id, restaurant.name)}
                        className="w-full py-2.5 bg-kanoeats-primary hover:bg-opacity-95 text-white font-bold rounded-xl flex items-center justify-center space-x-2.5 text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add to cart</span>
                      </button>

                      {quantity > 0 && (
                        <button
                          onClick={() => onRemoveFromCart(dish.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-kanoeats-primary rounded-xl transition-all cursor-pointer"
                          title="Remove one unit"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            );
          }))}
        </div>
      </div>

      {/* FLOAT INTEGRATED STICKY CART ALERTS PANEL (Craft Action trigger) */}
      {restaurantSubtotal > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#1d1f21] text-white p-4 px-6 rounded-2xl flex items-center justify-between space-x-10 shadow-2xl z-55 w-full max-w-xl border border-gray-700">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Active Basket</p>
            <p className="text-sm font-black text-amber-400 font-mono">
              NGN {restaurantSubtotal.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTab('All')}
              className="text-xs text-gray-300 hover:text-white underline font-bold"
            >
              Verify Menu
            </button>

            <button
              onClick={() => onNavigate('checkout')}
              className="px-6 py-2.5 bg-kanoeats-primary hover:bg-opacity-95 text-white text-xs font-black rounded-xl flex items-center space-x-2 shadow-lg shadow-red-500/10 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Checkout Order</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
