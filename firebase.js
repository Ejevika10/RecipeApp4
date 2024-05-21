import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyADa3BN0ODKa0LMjK06Z-sFe7Xf0F9Oamc",
    authDomain: "lab1-b5a75.firebaseapp.com",
    databaseURL: "https://lab1-b5a75-default-rtdb.firebaseio.com",
    projectId: "lab1-b5a75",
    storageBucket: "lab1-b5a75.appspot.com",
    messagingSenderId: "332358092582",
    appId: "1:332358092582:web:0245e08e994001c847e3e7"
  };
  
const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);
export const db = getDatabase(app);
export const st = getStorage(app);
