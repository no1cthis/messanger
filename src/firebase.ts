// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAejfghQpNEI-5VddjmItZa39bHSZ3qOkE",
  authDomain: "tg-clone-e96e0.firebaseapp.com",
  projectId: "tg-clone-e96e0",
  dataBaseURL: "http://tg-clone-e96e0.firebaseapp.com",
  storageBucket: "tg-clone-e96e0.appspot.com",
  messagingSenderId: "1060894640595",
  appId: "1:1060894640595:web:403f1417301c3e1a138726",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
