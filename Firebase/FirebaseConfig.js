import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8UUPJIboES0EAUHl1lq-enG8eW74XvOM",
    authDomain: "upanna-224ba.firebaseapp.com",
    projectId: "upanna-224ba",
    storageBucket: "upanna-224ba.appspot.com",
    messagingSenderId: "793418253142",
    appId: "1:793418253142:web:8e2f39f093bfdd92200cf7"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebaseConfig, firebase }
