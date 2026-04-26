import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyCDYXyT8LvNO_HOnN7CxRvyeE7-uRnOT_s",
    authDomain: "bq-store-admin.firebaseapp.com",
    projectId: "bq-store-admin",
    storageBucket: "bq-store-admin.firebasestorage.app",
    messagingSenderId: "932387767661",
    appId: "1:932387767661:web:26c8e7f5f812c47fecc664"
  };

  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);