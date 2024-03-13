import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBRbN0fCckRYMV_s9WhX-4-5kD1o3dPSQI",
  authDomain: "crown-clothing-db-4e86b.firebaseapp.com",
  projectId: "crown-clothing-db-4e86b",
  storageBucket: "crown-clothing-db-4e86b.appspot.com",
  messagingSenderId: "745051804860",
  appId: "1:745051804860:web:566923b73c5f1b5cc6ecb9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async () => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}