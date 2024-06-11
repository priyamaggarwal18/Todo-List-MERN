import { BrowserRouter, Route, Routes } from "react-router-dom";
import { React, useState } from "react";
import Home from "./Pages/Home";
import { LoginContext } from "./Contexts/LoginContext";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ username, login, setUsername, setLogin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
