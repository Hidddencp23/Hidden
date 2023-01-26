import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCyPBdH6MLUXPaMLvaFdrTLG7JAxQ41OqY",
  authDomain: "hidden-8849a.firebaseapp.com",
  projectId: "hidden-8849a",
  storageBucket: "hidden-8849a.appspot.com",
  messagingSenderId: "1091224521228",
  appId: "1:1091224521228:web:0c235d59021a85e81a7c29",
  measurementId: "G-KDP5HJ7226"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };