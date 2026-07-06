import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  increment, 
  writeBatch,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "./firebase";
import { GalleryItem, InstagramPost } from "../types";

// Default Gallery Items to seed if Firestore is empty
export const defaultGalleryItems: GalleryItem[] = [
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
  },
  {
    id: 'photo_7',
    url: '/src/assets/images/photo_7.PNG',
    title: "Community Events & Celebration Corner",
    category: 'celebration',
    aspectRatio: '3:4',
    description: "Celebrating physical milestones, member achievements, and birthdays with healthy gift hampers and positive community care."
  }
];

// Default Instagram Posts to seed if Firestore is empty
export const defaultInstagramPosts: InstagramPost[] = [
  {
    id: 'post_1',
    imageUrl: '/src/assets/images/social_media_1.jpg',
    caption: "Our custom arched mirror with neon pink lighting is officially the favorite selfie spot! 💖 Capture your post-workout glow and tag us in your stories! Making women stronger and glowing every single day. 🤸🏻‍♀️✨ #womensownfitnessclub #karachigym #womenstronger #glowup #fitnessjourney",
    likes: 248,
    commentsCount: 2,
    date: "2 HOURS AGO",
    link: "https://www.instagram.com/womensownfitnessclub",
    comments: [
      "Love the neon lights! Best mirror spot in town 😍",
      "I feel so energized after training here!"
    ]
  },
  {
    id: 'post_2',
    imageUrl: '/src/assets/images/social_media_2.jpg',
    caption: "Step out of your comfort zone and build unmatched physical stability! Suspension training works on your core, stabilizer muscles, and physical mobility. Fully guided by Romana Imran. 🏋️‍♀️💪 #pilatesrope #coreconditioning #womensfitness #karachifit",
    likes: 184,
    commentsCount: 2,
    date: "1 DAY AGO",
    link: "https://www.instagram.com/womensownfitnessclub",
    comments: [
      "These rings are awesome! Highly recommend Romana baji's training.",
      "The suspension workout completely changed my posture."
    ]
  },
  {
    id: 'post_3',
    imageUrl: '/src/assets/images/social_media_3.jpg',
    caption: "Strength training is not about lifting heavy blindly — it is about perfect alignment, dedicated progression, and posture corrections. Join our next strength coaching batch today! 🏋️‍♀️✨ #weightliftingforwomen #strengthmatters #motivation #gulbergtown",
    likes: 312,
    commentsCount: 2,
    date: "3 DAYS AGO",
    link: "https://www.instagram.com/womensownfitnessclub",
    comments: [
      "Awesome dumbells rack, really clean and organized!",
      "I lost 3 kg in my very first week here! Highly recommended!"
    ]
  },
  {
    id: 'post_4',
    imageUrl: '/src/assets/images/social_media_4.jpg',
    caption: "Happy Birthday to one of our champion members! 🎂🎉 At Women's Own, we celebrate your achievements, birthdays, and milestones because we are a family. Grateful for this amazing supportive sisterhood! 💕 #gymcommunity #sisterhood #milestones #celebratelife",
    likes: 415,
    commentsCount: 2,
    date: "5 DAYS AGO",
    link: "https://www.instagram.com/womensownfitnessclub",
    comments: [
      "You guys are the sweetest! Best community ever 💕",
      "Such a motivating place to workout."
    ]
  },
  {
    id: 'post_5',
    imageUrl: '/src/assets/images/social_media_5.jpg',
    caption: "Yoga & Pilates help stabilize your mind and elongate your muscles. A peaceful corner in our studio to center yourself. Romana baji is here to coach you through breathing loops and structural mobility! 🧘🏻‍♀️✨ #yoga #pilates #mindfulness #karachiyoga",
    likes: 156,
    commentsCount: 1,
    date: "1 WEEK AGO",
    link: "https://www.instagram.com/womensownfitnessclub",
    comments: [
      "Beautiful prints, love the vibe of the studio."
    ]
  }
];

/**
 * Compresses an image file before base64 upload to stay within document limit
 */
export function compressImage(file: File, maxWidth = 800, maxHeight = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => {
        reject(err);
      };
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
}

/**
 * Fetch all gallery items from Firestore, seeding them if database is empty.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const colRef = collection(db, "gallery_items");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.log("Seeding default gallery items into Firebase...");
      const batch = writeBatch(db);
      defaultGalleryItems.forEach((item, index) => {
        const docRef = doc(db, "gallery_items", item.id);
        // Add a timestamp or order field for consistent ordering
        batch.set(docRef, { ...item, order: index });
      });
      await batch.commit();
      return defaultGalleryItems;
    }

    const items: GalleryItem[] = [];
    snapshot.forEach((d) => {
      items.push({ id: d.id, ...d.data() } as GalleryItem);
    });
    
    // Sort items consistently (by id, order, or alphabetical)
    return items.sort((a, b) => {
      const orderA = (a as any).order ?? 99;
      const orderB = (b as any).order ?? 99;
      return orderA - orderB;
    });
  } catch (error) {
    console.error("Firestore getGalleryItems error, falling back to local files:", error);
    return defaultGalleryItems;
  }
}

/**
 * Adds a new gallery item to Firestore
 */
export async function addGalleryItem(item: GalleryItem): Promise<void> {
  const docRef = doc(db, "gallery_items", item.id);
  // Give it a higher order number so it appears last or first
  await setDoc(docRef, {
    ...item,
    order: Date.now()
  });
}

/**
 * Fetch all Instagram posts from Firestore, seeding them if database is empty.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const colRef = collection(db, "instagram_posts");
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.log("Seeding default Instagram posts into Firebase...");
      const batch = writeBatch(db);
      defaultInstagramPosts.forEach((post, index) => {
        const docRef = doc(db, "instagram_posts", post.id);
        batch.set(docRef, { ...post, order: index });
      });
      await batch.commit();
      return defaultInstagramPosts;
    }

    const posts: InstagramPost[] = [];
    snapshot.forEach((d) => {
      posts.push({ id: d.id, ...d.data() } as InstagramPost);
    });

    return posts.sort((a, b) => {
      const orderA = (a as any).order ?? 99;
      const orderB = (b as any).order ?? 99;
      return orderA - orderB;
    });
  } catch (error) {
    console.error("Firestore getInstagramPosts error, falling back to local data:", error);
    return defaultInstagramPosts;
  }
}

/**
 * Adds a new Instagram post to Firestore
 */
export async function addInstagramPost(post: InstagramPost): Promise<void> {
  const docRef = doc(db, "instagram_posts", post.id);
  await setDoc(docRef, {
    ...post,
    order: -Date.now() // Negative timestamp so newer posts appear first!
  });
}

/**
 * Appends a comment to an Instagram post
 */
export async function addPostComment(postId: string, comment: string): Promise<void> {
  const docRef = doc(db, "instagram_posts", postId);
  await updateDoc(docRef, {
    comments: arrayUnion(comment),
    commentsCount: increment(1)
  });
}

/**
 * Updates likes count on a post
 */
export async function updatePostLikes(postId: string, likeIncrement: number): Promise<void> {
  const docRef = doc(db, "instagram_posts", postId);
  await updateDoc(docRef, {
    likes: increment(likeIncrement)
  });
}
