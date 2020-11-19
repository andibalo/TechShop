import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAIKCaP26jx4uAxcuEopnrDMgB4QnRbXtI",
    authDomain: "techshop-bf10b.firebaseapp.com",
    databaseURL: "https://techshop-bf10b.firebaseio.com",
    projectId: "techshop-bf10b",
    storageBucket: "techshop-bf10b.appspot.com",
    messagingSenderId: "309994779170",
    appId: "1:309994779170:web:9d1cb9542f19edc949107b",
    measurementId: "G-ZKXLQ0PYTL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
