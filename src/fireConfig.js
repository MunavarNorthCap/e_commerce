import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAw6PAf0d9KMzVgTaYYBLyNkTOuPIQ19VU",
  authDomain: "e-commerce-db-a31fa.firebaseapp.com",
  projectId: "e-commerce-db-a31fa",
  storageBucket: "e-commerce-db-a31fa.appspot.com",
  messagingSenderId: "188590511271",
  appId: "1:188590511271:web:d73ba362d8e6648160b782",
  measurementId: "G-PWND86M5SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const fireDB = getFirestore(app);

export default fireDB;