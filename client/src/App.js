import { Route, Routes ,Navigate} from "react-router-dom";

import { BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import AuthentificationRoute from "./components/AuthentificationRoute";
import Dashboard from "./Pages/Dashboard";
import AddJob from "./Pages/AddJob";
import ViewJob from "./Pages/ViewJob";
import EditJob from "./Pages/EditJob";


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
      <Route element={<AuthentificationRoute/>} >
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={< SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Route>
        <Route element={<PrivateRoute/>} >
          <Route path="/dashboard" element={< Dashboard/>} />
          <Route path="/addJob" element={< AddJob/>} />
          <Route path="/view/:jobId" element={< ViewJob/>} />
          <Route path="/edit/:jobId" element={< EditJob/>} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
