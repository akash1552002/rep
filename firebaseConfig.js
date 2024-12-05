// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRpVyc3kL-o8rztVJxzWiHDbe67SGb6OM",
  authDomain: "recipe-21791.firebaseapp.com",
  projectId: "recipe-21791",
  storageBucket: "recipe-21791.firebasestorage.app",
  messagingSenderId: "437265777745",
  appId: "1:437265777745:web:7851ff7a4092f07b3d6470"
};

export const app = initializeApp(firebaseConfig);

// Get the authentication service
export const auth = getAuth(app);