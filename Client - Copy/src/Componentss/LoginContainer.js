import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

import "../Styles/Login.css";
function LoginContainer() {
  const { setUsername, setLogin } = useContext(LoginContext);
  const [usernamestate, setUsernamestate] = useState("");
  const [userpass, setUserpass] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  function main() {
    if (!usernamestate) {
      setMessage("Please enter username");
      return;
    }
    if (!userpass) {
      setMessage("Please enter password");
      return;
    }

    axios
      .post("http://localhost:8000/api/login", {
        username: usernamestate,
        password: userpass,
      })
      .then(() => {
        setLogin(true);
        setUsername(usernamestate);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error in logging in: ", error);
        setMessage("Invalid username or password");
      });
  }

  function signup() {
    navigate("/signup");
  }
  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsernamestate(e.target.value);
          setUsername(e.target.value);
        }}
      />
      <div className="password-input">
        <input
          className="pass-input"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setUserpass(e.target.value)}
        />
        <button
          className="eye-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      <p className="message">{message}</p>
      <button className="my-btn" onClick={main}>
        Login
      </button>
      <button className="btn-signup" onClick={signup}>
        New User? Click here to Signup
      </button>
    </div>
  );
}

export default LoginContainer;
