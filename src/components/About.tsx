import React from 'react';
import { Award, Heart, CheckCircle, Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const values = [
    {
      icon: <Award className="w-6 h-6 text-brand-primary" />,
      title: 'Expert Instruction',
      description: 'Fully guided workouts under Certified Fitness Trainer Romana Imran. Tailored programs for fat loss, strength, and structural mobility.',
    },
    {
      icon: <Heart className="w-6 h-6 text-brand-accent" />,
      title: 'Feminine Safe Space',
      description: 'A 100% private, clean, and distraction-free workspace designed exclusively for women to feel empowered, strong, and confident.',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-emerald-500" />,
      title: 'Diverse Specializations',
      description: 'Dynamic mix of Zumba, relaxing Yoga, precise Pilates, Pilates Rope, Strength Training, and metabolic-conditioning workouts.',
    },
  ];

  return (
    <section className="py-20 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* About Image / Grid collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-brand-accent to-pink-500 rounded-3xl blur-md opacity-10" />
              <img
                src="/src/assets/images/regenerated_image_1783287202473.png"
                alt="Minimalist yoga prints on textured wall at Women's Own Fitness Club"
                className="rounded-3xl w-full object-cover shadow-lg aspect-[4/5]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick mini testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex gap-3"
            >
              <div className="text-brand-accent font-serif text-3xl">“</div>
              <div>
                <p className="text-xs italic text-stone-600 leading-relaxed">
                  "Rumana baji is one dedicated trainer who would always motivate you to achieve your goals and be determined."
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-stone-500">— Raba Rahat Khan</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* About Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">Since August 2015</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950 tracking-tight">
                Empowering Women in Karachi for Over 10 Years
              </h2>
              <div className="w-16 h-1 bg-brand-primary rounded-full" />
            </div>

            <p className="text-stone-600 text-base leading-relaxed">
              Established in August 2015, <strong className="text-stone-900 font-semibold">Women's Own Fitness Club</strong> was born from a singular vision: to create a motivating, premium, and safe wellness environment for women. Under the dedicated direction of certified trainer <strong className="text-stone-900 font-semibold">Romana Imran</strong>, we have helped hundreds of women achieve their weight loss, strength, and aesthetic goals.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              {values.map((v, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-stone-100 transition-all">
                  <div className="flex-shrink-0 bg-stone-100 p-3 h-12 w-12 rounded-xl flex items-center justify-center">
                    {v.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-stone-900">{v.title}</h3>
                    <p className="text-xs text-stone-500 leading-relaxed">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Meet Romana Spotlight Box */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 text-white p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-6 items-center border border-stone-800">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-primary flex-shrink-0 bg-stone-800">
                <img
                  src="/src/assets/images/womens_own_logo_1783285427865.jpg"
                  alt="Trainer Romana Imran logo concept"
                  className="w-full h-full object-cover scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-serif text-lg font-bold text-white">Romana Imran</h4>
                  <span className="bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                    Founder
                  </span>
                </div>
                <p className="text-xs text-brand-primary font-medium tracking-wider uppercase">Certified Master Fitness Coach</p>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  "My goal is simple: making women stronger, healthier, and glowing. Whether you are trying to lose weight, gain strength, or find your focus with Yoga and Pilates, I am committed to supporting you every step of your journey."
                </p>
                <div className="pt-1 flex justify-center sm:justify-start gap-4">
                  <a
                    href="https://www.instagram.com/_rumana_imran_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-stone-400 hover:text-brand-primary transition-colors underline decoration-stone-700 hover:decoration-brand-primary underline-offset-4"
                  >
                    Follow her on Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
