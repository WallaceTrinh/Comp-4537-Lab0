// Firebase Functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Web app's Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1MNSGhQaaUN7IcIINWOmcaTkcjMpgn6E",
  authDomain: "wallacetrinh-comp4537-la-67efb.firebaseapp.com",
  projectId: "wallacetrinh-comp4537-la-67efb",
  storageBucket: "wallacetrinh-comp4537-la-67efb.appspot.com",
  messagingSenderId: "91192378604",
  appId: "1:91192378604:web:20a0ba15facf04459f91c9",
  measurementId: "G-LFHKFMRF8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the Firebase app and analytics objects
export { app, analytics };
