import Home from "./routes/home/home.component.jsx";
import { Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Authentication from "./routes/authentication/authentication.component.jsx";
import Shop from './routes/shop/shop.component.jsx'
import Checkout from "./routes/checkout/checkout.component.jsx";

// update for redux
import { useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
// method only creates an action for us but we still need to dispatch it 
import { setCurrentUser } from "./store/user/user.action.js";
import { useDispatch } from "react-redux";

const App = () => {
  // method dispatches to the root reducer
  // only on dispatch for whole application just different references
  // dispatch does not change
  const dispatch = useDispatch();

  useEffect(()=> {
    const unsubscribe = onAuthStateChangedListener((user) => {
        // create user when auth object changes in firebase 
        if(user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    })
    return unsubscribe;
}, [])

  return (
    // allows applciation to register the route level components that will render certain eleelmtnsat certain paths
    // anything that is going to be routable needs to be inside routes
    <Routes>
    {/* by having the home route render navigation, itll keep the navbar on all pages and persistent */}
      <Route path="/" element={<Navigation />}>
      {/* path will match the parent so only shows home component on the home page */}
        <Route index={true} element={<Home />} />  
        <Route path='auth' element={<Authentication />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
