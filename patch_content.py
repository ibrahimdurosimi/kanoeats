import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

start_marker = "{/* TAB 2: RESTAURANTS DISCOVERY */}"
end_marker = "{/* TAB 2: ACTIVE ORDERS ARCHIVES */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

new_discovery = """{/* TAB 2: RESTAURANTS DISCOVERY */}
          {activeTab === 'restaurants' && (
            <div className="space-y-12" id="dash-restaurants-content">
              
              {/* User Greeting */}
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-4xl font-display font-black text-[#2a2b2a] tracking-tight">
                    Restaurant discovery
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">What authentic Arewa flavour are you craving tonight?</p>
                </div>
              </div>

              {/* Delivery Context & Live Tracker Group */}
              <div className="space-y-2">
                {/* Delivery Context Bar */}
                <div className="bg-white border border-[#e8dfd5] rounded-full p-2 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3 px-4">
                    <div className="w-8 h-8 rounded-full bg-[#fdfaf7] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-[#c64c38]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#c64c38] uppercase tracking-wider leading-none mb-1">Delivering to</p>
                      <p className="text-sm font-bold text-[#2a2b2a] leading-none cursor-pointer flex items-center">{user.address || 'Nassarawa GRA, Kano'} <ChevronDown className="w-4 h-4 text-gray-400 ml-1" /></p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 pr-1">
                    <div className="hidden md:flex items-center space-x-1.5 text-[#1e3f32]">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-bold">~24 min average</span>
                    </div>
                    <div className="flex bg-[#f5f0e6] rounded-full p-1 border border-[#e8dfd5]">
                      <button className="px-4 py-1.5 bg-white text-[#2a2b2a] font-bold text-sm rounded-full shadow-sm">Eat now</button>
                      <button className="px-4 py-1.5 text-gray-500 font-bold text-sm hover:text-[#2a2b2a]">Schedule</button>
                    </div>
                  </div>
                </div>

                {/* Live Tracker (if active) */}
                {activeOrders.filter(o => o.status === 'On its way').length > 0 && (
                  <div className="bg-gradient-to-r from-[#8a3324] to-[#f2a640] rounded-full p-2 flex items-center justify-between shadow-sm cursor-pointer hover:opacity-95 transition-opacity">
                    <div className="flex items-center space-x-3 px-4">
                      <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                        <span className="text-white text-xs">📦</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-none mb-1">Rider Musa is 6 minutes away</h4>
                        <p className="text-[11px] text-white/80 leading-none">{activeOrders.find(o => o.status === 'On its way')?.restaurant} - 2 items - arriving 21:38</p>
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-full transition-colors mr-1">
                      Track
                    </button>
                  </div>
                )}
              </div>
              
              {/* HERO ZONE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Deal of the Day (Editorial) */}
                <div 
                  className="lg:col-span-2 rounded-[32px] overflow-hidden flex flex-col justify-end text-white relative min-h-[360px] shadow-sm group cursor-pointer"
                  onClick={() => { if (restaurants.length > 0) onSelectRestaurant(restaurants[0]); }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80" 
                    alt="Grill"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2a2b2a]/90 via-[#2a2b2a]/50 to-transparent" />
                  <div className="relative z-10 p-10 max-w-lg">
                    <span className="inline-block px-3 py-1 bg-[#f2a640] text-[#1e3f32] text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                      Deal of the Day
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-none mb-4">
                      Fire-kissed suya, 20% off till midnight
                    </h2>
                    <p className="text-sm text-gray-200 mb-8 max-w-sm">
                      Every skewer from Mai Suya Palace, hand-rubbed in yaji and grilled to order.
                    </p>
                    <button className="px-6 py-3 bg-[#f5f0e6] text-[#2a2b2a] font-bold rounded-full text-sm shadow-md transition-all hover:bg-white">
                      Claim offer
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Secondary Utility / Free Delivery */}
                  <div className="flex-1 bg-[#1e3f32] rounded-[32px] p-8 relative overflow-hidden flex flex-col items-start justify-between shadow-sm cursor-pointer group">
                    <div className="absolute top-6 right-6">
                      <Send className="w-5 h-5 text-white/50" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-display font-black text-[#f5f0e6] leading-tight mb-3">
                        Free delivery across<br/>Kano Metropolis
                      </h3>
                      <p className="text-xs text-[#f5f0e6]/80 max-w-[200px]">Spend over ₦15,000 and we cover the dispatch.</p>
                    </div>
                    <button className="relative z-10 mt-6 px-5 py-2.5 bg-[#f5f0e6] hover:bg-white text-[#1e3f32] font-bold rounded-full text-sm transition-colors">
                      Browse menu
                    </button>
                  </div>

                  {/* Family Tray */}
                  <div className="bg-[#fcfaf7] border border-dashed border-[#c64c38]/30 rounded-[32px] p-6 flex items-center space-x-5 cursor-pointer hover:bg-[#f5f0e6]/50 transition-colors">
                     <div className="w-12 h-12 bg-[#c64c38] rounded-full flex items-center justify-center shrink-0 shadow-sm text-white">
                       <Plus className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="text-[#2a2b2a] font-bold text-lg leading-tight mb-1">Start a family tray</h4>
                       <p className="text-xs text-gray-500 leading-snug">Share one link, everyone adds their plate, you pay once.</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* CATEGORY ROW (Textured Tiles) */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-display font-black text-[#2a2b2a] tracking-tight">Cuisines & categories</h3>
                </div>
                <div className="flex items-center space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                  {[
                    { label: 'All', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Traditional', img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Suya', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Masa', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Grills', img: 'https://images.unsplash.com/photo-1544025162-811114b7e849?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Drinks', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Rice & Stews', img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=80' },
                  ].map((cat, idx) => {
                    const isSel = selectedCategory === cat.label;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSetSelectedCategory(cat.label)}
                        className={`relative w-[130px] h-[130px] rounded-[32px] overflow-hidden shrink-0 group transition-all duration-300 ${isSel ? 'ring-4 ring-offset-4 ring-[#c64c38] scale-[0.98]' : 'hover:-translate-y-1'}`}
                      >
                        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity ${isSel ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`} />
                        <span className="absolute bottom-4 left-4 right-4 text-left text-white font-black text-sm z-10">
                          {cat.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* DISH-LEVEL RAIL: Suya & plates under NGN 3,000 */}
              <section className="pt-4">
                 <div className="flex items-end justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-display font-black text-[#2a2b2a] tracking-tight">Suya & plates under ₦3,000</h3>
                      <p className="text-sm text-gray-500 mt-1">Straight to cart — no menu digging</p>
                    </div>
                    <button className="text-[#c64c38] font-bold text-sm hover:underline flex items-center">
                      See all <span className="ml-1">→</span>
                    </button>
                 </div>
                 <div className="flex space-x-4 overflow-x-auto pb-6 hide-scrollbar">
                    {restaurants.flatMap(r => r.dishes.map(d => ({...d, restName: r.name}))).filter(d => d.price <= 3000 && (d.name.toLowerCase().includes('suya') || d.description.toLowerCase().includes('suya') || d.name.toLowerCase().includes('masa') || d.name.toLowerCase().includes('tuwo') || d.name.toLowerCase().includes('grill'))).slice(0, 4).map((dish, idx) => (
                      <div key={idx} className="min-w-[260px] max-w-[260px] bg-white border border-[#e8dfd5] rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col">
                        <div className="h-44 overflow-hidden relative bg-gray-100">
                           <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5 relative flex-1 flex flex-col justify-between">
                           <div>
                             <h4 className="text-sm font-black text-[#2a2b2a] truncate mb-1">{dish.name}</h4>
                             <p className="text-[11px] text-gray-500 truncate mb-4">{dish.restName}</p>
                           </div>
                           <div className="flex items-center justify-between mt-auto">
                             <p className="text-sm font-black text-[#c64c38]">₦{dish.price.toLocaleString()}</p>
                             <button className="w-10 h-10 bg-[#c64c38] rounded-full flex items-center justify-center text-white shadow-sm hover:bg-[#a53f2e] transition-colors shrink-0">
                                <Plus className="w-5 h-5" />
                             </button>
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* TRENDING NOW (Wide Cards) */}
              <section className="pt-4">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-black text-[#2a2b2a] tracking-tight">Trending now</h3>
                    <p className="text-sm text-gray-500 mt-1">Busiest kitchens in Kano this hour</p>
                  </div>
                  <button className="text-[#c64c38] font-bold text-sm hover:underline flex items-center">
                    See all <span className="ml-1">→</span>
                  </button>
                </div>
                <div className="flex space-x-6 overflow-x-auto pb-6 hide-scrollbar">
                  {restaurants.slice(0, 3).map((restaurant, idx) => (
                    <div key={idx} className="min-w-[420px] h-[260px] relative rounded-[32px] overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
                      <img src={restaurant.logoUrl} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2b2a]/90 via-[#2a2b2a]/30 to-transparent" />
                      
                      <div className="absolute top-5 left-5">
                        <span className="px-3 py-1 bg-[#f2a640] text-[#1e3f32] text-[10px] font-black uppercase tracking-wider rounded-md">HOT</span>
                      </div>
                      
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <h4 className="text-2xl font-display font-black leading-tight mb-1">{restaurant.name}</h4>
                        <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-3">{restaurant.cuisine}</p>
                        <div className="flex items-center space-x-3 text-xs font-medium">
                          <span className="flex items-center"><Star className="w-3.5 h-3.5 text-[#f2a640] fill-[#f2a640] mr-1"/> {restaurant.rating}</span>
                          <span>{restaurant.deliveryTime} mins</span>
                          <span>₦{restaurant.id === 'r1' ? '0' : '700'} delivery</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Seasonal Banner Bottom */}
              <div className="w-full bg-[#fdfaf7] border border-[#e8dfd5] rounded-[32px] p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between shadow-sm cursor-pointer group mt-8">
                  <div className="absolute -right-10 top-0 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                     <span className="text-[250px]">🌙</span>
                  </div>
                  <div className="relative z-10 max-w-lg mb-6 md:mb-0">
                    <span className="inline-block text-[#c64c38] text-[10px] font-black uppercase tracking-widest mb-3">
                      SEASONAL COLLECTION
                    </span>
                    <h3 className="text-3xl font-display font-black text-[#2a2b2a] leading-tight mb-2">
                      Sallah trays & iftar bundles
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">Pre-order large-format trays from 14 Kano kitchens. Reserve now, we schedule the cook and the rider for you.</p>
                  </div>
                  <button className="relative z-10 px-8 py-4 bg-[#c64c38] hover:bg-[#a53f2e] text-white font-bold rounded-full text-sm transition-colors shadow-sm shrink-0 whitespace-nowrap">
                    Explore collection
                  </button>
              </div>

              {/* REORDER RAIL (Recent Orders) */}
              {pastOrders.length > 0 && (
                <section className="pt-8 border-t border-[#e8dfd5] mt-12">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-display font-black text-[#2a2b2a] tracking-tight">Order it again</h3>
                      <p className="text-sm text-gray-500 mt-1">From your last three orders</p>
                    </div>
                  </div>
                  <div className="flex space-x-4 overflow-x-auto pb-6 hide-scrollbar">
                    {pastOrders.map((ord, idx) => (
                      <div key={idx} className="min-w-[340px] bg-white border border-[#e8dfd5] rounded-full p-3 pr-5 shadow-sm flex items-center space-x-4 hover:shadow-md hover:border-[#c64c38]/30 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden shrink-0 relative">
                           <img src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=200&q=80" alt="Order" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-black text-[#2a2b2a] truncate group-hover:text-[#c64c38] transition-colors">{['Full Yaji Suya Tray', 'Masa & Honey Pepper', 'Tuwo & Miyan Kuka'][idx%3]}</h4>
                          <p className="text-[11px] text-gray-500 truncate mt-0.5">{ord.restaurant} • ₦{ord.total.toLocaleString()}</p>
                        </div>
                        <button className="px-4 py-2 rounded-full bg-white hover:bg-[#f5f0e6] text-[#c64c38] border border-[#c64c38] font-bold text-xs transition-colors shrink-0">
                          Reorder
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* BROWSE GRID (Denser Restaurant Cards) */}
              <section className="pt-8">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-black text-[#2a2b2a] tracking-tight">
                      Browse restaurants
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{filteredRestaurants.length} matching kitchens</p>
                  </div>
                  <div className="hidden md:flex relative w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input type="text" placeholder="Search within restaurants..." className="w-full h-10 pl-10 pr-4 rounded-full border border-[#e8dfd5] text-sm focus:outline-none focus:border-[#c64c38]" />
                  </div>
                </div>
                
                {/* Filter Chips */}
                <div className="flex items-center space-x-3 mb-8 overflow-x-auto pb-2 hide-scrollbar">
                  {['Featured', 'Top rated', 'Fastest', 'Verified halal', 'Vegan options'].map((filter, i) => (
                    <button key={i} className={`px-4 py-2 rounded-full border border-[#e8dfd5] text-xs font-bold whitespace-nowrap transition-colors ${filter === 'Fastest' ? 'bg-[#2a2b2a] text-white border-[#2a2b2a]' : 'bg-white text-[#2a2b2a] hover:bg-gray-50'}`}>
                      {filter}
                    </button>
                  ))}
                  <button className="px-4 py-2 rounded-full border border-[#e8dfd5] bg-white text-[#2a2b2a] text-xs font-bold whitespace-nowrap hover:bg-gray-50 flex items-center">
                    <UtensilsCrossed className="w-3.5 h-3.5 mr-1.5" /> More filters
                  </button>
                </div>

                {filteredRestaurants.length === 0 ? (
                  <div className="bg-white rounded-[32px] p-12 text-center border border-[#e8dfd5] shadow-sm">
                    <UtensilsCrossed className="w-12 h-12 text-[#e8dfd5] mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-[#2a2b2a]">No restaurants found</h3>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
                      Try adjusting your filters or search query to discover more delicious options.
                    </p>
                    <button 
                      onClick={() => { setSearchQuery(''); onSetSelectedCategory('All'); }}
                      className="mt-6 px-6 py-2.5 bg-[#f5f0e6] text-[#2a2b2a] font-bold rounded-full text-sm hover:bg-[#e8dfd5] transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredRestaurants.map((restaurant, idx) => {
                      const isLiked = favRestaurantIds.includes(restaurant.id);
                      return (
                        <div 
                          key={restaurant.id}
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="bg-white border border-[#e8dfd5] rounded-[32px] overflow-hidden hover:shadow-lg hover:border-[#c64c38]/30 transition-all flex flex-col cursor-pointer group"
                        >
                          {/* Hero Image */}
                          <div className="h-48 relative overflow-hidden bg-[#e8dfd5]">
                            <img 
                              src={restaurant.logoUrl} 
                              alt={restaurant.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#2a2b2a]/40 via-transparent to-black/60 opacity-80" />
                            
                            {/* Status Tag */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                               {idx === 0 && <span className="bg-white/95 text-[#2a2b2a] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Kitchen Busy - 10 min wait</span>}
                               {idx === 1 && <span className="bg-white/95 text-[#c64c38] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Closed - Opens 8:00</span>}
                            </div>
                            
                            {/* Top Right Heart */}
                            <div className="absolute top-4 right-4 z-10">
                               <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFavRestaurantIds(prev => 
                                    prev.includes(restaurant.id) 
                                      ? prev.filter(id => id !== restaurant.id)
                                      : [...prev, restaurant.id]
                                  );
                                }}
                                className="w-8 h-8 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-white flex items-center justify-center transition-colors"
                              >
                                <Heart className={`h-4 w-4 transition-colors ${isLiked ? 'fill-[#c64c38] text-[#c64c38]' : 'text-gray-500'}`} />
                              </button>
                            </div>
                            
                            {/* Bottom Left Rating */}
                            <div className="absolute bottom-4 left-4 bg-white/95 px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                               <Star className="w-3 h-3 text-[#f2a640] fill-[#f2a640]" />
                               <span className="text-xs font-black text-[#2a2b2a]">{restaurant.rating}</span>
                               <span className="text-[10px] text-gray-500 font-medium ml-1">({restaurant.rating > 4.8 ? '2140' : '412'})</span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-5 pt-4 flex flex-col flex-grow">
                            <h3 className="text-base font-black text-[#2a2b2a] leading-tight group-hover:text-[#c64c38] transition-colors line-clamp-1 mb-1">{restaurant.name}</h3>
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-wider mb-3">{restaurant.cuisine}</p>
                            
                            <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium mb-4">
                              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {restaurant.deliveryTime} min</span>
                              <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {restaurant.rating > 4.8 ? '1.1km' : '2.9km'}</span>
                              <span className="flex items-center">₦{restaurant.id === 'r1' ? '500' : '900'}</span>
                            </div>
                            
                            <div className="mt-auto flex items-center space-x-2 border-t border-[#e8dfd5] pt-4">
                               {restaurant.tags.includes('Halal') && (
                                 <span className="flex items-center bg-[#fdfaf7] border border-[#1e3f32]/10 text-[#1e3f32] text-[10px] font-bold px-2 py-1 rounded-md">
                                   <CheckCircle className="w-3 h-3 mr-1" /> Verified halal
                                 </span>
                               )}
                               {restaurant.tags.includes('Spicy') && (
                                 <span className="bg-[#f5f0e6] text-[#2a2b2a] text-[10px] font-bold px-2 py-1 rounded-md">
                                   Spicy
                                 </span>
                               )}
                               {restaurant.tags.includes('Vegan') && (
                                 <span className="bg-[#f5f0e6] text-[#2a2b2a] text-[10px] font-bold px-2 py-1 rounded-md">
                                   Vegan
                                 </span>
                               )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          )}
"""

content = content[:start_idx] + new_discovery + content[end_idx:]

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
