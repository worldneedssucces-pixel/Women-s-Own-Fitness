import React, { useState } from 'react';
import { Star, Quote, CheckCircle, Send, Award, HelpCircle, ThumbsUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review } from '../types';

export default function ReviewSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: 'rev_1',
      name: "Jaweria Rizwan",
      rating: 5,
      text: "5/5 stars! 🤩 I love Women's Own Fitness Club! 🏋️‍♀️ It's the best gym ever! 💪 They have great equipment, friendly staff, and a motivating atmosphere. 💃 I love their classes, especially Zumba 🕺💃! Everyone is so supportive and nice. 🌈 I've had an amazing time working out here and seen some awesome transformations. If you want a gym that helps you feel strong and confident, this is the place! 💥 I highly recommend it! 💕",
      date: "2 days ago",
      tag: "Zumba & Transformation"
    },
    {
      id: 'rev_2',
      name: "Nousheen Irfan",
      rating: 5,
      text: "This gym is really clean and safe for womens specially their instructors are amazing and friendly. I lose 3 kg weight in just one week and that was awesome always recommended for all💖",
      date: "1 week ago",
      tag: "Weight Loss Speed"
    },
    {
      id: 'rev_3',
      name: "Raba Rahat Khan",
      rating: 5,
      text: "Great place for fitness. I would highly recommend hardcore gym, Rumana baji is one dedicated trainer who would always motivate you to achieve your goals and be determined to your target. She is always there for you in whatever you are feeling during training sessions. One of the best gym i have been so far, friendly atmosphere and wide range of machinery. I would definitely recommend this gym.😊",
      date: "2 weeks ago",
      tag: "Inspirational Trainer"
    },
    {
      id: 'rev_4',
      name: "Umeusman Attari",
      rating: 5,
      text: "Excellent gym with a positive and friendly atmosphere. In just a short time, real changes can be seen in health, fitness and even facial glow. Ma’am Romana is a very humble, skilled and inspiring personality. I’m really impressed and grateful",
      date: "3 weeks ago",
      tag: "Health & Facial Glow"
    },
    {
      id: 'rev_5',
      name: "umaima siddiqui",
      rating: 4,
      text: "Im trying to contact you guys but Instagram doesn't let me DM you and there's no contact on this page as wll., kindly let me know romana trainer number i wnana join gym for pilates rope and strength training + mobility. Thank you",
      date: "1 month ago",
      tag: "Joining Inquiry"
    }
  ]);

  // State for Review Form
  const [formName, setFormName] = useState('');
  const [formText, setFormText] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | '5' | '4'>('all');
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});

  const handleHelpful = (id: string) => {
    setHelpfulLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) return;

    const newReview: Review = {
      id: `custom_${Date.now()}`,
      name: formName.trim(),
      rating: formRating,
      text: formText.trim(),
      date: "Just now",
      tag: "Verified Client Update"
    };

    setReviewsList([newReview, ...reviewsList]);
    setFormName('');
    setFormText('');
    setFormRating(5);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  // Filter list
  const filteredReviews = activeFilter === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.rating.toString() === activeFilter);

  // Stats calculation
  const totalReviewsCount = reviewsList.length;
  const averageRating = (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1);
  const fiveStarsCount = reviewsList.filter(r => r.rating === 5).length;
  const fourStarsCount = reviewsList.filter(r => r.rating === 4).length;

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">Client Feedback</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Client Transformations & Reviews
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Discover the real, life-changing wellness experiences shared by members of Women's Own Fitness Club.
          </p>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Stats Summary & Write a Review Form (Col 5) */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            
            {/* Stats Summary Panel */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-stone-900">Review Summary</h3>
              
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-5xl font-serif font-black text-stone-900">{averageRating}</span>
                  <span className="text-stone-400 text-sm font-semibold">/ 5</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Based on local client reviews</p>
                </div>
              </div>

              {/* Progress bars of stars */}
              <div className="space-y-2.5 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-600">
                    <span>5 stars (Excellent)</span>
                    <span>{Math.round((fiveStarsCount / totalReviewsCount) * 100)}%</span>
                  </div>
                  <div className="bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(fiveStarsCount / totalReviewsCount) * 100}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-stone-600">
                    <span>4 stars (Great)</span>
                    <span>{Math.round((fourStarsCount / totalReviewsCount) * 100)}%</span>
                  </div>
                  <div className="bg-stone-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400/80 h-full rounded-full" style={{ width: `${(fourStarsCount / totalReviewsCount) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* WRITE A REVIEW FORM */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-sm space-y-6 relative overflow-hidden">
              <h3 className="font-serif text-xl font-bold text-stone-900">Leave Your Review</h3>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                Have you completed a training program or felt the Zumba positive vibes here? Share your transformation with our community!
              </p>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs space-y-1"
                  >
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      Review Added Successfully!
                    </p>
                    <p className="font-light">Thank you! Your feedback has been posted at the top of our list.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Rating select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">Your Star Rating:</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isLit = hoveredRating !== null ? starValue <= hoveredRating : starValue <= formRating;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onMouseEnter={() => setHoveredRating(starValue)}
                          onMouseLeave={() => setHoveredRating(null)}
                          onClick={() => setFormRating(starValue)}
                          className="focus:outline-none cursor-pointer transition-transform duration-100 hover:scale-115"
                          aria-label={`Rate ${starValue} stars`}
                        >
                          <Star
                            className={`w-7 h-7 ${
                              isLit ? 'text-amber-400 fill-amber-400' : 'text-stone-200'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="form-name" className="text-xs font-bold text-stone-700 block">Full Name:</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="E.g., Ayesha Khan"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder-stone-400"
                  />
                </div>

                {/* Textarea */}
                <div className="space-y-1">
                  <label htmlFor="form-text" className="text-xs font-bold text-stone-700 block">Your Review & Transformation:</label>
                  <textarea
                    id="form-text"
                    required
                    rows={4}
                    placeholder="Tell other women about your workout experiences, weights lifted, or Romana baji's guidance..."
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    className="w-full text-xs px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary placeholder-stone-400 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-stone-900 text-white hover:bg-brand-primary py-3 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Live Review</span>
                </button>

              </form>
            </div>

          </div>

          {/* RIGHT: Live Feed List & Filters (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter menu */}
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-4">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Showing {filteredReviews.length} Reviews
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-brand-primary text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  All Stars
                </button>
                <button
                  onClick={() => setActiveFilter('5')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeFilter === '5'
                      ? 'bg-brand-primary text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  5 Stars
                </button>
                <button
                  onClick={() => setActiveFilter('4')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    activeFilter === '4'
                      ? 'bg-brand-primary text-white'
                      : 'bg-white text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  4 Stars
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-6">
              <AnimatePresence initial={false}>
                {filteredReviews.map((rev) => {
                  const isUmaima = rev.name.toLowerCase() === 'umaima siddiqui';
                  const helpfulCount = helpfulLikes[rev.id] || 0;

                  return (
                    <motion.div
                      key={rev.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/60 shadow-xs relative overflow-hidden"
                    >
                      <Quote className="absolute top-6 right-6 w-10 h-10 text-stone-100/80 -z-0" />

                      <div className="relative z-10 space-y-4">
                        
                        {/* Star Row & Tag info */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 ${
                                  idx < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200'
                                }`}
                              />
                            ))}
                          </div>
                          
                          {rev.tag && (
                            <span className="bg-brand-accent/5 border border-brand-accent/10 text-brand-accent px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                              {rev.tag}
                            </span>
                          )}
                        </div>

                        {/* Review Content */}
                        <p className="text-stone-700 text-sm leading-relaxed font-light whitespace-pre-line">
                          {rev.text}
                        </p>

                        {/* Profile Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-brand-primary-light text-brand-primary flex items-center justify-center font-bold">
                              {rev.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-stone-900">{rev.name}</p>
                              <p className="text-[10px] text-stone-400">{rev.date}</p>
                            </div>
                          </div>

                          {/* Helpful button */}
                          <button
                            onClick={() => handleHelpful(rev.id)}
                            className="flex items-center gap-1 text-stone-400 hover:text-brand-primary transition-colors cursor-pointer text-[11px]"
                            title="Mark as helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful {helpfulCount > 0 ? `(${helpfulCount})` : ''}</span>
                          </button>
                        </div>

                        {/* SPECIAL EMPATHETIC DIRECT REPLY FOR UMAIMA SIDDIQUI */}
                        {isUmaima && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-stone-900 text-stone-200 rounded-2xl p-5 mt-4 space-y-3.5 border border-stone-800 text-xs relative"
                          >
                            <div className="flex items-center gap-2 text-brand-primary">
                              <Award className="w-4 h-4" />
                              <span className="font-bold tracking-wider uppercase text-[10px]">Official Reply from Romana Imran</span>
                            </div>
                            <p className="font-light leading-relaxed text-stone-300">
                              "Aslam-o-Alaikum Umaima! Thank you so much for your keen interest in joining our gym! I am so sorry Instagram didn't allow you to DM. 
                              You can directly call or message me on my WhatsApp at <strong className="text-white">+92 336 0323509</strong>. 
                              I would love to help get you set up for Pilates rope, strength training, and mobility workouts!"
                            </p>
                            
                            {/* Action contact buttons directly in reply */}
                            <div className="flex flex-wrap gap-2.5 pt-1.5">
                              <a
                                href="https://wa.me/923360323509"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-emerald-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-[10px] hover:bg-emerald-600 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                <span>Message on WhatsApp</span>
                              </a>
                              <a
                                href="tel:+923360323509"
                                className="bg-brand-primary text-white font-bold px-3.5 py-1.5 rounded-lg text-[10px] hover:bg-brand-primary/95 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
                              >
                                <span>Call Romana</span>
                              </a>
                            </div>
                          </motion.div>
                        )}

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
