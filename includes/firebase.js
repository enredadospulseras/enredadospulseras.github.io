    
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQROFdgG07yPocuES6XdMRQU2f_JIhMpQ",
  authDomain: "enredados-5586b.firebaseapp.com",
  projectId: "enredados-5586b",
  storageBucket: "enredados-5586b.firebasestorage.app",
  messagingSenderId: "638938736750",
  appId: "1:638938736750:web:d394085e25b36e1c231e7f",
  measurementId: "G-SKGQVDWTSV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
