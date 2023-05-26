// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function getData<T>(collectionName: string) {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, orderBy("created", "desc"));
  try {
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return data as T[];
  } catch (error) {
    console.error(error);
  }
}

export async function saveData(collectionName: string, payload: object): Promise<void> {
  const collectionRef = collection(db, collectionName);
  try {
    const docRef = await addDoc(collectionRef, payload);
    console.log(`New item was added on ${collectionName} collection with ID ${docRef.id}`);
  } catch (error) {
    console.error(error);
  }
}

export async function getDocDataById<T>(collectionName: string, docId: string) {
  const docRef = doc(db, collectionName, docId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as T;
    }
  } catch (error) {
    console.log(error);
  }
}
