  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
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
    appId: "1:638938736750:web:0072bb3dec709b66231e7f",
    measurementId: "G-6PVFWFZ5YM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);