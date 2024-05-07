// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj8mBKyPSZaQI34gbkC6kG_cEGm8wkuxg",
  authDomain: "car-doctor-m-57-58.firebaseapp.com",
  projectId: "car-doctor-m-57-58",
  storageBucket: "car-doctor-m-57-58.appspot.com",
  messagingSenderId: "485283803244",
  appId: "1:485283803244:web:bd831342b0991bf097e849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth  = getAuth(app);
export default auth



// existing project car-doctor-m-57-58 
