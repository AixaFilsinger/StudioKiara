// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDeK4-6Ibu5YUA5899ANe8VtK94uieinSc",
    authDomain: "studiokiara.firebaseapp.com",
    projectId: "studiokiara",
    storageBucket: "studiokiara.appspot.com",
    messagingSenderId: "1078989789672",
    appId: "1:1078989789672:web:77ac7269eb59eaca98ec5d",
    measurementId: "G-JT0RBHWBTT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
