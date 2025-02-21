import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_KEY,
  authDomain: "toko-teguh-3d583.firebaseapp.com",
  projectId: "toko-teguh-3d583",
  storageBucket: "toko-teguh-3d583.firebasestorage.app",
  messagingSenderId: "463676316455",
  appId: "AIzaSyCRO8O10IU7ZNOJCkvo_P6yzbGmXhWgt7U",
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const db = getFirestore(app);

export { db };