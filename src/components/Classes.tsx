import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Star, Check, Flame, Trophy, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GymClass } from '../types';

export default function Classes() {
  const [activeClassId, setActiveClassId] = useState<string>('zumba');

  // List of actual timings
  const timings = [
    { day: 'Monday', hours: '10 AM – 8 PM', index: 1 },
    { day: 'Tuesday', hours: '10 AM – 8 PM', index: 2 },
    { day: 'Wednesday', hours: '10 AM – 8 PM', index: 3 },
    { day: 'Thursday', hours: '10 AM – 8 PM', index: 4 },
    { day: 'Friday', hours: '10 AM – 12 PM', index: 5 },
    { day: 'Saturday', hours: '3 PM – 6 PM', index: 6 },
    { day: 'Sunday', hours: 'Closed', index: 0 },
  ];

  // Detect current day
  const currentDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  const todayTiming = timings.find((t) => t.index === currentDayIndex);

  // Check if gym is currently open based on current Pakistan time
  const checkIfOpen = () => {
    const pkDate = new Date();
    const currentHour = pkDate.getHours();
    
    // Quick simplified checks for local time
    if (currentDayIndex >= 1 && currentDayIndex <= 4) {
      // Mon-Thu: 10 AM to 8 PM (10:00 to 20:00)
      return currentHour >= 10 && currentHour < 20;
    } else if (currentDayIndex === 5) {
      // Fri: 10 AM to 12 PM (10:00 to 12:00)
      return currentHour >= 10 && currentHour < 12;
    } else if (currentDayIndex === 6) {
      // Sat: 3 PM to 6 PM (15:00 to 18:00)
      return currentHour >= 15 && currentHour < 18;
    }
    return false; // Sunday or other hours
  };

  const isCurrentlyOpen = checkIfOpen();

  const classesData: GymClass[] = [
    {
      id: 'zumba',
      title: 'Zumba Dance Fitness',
      description: 'The ultimate dance party workout! Bring fun, music, and rhythm into your fitness routine while burning maximum calories and raising your happy hormones.',
      iconName: '💃',
      schedule: 'Available daily, inquire for batch slots',
      benefits: [
        'Incredible full-body cardio & rapid calorie burning',
        'Improves co-ordination, rhythm, and cardiovascular endurance',
        'Absolute stress-buster filled with positive vibes',
        'Highly engaging dance choreographies curated for women',
      ],
    },
    {
      id: 'yoga',
      title: 'Yoga & Mindfulness',
      description: 'Slow down, stretch, and align. Deep breath controls, static flexibilities, core stabilizing holds, and deep mental focus to recharge your mind and body.',
      iconName: '🧘🏻‍♀️',
      schedule: 'Specialized focus sessions',
      benefits: [
        'Significantly improves absolute flexibility & range-of-motion',
        'Enhances posture, pelvic stability, and spinal alignment',
        'Reduces stress, cortisol levels, and promotes beautiful facial glow',
        'Increases joint strength and helps relieve back pain',
      ],
    },
    {
      id: 'pilates',
      title: 'Pilates & Pilates Rope',
      description: 'Focused core activation, posture corrections, and joint stabilization. Includes precise mat work and specialized Pilates Rope resistance training.',
      iconName: '🤸🏻‍♀️',
      schedule: 'Core stability batch slots',
      benefits: [
        'Builds deep, functional core strength and flat abs',
        'Elongates muscles and improves whole-body coordination',
        'Pilates Rope resistance helps sculpt thighs, glutes, and upper back',
        'Extremely low-impact, friendly for joint recovery',
      ],
    },
    {
      id: 'strength',
      title: 'Strength Training',
      description: 'Guided progressive weight-lifting. Learn proper squatting, deadlifting, and overhead press mechanics to sculpt muscle, boost metabolism, and build bone density.',
      iconName: '🏋️‍♀️',
      schedule: 'Hardcore weight & conditioning batches',
      benefits: [
        'Boosts resting metabolism, helping burn fat even at rest',
        'Increases lean muscle tone and overall bone density',
        'Improves physical strength, stamina, and posture',
        'Fully guided by Romana to ensure perfect injury-free form',
      ],
    },
    {
      id: 'mobility',
      title: 'Mobility & Conditioning',
      description: 'Dynamic range-of-motion drills, athletic stretching, and metabolic conditioning. Perfect for body recovery and enhancing functional agility.',
      iconName: '✨',
      schedule: 'Weekly flexibility & recover checkups',
      benefits: [
        'Increases active joint lubrication and pain-free movement',
        'Aids in muscle recovery after heavy strength workouts',
        'Enhances athletic performance and daily functional energy',
        'Improves stability, preventing daily movement injuries',
      ],
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">What We Offer</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Specialized Fitness & Timings
          </h2>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* TIMINGS CONTAINER (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-800 relative overflow-hidden">
              {/* Background gradient blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary rounded-full filter blur-3xl opacity-10" />

              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-brand-primary" />
                    <h3 className="font-serif text-xl font-bold">Club Timings</h3>
                  </div>
                  <p className="text-xs text-stone-400">Exclusively for women</p>
                </div>

                {/* Open Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isCurrentlyOpen 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrentlyOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                  {isCurrentlyOpen ? 'We are Open' : 'Closed Now'}
                </span>
              </div>

              {/* Timings List */}
              <div className="space-y-3">
                {timings.map((t) => {
                  const isToday = t.index === currentDayIndex;
                  return (
                    <div
                      key={t.day}
                      className={`flex justify-between items-center py-2.5 px-4 rounded-xl transition-all ${
                        isToday
                          ? 'bg-brand-primary text-white font-semibold shadow-md shadow-brand-primary/10'
                          : 'text-stone-300 hover:bg-stone-800/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && <Sparkles className="w-4 h-4 text-white animate-pulse" />}
                        <span className="text-sm">{t.day}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${isToday ? 'text-white' : 'text-stone-400 font-mono'}`}>
                          {t.hours}
                        </span>
                        {isToday && (
                          <span className="text-[9px] bg-white text-brand-primary font-extrabold px-1.5 py-0.5 rounded uppercase">
                            Today
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Location Mini Footer */}
              <div className="mt-8 pt-6 border-t border-stone-800/80 space-y-3 text-xs text-stone-300">
                <p className="font-semibold text-brand-primary tracking-wider uppercase text-[10px]">Club Location:</p>
                <p className="leading-relaxed text-stone-400 font-light">
                  Plot B 585, Block 13 Gulberg Town, Karachi, Karachi City, Sindh, Pakistan, 75950
                </p>
                <p className="text-[10px] text-stone-500 italic">
                  Convenient, fully secure address, inside Karachi's prestigious Gulberg Town.
                </p>
              </div>
            </div>

            {/* Quality assurance badge */}
            <div className="bg-gradient-to-br from-stone-50 to-stone-100 p-6 rounded-2xl border border-stone-200/60 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-brand-primary" />
                <span>Our Strong Commitment</span>
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                We believe in providing an uncompromising high-standard environment. Every weights slot, zumba cardio beat, and core reformer flex is structured to optimize metabolism and build functional athletic mobility safely.
              </p>
            </div>
          </div>

          {/* CLASSES CONTAINER (Col span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Class tabs trigger selectors */}
            <div className="flex flex-wrap gap-2">
              {classesData.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveClassId(c.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    activeClassId === c.id
                      ? 'bg-brand-secondary text-white shadow-md'
                      : 'bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-950 border border-stone-200/50'
                  }`}
                >
                  <span className="mr-1.5">{c.iconName}</span>
                  <span>{c.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Active Class Box display */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {classesData.map((c) => {
                  if (c.id !== activeClassId) return null;
                  return (
                    <motion.div
                      key={c.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="bg-stone-50/50 rounded-3xl p-6 sm:p-8 border border-stone-200/50 shadow-inner min-h-[380px] flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        {/* Class Header */}
                        <div className="flex items-center gap-4">
                          <span className="text-4xl bg-white p-3 rounded-2xl shadow-sm border border-stone-100">{c.iconName}</span>
                          <div>
                            <h3 className="font-serif text-2xl font-bold text-stone-950">{c.title}</h3>
                            <p className="text-xs text-brand-accent font-semibold tracking-wider uppercase mt-0.5">
                              With Trainer Romana Imran
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-stone-600 text-sm leading-relaxed font-light">
                          {c.description}
                        </p>

                        {/* Benefits list */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Core Program Benefits:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {c.benefits.map((benefit, bIdx) => (
                              <div key={bIdx} className="flex gap-2.5 items-start">
                                <span className="bg-brand-primary-light text-brand-primary p-0.5 rounded mt-0.5">
                                  <Check className="w-3.5 h-3.5" />
                                </span>
                                <span className="text-xs text-stone-600 leading-relaxed font-medium">
                                  {benefit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-8 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-stone-500">
                          <Calendar className="w-4 h-4 text-brand-primary" />
                          <span className="text-xs font-semibold">{c.schedule}</span>
                        </div>
                        <a
                          href="https://wa.me/923360323509"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-brand-primary text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-brand-primary/95 transition-all shadow-md hover:shadow-lg shadow-brand-primary/5 cursor-pointer"
                        >
                          <span>Reserve Batch Slot</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
