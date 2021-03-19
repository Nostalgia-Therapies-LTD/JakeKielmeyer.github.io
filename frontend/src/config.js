import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAzJtyyhhXUj2cFikqsfbRhtFjAoa21UCY",
  authDomain: "nostalgiadev-1f319.firebaseapp.com",
  databaseURL: "https://nostalgiadev-1f319.firebaseio.com",
  projectId: "nostalgiadev-1f319",
  storageBucket: "nostalgiadev-1f319.appspot.com",
  messagingSenderId: "300938565566",
  appId: "1:300938565566:web:0ca714470c623a5a7ccbef",
  measurementId: "G-LE3W9VF6VC",
};

firebase.initializeApp(config);
const storage = firebase.storage();
const apiUrl = "https://us-central1-nostalgiadev-1f319.cloudfunctions.net/api";
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export {config, db, storage, timestamp, apiUrl };
