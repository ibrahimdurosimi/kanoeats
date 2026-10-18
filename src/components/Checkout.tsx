import React, { useState, useMemo } from 'react';
import { CreditCard, Check, Truck, ArrowLeft, MapPin, ShieldCheck, ShoppingCart, User } from 'lucide-react';
import { CartItem, User as UserType } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  user: UserType;
  onNavigate: (screen: 'landing' | 'how-it-works' | 'dashboard' | 'restaurant-details' | 'checkout' | 'register') => void;
  onClearCart: () => void;
  onBackToDashboard: () => void;
  onSetAddress?: (address: string) => void;
  onShowToast?: (message: string, type?: 'success'|'info') => void;
}

export default function Checkout({ cart, user, onNavigate, onClearCart, onBackToDashboard, onSetAddress, onShowToast }: CheckoutProps) {
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'today' | 'schedule'>('asap');
  const [payMethod, setPayMethod] = useState<'card' | 'apple' | 'google'>('card');
  
  // Card credentials
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Placed Order state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  // Address editing mode
  const [addressVal, setAddressVal] = useState(user.address || '38, Bompai Road, Kano');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Dynamic calculations
  const summaryMeta = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);
    const deliveryFee = subtotal > 15000 ? 0 : 1200; // Free delivery matching dashboard logic
    const taxes = Math.round(subtotal * 0.075); // 7.5% VAT standard
    const total = subtotal + deliveryFee + taxes;
    
    return {
      currencySign: 'NGN ',
      formattedSubtotal: subtotal.toLocaleString(),
      formattedDelivery: deliveryFee.toLocaleString(),
      formattedTaxes: taxes.toLocaleString(),
      formattedTotal: total.toLocaleString(),
      itemsList: cart.map(item => ({
        name: item.dish.name,
        quantity: item.quantity,
        price: item.dish.price,
        totalStr: (item.dish.price * item.quantity).toLocaleString()
      }))
    };
  }, [cart]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);

    setTimeout(() => {
      setIsPlacingOrder(false);
      setOrderPlacedSuccess(true);
      if (onShowToast) onShowToast('Order placed successfully!', 'success');
      onClearCart();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] font-sans pb-24" id="checkout-screen-root">
      
      {/* HEADER SECTION (Screen 6) */}
      <header className="px-6 lg:px-20 py-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-40">
        <div className="flex items-center space-x-2.5 cursor-pointer text-gray-800" onClick={onBackToDashboard}>
          <span className="text-2xl font-black font-display text-kanoeats-primary tracking-tight">KanoEats</span>
        </div>

        <nav className="hidden md:flex items-center space-x-10 text-gray-500 font-medium text-sm">
          <button onClick={() => onNavigate('landing')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">Home</button>
          <button onClick={onBackToDashboard} className="hover:text-kanoeats-primary transition-colors cursor-pointer">Menu</button>
          <button onClick={() => onNavigate('checkout')} className="text-kanoeats-primary font-black cursor-pointer">Cart</button>
          <button onClick={() => onNavigate('register')} className="hover:text-kanoeats-primary transition-colors cursor-pointer">Account</button>
        </nav>
      </header>

      {/* SUCCESS POPUP MODAL */}
      {orderPlacedSuccess && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center p-4 z-55 animate-fadeIn">
          <div className="bg-white rounded-[32px] p-8 md:p-12 text-center max-w-md w-full border border-[#eedfd6] shadow-2xl space-y-6">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md border border-emerald-100 animate-scale">
              <Check className="h-10 w-10 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2.5xl font-black text-gray-900 tracking-tight font-display">Order Dispatched successfully!</h3>
              <p className="text-gray-400 text-xs">
                Your hot Kano meal has been pushed to nearest cooker. Expect delivery in 53 minutes.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 p-4 rounded-2xl flex items-center space-x-3 text-left">
              <Truck className="h-6 w-6 text-kanoeats-orange" />
              <div>
                <p className="text-xs font-bold text-gray-800">Assigned Rider: Aminu Dispatch</p>
                <p className="text-[10px] text-gray-400">Tracking Code: FOD-582928</p>
              </div>
            </div>

            <button
              onClick={() => {
                setOrderPlacedSuccess(false);
                onNavigate('dashboard');
              }}
              className="w-full py-3 bg-[#d98829] hover:bg-opacity-95 text-white font-bold rounded-full shadow-lg transition-all text-sm cursor-pointer"
            >
              Continue Surfing Kitchens
            </button>
          </div>
        </div>
      )}

      {/* CORE CHECKOUT GRID */}
      <main className="max-w-6xl mx-auto px-6 mt-10">
        
        {/* Back navigation */}
        <button onClick={onBackToDashboard} className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-kanoeats-primary transition-all mb-4">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to selection</span>
        </button>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT FORM FIELD CONTROLS (8 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* DELIVERY ADDRESS COMPONENT (Screen 6) */}
            <section className="bg-white border border-[#eedcd2] rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">Delivery Address</h2>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* SVG Mock Map Widget matching Google Map preview on Screen 6 Exactly */}
                <div className="w-full md:w-48 h-28 bg-[#cadbe9] border border-blue-200 rounded-xl overflow-hidden relative flex items-center justify-center shrink-0 shadow-sm">
                  {/* Decorative stylized Map lines */}
                  <div className="absolute top-0 bottom-0 left-8 border-r-2 border-dashed border-white/60 w-0" />
                  <div className="absolute left-0 right-0 top-14 border-b-2 border-dashed border-white/60 h-0" />
                  <div className="absolute top-4 bottom-4 left-16 right-2 border border-white/50 rounded-lg bg-green-100/30" />
                  
                  {/* Map Pin */}
                  <div className="relative hover:scale-125 transition-transform">
                    <MapPin className="h-8 w-8 text-rose-500 fill-rose-500" />
                    <span className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-2 h-1 bg-black/20 rounded-full blur-[1px]" />
                  </div>

                  {/* Red tag label */}
                  <span className="absolute bottom-2 bg-white/95 text-[9px] font-extrabold text-[#ca7d2d] px-2 py-0.5 rounded-md shadow-sm border border-orange-50 select-none">
                    Kano, Nigeria
                  </span>
                </div>

                {/* Edit details */}
                <div className="space-y-3 flex-grow flex flex-col justify-between">
                  {isEditingAddress ? (
                    <div className="space-y-1.5 flex-grow">
                      <input 
                        type="text"
                        value={addressVal}
                        onChange={(e) => setAddressVal(e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold focus:bg-white text-gray-800"
                        placeholder="Type address..."
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setIsEditingAddress(false);
                          onSetAddress?.(addressVal);
                        }}
                        className="px-3 py-1 bg-gray-900 text-white rounded-full text-[10px] font-bold"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 leading-relaxed font-bold font-sans pt-1">
                      {addressVal}
                    </p>
                  )}

                  {!isEditingAddress && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsEditingAddress(true)}
                        className="px-4 py-1.5 border border-[#eddcd2] bg-white hover:bg-gray-50 text-gray-600 rounded-lg text-xs font-black shadow-sm transition-all focus:outline-none cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* DELIVERY TIME SELECTORS (Screen 6) */}
            <section className="space-y-4">
              <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">Delivery Time</h2>
              
              <div className="space-y-3">
                {/* Time Option 1 */}
                <label className={`flex items-center space-x-3.5 p-4 border rounded-xl cursor-pointer transition-all ${
                  deliveryTime === 'asap' ? 'border-kanoeats-primary bg-rose-50/20 shadow-sm' : 'border-[#eedcd2] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="asap"
                    checked={deliveryTime === 'asap'}
                    onChange={() => setDeliveryTime('asap')}
                    className="accent-kanoeats-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="text-xs font-black text-gray-800">ASAP (35-53 min)</span>
                  </div>
                </label>

                {/* Time Option 2 */}
                <label className={`flex items-center space-x-3.5 p-4 border rounded-xl cursor-pointer transition-all ${
                  deliveryTime === 'today' ? 'border-kanoeats-primary bg-rose-50/20 shadow-sm' : 'border-[#eedcd2] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="today"
                    checked={deliveryTime === 'today'}
                    onChange={() => setDeliveryTime('today')}
                    className="accent-kanoeats-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="text-xs font-black text-gray-800">Today, 6:00 PM - 6:30 PM</span>
                  </div>
                </label>

                {/* Time Option 3 */}
                <label className={`flex items-center space-x-3.5 p-4 border rounded-xl cursor-pointer transition-all ${
                  deliveryTime === 'schedule' ? 'border-kanoeats-primary bg-rose-50/20 shadow-sm' : 'border-[#eedcd2] bg-white'
                }`}>
                  <input
                    type="radio"
                    name="deliveryTime"
                    value="schedule"
                    checked={deliveryTime === 'schedule'}
                    onChange={() => setDeliveryTime('schedule')}
                    className="accent-kanoeats-primary h-4.5 w-4.5"
                  />
                  <div>
                    <span className="text-xs font-black text-gray-800">Schedule for Later</span>
                  </div>
                </label>
              </div>
            </section>

            {/* PAYMENT METHOD AND INPUT DATA CARD (Screen 6) */}
            <section className="bg-white border border-[#eedcd2] rounded-2xl p-6 shadow-sm space-y-6">
              <h2 className="text-base font-black text-gray-900 uppercase tracking-tight">Payment Method</h2>
              
              {/* Selector methods */}
              <div className="flex space-x-2 border-b border-gray-100 pb-3">
                <button
                  type="button"
                  onClick={() => setPayMethod('card')}
                  className={`px-5 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ${
                    payMethod === 'card' ? 'bg-[#ca7d2d] text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Credit Card
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('apple')}
                  className={`px-5 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ${
                    payMethod === 'apple' ? 'bg-[#ca7d2d] text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Apple Pay
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('google')}
                  className={`px-5 py-2 rounded-lg text-xs font-black cursor-pointer transition-all ${
                    payMethod === 'google' ? 'bg-[#ca7d2d] text-white' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  G Pay
                </button>
              </div>

              {/* CARD PAY FORM */}
              {payMethod === 'card' && (
                <div className="space-y-4">
                  {/* Card logos */}
                  <div className="flex items-center space-x-2 pb-2">
                    <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded-md text-[10px] font-black uppercase font-mono tracking-wider">Visa</span>
                    <span className="px-3.5 py-1 bg-red-50 border border-red-200 text-red-500 rounded-md text-[10px] font-black uppercase font-mono tracking-wider">Mastercard</span>
                    <span className="px-3.5 py-1 bg-[#e2f3fe] border border-blue-100 text-[#ca7d2d] rounded-md text-[10px] font-black uppercase font-mono tracking-wider">Amex</span>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full h-11 px-4 border border-gray-200 rounded-lg text-xs font-medium focus:border-[#ca7d2d] focus:outline-none placeholder-gray-400"
                      required={payMethod === 'card'}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Expiry"
                        value={expiry}
                        maxLength={5}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-200 rounded-lg text-xs font-medium focus:border-[#ca7d2d] focus:outline-none placeholder-gray-400"
                        required={payMethod === 'card'}
                      />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        maxLength={3}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full h-11 px-4 border border-gray-200 rounded-lg text-xs font-medium focus:border-[#ca7d2d] focus:outline-none placeholder-gray-400"
                        required={payMethod === 'card'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* APPLE PAY */}
              {payMethod === 'apple' && (
                <div className="text-center py-6">
                  <button type="submit" className="w-full h-12 bg-black hover:bg-zinc-900 rounded-lg flex items-center justify-center space-x-2 text-white font-bold cursor-pointer transition-all">
                    {/* Apple Logo SVG */}
                    <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.04-1.87-14.1-6.01-3.35-2.73-7.23-7.42-11.63-14.07C25.07 127 15.82 102.7 15.82 77.26c0-14.86 3.82-27.18 11.46-36.93 7.64-9.75 17.22-14.73 28.75-14.93 4.47 0 9.8 1.57 16 4.7 6.19 3.14 10.45 4.71 12.75 4.71 1.9 0 5.86-1.45 11.89-4.35 6.03-2.9 11.41-4.25 16.14-4.06 13.4.63 23.77 5.56 31.11 14.8-11.23 6.81-16.71 16.27-16.46 28.37.25 9.75 3.94 17.9 11.05 24.44 7.12 6.53 15.5 10.04 25.13 10.53-.25 3.39-1.29 8.21-3.12 14.47l-.15.4c-1.39 3.61-2.9 7.02-4.5 10.21zM119.22 35.61c0-8.12 2.87-15.65 8.6-22.58 1.34-1.62 2.92-3.23 4.75-4.83H134c.12.82.18 1.63.18 2.45 0 7.9-2.9 15.35-8.7 22.34-5.8 6.99-12.89 10.65-21.28 10.98l.19-1.12c2.45-3 4.83-5.08 7.14-6.26l1.69-.98z" />
                    </svg>
                    <span>Pay with Apple Pay</span>
                  </button>
                </div>
              )}

              {/* GOOGLE PAY */}
              {payMethod === 'google' && (
                <div className="text-center py-6">
                  <button type="submit" className="w-full h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center space-x-2 text-zinc-800 font-bold cursor-pointer transition-all">
                    {/* G Pay SVG */}
                    <svg className="h-5" viewBox="0 0 61 24" fill="none">
                      <path d="M7.74 1.15H2.33v11.12h1.36v-4.72h4.05c2.3 0 4.14-1.5 4.14-3.2s-1.84-3.2-4.14-3.2zm-.09 5.04H3.69v-3.7h3.96c1.53 0 2.7 1.05 2.7 1.85s-1.17 1.85-2.7 1.85zm12.33-.32c-.54-.54-1.26-.81-2.07-.81-1.62 0-2.88 1.17-2.88 2.7a2.64 2.64 0 002.88 2.7c.81 0 1.53-.27 2.07-.81v-.18h.09V6.05h-.09zm0 3.06c-.45.45-1.08.63-1.62.63-1.17 0-1.89-.72-1.89-1.62s.72-1.62 1.89-1.62c.54 0 1.17.18 1.62.63v2z" fill="#3C4043" />
                      <path d="M22.5 12.27h1.44l3.15-7.38h-1.53L23.94 8.4l-1.53-3.51h-1.62l3.15 7.38l-1.44.18H22.5zm19.71-3.69c0-1.08-.18-2.16-.54-3.15h-5.94v5.94h3.6c-.18.99-.81 1.8-1.71 2.34v1.89h2.79c1.62-1.53 2.52-3.78 2.52-7.02z" fill="#4285F4" />
                      <path d="M35.73 12.42c1.62 0 3.06-.99 3.69-2.34l-2.79-1.89c-.27.45-.72.81-1.26.81-.9 0-1.62-.63-1.8-1.53h5.94V7.47c0-2.07-1.44-3.69-3.51-3.69a3.67 3.67 0 00-3.69 3.69c0 1.98 1.62 3.69 3.69 3.69z" fill="#EA4335" />
                    </svg>
                    <span className="text-sm font-black text-gray-700 ml-1">Pay with G Pay</span>
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT RECEIPT ORDER SUMMARY (4 cols, Screen 6) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#eedcd2] rounded-2xl p-6 shadow-md space-y-6 sticky top-28">
              
              <h2 className="text-base font-black text-gray-900 tracking-tight">Order Summary</h2>

              {/* Items List inside Checkout receipt */}
              <div className="divide-y divide-gray-100 max-h-56 overflow-y-auto pr-1">
                {summaryMeta.itemsList.map((item, id) => (
                  <div key={id} className="py-3 flex justify-between items-center text-xs font-semibold text-gray-700">
                    <div className="space-y-0.5">
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-[10px] text-gray-400 font-mono font-bold">Qty: {item.quantity}</p>
                    </div>

                    <p className="font-mono text-gray-900">
                      {summaryMeta.currencySign}{item.totalStr}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing ledger */}
              <div className="space-y-3 pt-4 border-t border-gray-100 text-xs font-semibold text-gray-500">
                
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-gray-900">{summaryMeta.currencySign}{summaryMeta.formattedSubtotal}</span>
                </div>

                {/* Delivery */}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-gray-900">
                    {summaryMeta.currencySign}{summaryMeta.formattedDelivery}
                  </span>
                </div>

                {/* Taxes & fees */}
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span className="font-mono text-gray-900">{summaryMeta.currencySign}{summaryMeta.formattedTaxes}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between pt-3 border-t border-gray-100 text-sm font-black text-gray-900">
                  <span>Total</span>
                  <span className="font-mono text-kanoeats-primary">{summaryMeta.currencySign}{summaryMeta.formattedTotal}</span>
                </div>
              </div>

              {/* Place Order Trigger */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className={`w-full py-4 text-white font-extrabold rounded-full shadow-lg ${
                    isPlacingOrder 
                      ? 'bg-amber-400 cursor-wait' 
                      : 'bg-[#ca7d2d] hover:bg-opacity-95 shadow-orange-500/15 hover:shadow-orange-500/30'
                  } text-sm transition-all cursor-pointer text-center duration-300`}
                >
                  {isPlacingOrder ? 'Processing dispatch...' : 'Place Order'}
                </button>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-bold">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
                <span>Standard Kano Encrypted payments secured.</span>
              </div>

            </div>
          </div>

        </form>

      </main>

    </div>
  );
}
