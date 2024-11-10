// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyAVNbLS7XI52RNmr4DP9udNZQF3qdlRkRA",
authDomain: "furniture-storage-b50bc.firebaseapp.com",
projectId: "furniture-storage-b50bc",
storageBucket: "furniture-storage-b50bc.appspot.com",
messagingSenderId: "740895611769",
appId: "1:740895611769:web:7b3a99f76927abc0ed6da8",
measurementId: "G-J0MSLWV33T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//npm install firebase
//npm install -g firebase-tools