import React, { useState } from 'react';
import { User, Restaurant } from '../types';
import { useRestaurants } from '../hooks/useRestaurants';
import { Store, ShoppingBag, Plus, LogOut, Settings } from 'lucide-react';

interface OwnerDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export default function OwnerDashboard({ user, onLogout, onNavigate }: OwnerDashboardProps) {
  const { restaurants } = useRestaurants();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'menu'>('overview');
  
  // Just show the first restaurant for demo purposes
  const myRestaurant = restaurants[0];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center cursor-pointer" onClick={() => onNavigate('landing')}>
          <div>
            <span className="text-2xl font-black font-display text-kanoeats-primary tracking-tight">KanoEats</span>
            <span className="text-xs font-bold text-[#ca7d2d] block uppercase tracking-widest mt-1">Partner</span>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-[#ca7d2d]/10 text-[#ca7d2d] font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'}`}
          >
            <Store className="h-5 w-5" />
            <span>Overview</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-[#ca7d2d]/10 text-[#ca7d2d] font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'}`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Live Orders</span>
            <span className="ml-auto bg-[#d32f2f] text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'menu' ? 'bg-[#ca7d2d]/10 text-[#ca7d2d] font-bold' : 'text-gray-500 hover:bg-gray-50 font-medium'}`}
          >
            <Settings className="h-5 w-5" />
            <span>Manage Menu</span>
          </button>

          <div className="pt-3 border-t border-gray-100">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all text-[#c64c38] hover:bg-red-50 font-bold text-xs cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Switch to Customer App</span>
            </button>
          </div>
        </div>
        
        <div className="p-4 mt-auto">
          <div className="p-4 bg-gray-50 rounded-xl mb-4 border border-gray-100">
            <p className="text-sm font-bold text-gray-800">{user.fullName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all font-bold text-sm"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Welcome back, {user.fullName.split(' ')[0]}</h2>
              <p className="text-gray-500 text-sm mt-1">Here is what's happening at your restaurant today.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Today's Revenue</p>
                <p className="text-3xl font-black text-gray-900 mt-2">₦ 145,500</p>
                <p className="text-emerald-500 text-xs font-bold mt-2">+12% from yesterday</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Active Orders</p>
                <p className="text-3xl font-black text-gray-900 mt-2">8</p>
                <p className="text-amber-500 text-xs font-bold mt-2">3 pending acceptance</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">Customer Rating</p>
                <p className="text-3xl font-black text-gray-900 mt-2">{myRestaurant?.rating || 4.8}</p>
                <p className="text-gray-400 text-xs font-medium mt-2">Based on 124 reviews</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Live Orders</h2>
              <p className="text-gray-500 text-sm mt-1">Manage incoming orders.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-amber-50/50">
                <div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">New</span>
                  <p className="font-bold text-gray-900 mt-2">Order #KN-2940</p>
                  <p className="text-xs text-gray-500 mt-1">Placed 2 mins ago</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-kanoeats-primary text-lg">₦ 4,800</p>
                  <div className="flex space-x-2 mt-2">
                    <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors">Decline</button>
                    <button className="px-4 py-1.5 bg-[#ca7d2d] hover:bg-[#b0671f] text-white rounded-lg text-xs font-bold transition-colors">Accept</button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">2x Signature Tsali Beef Suya Skewer</span>
                    <span className="font-bold text-gray-900">₦ 3,500</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">1x Kunun Zaki (Spiced Millet Nectar)</span>
                    <span className="font-bold text-gray-900">₦ 1,300</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (
          <div className="max-w-5xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Manage Menu</h2>
                <p className="text-gray-500 text-sm mt-1">{myRestaurant?.name}</p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-kanoeats-primary text-white rounded-xl text-sm font-bold shadow-sm hover:bg-opacity-90 transition-all">
                <Plus className="h-4 w-4" />
                <span>Add Dish</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myRestaurant?.dishes.map((dish) => (
                <div key={dish.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                  <img src={dish.image} alt={dish.name} className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{dish.name}</h3>
                        <span className="text-[#ca7d2d] font-black text-sm">₦ {dish.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">{dish.description}</p>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button className="text-xs font-semibold text-kanoeats-primary hover:underline">Edit</button>
                      <button className="text-xs font-semibold text-red-500 hover:underline">Unpublish</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
