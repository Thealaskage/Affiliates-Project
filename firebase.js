// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { 
    collection,
    getFirestore,
    addDoc,
    getDocs,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
    
// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyCanGXtePHqKmmlTXJXqf3VgCRUoJfCyZs",
authDomain: "affilliers.firebaseapp.com",
projectId: "affilliers",
storageBucket: "affilliers.appspot.com",
messagingSenderId: "566986456653",
appId: "1:566986456653:web:b63e91a53891500e29a604"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveAffillier = (firstName, lastName, password, phone, DNI) => {
    addDoc(collection(db, "users"), {firstName, lastName, password, phone, DNI});
}

export const getAffilliers = () => getDocs(collection(db, "users"));

export const onGetAfilliers = (callback) => onSnapshot(collection(db, "users"), callback);

