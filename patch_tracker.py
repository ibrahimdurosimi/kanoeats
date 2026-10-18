with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# I will append a floating live order strip just before the closing tag of the main component
# Or before `</main>` or something

target = "{/* TAB 2: ACTIVE ORDERS ARCHIVES */}"
if target in content:
    tracker = """{/* LIVE ORDER TRACKING STRIP */}
          {activeOrders.filter(o => o.status === 'On its way').length > 0 && (
            <div className="fixed bottom-6 right-6 lg:right-12 left-6 lg:left-32 bg-[#2a2b2a] rounded-[24px] shadow-2xl p-4 md:p-6 text-white border border-[#2a2b2a] flex flex-col md:flex-row items-center justify-between z-50 group cursor-pointer hover:bg-[#1e3f32] transition-colors">
              <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-auto">
                <div className="w-12 h-12 bg-[#f2a640] rounded-full flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-[#1e3f32]" />
                </div>
                <div>
                  <p className="text-[#f5f0e6] text-xs font-bold uppercase tracking-widest mb-0.5">Arriving in 15 min</p>
                  <h4 className="text-lg font-black font-display leading-tight">{activeOrders.find(o => o.status === 'On its way')?.restaurant}</h4>
                </div>
              </div>
              
              {/* Expanded timeline (visible on md screens or hover) */}
              <div className="flex-1 w-full md:w-auto px-4 md:px-12">
                <div className="relative">
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-1 bg-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1/2 h-1 bg-[#f2a640] rounded-full relative z-0"></div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="w-3 h-3 bg-[#f2a640] rounded-full shadow-[0_0_0_4px_#2a2b2a]"></div>
                    <div className="w-3 h-3 bg-[#f2a640] rounded-full shadow-[0_0_0_4px_#2a2b2a] animate-pulse"></div>
                    <div className="w-3 h-3 bg-white/20 rounded-full shadow-[0_0_0_4px_#2a2b2a]"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-bold px-1">
                  <span>Prep</span>
                  <span className="text-[#f2a640]">On the way</span>
                  <span>Arrived</span>
                </div>
              </div>
              
              <button className="hidden md:flex mt-4 md:mt-0 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold transition-colors w-full md:w-auto justify-center">
                Track Map
              </button>
            </div>
          )}
          
          """
    content = content.replace(target, tracker + target)
    
    with open('src/components/Dashboard.tsx', 'w') as f:
        f.write(content)
