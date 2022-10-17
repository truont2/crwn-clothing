import {auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils.js'
// import { useEffect } from 'react';
// import {getRedirectResult} from 'firebase/auth'


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    // when application remounts, run the useEffect and get the response for the redirect that just happened which is based on auth
    // useEffect(() => {
    //     const redirect = async () => {
    //         const response = await getRedirectResult(auth);
    //         if(response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //     redirect();
    // },[])

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn;