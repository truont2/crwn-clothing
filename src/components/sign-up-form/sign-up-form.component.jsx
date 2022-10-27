import {useState} from 'react'
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss'
import Button from '../button/button.component';


// initalize default values of the form state instead of doing it inside of the component
const defaultFormFields = {
    displayName: '', 
    email: '', 
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const[formFields, setFormFields ] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        // spread in the previous values and only update what we are targeting
        setFormFields({...formFields, [name]: value})
    }
    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(password, confirmPassword);
        if(password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            // call method to create auth user
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        }catch(err) {
            if(err.code === 'auth/email-already in use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log("user creation encountered an error", err);
            }
        }

    }

    return (
        <div className='sign-up-container'>
        <h2>Don't have an account</h2>
            <span>Sign up with your email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label='Email' type="email" required onChange={handleChange} name="email" value={email}/>
                <FormInput label='Password' type="password" required onChange={handleChange} name="password" value={password}/>

                {/* use name to uniquely identify each FormInput field */}
                <FormInput label='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;