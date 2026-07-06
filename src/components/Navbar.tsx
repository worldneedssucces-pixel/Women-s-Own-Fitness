import React, { useState } from 'react';
import { Menu, X, Instagram, Facebook, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
}

export default function Navbar({ currentView, setView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'classes', label: 'Classes & Timings' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'instagram', label: 'Social Feed' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const handleNavClick = (viewId: string) => {
    setView(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-brand-primary/10 group-hover:border-brand-primary/40 transition-colors">
              <img
                src="/src/assets/images/womens_own_logo_1783285427865.jpg"
                alt="Women's Own Fitness Club Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-stone-900 group-hover:text-brand-primary transition-colors">
                Women's Own
              </span>
              <span className="block text-xs font-medium tracking-widest text-brand-accent uppercase -mt-1">
                Fitness Club
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id || 
                (item.id === 'home' && currentView === 'classes' && false); // handles scroll sections if needed
              
              // Special highlighting for active views
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-brand-primary'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Contact & Social Quick Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://www.instagram.com/womensownfitnessclub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-500 hover:text-brand-primary hover:bg-stone-50 rounded-full transition-all duration-200"
              title="Instagram Page"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/fitnesscenterforwomen1?mibextid=ZbWKwL&utm_source=ig&utm_medium=social&utm_content=link_in_bio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-stone-500 hover:text-[#1877F2] hover:bg-stone-50 rounded-full transition-all duration-200"
              title="Facebook Page"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/923360323509" /* Trainer Romana WhatsApp contact */
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-stone-900 text-white hover:bg-brand-primary px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:shadow-brand-primary/10 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Join Club</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-primary/5 text-brand-primary font-semibold'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-stone-100 flex items-center gap-4 px-4">
                <a
                  href="https://www.instagram.com/womensownfitnessclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-stone-500 hover:text-brand-primary rounded-full transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://www.facebook.com/fitnesscenterforwomen1?mibextid=ZbWKwL&utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-stone-500 hover:text-blue-600 rounded-full transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="tel:+923360323509"
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-primary text-white py-2.5 rounded-full text-sm font-semibold hover:bg-brand-primary/90 transition-colors text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Trainer</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
