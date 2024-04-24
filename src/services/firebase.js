// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBH5xrG4Qon_JWqpR2BTJkVhx-1Qbh9ZC0",
    authDomain: "poll-d618d.firebaseapp.com",
    projectId: "poll-d618d",
    storageBucket: "poll-d618d.appspot.com",
    messagingSenderId: "1037773520202",
    appId: "1:1037773520202:web:08f207b150f666cb8215b3"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const storage = getStorage();

export const db = getFirestore();
