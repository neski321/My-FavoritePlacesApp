// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABVKDNX-Ae8ZHlI3ge75Cu2wL8bQ0y9N4",
  authDomain: "nesproject-a8e8c.firebaseapp.com",
  projectId: "nesproject-a8e8c",
  storageBucket: "nesproject-a8e8c.appspot.com",
  messagingSenderId: "755297941633",
  appId: "1:755297941633:web:9aaeefa1a20a2cc846b580"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth, signInWithEmailAndPassword};