import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDEmIitTiL8x2ZXfiKxwMK0L31dTVE_2QI",
  authDomain: "papiacumie-752ad.firebaseapp.com",
  projectId: "papiacumie-752ad",
  storageBucket: "papiacumie-752ad.appspot.com",
  messagingSenderId: "728783537675",
  appId: "1:728783537675:web:cc3576eea7c3992fa5e90e",
  measurementId: "G-39GFJWKYJZ",
};
// Initialize Firebase
firebase.initializeApp(config);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage, firebase };
