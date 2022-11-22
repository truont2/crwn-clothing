import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch, 
  getDocs
} from "firebase/firestore";

// Your web app's Firebase configuration
// identifies the library that abstracts the functionality of what we need in order to use firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwM5K14Ae4g8hqQj8nl9spGyPWBV0GAfU",
  authDomain: "crwn-clothing-db-babde.firebaseapp.com",
  projectId: "crwn-clothing-db-babde",
  storageBucket: "crwn-clothing-db-babde.appspot.com",
  messagingSenderId: "205851609771",
  appId: "1:205851609771:web:81579f8dd5ad5f9386c5ee",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// for google signin
// googauthprovider is a class that is connected to google authentication
// may want to provide multiple providers
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
// we know google provider becuase we are using the google provider
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// create db
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  // try to store all the documents in a single transaction
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    // get the document reference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesandDocuments = async () => {
  const q = collection(db, "categories");

  const querySnapshot = await getDocs(q)
  // this way returns the data of categories as an array
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data())

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const {title, items} = docSnapshot.data();

  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});



  // return categoryMap;
};

// store athentication information into firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      // additional information needed if we signup and there is no display name
      // use the additional information in order to pass it in
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  return userDocRef;
};

// create an authenticated user
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // check edge case to see if email and password is not present
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in auth user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // check edge case to see if email and password is not present
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// tells firebase what user to sign out in firebase
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
