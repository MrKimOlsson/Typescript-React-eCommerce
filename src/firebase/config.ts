import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA6k-ylg8K7EFjvZ0s-foLlNi6Ir_rKeWY",
  authDomain: "typescript-ecommerce.firebaseapp.com",
  projectId: "typescript-ecommerce",
  storageBucket: "typescript-ecommerce.appspot.com",
  messagingSenderId: "880704418517",
  appId: "1:880704418517:web:2624e8791b9a49c197e85c",
  measurementId: "G-QC9L1P25JE"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export { db }