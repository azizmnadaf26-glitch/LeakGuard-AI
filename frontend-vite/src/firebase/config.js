import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration using placeholder keys
const firebaseConfig = {
    apiKey: "AIzaSyAtZE9s-TvHG9h5nBtFXxUAd9XJSsJimJ4",
    authDomain: "demoproject-3aff6.firebaseapp.com",
    projectId: "demoproject-3aff6",
    storageBucket: "demoproject-3aff6.firebasestorage.app",
    messagingSenderId: "888354921855",
    appId: "1:888354921855:web:c80bdf46d4f0a11c6b0e4a",
    measurementId: "G-Y93JQSGT37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
