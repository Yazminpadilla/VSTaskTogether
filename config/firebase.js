// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import Constants from 'expo-constants';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  databaseURL: Constants.manifest?.extra?.firebaseDatabaseUrl,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service 
// From: https://firebase.google.com/docs/auth/web/start#web-version-9
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
// From: https://firebase.google.com/docs/database/web/start
//export const database = getDatabase(app);

// Initialize Cloud Firestore Database and get a reference to the service
// https://firebase.google.com/docs/firestore
export const db = getFirestore(app);

// https://stackoverflow.com/questions/36426521/what-does-export-default-do-in-jsx
export default app;

