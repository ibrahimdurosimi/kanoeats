import Avatar from '../Avatar';
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aisha Tukur',
    role: 'Food Blogger',
    text: "The Tsire Suya from Kano Suya Palace is exactly how it tastes back home in Kano. The spices are authentic, and the delivery was incredibly fast. KanoEats is my new favorite app!",
    rating: 5,
  },
  {
    id: 2,
    name: 'Ibrahim Musa',
    role: 'Event Organizer',
    text: "We ordered bulk Masa and Tuwo for a naming ceremony and the packaging was phenomenal. Everything arrived hot and fresh. The Amana delivery guarantee is real.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Fatima Bello',
    role: 'Regular Customer',
    text: "I crave Kunun Aya all the time, and Oasis Tigernut on this app delivers the best I've had in Kano. Smooth, chilled, and perfectly sweetened.",
    rating: 4.9,
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-[#053220] relative overflow-hidden" id="testimonials-sec">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfaf27] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ec5d53] rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl sm:text-4.5xl font-display font-black text-white tracking-tight uppercase mb-16">
          Words from the <span className="text-[#dfaf27]">Community</span>
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 sm:p-12 rounded-[40px] shadow-2xl relative"
            >
              <Quote className="absolute top-8 left-8 h-12 w-12 text-[#dfaf27] opacity-20" />
              
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(TESTIMONIALS[currentIndex].rating) ? 'fill-[#dfaf27] text-[#dfaf27]' : 'text-gray-400'}`} />
                ))}
              </div>
              
              <p className="text-xl sm:text-3xl font-display text-white italic leading-relaxed mb-10">
                "{TESTIMONIALS[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <Avatar
                  name={TESTIMONIALS[currentIndex].name}
                  className="h-16 w-16 rounded-full border-2 border-[#dfaf27]"
                />
                <div className="text-left">
                  <h4 className="text-white font-bold text-lg">{TESTIMONIALS[currentIndex].name}</h4>
                  <p className="text-[#dfaf27] text-xs font-black uppercase tracking-wider">{TESTIMONIALS[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center space-x-4 mt-8">
            <button 
              onClick={prev}
              className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={next}
              className="h-12 w-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
