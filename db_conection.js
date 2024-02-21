// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJXnbqk4rUaxdVVJiYkSPTS3_n4c4MvNU",
    authDomain: "customer-control-8cda0.firebaseapp.com",
    projectId: "customer-control-8cda0",
    storageBucket: "customer-control-8cda0.appspot.com",
    messagingSenderId: "572060255541",
    appId: "1:572060255541:web:6b3b1c585aa81d426fb87c"};
// --------------------------
// Initialize Firebase
// --------------------------
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

// --------------------------
// ----- action company -----
// --------------------------
export const onGetCompany = (callback) =>
    onSnapshot(collection(db, "company"), callback);

// --------------------------
// ---- clients actions -----
// -------------------------- 
    
// ----- CREATE CLIENT-----
export const saveClients = (client) => addDoc(collection(db, "clients"), client)
    
// ----- DELETE CLIENT-----
export const deleteClient = (id) => deleteDoc(doc(db, "clients", id));
    
// ---- GET CLIENT ------ 
export const onGetClients = (callback) => onSnapshot(collection(db, "clients"), callback);
export const getClient = (id) => getDoc(doc(db, "clients", id));

// ---- WRITE CLIENT ------ 

export const writeClients = (id, fields) => updateDoc(doc(db, "clients", id), fields);