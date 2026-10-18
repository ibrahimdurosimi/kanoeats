import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

# Fix sidebar logo to match Image 1
old_logo = """<div className="flex items-center space-x-2 cursor-pointer pt-2" onClick={() => onNavigate('landing')}>
            <span className="text-2xl font-black font-display text-kanoeats-primary tracking-tight">KE</span>
          </div>"""
new_logo = """<div className="flex items-center justify-center cursor-pointer pt-2" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 rounded-full bg-[#c64c38] flex items-center justify-center text-white font-display font-black text-xl">K</div>
          </div>"""
content = content.replace(old_logo, new_logo)

# Rewrite header bar
header_regex = r'\{\/\* HEADER BAR \*\/\}.*?\{\/\* Profile trigger \(Mustfq Admin or Guest User\) \*\/\}'
new_header = """{/* HEADER BAR */}
        <header className="bg-[#f5f0e6] h-20 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20">
          
          {/* SEARCH COMPONENT (Screen 1) */}
          <div className="relative w-full max-w-2xl hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search suya, masa, kitchens near you..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() !== '') {
                  setActiveTab('restaurants');
                }
              }}
              className="w-full h-12 pl-12 pr-4 bg-white/50 border border-[#e8dfd5] focus:bg-white focus:border-[#c64c38] focus:outline-none rounded-full text-sm font-medium text-[#2a2b2a] transition-all placeholder:text-gray-500"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4">
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-[#2a2b2a] transition-colors cursor-pointer">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-[#c64c38] rounded-full" />
            </button>

            {/* Profile trigger (Mustfq Admin or Guest User) */}"""
content = re.sub(header_regex, new_header, content, flags=re.DOTALL)

# Fix profile trigger in header to match Image 1
profile_regex = r'\{\/\* Profile trigger.*?<\/div>\s*<\/div>'
new_profile = """{/* Profile trigger */}
            <div className="relative">
              <div 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-full border border-[#e8dfd5] cursor-pointer hover:bg-gray-50 transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-[#2a2b2a] leading-none">{user.isLoggedIn ? userFirstName : 'Sign in'}</span>
                  <span className="text-[9px] text-gray-500 leading-none mt-0.5">{user.isLoggedIn ? 'Account' : 'Browse mode'}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>"""
content = re.sub(profile_regex, new_profile, content, flags=re.DOTALL)


with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
