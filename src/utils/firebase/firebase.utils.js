import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


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
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// create db
export const db = getFirestore();

// store athentication information into firestore
export const createUserDocumentFromAuth = async (userAuth) => {
    console.log('auth method')
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);

    if(!userSnapShot.exists()){
        const{displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            });
        } catch(err){
            console.log('error creating th user', err.message)
        }
    }

    return userDocRef;
}