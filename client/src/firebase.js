// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-8bf30.firebaseapp.com",
  projectId: "mern-estate-8bf30",
  storageBucket: "mern-estate-8bf30.appspot.com",
  messagingSenderId: "327034822392",
  appId: "1:327034822392:web:7ed809dd0d3ecad3aa250d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);