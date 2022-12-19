import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA2j-A5mDQgecO18vx4hC70YCAkp7pCYwo",
  authDomain: "cp-rideshare.firebaseapp.com",
  databaseURL: "https://cp-rideshare-default-rtdb.firebaseio.com",
  projectId: "cp-rideshare",
  storageBucket: "cp-rideshare.appspot.com",
  messagingSenderId: "589652997216",
  appId: "1:589652997216:web:7416fd4b5e3cad1e5aff05",
  measurementId: "G-BFSE8VHQBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { app, auth, db, storage };