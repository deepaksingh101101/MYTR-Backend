// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOLQVCZfwGMsMVj9_71QySlC7Bo7cvDbA",
  authDomain: "mytr-ce71a.firebaseapp.com",
  projectId: "mytr-ce71a",
  storageBucket: "mytr-ce71a.appspot.com",
  messagingSenderId: "1000598368389",
  appId: "1:1000598368389:web:2ad9553a754d8a1636f9ec",
  measurementId: "G-X7K9Y94X58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

