// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcN48xry_0i11l6RkoqkMwp2DXCPn6KKk",
  authDomain: "user-email-password-auth-34b5a.firebaseapp.com",
  projectId: "user-email-password-auth-34b5a",
  storageBucket: "user-email-password-auth-34b5a.appspot.com",
  messagingSenderId: "749469327096",
  appId: "1:749469327096:web:c8b5e8537715f3783f250d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;