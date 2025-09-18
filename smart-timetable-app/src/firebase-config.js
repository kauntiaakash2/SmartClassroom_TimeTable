// Centralized Firebase initialization.
// Ensure you have your .env variables set (see .env.example).

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAm7aeIC5fB7xqewvSG6Gb9WoYPQ5o7ADg",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "sih28-9692b.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "sih28-9692b",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "sih28-9692b.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "728552280045",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:728552280045:web:887ac9c1972f58f16521e4",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
export default app;