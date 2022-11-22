import  USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = { currentUser: null };

// no use reducer hook so we need to set the intiial value of the state in the reducer
// all reducers react to every action
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  // conditionally return a object based on the type passed through
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state, //grab previous values
        currentUser: payload,
      };
    default:
      // throw an error
      // by returning state, then we know that this part o fthe reducer did not change
      return state;
  }
};
