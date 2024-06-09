import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import '../Styles/Login.css';

function SignupContainer(){
  const { setUsername, setLogin } = useContext(LoginContext);
  const [usernamestate, setUsernamestate] = useState("");
  const [userpass, setUserpass] = useState("");
  const [useremail, setUseremail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const mysignup = () => {
    if (!usernamestate || !useremail || !userpass) {
      setMessage("Please fill all the fields");
      return;
    }

    axios.post("http://localhost:8000/api/signup", {
      username: usernamestate,
      email: useremail,
      password: userpass,
    })
    .then(() => {
      alert("You have been successfully signed up");
      setUsername(usernamestate);
      setLogin(true);
      navigate("/login");
    })
    .catch(error => {
      console.error("Error in signing up:", error);
      setMessage("Error signing up, please try again");
    });
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <div className="login-container">
      <h1>Signup</h1>
      <input 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsernamestate(e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Enter your Email" 
        onChange={(e) => setUseremail(e.target.value)} 
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
      <button className="my-btn" onClick={mysignup}>Signup</button>
      <button className="btn-signup" onClick={login}>Back to Login</button>
    </div>
  );
}

export default SignupContainer;
