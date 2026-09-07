import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy, query, onSnapshot } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXuwFEJJJr9tB-gH71VjhaNp37SrYapiI",
  authDomain: "symmetric-quota-t6ppv.firebaseapp.com",
  projectId: "symmetric-quota-t6ppv",
  storageBucket: "symmetric-quota-t6ppv.firebasestorage.app",
  messagingSenderId: "184236456564",
  appId: "1:184236456564:web:bab4c2ccf48f608ade2f21"
};

const app = initializeApp(firebaseConfig);

// Specify the custom databaseId since we are in the multi-db AI Studio environment
export const db = getFirestore(app, "ai-studio-graphicdesignpor-bb985125-ab12-4af4-82df-3caf03418c40");
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export interface ProjectData {
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  order: number;
  createdAt?: any;
}

export interface SocialLinkData {
  id?: string;
  platform: string; // 'LinkedIn', 'GitHub', 'Behance', 'Instagram', 'WhatsApp'
  url: string;
  order: number;
}
