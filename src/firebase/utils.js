import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { doc, getDoc, setDoc, addDoc, collection, query, where, getDocs, deleteDoc, updateDoc, orderBy, limit } from "firebase/firestore"; 

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut, addDoc, collection, query, where, getDocs, deleteDoc, doc, getDoc, updateDoc, orderBy, limit };


export const fetchUserProfile = async (userAuth) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  const userRef = doc(db, 'users', uid);
  return userRef;
};

export const getSnapshot = async (userRef) => {
  const snapshot = await getDoc(userRef);
  return snapshot;
}

export const createUserProfile = async (userAuth, additionalData) => {
  const { displayName, email, uid } = userAuth;
  const timestamp = new Date();
  const userRoles = ['user'];

  let userDataObj = {
    displayName,
    email,
    createdDate: timestamp,
    userRoles,
    ...additionalData
  }

  try {
    await setDoc(doc(db, "users", uid), userDataObj);

  } catch (e) {
    console.error("Error adding document: ", e);
  }

  const userRef = doc(db, 'users', uid);

  return userRef;
}