import {BaseButton, InvertedButton, GoogleSignInButton}  from './button.styles.jsx'

/*
there are three types of buttons
maybe control the styling for the button by using classes
*/

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in', 
    inverted: 'inverted'
}
// default button is base
const getButton = (buttonType= BUTTON_TYPE_CLASSES.base) => 
    // returns a button type base on the button type string 
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

const Button = ({children, buttonType, ...otherProps}) => {
    // custon button is pointing to one of the three custom buttons
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...otherProps}>{children}</CustomButton>
    )
};

export default Button;