import { useState, useEffect } from 'react';
import { Screen, Restaurant, Dish, CartItem, User } from './types';
import LandingPage from './components/LandingPage';
import HowItWorks from './components/HowItWorks';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import OwnerDashboard from './components/OwnerDashboard';
import RestaurantDetail from './components/RestaurantDetail';
import Checkout from './components/Checkout';
import { useRestaurants } from './hooks/useRestaurants';

export default function App() {
  const { restaurants, loading } = useRestaurants();

  // Navigation State, starting at modern Landing Page
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  
  // Selected restaurant for Screen 2
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  
  useEffect(() => {
    if (restaurants.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurants[0]);
    }
  }, [restaurants, selectedRestaurant]);
  
  // Selected category pill active filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Global User Session (defaults to logged-out but preloads Mustfq Admin details)
  const [user, setUser] = useState<User>({
    fullName: '',
    email: '',
    phone: '',
    isLoggedIn: false,
    address: '38, Bompai Road, Kano'
  });

  // Basket shopping cart states
  const [cart, setCart] = useState<CartItem[]>([]);

  // Calculate total badge counts
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [toastMessage, setToastMessage] = useState<{message: string, type?: 'success' | 'info'} | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (dish: Dish, restaurantId: string, restaurantName: string) => {
    setCart(prevCart => {
      // Find if item already exists in the cart
      const existingIdx = prevCart.findIndex(item => item.dish.id === dish.id);
      
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1
        };
        return updated;
      } else {
        return [...prevCart, { dish, restaurantId, restaurantName, quantity: 1 }];
      }
    });
    showToast(`Added ${dish.name} to cart`, 'success');
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.dish.id === dishId);
      if (existingIdx === -1) return prevCart;

      const updated = [...prevCart];
      if (updated[existingIdx].quantity > 1) {
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity - 1
        };
        return updated;
      } else {
        return updated.filter(item => item.dish.id !== dishId);
      }
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleRegisterSuccess = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(prev => ({ ...prev, isLoggedIn: false }));
    setCart([]);
    setCurrentScreen('landing');
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentScreen('restaurant-details');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  // Synchronize dynamic address modifications
  const handleSetAddress = (newAddress: string) => {
    setUser(prev => ({ ...prev, address: newAddress }));
  };

  // Scroll to top on screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div className="bg-[#fdfbf9] min-h-screen text-gray-800 antialiased" id="app-canvas-container">
      
      {/* LANDING PAGE (Screen 4) */}
      {currentScreen === 'landing' && (
        <LandingPage 
          onNavigate={setCurrentScreen} 
          onSetAddress={handleSetAddress}
          onSelectCategory={setSelectedCategory}
          onSelectRestaurant={handleSelectRestaurant}
          cartCount={totalCartCount}
          user={user}
        />
      )}

      {/* HOW KanoEats WORKS PAGE (Screen 5) */}
      {currentScreen === 'how-it-works' && (
        <HowItWorks 
          onNavigate={setCurrentScreen} 
          cartCount={totalCartCount} 
        />
      )}

      {/* AUTH/WELCOME SCREEN (Screen 3) */}
      {currentScreen === 'register' && (
        <Register 
          onRegisterSuccess={handleRegisterSuccess} 
          onNavigate={setCurrentScreen} 
        />
      )}

      {/* CENTRAL KanoEats DASHBOARD (Screen 1) */}
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user} 
          onLogout={handleLogout} 
          onSelectRestaurant={handleSelectRestaurant}
          onNavigate={setCurrentScreen}
          selectedCategory={selectedCategory}
          onSetSelectedCategory={setSelectedCategory}
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          onUpdateUser={handleRegisterSuccess}
          onSetAddress={handleSetAddress}
        />
      )}

      {/* RESTAURANT OWNER DASHBOARD */}
      {currentScreen === 'owner-dashboard' && (
        <OwnerDashboard 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={setCurrentScreen}
        />
      )}

      {/* RESTAURANT DETAILS & DOME MENU (Screen 2) */}
      {currentScreen === 'restaurant-details' && selectedRestaurant && (
        <RestaurantDetail 
          user={user}
          restaurant={selectedRestaurant} 
          onBackToDashboard={handleBackToDashboard}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          cart={cart}
          onNavigate={setCurrentScreen}
        />
      )}

      {/* CHECKOUT SUMMARY RECEIPT LOGISTICS (Screen 6) */}
      {currentScreen === 'checkout' && (
        <Checkout 
          cart={cart} 
          user={user} 
          onNavigate={setCurrentScreen} 
          onClearCart={handleClearCart}
          onBackToDashboard={handleBackToDashboard}
          onSetAddress={handleSetAddress}
          onShowToast={showToast}
        />
      )}

      {/* TOAST NOTIFICATION SYSTEM */}
      {toastMessage && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[9999] animate-[bounce_1s_ease-in-out_infinite]">
          <div className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-2xl border ${
            toastMessage.type === 'success' ? 'bg-kanoeats-primary border-kanoeats-primary text-white shadow-red-500/30' : 'bg-[#053220] border-emerald-800 text-white shadow-emerald-500/30'
          }`}>
            <span className="font-bold text-sm tracking-wide">{toastMessage.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
