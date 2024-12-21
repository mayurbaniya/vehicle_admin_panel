
import React, { useState, useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { handleLogin } from "../../service/LoginService.js"; 
import "../css/auth/Login.css"
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [severity, setSeverity] = useState("info");
const timerRef = useRef(null);
const navigate = useNavigate();
  
  useEffect(() => {
    if (message) {
      timerRef.current = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timerRef.current);
    }
  }, [message]);
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { statusCode, data } = await handleLogin(email, password);

    if (statusCode === 200) {
      switch (data.status) {
        case "SUCCESS":
          setSeverity("success");
          setMessage(data.msg || "Login successful.");
          navigate("/dashboard");
          break;
        case "INVALID_PASSWORD":
          setSeverity("error");
          setMessage(data.msg || "Invalid password.");
          break;
        case "INVALID_EMAIL":
          setSeverity("error");
          setMessage(data.msg || "Invalid email address.");
          break;
        case "ERROR":
          setSeverity("error");
          setMessage(data.err || "An error occurred on the server.");
          break;
        default:
          setSeverity("info");
          setMessage(data.msg || "Unexpected response from server.");
      }
    } else {
      setSeverity("error");
      setMessage(data.msg || "An error occurred. Please try again.");
    }
  };

  
  return (

    <div className="login-container">
      {message && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
          <Stack sx={{ width: "auto" }} spacing={2}>
            <Alert variant="filled" severity={severity}>
              {message}
            </Alert>
          </Stack>
        </div>
      )}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
