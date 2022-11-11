import { useState} from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";


import {SignInContainer, ButtonContainer} from "./sign-in-form.styles.jsx";


import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";


// initalize default values of the form state instead of doing it inside of the component
const defaultFormFields = {
  email: "",
  password: "",
};

const SignInWithGoogle = async () => {
  await signInWithGooglePopup();
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    // spread in the previous values and only update what we are targeting
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await signInAuthUserWithEmailAndPassword(email, password);
        resetFormFields();
    } catch (error) {
        switch (error.code) {
            case 'auth/wrong-password':
              alert('incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert('no user associated with this email');
              break;
            default:
              console.log(error);
          }
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account</h2>
      <span>Sign in with your email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <ButtonContainer>
          <Button type="submit">Sign In</Button>
          {/* need type button becuase buttons are default submit */}
          <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={SignInWithGoogle} >
            Google sign in
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
