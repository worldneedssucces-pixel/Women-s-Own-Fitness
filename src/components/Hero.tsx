import React from 'react';
import { Shield, Sparkles, Award, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  setView: (view: string) => void;
}

export default function Hero({ setView }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-950 to-brand-secondary text-white py-16 sm:py-24 md:py-28">
      {/* Abstract Graphic Background */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="/src/assets/images/gym_rings_1_1783285444812.jpg"
          alt="Gym interior background overlay"
          className="w-full h-full object-cover filter blur-xs"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Est. August 2015 — Karachi, Pakistan</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none"
            >
              Making Women <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-pink-500">
                Stronger & Confident
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-stone-300 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Welcome to <strong className="text-white font-medium">Women's Own Fitness Club</strong>, Karachi's premium 100% private, clean, and safe fitness haven exclusively for women. Directed by certified expert trainer <span className="text-brand-accent font-semibold underline decoration-brand-accent/30 underline-offset-4">Romana Imran</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4"
            >
              <button
                onClick={() => setView('classes')}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-brand-primary/20 transition-all transform hover:-translate-y-0.5 cursor-pointer text-base"
              >
                Explore Classes & Timings
              </button>
              <button
                onClick={() => setView('reviews')}
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-base flex items-center justify-center gap-2"
              >
                <span>Read Success Stories</span>
                <Award className="w-4 h-4 text-brand-primary" />
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-stone-800/60 max-w-md mx-auto lg:mx-0 text-center lg:text-left"
            >
              <div>
                <p className="font-serif text-3xl font-bold text-brand-primary">10+</p>
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Years of Strength</p>
              </div>
              <div className="border-x border-stone-800 px-4">
                <p className="font-serif text-3xl font-bold text-brand-primary">100%</p>
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Women Only</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-brand-primary">5★</p>
                <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Client Reviews</p>
              </div>
            </motion.div>

            {/* Quick highlights - relocated from the image to the text side */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 max-w-xl mx-auto lg:mx-0"
            >
              <div className="bg-stone-950/90 border border-stone-800 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 flex-shrink-0">
                  <Shield className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Safe & Secure Space</h4>
                  <p className="text-[10px] text-stone-400 font-medium">100% Female-Exclusive</p>
                </div>
              </div>

              <div className="bg-stone-950/90 border border-stone-800 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20 flex-shrink-0">
                  <span className="text-xl leading-none">🤸🏻‍♀️</span>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold text-white">Zumba, Yoga & Pilates</h4>
                  <p className="text-[10px] text-stone-400 font-medium">Diverse Class Sessions</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Hero Cards / Images */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              {/* Main Circular Profile Backdrop */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-primary to-brand-accent opacity-20 blur-xl" />

              {/* Stack of floating assets */}
              <div className="relative bg-stone-900 border border-stone-800 rounded-3xl p-4 overflow-hidden shadow-2xl">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-inner">
                   <img
                     src="/src/assets/images/regenerated_image_1783286802610.png"
                     alt="Premium arched mirror selfie spot at Women's Own Fitness Club"
                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                     referrerPolicy="no-referrer"
                   />
                   {/* Floating certified badge */}
                   <div className="absolute top-4 right-4 bg-stone-950/80 backdrop-blur-md border border-brand-accent/30 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                     <Award className="w-4 h-4 text-brand-primary" />
                     <span className="text-[10px] font-bold tracking-widest uppercase text-stone-200">Certified Trainer</span>
                   </div>


                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
