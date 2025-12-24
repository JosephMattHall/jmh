// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgBdcE0THmiBk0IsAa120i1ygX95_ft_M",
  authDomain: "personal-a9604.firebaseapp.com",
  projectId: "personal-a9604",
  storageBucket: "personal-a9604.firebasestorage.app",
  messagingSenderId: "471227798396",
  appId: "1:471227798396:web:f4bae89399894f3a47caf9",
  measurementId: "G-R62E7KWXMK"
};

import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const db = getFirestore(app);
import { getAuth } from "firebase/auth";
export const auth = getAuth(app);
export default app;