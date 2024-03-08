import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

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

}