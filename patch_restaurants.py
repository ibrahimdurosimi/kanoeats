with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

start_marker = "{/* TAB 2: RESTAURANTS DISCOVERY */}"
end_marker = "{/* TAB 2: ACTIVE ORDERS ARCHIVES */}"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("Could not find markers!")
    exit(1)

new_discovery = """{/* TAB 2: RESTAURANTS DISCOVERY */}
          {activeTab === 'restaurants' && (
            <div className="space-y-12" id="dash-restaurants-content">
              
              {/* HERO ZONE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Deal of the Day (Editorial) */}
                <div 
                  className="lg:col-span-2 rounded-[24px] overflow-hidden flex flex-col justify-end text-white relative min-h-[300px] shadow-sm group cursor-pointer"
                  onClick={() => { if (restaurants.length > 0) onSelectRestaurant(restaurants[0]); }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80" 
                    alt="Grill"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2b2a]/90 via-[#2a2b2a]/40 to-transparent" />
                  <div className="relative z-10 p-8">
                    <span className="inline-block px-3 py-1 bg-[#f2a640] text-[#1e3f32] text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                      Deal of the Day
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-display tracking-tight leading-none mb-2">
                      Fire & Spice
                    </h2>
                    <p className="text-sm text-gray-200 max-w-sm mb-5">
                      Experience the smokey perfection of authentic Arewa grills. 20% off all Suya at Mai Suya Palace.
                    </p>
                    <button className="px-6 py-2.5 bg-[#f5f0e6] text-[#2a2b2a] font-bold rounded-full text-xs shadow-md transition-all hover:bg-white">
                      Order Now
                    </button>
                  </div>
                </div>

                {/* Secondary Utility / Seasonal Banner */}
                <div className="bg-[#1e3f32] rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between shadow-sm cursor-pointer group">
                  <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
                     <span className="text-[120px]">🌙</span>
                  </div>
                  <div className="relative z-10">
                    <span className="inline-block px-2.5 py-1 bg-[#f2a640]/20 text-[#f2a640] text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
                      Seasonal
                    </span>
                    <h3 className="text-2xl font-display font-black text-white leading-tight mb-2">
                      Ramadan<br/>Specials
                    </h3>
                    <p className="text-xs text-gray-300">Curated Iftar bundles and family trays for sharing.</p>
                  </div>
                  <button className="relative z-10 mt-6 w-full py-3 bg-[#c64c38] hover:bg-[#a53f2e] text-white font-bold rounded-xl text-xs transition-colors">
                    View Collection
                  </button>
                </div>
              </div>

              {/* REORDER RAIL (Recent Orders) */}
              {pastOrders.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-black text-[#2a2b2a] tracking-tight">Order it again</h3>
                  </div>
                  <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                    {pastOrders.map((ord, idx) => (
                      <div key={idx} className="min-w-[280px] bg-white border border-[#e8dfd5] rounded-2xl p-4 shadow-sm flex items-center space-x-4 hover:shadow-md hover:border-[#c64c38]/30 transition-all cursor-pointer group">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden shrink-0 relative">
                           <img src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=200&q=80" alt="Order" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-[#2a2b2a] truncate group-hover:text-[#c64c38] transition-colors">{ord.restaurant}</h4>
                          <p className="text-[11px] text-gray-500 truncate">{ord.items}</p>
                          <p className="text-xs font-bold text-[#c64c38] mt-1">NGN {ord.total.toLocaleString()}</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#f5f0e6] group-hover:bg-[#c64c38] group-hover:text-white flex items-center justify-center shrink-0 border border-[#e8dfd5] transition-all text-[#2a2b2a]">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* CATEGORY ROW (Textured Tiles) */}
              <section>
                <div className="flex items-center space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                  {[
                    { label: 'All', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Traditional', img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Suya', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Masa', img: 'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Grills', img: 'https://images.unsplash.com/photo-1544025162-811114b7e849?auto=format&fit=crop&w=300&q=80' },
                    { label: 'Drinks', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80' },
                  ].map((cat, idx) => {
                    const isSel = selectedCategory === cat.label;
                    return (
                      <button
                        key={idx}
                        onClick={() => onSetSelectedCategory(cat.label)}
                        className={`relative w-28 h-28 rounded-[20px] overflow-hidden shrink-0 group transition-all duration-300 ${isSel ? 'ring-4 ring-offset-2 ring-[#c64c38] scale-95 shadow-md' : 'hover:-translate-y-1 hover:shadow-md'}`}
                      >
                        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className={`absolute inset-0 transition-colors ${isSel ? 'bg-black/20' : 'bg-[#2a2b2a]/60 group-hover:bg-[#2a2b2a]/40'}`} />
                        <span className="absolute inset-0 flex items-center justify-center text-[#f5f0e6] font-bold text-sm z-10 drop-shadow-md">
                          {cat.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </section>

              {/* DISH-LEVEL RAIL */}
              <section className="pt-4 border-t border-[#e8dfd5]">
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-display font-black text-[#2a2b2a] tracking-tight">Suya near you under ₦3,000</h3>
                 </div>
                 <div className="flex space-x-4 overflow-x-auto pb-4 hide-scrollbar">
                    {restaurants.flatMap(r => r.dishes).filter(d => d.price <= 3000 && (d.name.toLowerCase().includes('suya') || d.description.toLowerCase().includes('suya'))).slice(0, 6).map((dish, idx) => (
                      <div key={idx} className="min-w-[180px] bg-white border border-[#e8dfd5] rounded-[16px] overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <div className="h-32 overflow-hidden relative">
                           <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                           <button className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:bg-[#c64c38] hover:text-white transition-colors text-[#2a2b2a]">
                              <Plus className="w-4 h-4" />
                           </button>
                        </div>
                        <div className="p-3">
                           <h4 className="text-xs font-bold text-[#2a2b2a] truncate group-hover:text-[#c64c38] transition-colors">{dish.name}</h4>
                           <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">{dish.description}</p>
                           <p className="text-xs font-bold text-[#c64c38] mt-2 font-mono">NGN {dish.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* BROWSE GRID (Denser Restaurant Cards) */}
              <section className="pt-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-display font-black text-[#2a2b2a] tracking-tight">
                    {searchQuery ? 'Search Results' : (selectedCategory === 'All' ? 'All Restaurants' : `${selectedCategory} Spots`)}
                  </h3>
                </div>

                {filteredRestaurants.length === 0 ? (
                  <div className="bg-white rounded-[24px] p-12 text-center border border-[#e8dfd5] shadow-sm">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => {
                      const isLiked = favRestaurantIds.includes(restaurant.id);
                      return (
                        <div 
                          key={restaurant.id}
                          onClick={() => onSelectRestaurant(restaurant)}
                          className="bg-white border border-[#e8dfd5] rounded-[24px] overflow-hidden hover:shadow-lg hover:border-[#c64c38]/30 transition-all flex flex-col cursor-pointer group"
                        >
                          {/* Hero Image */}
                          <div className="h-48 relative overflow-hidden bg-[#e8dfd5]">
                            <img 
                              src={restaurant.logoUrl} 
                              alt={restaurant.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                            
                            {/* Gradient Overlay for Top text */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#2a2b2a]/50 via-transparent to-transparent opacity-60" />
                            
                            {/* Badges */}
                            <div className="absolute top-4 flex justify-between items-start w-full px-4">
                               <div className="flex space-x-1.5">
                                  {restaurant.tags.includes('Halal') && (
                                     <span className="px-2 py-0.5 bg-[#f5f0e6]/90 backdrop-blur text-[#1e3f32] text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                                        Halal
                                     </span>
                                  )}
                                  {restaurant.tags.includes('Spicy') && (
                                     <span className="px-2 py-0.5 bg-[#c64c38] text-white text-[9px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                                        Spicy
                                     </span>
                                  )}
                               </div>
                               <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFavRestaurantIds(prev => 
                                    prev.includes(restaurant.id) 
                                      ? prev.filter(id => id !== restaurant.id)
                                      : [...prev, restaurant.id]
                                  );
                                }}
                                className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white transition-colors"
                              >
                                <Heart className={`h-4 w-4 transition-colors ${isLiked ? 'fill-[#c64c38] text-[#c64c38]' : 'text-gray-500'}`} />
                              </button>
                            </div>
                            
                            {/* Delivery Fee Badge Bottom */}
                            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm border border-white/20">
                               <span className="text-[10px] font-bold text-[#2a2b2a]">
                                  {restaurant.id === 'r1' ? 'Free Delivery' : '₦1,200 fee'}
                               </span>
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-5 flex flex-col flex-grow">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-lg font-bold text-[#2a2b2a] leading-tight group-hover:text-[#c64c38] transition-colors">{restaurant.name}</h3>
                              <div className="flex items-center space-x-1 bg-[#f5f0e6] px-1.5 py-0.5 rounded-md border border-[#e8dfd5]">
                                <span className="font-bold text-[#2a2b2a] text-xs">{restaurant.rating}</span>
                                <Star className="h-3 w-3 text-[#f2a640] fill-[#f2a640]" />
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium mb-4">{restaurant.cuisine}</p>
                            
                            <div className="mt-auto flex items-center justify-between border-t border-[#e8dfd5] pt-3">
                              <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                                <Clock className="h-3.5 w-3.5" />
                                <span className="font-medium">{restaurant.deliveryTime} min</span>
                              </div>
                              <span className="text-[10px] font-bold text-[#1e3f32] bg-[#1e3f32]/10 px-2 py-0.5 rounded-md">
                                Opens {restaurant.opens}
                              </span>
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

# Ensure 'Plus' is imported
import re
if 'Plus,' not in content and 'Plus }' not in content:
    content = content.replace('Trash2, CheckCircle, RotateCcw, Truck, Check', 'Trash2, CheckCircle, RotateCcw, Truck, Check, Plus')

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
