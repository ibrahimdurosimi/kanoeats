import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Replace sidebar nav
sidebar_regex = r'<nav className="flex flex-col items-center space-y-4 w-full px-2">.*?</nav>'
new_sidebar = """<nav className="flex flex-col items-center w-full px-2">
            <button 
              onClick={() => { setActiveTab('restaurants'); onSetSelectedCategory('All'); }}
              title="Restaurants" 
              className={`w-14 h-16 flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer group mb-2 ${
                activeTab === 'restaurants' ? 'text-white' : 'text-gray-400 hover:text-[#c64c38]'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${
                activeTab === 'restaurants' ? 'bg-[#c64c38] shadow-md shadow-[#c64c38]/20' : 'bg-transparent group-hover:bg-[#c64c38]/10'
              }`}>
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <span className={`text-[9px] font-bold ${activeTab === 'restaurants' ? 'text-[#c64c38]' : ''}`}>Restaurants</span>
            </button>

            {user.isLoggedIn && (
              <button 
                onClick={() => { setActiveTab('orders'); }}
                title="Orders" 
                className={`w-14 h-16 flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer group mb-2 ${
                  activeTab === 'orders' ? 'text-white' : 'text-gray-400 hover:text-[#c64c38]'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${
                  activeTab === 'orders' ? 'bg-[#c64c38] shadow-md shadow-[#c64c38]/20' : 'bg-transparent group-hover:bg-[#c64c38]/10'
                }`}>
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className={`text-[9px] font-bold ${activeTab === 'orders' ? 'text-[#c64c38]' : ''}`}>Orders</span>
              </button>
            )}

            <button 
              onClick={() => { setActiveTab('support'); }}
              title="Support" 
              className={`w-14 h-16 flex flex-col items-center justify-center rounded-2xl transition-all cursor-pointer group mb-2 ${
                activeTab === 'support' ? 'text-white' : 'text-gray-400 hover:text-[#c64c38]'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-all ${
                activeTab === 'support' ? 'bg-[#c64c38] shadow-md shadow-[#c64c38]/20' : 'bg-transparent group-hover:bg-[#c64c38]/10'
              }`}>
                <HelpCircle className="h-5 w-5" />
              </div>
              <span className={`text-[9px] font-bold ${activeTab === 'support' ? 'text-[#c64c38]' : ''}`}>Support</span>
            </button>
          </nav>"""
content = re.sub(sidebar_regex, new_sidebar, content, flags=re.DOTALL)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
