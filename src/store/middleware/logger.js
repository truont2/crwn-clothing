// create your own middleware with chained currying funcitons
export const loggerMiddleware = (store) => (next) => (action) => {
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