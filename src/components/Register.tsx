import React, { useState } from 'react';
import { Eye, EyeOff, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { User, Screen } from '../types';

interface RegisterProps {
  onRegisterSuccess: (user: User) => void;
  onNavigate: (screen: Screen) => void;
}

export default function Register({ onRegisterSuccess, onNavigate }: RegisterProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState<'customer' | 'owner'>('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim() || !password.trim() || (!isLogin && !fullName.trim())) {
      setErrorMessage('Please fill in all requested fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    // Simulate speedy auth check
    setTimeout(() => {
      onRegisterSuccess({
        fullName: isLogin ? 'Mustfq Admin' : fullName,
        email: emailOrPhone.includes('@') ? emailOrPhone : 'mustfq.admin@kanoeats.com.ng',
        phone: !emailOrPhone.includes('@') ? emailOrPhone : '+234 812 345 6789',
        isLoggedIn: true,
        address: '38, Bompai Road, Kano',
        role: role
      });
      setIsSubmitting(false);
      onNavigate(role === 'owner' ? 'owner-dashboard' : 'dashboard');
    }, 700);
  };

  const handleOAuth = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      onRegisterSuccess({
        fullName: 'Mustfq Admin',
        email: `mustfq.${provider.toLowerCase()}@kanoeats.com.ng`,
        phone: '+234 809 999 0000',
        isLoggedIn: true,
        address: '38, Bompai Road, Kano',
        role: role
      });
      setIsSubmitting(false);
      onNavigate(role === 'owner' ? 'owner-dashboard' : 'dashboard');
    }, 500);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center relative"
      style={{ 
        backgroundImage: `linear-gradient(rgba(253, 240, 230, 0.8), rgba(245, 120, 110, 0.45)), url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80')` 
      }}
      id="register-screen-root"
    >
      {/* Decorative floating blur balls */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-44 h-44 bg-red-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Auth Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl border border-white/50 w-full max-w-lg p-8 md:p-12 space-y-6 text-center transform hover:scale-[1.01] transition-all duration-300 relative">
        
        {/* Back Button */}
        <button 
          onClick={() => onNavigate('landing')}
          className="absolute top-6 left-6 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-full transition-all cursor-pointer flex items-center justify-center"
          title="Back to Home"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center space-y-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <span className="text-4xl font-black font-display text-kanoeats-primary tracking-tight">KanoEats</span>
          <h1 className="text-3xl font-extrabold text-[#ca7d2d] tracking-tight font-display">
            {isLogin ? 'Welcome Back!' : 'Welcome!'}
          </h1>
          <p className="text-gray-400 text-xs max-w-xs mt-1 leading-relaxed">
            {isLogin 
              ? 'Sign in to access your dashboard, orders, and favorites.' 
              : 'We promise this won\'t take long, you just need to fill in some details.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          {/* Role Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-full mb-4">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${role === 'customer' ? 'bg-white shadow text-[#ca7d2d]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all ${role === 'owner' ? 'bg-white shadow text-[#ca7d2d]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Restaurant Owner
            </button>
          </div>
          
          {/* Full Name field (Register only) */}
          {!isLogin && (
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-kanoeats-orange focus:bg-white rounded-full text-gray-800 text-sm focus:outline-none transition-all"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email / Phone */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Email address / Phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-kanoeats-orange focus:bg-white rounded-full text-gray-800 text-sm focus:outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 focus:border-kanoeats-orange focus:bg-white rounded-full text-gray-800 text-sm focus:outline-none transition-all pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {errorMessage && (
            <div className="flex items-center space-x-2 text-red-500 text-xs px-3 py-1 bg-red-50 rounded-lg">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Continue button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 text-white font-bold rounded-full shadow-lg ${
              isSubmitting 
                ? 'bg-amber-400 cursor-not-allowed' 
                : 'bg-kanoeats-orange hover:bg-opacity-95 shadow-orange-500/10 hover:shadow-orange-500/20'
            } transition-all text-sm cursor-pointer text-center duration-300`}
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
          </button>
        </form>

        {/* OR DIVIDER */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-xs font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-medium">
          {/* Google */}
          <button 
            type="button"
            onClick={() => handleOAuth('Google')}
            className="flex items-center justify-center space-x-2.5 px-5 py-3 border border-gray-200 hover:border-kanoeats-orange rounded-full bg-white hover:bg-gray-50 text-gray-600 text-sm transition-all focus:outline-none cursor-pointer"
          >
            {/* Simple Google G SVG Logo */}
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-7.99s3.536-7.99 7.866-7.99c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.416 1.838 15.54 1 12.24 1 6.136 1 1.12 5.928 1.12 12s5.016 11 11.12 11c6.38 0 10.62-4.408 10.62-10.8 0-.727-.08-1.285-.18-1.72l-10.42-.195z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Facebook */}
          <button 
            type="button"
            onClick={() => handleOAuth('Facebook')}
            className="flex items-center justify-center space-x-2.5 px-5 py-3 border border-gray-200 hover:border-kanoeats-orange rounded-full bg-white hover:bg-gray-50 text-gray-600 text-sm transition-all focus:outline-none cursor-pointer"
          >
            {/* Simple Facebook F Logo */}
            <svg className="h-4 w-4 fill-blue-600" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Toggle option */}
        <p className="text-sm text-gray-500 font-medium">
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#ca7d2d] underline hover:text-[#b0671f] font-bold focus:outline-none ml-1 cursor-pointer"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>

      </div>
    </div>
  );
}
