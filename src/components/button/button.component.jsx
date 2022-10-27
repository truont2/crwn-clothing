import './button.styles.scss'

/*
there are three types of buttons
maybe control the styling for the button by using classes
*/

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in', 
    inverted: 'inverted'
}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
    )
};

export default Button;