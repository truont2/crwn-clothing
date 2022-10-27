import Home from "./routes/home/home.component.jsx";
import { Routes, Route} from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component.jsx";
import Authentication from "./routes/authentication/authentication.component.jsx";


const App = () => {
  return (
    // allows applciation to register the route level components that will render certain eleelmtnsat certain paths
    // anything that is going to be routable needs to be inside routes
    <Routes>
    {/* by having the home route render navigation, itll keep the navbar on all pages and persistent */}
      <Route path="/" element={<Navigation />}>
      {/* path will match the parent so only shows home component on the home page */}
        <Route index={true} element={<Home />} />  
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
