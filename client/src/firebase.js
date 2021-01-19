import firebase from 'firebase/app'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = (process.env.NODE_ENV === 'production') ? 
{
  apiKey: "AIzaSyCNAS7v6aaMLsZYqajYDgORs3ijpM499Y4",
  authDomain: "onlinediary-3a1a7.firebaseapp.com",
  projectId: "onlinediary-3a1a7",
  storageBucket: "onlinediary-3a1a7.appspot.com",
  messagingSenderId: "542664201733",
  appId: "1:542664201733:web:9f99e68a8ed6b547966e6c",
  measurementId: "G-LJXZTWVJM3"
} :
{
  apiKey: "AIzaSyCNAS7v6aaMLsZYqajYDgORs3ijpM499Y4",
  authDomain: "onlinediary-3a1a7.firebaseapp.com",
  projectId: "onlinediary-3a1a7",
  storageBucket: "onlinediary-3a1a7.appspot.com",
  messagingSenderId: "542664201733",
  appId: "1:542664201733:web:ca846eaab1edca19966e6c",
  measurementId: "G-HT3D0RWZJJ"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth()