// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkcx80Bf5SQ5fzS-gkKzckRGSSzJRUnMA",
  authDomain: "netflixgpt-385af.firebaseapp.com",
  projectId: "netflixgpt-385af",
  storageBucket: "netflixgpt-385af.appspot.com",
  messagingSenderId: "1058323487899",
  appId: "1:1058323487899:web:8ccb5ebf92f933dea1ba3e",
  measurementId: "G-YEXFLZ4R8P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
