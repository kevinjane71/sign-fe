// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9JzIJb0BOCQrYqD7_caCC7J83zZBbZns",
  authDomain: "meetsynk-7b9ec.firebaseapp.com",
  projectId: "meetsynk-7b9ec",
  storageBucket: "meetsynk-7b9ec.firebasestorage.app",
  messagingSenderId: "895565222127",
  appId: "1:895565222127:web:f8c3aa0dc003dfa7314b1a",
  measurementId: "G-EDT3SNSN97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
