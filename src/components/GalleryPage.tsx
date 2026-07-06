import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';

export default function GalleryPage() {
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // List of the 7 gym photos we generated
  const galleryItems: GalleryItem[] = [
    {
      id: 'photo_1',
      url: '/src/assets/images/photo_1.PNG',
      title: "Premium Dumbbells & Strength Area",
      category: 'equipment',
      aspectRatio: '4:3',
      description: "Our professionally organized, high-quality dumbbell and strength training rack designed for precise weight training."
    },
    {
      id: 'photo_2',
      url: '/src/assets/images/photo_2.PNG',
      title: "Spacious Training & Zumba Floor",
      category: 'facilities',
      aspectRatio: '16:9',
      description: "Clean, hygienic, and safe flooring with generous spaces perfect for high-energy Zumba dance and aerobic sessions."
    },
    {
      id: 'photo_3',
      url: '/src/assets/images/photo_3.PNG',
      title: "Pilates Rope & Suspension Zone",
      category: 'equipment',
      aspectRatio: '3:4',
      description: "Our specialized suspension rings and training rope setups, optimal for bodyweight conditioning and flexibility."
    },
    {
      id: 'photo_4',
      url: '/src/assets/images/photo_4.PNG',
      title: "Hygienic Workout Station",
      category: 'facilities',
      aspectRatio: '1:1',
      description: "Dedicated slots with pristine floor padding and full-length alignment mirrors for secure posture feedback."
    },
    {
      id: 'photo_5',
      url: '/src/assets/images/photo_5.PNG',
      title: "Aesthetic Full-Length Mirror Corner",
      category: 'facilities',
      aspectRatio: '3:4',
      description: "Capturing your post-session glow in our elegantly lit, female-exclusive mirrored selfie and grooming spot."
    },
    {
      id: 'photo_6',
      url: '/src/assets/images/photo_6.PNG',
      title: "Yoga, Flexibility & Mobility Setup",
      category: 'sessions',
      aspectRatio: '3:4',
      description: "A serene, calming area equipped with premium mats and yoga blocks for guided meditation and deep body recovery."
    } as any,
    {
      id: 'photo_7',
      url: '/src/assets/images/photo_7.PNG',
      title: "Community Events & Celebration Corner",
      category: 'celebration',
      aspectRatio: '3:4',
      description: "Celebrating physical milestones, member achievements, and birthdays with healthy gift hampers and positive community care."
    }
  ];

  // Map inspiration to custom category for filter support
  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'facilities', label: 'Studio & Facilities' },
    { id: 'equipment', label: 'Equipment & Dumbbells' },
    { id: 'sessions', label: 'Active Sessions' },
    { id: 'celebration', label: 'Community Celebrations' },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIdx === null) return;
    setSelectedItemIdx(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedItemIdx === null) return;
    setSelectedItemIdx(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Club Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Our Club Gallery
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Take a look inside Women's Own Fitness Club. Designed to be pristine, motivating, safe, and beautiful for your workout comfort.
          </p>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        {/* Categories Filter bar */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wider mr-2">
            <Filter className="w-3.5 h-3.5 text-brand-primary" />
            <span>Filter:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setSelectedItemIdx(null); // Reset index for filters
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all border cursor-pointer ${
                activeFilter === filter.id
                  ? 'bg-brand-primary text-white border-brand-primary shadow-sm shadow-brand-primary/10'
                  : 'bg-white text-stone-600 border-stone-200/60 hover:bg-stone-50 hover:text-stone-950'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bento Grid Gallery */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              // Custom span based on aspect ratio for aesthetic rhythm
              let spanClass = "col-span-1";
              if (item.aspectRatio === '16:9') {
                spanClass = "sm:col-span-2 lg:col-span-2";
              }

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  className={`${spanClass} overflow-hidden rounded-3xl bg-white border border-stone-200/60 shadow-sm group hover:shadow-md transition-all cursor-pointer`}
                  onClick={() => setSelectedItemIdx(index)}
                >
                  <div className="relative overflow-hidden aspect-video sm:aspect-auto sm:h-72 bg-stone-100">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 space-y-1.5">
                        <span className="bg-brand-primary text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block">
                          {item.category === 'facilities' ? 'Facilities' : item.category === 'equipment' ? 'Equipment' : item.category === 'celebration' ? 'Milestones' : item.category === 'sessions' ? 'Sessions' : 'Inspiration'}
                        </span>
                        <h4 className="text-white text-sm font-bold tracking-tight">{item.title}</h4>
                        <p className="text-stone-300 text-[11px] leading-tight font-light">{item.description}</p>
                      </div>
                      <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-brand-primary transition-colors">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  
                  {/* Static Card Caption for Mobile accessibility */}
                  <div className="p-4 sm:hidden border-t border-stone-100">
                    <h4 className="text-stone-900 font-bold text-xs">{item.title}</h4>
                    <p className="text-stone-500 text-[10px] mt-0.5">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Counter indicator */}
        <p className="text-center text-xs text-stone-400 mt-12 font-medium tracking-wide">
          Showing {filteredItems.length} of {galleryItems.length} professional high-resolution club photographs
        </p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItemIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setSelectedItemIdx(null)}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center text-white w-full max-w-5xl mx-auto py-2">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-brand-primary" />
                <span className="text-xs font-bold tracking-wider uppercase text-stone-300">
                  Image {selectedItemIdx + 1} of {filteredItems.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedItemIdx(null)}
                className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body: Active image container */}
            <div className="flex-1 flex justify-center items-center relative w-full max-w-5xl mx-auto">
              
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-4 z-10 bg-white/5 hover:bg-white/15 border border-white/5 p-3 rounded-full text-white hover:scale-105 transition-all cursor-pointer shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Active Image Box */}
              <motion.div
                key={selectedItemIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="max-h-[70vh] max-w-[85vw] sm:max-w-[70vw] rounded-2xl overflow-hidden shadow-2xl relative bg-stone-900 border border-stone-800"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredItems[selectedItemIdx].url}
                  alt={filteredItems[selectedItemIdx].title}
                  className="max-h-[70vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-4 z-10 bg-white/5 hover:bg-white/15 border border-white/5 p-3 rounded-full text-white hover:scale-105 transition-all cursor-pointer shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Modal Footer: Description details */}
            <div className="text-center text-white w-full max-w-2xl mx-auto py-4 bg-stone-900/40 p-5 rounded-2xl border border-white/5 mb-2">
              <h4 className="font-serif text-lg font-bold tracking-tight text-white">
                {filteredItems[selectedItemIdx].title}
              </h4>
              <p className="text-stone-300 text-xs mt-1.5 font-light leading-relaxed">
                {filteredItems[selectedItemIdx].description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
