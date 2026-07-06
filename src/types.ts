export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
  tag?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'facilities' | 'equipment' | 'sessions' | 'celebration';
  aspectRatio: '1:1' | '16:9' | '3:4' | '4:3';
  description: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  date: string;
  link: string;
}

export interface GymClass {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
  schedule: string;
}
