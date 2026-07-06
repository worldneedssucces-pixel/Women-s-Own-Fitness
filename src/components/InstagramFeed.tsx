import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, Play, Pause, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Plus, Camera, Upload, X, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InstagramPost } from '../types';
import { getInstagramPosts, addInstagramPost, addPostComment, updatePostLikes, compressImage, defaultInstagramPosts } from '../lib/dbService';

export default function InstagramFeed() {
  const [postsState, setPostsState] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const [newCommentText, setNewCommentText] = useState('');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('instagram_liked_posts');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Modal post creation states
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Load Instagram posts from Firestore on load
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const posts = await getInstagramPosts();
        setPostsState(posts);
      } catch (err) {
        console.error("Failed to fetch Instagram posts from Firestore:", err);
        setPostsState(defaultInstagramPosts);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Save liked state locally in localStorage
  useEffect(() => {
    localStorage.setItem('instagram_liked_posts', JSON.stringify(likedPosts));
  }, [likedPosts]);

  // Slideshow Logic: post rotation every 5 seconds (5000ms)
  useEffect(() => {
    if (loading || postsState.length === 0) return;

    if (isPlaying) {
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
  }, [isPlaying, currentIndex, postsState.length, loading]);

  const handleNext = () => {
    if (postsState.length === 0) return;
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % postsState.length);
  };

  const handlePrev = () => {
    if (postsState.length === 0) return;
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + postsState.length) % postsState.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Sync Likes in Firestore and local UI
  const handleLike = async (postId: string, fromDoubleTap = false) => {
    const isAlreadyLiked = likedPosts[postId];
    
    // Trigger double tap heart explosion
    if (fromDoubleTap) {
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
      if (isAlreadyLiked) return; // don't unlike on second double tap
    }

    const likeIncrement = isAlreadyLiked ? -1 : 1;

    // 1. Optimistic update in UI
    setLikedPosts(prev => ({ ...prev, [postId]: !isAlreadyLiked }));
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + likeIncrement
        };
      }
      return post;
    }));

    // 2. Persist in Firebase Firestore
    try {
      await updatePostLikes(postId, likeIncrement);
    } catch (err) {
      console.error("Failed to sync like with Firestore:", err);
    }
  };

  // Sync comments in Firestore and local UI
  const handleAddComment = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    const text = newCommentText.trim();
    if (!text) return;

    // Clear input instantly (optimistic)
    setNewCommentText('');

    // 1. Update UI locally
    setPostsState(prev => prev.map(post => {
      if (post.id === postId) {
        const currentComments = post.comments || [];
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...currentComments, text]
        };
      }
      return post;
    }));

    // 2. Save comment in Firebase Firestore
    try {
      await addPostComment(postId, text);
    } catch (err) {
      console.error("Failed to save comment in Firestore:", err);
    }
  };

  // Handle selected image file for post creation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Submit and upload new social post to Firestore
  const handleAddPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() || !imageFile) {
      alert("Please enter a caption and select an image.");
      return;
    }

    setUploading(true);
    try {
      // 1. Compress selected image file to Base64 String
      const base64Str = await compressImage(imageFile, 800, 800, 0.7);

      // 2. Build the InstagramPost document
      const newPostId = `post_${Date.now()}`;
      const newPost: InstagramPost = {
        id: newPostId,
        imageUrl: base64Str,
        caption: caption.trim(),
        likes: Math.floor(Math.random() * 50) + 10, // Fun randomized starting likes
        commentsCount: 0,
        date: "JUST NOW",
        link: "https://www.instagram.com/womensownfitnessclub",
        comments: []
      };

      // 3. Persist document in Firestore collection
      await addInstagramPost(newPost);

      // 4. Update local state
      setPostsState(prev => [newPost, ...prev]);
      setCurrentIndex(0); // Switch focus immediately to the newly posted story
      setProgress(0);

      // 5. Success reset
      setCaption('');
      setImageFile(null);
      setImagePreview(null);
      setSuccessMsg("Story posted successfully into Firebase!");
      setTimeout(() => {
        setSuccessMsg(null);
        setShowAddModal(false);
      }, 2000);

    } catch (err) {
      console.error("Error creating post in Firestore:", err);
      alert("Failed to upload post. Please check connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  const activePost = postsState[currentIndex];
  const activePostComments = activePost?.comments || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-brand-primary text-xs font-bold tracking-widest uppercase">Keep Up With Us</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            Interactive Instagram Feed
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto font-light leading-relaxed">
            Live updates and daily motivation. Every post, comment, and like is stored dynamically in Firebase. Follow <a href="https://www.instagram.com/womensownfitnessclub" target="_blank" rel="noopener noreferrer" className="text-brand-accent font-bold hover:underline">@womensownfitnessclub</a>.
          </p>
          <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
            <p className="text-stone-500 text-xs font-medium tracking-wide">Retrieving posts from Firebase...</p>
          </div>
        ) : postsState.length === 0 ? (
          <div className="text-center py-10 space-y-4">
            <p className="text-stone-500 text-sm">No stories in the feed. Create the very first one!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 bg-brand-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-brand-primary/95"
            >
              Post First Story
            </button>
          </div>
        ) : (
          <>
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
                        src="/src/assets/images/logo.jpg"
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

            {/* Create Story trigger button */}
            <div className="max-w-md mx-auto mt-6 text-center">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 bg-stone-900 hover:bg-brand-primary text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Live Social Story</span>
              </button>
            </div>
          </>
        )}

      </div>

      {/* Add Instagram Post Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-stone-100 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-stone-100 bg-stone-50">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-xl">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">Create New Social Story</h3>
                    <p className="text-stone-500 text-[11px] font-light">Publish live to our interactive feed</p>
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
              <form onSubmit={handleAddPostSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
                
                {successMsg ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-3">
                    <div className="p-3 bg-emerald-500 text-white rounded-full">
                      <Check className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-semibold">{successMsg}</p>
                  </div>
                ) : (
                  <>
                    {/* Image selector */}
                    <div className="space-y-1">
                      <label className="text-stone-700 text-xs font-bold block">Story Photograph</label>
                      
                      {imagePreview ? (
                        <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 aspect-square flex items-center justify-center">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                        <div className="relative group border-2 border-dashed border-stone-200 hover:border-brand-primary rounded-2xl p-6 transition-colors text-center cursor-pointer bg-stone-50/50 hover:bg-stone-50 aspect-square flex flex-col items-center justify-center">
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
                              <p className="text-xs font-bold text-stone-700">Click to upload story photo</p>
                              <p className="text-[10px] text-stone-400 mt-0.5">Will fit to 1:1 square ratio</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Caption */}
                    <div className="space-y-1">
                      <label className="text-stone-700 text-xs font-bold block">Caption</label>
                      <textarea
                        rows={4}
                        placeholder="Write a fun, motivating caption with hashtags... e.g. Romana baji coaching us on suspension loops! 🧘🏻‍♀️🏋️‍♀️ #womensown"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
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
                    onClick={handleAddPostSubmit}
                    disabled={uploading || !imageFile}
                    className="flex items-center gap-2 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Story</span>
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
