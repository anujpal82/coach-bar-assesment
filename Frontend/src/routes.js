import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import Signup from "./components/Signup";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";


const routes = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
       
        <Route path="*" element={<NotFound   />} />
      </Routes>
    </BrowserRouter>
  );
  
  export default routes;