// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"; // for the apps
import { getFirestore } from "firebase/firestore"; // 
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for() Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNk3dd4cjbZHSvIlO591hsP_OaePmpdOc",
  authDomain: "twitter-clone-8330e.firebaseapp.com",
  projectId: "twitter-clone-8330e",
  storageBucket: "twitter-clone-8330e.appspot.com",
  messagingSenderId: "412532064311",
  appId: "1:412532064311:web:f4bef3d5f473481aa07fb2"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp(); // this getApps() is used because e are using next.js
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };

