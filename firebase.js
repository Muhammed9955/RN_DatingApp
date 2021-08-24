import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcMQuAYlp_2n9hzUz8vgKvBk5_Ic9NkHE",
  authDomain: "datingapp-afd70.firebaseapp.com",
  projectId: "datingapp-afd70",
  storageBucket: "datingapp-afd70.appspot.com",
  messagingSenderId: "205026340048",
  appId: "1:205026340048:web:d57c0d76255e123bb842d5",
  measurementId: "G-65VB900BDB",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
