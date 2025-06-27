// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GEMINI_API_KEY } from "./constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: GEMINI_API_KEY,
  authDomain: "flixipedia-c7a6d.firebaseapp.com",
  projectId: "flixipedia-c7a6d",
  storageBucket: "flixipedia-c7a6d.firebasestorage.app",
  messagingSenderId: "527317056943",
  appId: "1:527317056943:web:3dfa202d66769db881835a",
  measurementId: "G-29V19EXQ7X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
