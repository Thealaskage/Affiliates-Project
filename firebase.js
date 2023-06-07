// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  onSnapshot,
  where,
  query,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXJOEaEHdulFsBmikU_CsMm4pPYrdZXec",
  authDomain: "pizzeria-delicia-60823.firebaseapp.com",
  projectId: "pizzeria-delicia-60823",
  storageBucket: "pizzeria-delicia-60823.appspot.com",
  messagingSenderId: "467980380873",
  appId: "1:467980380873:web:8790a57c73b76537403b18",
  measurementId: "G-CKJT0TPVF3",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export const saveAffillier = async (firstName, lastName, password, phone, DNI) => {
  try {
    const docRef = await addDoc(collection(db, "ambassadors"), { firstName, lastName, password, phone, DNI });
    return docRef;
  } catch (error) {
    console.error(error);
    throw new Error("Hubo un error al guardar el afiliado.");
  }
};

export const getAffilliers = () => getDocs(collection(db, "ambassadors"));

export const onGetAfilliers = (callback) =>
  onSnapshot(collection(db, "ambassadors"), callback);

// Función para verificar si el número de teléfono ya existe en la base de datos
export const checkIfPhoneExists = async (phone) => {
  const querySnapshot = await getDocs(
    query(collection(db, "ambassadors"), where("phone", "==", phone))
  );
  return querySnapshot.size > 0;
};

// Función para verificar si el DNI ya existe en la base de datos
export const checkIfDNIExists = async (DNI) => {
  const querySnapshot = await getDocs(
    query(collection(db, "ambassadors"), where("DNI", "==", DNI))
  );
  return querySnapshot.size > 0;
};
