import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Play, Pause, ChevronLeft, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstagramPost } from '../types';

export default function InstagramFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic state for post interactions
  const [postsState, setPostsState] = useState<InstagramPost[]>([
    {
      id: 'post_1',
      imageUrl: '/src/assets/images/social_media_1.jpg',
      caption: "Our custom arched mirror with neon pink lighting is officially the favorite selfie spot! 💖 Capture your post-workout glow and tag us in your stories! Making women stronger and glowing every single day. 🤸🏻‍♀️✨ #womensownfitnessclub #karachigym #womenstronger #glowup #fitnessjourney",
      likes: 248,
      commentsCount: 14,
      date: "2 HOURS AGO",
      link: "https://www.instagram.com/womensownfitnessclub"
    },
    {
      id: 'post_2',
      imageUrl: '/src/assets/images/social_media_2.jpg',
      caption: "Step out of your comfort zone and build unmatched physical stability! Suspension training works on your core, stabilizer muscles, and physical mobility. Fully guided by Romana Imran. 🏋️‍♀️💪 #pilatesrope #coreconditioning #womensfitness #karachifit",
      likes: 184,
      commentsCount: 9,
      date: "1 DAY AGO",
      link: "https://www.instagram.com/womensownfitnessclub"
    },
    {
      id: 'post_3',
      imageUrl: '/src/assets/images/social_media_3.jpg',
      caption: "Strength training is not about lifting heavy blindly — it is about perfect alignment, dedicated progression, and posture corrections. Join our next strength coaching batch today! 🏋️‍♀️✨ #weightliftingforwomen #strengthmatters #motivation #gulbergtown",
      likes: 312,
      commentsCount: 22,
      date: "3 DAYS AGO",
      link: "https://www.instagram.com/womensownfitnessclub"
    },
    {
      id: 'post_4',
      imageUrl: '/src/assets/images/social_media_4.jpg',
      caption: "Happy Birthday to one of our champion members! 🎂🎉 At Women's Own, we celebrate your achievements, birthdays, and milestones because we are a family. Grateful for this amazing supportive sisterhood! 💕 #gymcommunity #sisterhood #milestones #celebratelife",
      likes: 415,
      commentsCount: 38,
      date: "5 DAYS AGO",
      link: "https://www.instagram.com/womensownfitnessclub"
    },
    {
      id: 'post_5',
      imageUrl: '/src/assets/images/social_media_5.jpg',
      caption: "Yoga & Pilates help stabilize your mind and elongate your muscles. A peaceful corner in our studio to center yourself. Romana baji is here to coach you through breathing loops and structural mobility! 🧘🏻‍♀️✨ #yoga #pilates #mindfulness #karachiyoga",
      likes: 156,
      commentsCount: 7,
      date: "1 WEEK AGO",
      link: "https://www.instagram.com/womensownfitnessclub"
    }
  ]);

  // Track comments written by user per post ID
  const [userComments, setUserComments] = useState<Record<string, string[]>>({
    post_1: [
      "Love the neon lights! Best mirror spot in town 😍",
      "I feel so energized after training here!"
    ],
    post_2: [
      "These rings are awesome! Highly recommend Romana baji's training.",
      "The suspension workout completely changed my posture."
    ],
    post_3: [
      "Awesome dumbells rack, really clean and organized!",
      "I lost 3 kg in my very first week here! Highly recommended!"
    ],
    post_4: [
      "You guys are the sweetest! Best community ever 💕",
      "Such a motivating place to workout."
    ],
    post_5: [
      "Beautiful prints, love the vibe of the studio."
    ]
  });

  const [newCommentText, setNewCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  // Slideshow Logic: post rotation every 5 seconds (5000ms)
  useEffect(() => {
    if (isPlaying) {
      // Advance progress bar by increments
      const tickRate = 50; // ms
      const totalDuration = 5000; // ms
      const step = (tickRate / totalDuration) * 100;

      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Reset and trigger next slide
            setCurrentIndex((idx) => (idx + 1) % postsState.length);
            return 0;
          }
          return prev + step;
        });
      }, tickRate);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, currentIndex, postsState.length]);

  const handleNext = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % postsState.length);
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + postsState.length) % postsState.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = (postId: string, fromDoubleTap = false) => {
    const isAlreadyLiked = likedPosts[postId];
    
    // Trigger double tap heart explosion
    if (fromDoubleTap) {
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
      if (isAlreadyLiked) return; // don't unlike on second double tap
    }

    setLikedPosts(prev => ({ ...prev, [postId]: !isAlreadyLiked }));
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: isAlreadyLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setUserComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentText.trim()]
    }));

    // Increment comments count on post
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          commentsCount: post.commentsCount + 1
        };
      }
      return post;
    }));

    setNewCommentText('');
  };

  const activePost = postsState[currentIndex];
  const activePostComments = userComments[activePost.id] || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">Keep Up With Us</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Interactive Instagram Feed
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Live updates and daily motivation. Follow <a href="https://www.instagram.com/womensownfitnessclub" target="_blank" rel="noopener noreferrer" className="text-brand-accent font-bold hover:underline">@womensownfitnessclub</a>. Rotates automatically within 5 seconds.
          </p>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        {/* Slideshow progress bar wrapper */}
        <div className="max-w-md mx-auto mb-6 flex items-center justify-between gap-4">
          <div className="flex-1 bg-stone-100 h-1 rounded-full overflow-hidden relative">
            <motion.div
              className="bg-brand-primary h-full absolute left-0 top-0"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
              aria-label="Previous Post"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-brand-primary text-white transition-colors cursor-pointer"
              title={isPlaying ? "Pause Rotation" : "Resume Rotation"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors cursor-pointer"
              aria-label="Next Post"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FEED PHONE container */}
        <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xl relative">
          
          {/* IG Post Header */}
          <div className="flex justify-between items-center p-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <div className="w-full h-full rounded-full overflow-hidden border border-white bg-stone-100">
                  <img
                    src="/src/assets/images/womens_own_logo_1783285427865.jpg"
                    alt="Women's Own Fitness Club Profile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-stone-900 leading-tight">womensownfitnessclub</span>
                  <CheckCircle className="w-3.5 h-3.5 fill-sky-500 text-white" />
                </div>
                <span className="text-[10px] text-stone-500 block leading-tight font-light">Gulberg Town, Karachi</span>
              </div>
            </div>
            
            <a
              href="https://www.instagram.com/womensownfitnessclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-sky-500 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-sky-50 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Follow</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* IG Post Image (Double click triggers heart pop-up) */}
          <div
            className="relative bg-stone-950 aspect-square overflow-hidden cursor-pointer group"
            onDoubleClick={() => handleLike(activePost.id, true)}
            title="Double click to like!"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activePost.id}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 0.3 }}
                src={activePost.imageUrl}
                alt="Instagram workout post"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Tap to like tooltip */}
            <div className="absolute top-3 left-3 bg-stone-950/75 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
              ❤️ Double-Tap To Like!
            </div>

            {/* Heart Pop Explosion Animation */}
            <AnimatePresence>
              {showHeartPop && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 0.9, 1], opacity: [0, 1, 1, 0] }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none"
                >
                  <Heart className="w-24 h-24 text-rose-500 fill-rose-500 filter drop-shadow-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* IG Action Row */}
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center text-stone-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(activePost.id)}
                  className="hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  aria-label="Like post"
                >
                  <Heart className={`w-6 h-6 ${likedPosts[activePost.id] ? 'text-rose-500 fill-rose-500' : 'text-stone-800'}`} />
                </button>
                <button
                  className="hover:scale-110 transition-transform cursor-pointer"
                  onClick={() => document.getElementById('comment-input')?.focus()}
                  aria-label="Comment on post"
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
                <a
                  href={activePost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform cursor-pointer text-stone-800"
                >
                  <Send className="w-5 h-5" />
                </a>
              </div>
              <button className="hover:scale-110 transition-transform cursor-pointer">
                <Bookmark className="w-5 h-5 text-stone-800" />
              </button>
            </div>

            {/* Likes count */}
            <p className="text-xs font-bold text-stone-900">
              {activePost.likes.toLocaleString()} likes
            </p>

            {/* Caption (Collapsible styled text) */}
            <div className="text-xs leading-relaxed text-stone-800">
              <span className="font-bold mr-2 text-stone-900">womensownfitnessclub</span>
              <p className="inline font-light leading-relaxed whitespace-pre-line text-stone-600">
                {activePost.caption}
              </p>
            </div>

            {/* Interactive Comment feed */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100 max-h-32 overflow-y-auto">
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Comments ({activePostComments.length}):</p>
              {activePostComments.map((comment, idx) => (
                <div key={idx} className="text-xs flex gap-2">
                  <span className="font-bold text-stone-900">visitor_fit</span>
                  <span className="text-stone-600 font-light">{comment}</span>
                </div>
              ))}
              {activePostComments.length === 0 && (
                <p className="text-xs text-stone-400 italic">No comments yet. Be the first!</p>
              )}
            </div>

            {/* Formatted Date */}
            <p className="text-[9px] text-stone-400 font-semibold tracking-wider uppercase">
              {activePost.date}
            </p>
          </div>

          {/* Comment submit bar */}
          <form
            onSubmit={(e) => handleAddComment(e, activePost.id)}
            className="border-t border-stone-100 p-3 flex items-center justify-between gap-3 bg-stone-50"
          >
            <input
              id="comment-input"
              type="text"
              placeholder="Add a comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-1 bg-transparent border-none text-xs text-stone-800 placeholder-stone-400 outline-none focus:ring-0"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="text-xs font-bold text-sky-500 hover:text-sky-600 disabled:text-stone-300 transition-colors cursor-pointer"
            >
              Post
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
