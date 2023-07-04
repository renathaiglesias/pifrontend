import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwLLbSMtkNSrQdiDdQakoLMlIiXXpLhVk",
  authDomain: "reciclaapp-acc7b.firebaseapp.com",
  projectId: "reciclaapp-acc7b",
  storageBucket: "reciclaapp-acc7b.appspot.com",
  messagingSenderId: "656647765364",
  appId: "1:656647765364:web:49626d16482ce404d90021",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Obtenha a instância de autenticação
const auth = getAuth(app);

// Obtenha a instância do Firestore
const firestore = getFirestore(app);

// Obtenha a instância do Storage
const storage = getStorage(app);

// Exporte as instâncias de autenticação, Firestore e Storage
export { auth, firestore, storage, firebaseConfig };