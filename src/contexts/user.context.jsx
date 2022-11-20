import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from '../utils/reducer/reducer.utils';

// the actual value u want to access
// base emtpy state of the object
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null
})

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    const {type, payload} = action;

    // conditionally return a object based on the type passed through
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return{
                ...state, //grab previous values
                currentUser: payload
            }
        default: 
            // throw an error
            throw new Error(`Unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {currentUser: null}

// function to pass data through to the children 
export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state;
    console.log(currentUser)
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }


    // const [currentUser, setCurrentUser] = useState(null)

    const value = {currentUser, setCurrentUser};

    useEffect(()=> {
        const unsubscribe = onAuthStateChangedListener((user) => {
            console.log(user);
            // create user when auth object changes in firebase 
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
