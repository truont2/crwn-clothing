import { compose, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

// redux persist
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from "./root-reducer";

// only use logger in development, will return false if not in development and so we filter out anything that is not true
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

// redux persist setup
// configuration object
const persistConfig = {
  key: 'root', 
  storage: storage,
  blacklist: ['user']
}

// setuyp persist reducer
// pass into our store instead of the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// use redux dev tools 
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// passes all the middlewares we have into apply middlewares method which is then composed into a functional componenet
// a way to pass multiple functions
// catch actions before they go into the reducer
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
console.log(composedEnhancers())

// store i s just here to facilitate the moving and passing of actions in the reducers
export const store = configureStore({
  reducer: persistedReducer,
  middleware: middleWares,
});

// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);

