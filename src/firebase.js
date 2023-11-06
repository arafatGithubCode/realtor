// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF5NSlytfpNh1kgzyRW7QAqpE6AJOxeLI",
  authDomain: "realtor-58dc2.firebaseapp.com",
  projectId: "realtor-58dc2",
  storageBucket: "realtor-58dc2.appspot.com",
  messagingSenderId: "754866600935",
  appId: "1:754866600935:web:ebe1e8cec899635c3b5b42",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
