
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
//deped
const firebaseConfig = {
  apiKey: "AIzaSyCl6g517ODmAb21kXKIoxq6Q1RrYTFKr1o",
  authDomain: "ecomtrial-a1a3f.firebaseapp.com",
  projectId: "ecomtrial-a1a3f",
  storageBucket: "ecomtrial-a1a3f.appspot.com",
  messagingSenderId: "303919159179",
  appId: "1:303919159179:web:a9cc0cdef60bb77406418e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)