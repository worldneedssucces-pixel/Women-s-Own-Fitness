/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCMCRhmDA_T1G5bN9orOLvlZ11CB9pTqk4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "inspired-optics-z4wsx.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "inspired-optics-z4wsx",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "inspired-optics-z4wsx.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "117348418157",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:117348418157:web:3c7fd63b822f07f8eef564"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore. If custom db ID is provided, use it, otherwise fallback to default or "default" (undefined)
const dbId = import.meta.env.VITE_FIREBASE_DATABASE_ID || "ai-studio-womensownfitness-a1efb1b3-2d87-481b-8680-de94411f5373";
const db = getFirestore(app, dbId === "default" ? undefined : dbId);

export { app, db };
