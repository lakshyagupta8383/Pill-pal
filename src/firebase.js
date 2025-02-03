// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRNH4dhFmwkTPzvM_l67sfmzvtuEowjaY",
  authDomain: "pill-pal-abdd3.firebaseapp.com",
  projectId: "pill-pal-abdd3",
  storageBucket: "pill-pal-abdd3.firebasestorage.app",
  messagingSenderId: "902487506603",
  appId: "1:902487506603:web:4f532f064aa949b2cc41ee",
  measurementId: "G-J5KJ1H6TSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
export { auth, googleProvider };
