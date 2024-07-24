import logo from "./logo.svg";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import AppLayout from "./pages/AppLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App() {

  return (
    <BrowserRouter>

      <div className="App">
        <Routes>
          {/* Authentication Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Layout with navigation */}
          <Route element={<AppLayout/>}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>


  );
}

export default App;












