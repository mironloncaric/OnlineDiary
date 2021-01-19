import firebase from 'firebase/app'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNAS7v6aaMLsZYqajYDgORs3ijpM499Y4",
  authDomain: "onlinediary-3a1a7.firebaseapp.com",
  projectId: "onlinediary-3a1a7",
  storageBucket: "onlinediary-3a1a7.appspot.com",
  messagingSenderId: "542664201733",
  appId: "1:542664201733:web:9f99e68a8ed6b547966e6c",
  measurementId: "G-LJXZTWVJM3"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()