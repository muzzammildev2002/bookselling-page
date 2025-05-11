// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUdVip-RnABo2hVCEAq-pMx3Ymx9BuQv4",
  authDomain: "mid-hackathon-baff8.firebaseapp.com",
  databaseURL: "https://mid-hackathon-baff8-default-rtdb.firebaseio.com",
  projectId: "mid-hackathon-baff8",
  storageBucket: "mid-hackathon-baff8.appspot.com",
  messagingSenderId: "458283374734",
  appId: "1:458283374734:web:08d592a3290475940451df",
  measurementId: "G-3XLC4H0XQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };