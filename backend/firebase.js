import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage}  from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAdpgEWVWRbgm6yyA-xZdf_fvJZF8ss3yc",
  authDomain: "catering-dab00.firebaseapp.com",
  projectId: "catering-dab00",
  storageBucket: "catering-dab00.appspot.com",
  messagingSenderId: "613340262090",
  appId: "1:613340262090:web:2d998a1508a7dd92d28e33",
  measurementId: "G-RVK489QY4J"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db,storage,app };