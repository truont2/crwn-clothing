import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";
// create your own middleware with chained currying funcitons
const loggerMiddleware = (store) => (next) => (action) => {
  // now where we write the middleware action
  if(!action.type)  {
    return next(action);
  }

  console.log('type',action.type)
  console.log('payload',action.payload)
  console.log('current state',store.getState())

  // to get the next satte, we need to run through the reducers 
  console.log('next state:', store.getState())
  next(action);
}


const middleWares = [loggerMiddleware];

// passes all the middlewares we have into apply middlewares method which is then composed into a functional componenet
// a way to pass multiple functions
// catch actions before they go into the reducer
const composedEnhancers = compose(applyMiddleware(...middleWares));

// store i s just here to facilitate the moving and passing of actions in the reducers
export const store = configureStore({
  reducer: rootReducer,
  middleware: middleWares,
});

// export const store = createStore(rootReducer, undefined, composedEnhancers);
