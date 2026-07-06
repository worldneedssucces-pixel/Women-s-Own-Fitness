import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Classes from './components/Classes';
import GalleryPage from './components/GalleryPage';
import InstagramFeed from './components/InstagramFeed';
import ReviewSection from './components/ReviewSection';
import ContactSection from './components/ContactSection';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Instagram, Facebook, Clock, MapPin, Phone, ShieldCheck, Trophy } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<string>('home');

  // Renders the appropriate view layout with custom entrance animations
  const renderViewContent = () => {
    switch (view) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-0"
          >
            <Hero setView={setView} />
            <About />
            <ContactSection />
          </motion.div>
        );
      
      case 'classes':
        return (
          <motion.div
            key="classes"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Classes />
            <ContactSection />
          </motion.div>
        );

      case 'gallery':
        return (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <GalleryPage />
          </motion.div>
        );

      case 'instagram':
        return (
          <motion.div
            key="instagram"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <InstagramFeed />
          </motion.div>
        );

      case 'reviews':
        return (
          <motion.div
            key="reviews"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <ReviewSection />
          </motion.div>
        );

      default:
        return (
          <div className="py-24 text-center text-stone-500 font-light">
            Section loading...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50 select-text selection:bg-brand-primary/20 selection:text-brand-secondary">
      
      {/* Dynamic Header */}
      <Navbar currentView={view} setView={setView} />

      {/* Main Content Area */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderViewContent()}
        </AnimatePresence>
      </main>

      {/* Global Interactive Float WhatsApp Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        className="fixed bottom-6 right-6 z-40 hidden sm:block"
      >
        <a
          href="https://wa.me/923360323509"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-500 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl hover:bg-emerald-600 transition-all hover:scale-105 cursor-pointer group"
          title="Direct WhatsApp Chat"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-bold whitespace-nowrap block">
            Chat with Romana baji
          </span>
          <span className="text-xl leading-none">💬</span>
        </a>
      </motion.div>

      {/* Elegant Club Footer */}
      <footer className="bg-stone-950 text-white border-t border-stone-850 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Brand & Logo */}
            <div className="md:col-span-4 space-y-4">
              <button
                onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="flex items-center gap-3 text-left cursor-pointer group"
              >
                <div className="relative w-12 h-12 overflow-hidden rounded-full border border-stone-800">
                  <img
                    src="/src/assets/images/logo.jpg"
                    alt="Women's Own Club Logo"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="block text-base font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors">
                    Women's Own
                  </span>
                  <span className="block text-[10px] font-semibold tracking-widest text-brand-accent uppercase -mt-1">
                    Fitness Club
                  </span>
                </div>
              </button>

              <p className="text-stone-400 text-xs font-light leading-relaxed max-w-sm">
                Making Karachi women stronger, healthier, and glowing since August 2015. A highly hygienic, safe, female-exclusive training environment directed by Certified Fitness Coach Romana Imran.
              </p>

              {/* Badges */}
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-semibold tracking-wider uppercase">
                  <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  <span>100% Secure & Clean</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-stone-400 font-semibold tracking-wider uppercase">
                  <Trophy className="w-4 h-4 text-brand-accent" />
                  <span>Certified Trainer</span>
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-brand-primary">
                Quick Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-light">
                <li>
                  <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white hover:underline transition-all cursor-pointer">
                    Home Profile
                  </button>
                </li>
                <li>
                  <button onClick={() => { setView('classes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white hover:underline transition-all cursor-pointer">
                    Classes & Timings
                  </button>
                </li>
                <li>
                  <button onClick={() => { setView('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white hover:underline transition-all cursor-pointer">
                    Club Photo Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => { setView('instagram'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white hover:underline transition-all cursor-pointer">
                    Instagram Social Feed
                  </button>
                </li>
                <li>
                  <button onClick={() => { setView('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white hover:underline transition-all cursor-pointer">
                    Client Testimonials
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Address */}
            <div className="md:col-span-5 space-y-4">
              <h4 className="font-serif text-sm font-bold tracking-wider uppercase text-brand-primary">
                Contact & Location
              </h4>
              <ul className="space-y-3.5 text-xs text-stone-400 font-light">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Plot B 585, Block 13 Gulberg Town, Karachi, Karachi City, Sindh, Pakistan, 75950
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-4 h-4 text-brand-primary flex-shrink-0" />
                  <a href="tel:+923360323509" className="hover:text-white transition-colors">
                    +92 336 0323509 (Trainer Romana Imran)
                  </a>
                </li>
                <li className="flex gap-3 items-center">
                  <Clock className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  <span>Mon – Thu: 10 AM–8 PM | Fri: 10 AM–12 PM | Sat: 3–6 PM</span>
                </li>
              </ul>

              {/* Social links */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.instagram.com/womensownfitnessclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 border border-stone-800 p-2.5 rounded-full text-stone-400 hover:text-white hover:bg-brand-primary hover:border-brand-primary transition-all shadow-md"
                  title="Club Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/fitnesscenterforwomen1?mibextid=ZbWKwL&utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 border border-stone-800 p-2.5 rounded-full text-stone-400 hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] transition-all shadow-md"
                  title="Club Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright disclaimer */}
          <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 font-medium">
            <p>
              &copy; {new Date().getFullYear()} Women's Own Fitness Club. All Rights Reserved. Est. August 2015.
            </p>
            <p className="flex items-center gap-1.5 mt-2 sm:mt-0">
              <span>Making Women Stronger</span>
              <Heart className="w-3.5 h-3.5 text-brand-accent fill-brand-accent animate-pulse" />
              <span>in Karachi, Pakistan</span>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
