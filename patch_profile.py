import re

with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

profile_regex = r'\{\/\* Profile trigger \*\/\}.*?<\/div>\s*<\/div>'
new_profile = """{/* Profile trigger */}
            <div className="relative">
              <div 
                onClick={() => {
                  if (user.isLoggedIn) {
                    setShowProfileDropdown(!showProfileDropdown);
                  } else {
                    onNavigate('register');
                  }
                }}
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
