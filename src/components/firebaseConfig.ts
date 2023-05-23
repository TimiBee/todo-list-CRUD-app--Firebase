import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB2Mnz669pSezmF3owUwL_BPSm9RMFf2OA",
    authDomain: "todo-list-app-2a8be.firebaseapp.com",
    projectId: "todo-list-app-2a8be",
    storageBucket: "todo-list-app-2a8be.appspot.com",
    messagingSenderId: "517189314629",
    appId: "1:517189314629:web:206b83c96f6371789c1b2c",
    measurementId: "G-QMG7FW0DN1"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);