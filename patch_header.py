with open('src/components/Dashboard.tsx', 'r') as f:
    content = f.read()

old_header = """        {/* HEADER BAR */}
        <header className="bg-white border-b border-[#eddcd2] h-20 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20">
          
          {/* SEARCH COMPONENT (Screen 1) */}
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search cuisine, price, distance & more"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() !== '') {
                  setActiveTab('restaurants');
                }
              }}
              className="w-full h-11 pl-12 pr-4 bg-gray-50 border border-gray-100 focus:bg-white focus:border-kanoeats-primary focus:outline-none rounded-2xl text-sm font-medium text-gray-700 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-6">"""

new_header = """        {/* HEADER BAR */}
        <header className="bg-white border-b border-[#eddcd2] h-20 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          
          {/* PERSISTENT DELIVERY-CONTEXT BAR */}
          <div className="hidden md:flex items-center space-x-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <div className="flex items-center space-x-2 border-r border-gray-200 pr-4">
              <MapPin className="h-4 w-4 text-kanoeats-primary" />
              <span className="text-xs font-bold text-gray-800 line-clamp-1 max-w-[120px]">{user.address || 'Kano, Nigeria'}</span>
            </div>
            <div className="flex items-center space-x-2 border-r border-gray-200 pr-4">
              <Clock className="h-4 w-4 text-amber-500" />
              <span className="text-xs font-bold text-gray-800">ASAP (~35 min)</span>
            </div>
            <div className="flex items-center space-x-2 pl-2">
              <span className="text-xs font-bold text-gray-500">Open Now</span>
              <button className="w-8 h-4 bg-kanoeats-primary rounded-full relative cursor-pointer">
                 <span className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></span>
              </button>
            </div>
          </div>
          
          {/* SEARCH COMPONENT (Screen 1) */}
          <div className="relative w-full max-w-sm hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search cuisine..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim() !== '') {
                  setActiveTab('restaurants');
                }
              }}
              className="w-full h-11 pl-12 pr-4 bg-white border border-gray-200 focus:bg-white focus:border-kanoeats-primary focus:outline-none rounded-2xl text-sm font-medium text-gray-700 transition-all placeholder:text-gray-400 shadow-sm"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-4 lg:space-x-6">"""

content = content.replace(old_header, new_header)

with open('src/components/Dashboard.tsx', 'w') as f:
    f.write(content)
