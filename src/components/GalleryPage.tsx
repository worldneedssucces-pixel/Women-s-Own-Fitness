import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Filter, Plus, Upload, Loader2, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import { getGalleryItems, addGalleryItem, compressImage, defaultGalleryItems } from '../lib/dbService';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItemIdx, setSelectedItemIdx] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Modal form states
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'facilities' | 'equipment' | 'sessions' | 'celebration'>('facilities');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '3:4' | '4:3'>('4:3');
  const [description, setDescription] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Fetch gallery items from Firestore on load
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await getGalleryItems();
        setGalleryItems(data);
      } catch (err) {
        console.error("Failed to load gallery items from Firebase:", err);
        setGalleryItems(defaultGalleryItems);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter logic
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

  // Image Selection Handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Submit Handler to save image as compressed Base64 inside Firestore doc
  const handleAddPhotoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !imageFile) {
      alert("Please fill out all fields and select a photo.");
      return;
    }

    setUploading(true);
    try {
      // 1. Compress image to Base64 (max 800x800 for quick loads and fits beautifully in Firestore)
      const base64Str = await compressImage(imageFile, 800, 800, 0.7);

      // 2. Build the new gallery item
      const newItem: GalleryItem = {
        id: `photo_${Date.now()}`,
        url: base64Str,
        title: title.trim(),
        category,
        aspectRatio,
        description: description.trim()
      };

      // 3. Save to Firebase Firestore database
      await addGalleryItem(newItem);

      // 4. Update local state
      setGalleryItems(prev => [...prev, newItem]);

      // 5. Reset Form & Show success
      setTitle('');
      setDescription('');
      setImageFile(null);
      setImagePreview(null);
      setSuccessMsg("Photo successfully saved in Firebase Firestore database!");
      setTimeout(() => {
        setSuccessMsg(null);
        setShowAddModal(false);
      }, 2000);

    } catch (err) {
      console.error("Error saving image to Firestore:", err);
      alert("An error occurred while uploading. Please check connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="py-16 bg-stone-50 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span className="flex items-center gap-1">
              Cloud-Powered Showcase <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Our Club Gallery
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Take a look inside Women's Own Fitness Club. All images are securely synchronized and retrieved dynamically from your Firebase Firestore database.
          </p>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        {/* Categories & Add Photo Actions bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10 border-b border-stone-200/50 pb-6">
          <div className="flex flex-wrap justify-center items-center gap-2">
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

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-stone-900 hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Photo to Firebase</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
            <p className="text-stone-500 text-xs font-medium tracking-wide">Syncing with Firebase Firestore...</p>
          </div>
        ) : (
          <>
            {/* Bento Grid Gallery */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
            >
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, index) => {
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
              Showing {filteredItems.length} of {galleryItems.length} dynamic club photographs stored in Firebase
            </p>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItemIdx !== null && filteredItems[selectedItemIdx] && (
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

      {/* Add Photo Form Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-stone-100 bg-stone-50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">Add New Gym Photo</h3>
                    <p className="text-stone-500 text-[11px] font-light">Your image will be synchronized into Firebase</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-stone-200/50 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleAddPhotoSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {successMsg ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-emerald-500 text-white rounded-full">
                      <Check className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-semibold">{successMsg}</p>
                  </div>
                ) : (
                  <>
                    {/* Drag-and-drop Image upload block */}
                    <div className="space-y-1">
                      <label className="text-stone-700 text-xs font-bold block">Gym Photograph</label>
                      
                      {imagePreview ? (
                        <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 aspect-video flex items-center justify-center">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview(null);
                            }}
                            className="absolute top-3 right-3 bg-stone-900/80 hover:bg-red-500 text-white p-2 rounded-full transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative group border-2 border-dashed border-stone-200 hover:border-brand-primary rounded-2xl p-6 transition-colors text-center cursor-pointer bg-stone-50/50 hover:bg-stone-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            required
                          />
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <div className="p-3 bg-stone-100 text-stone-500 rounded-2xl group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                              <Upload className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-700">Click or drag gym photo to upload</p>
                              <p className="text-[10px] text-stone-400 mt-0.5">Supports PNG, JPG, WEBP formats</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                      <label className="text-stone-700 text-xs font-bold block">Photo Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Romana's Guided Yoga Practice"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary text-xs"
                        required
                        disabled={uploading}
                      />
                    </div>

                    {/* Category & Aspect Ratio Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category selection */}
                      <div className="space-y-1">
                        <label className="text-stone-700 text-xs font-bold block">Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary text-xs bg-white"
                          disabled={uploading}
                        >
                          <option value="facilities">Studio & Facilities</option>
                          <option value="equipment">Equipment & Weights</option>
                          <option value="sessions">Active Sessions</option>
                          <option value="celebration">Community Celebrations</option>
                        </select>
                      </div>

                      {/* Aspect ratio */}
                      <div className="space-y-1">
                        <label className="text-stone-700 text-xs font-bold block">Card Sizing</label>
                        <select
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(e.target.value as any)}
                          className="w-full px-3 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary text-xs bg-white"
                          disabled={uploading}
                        >
                          <option value="4:3">Standard Card (4:3)</option>
                          <option value="3:4">Portrait Card (3:4)</option>
                          <option value="1:1">Square Card (1:1)</option>
                          <option value="16:9">Wide Double Card (16:9)</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <label className="text-stone-700 text-xs font-bold block">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Provide details about the equipment, session activity, or milestone celebration..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary text-xs resize-none"
                        required
                        disabled={uploading}
                      />
                    </div>
                  </>
                )}
              </form>

              {/* Footer */}
              {!successMsg && (
                <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-200/40 rounded-xl transition-all cursor-pointer"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPhotoSubmit}
                    disabled={uploading || !imageFile}
                    className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Save to Firebase</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
