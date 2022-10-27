// import { useEffect } from 'react';
// import {getRedirectResult} from 'firebase/auth'

import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";
import SignInForm from "../../components/sign-in-form/sign-in-form.component.jsx";
import "./authentication.styles.scss";

const Authentication = () => {
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
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
