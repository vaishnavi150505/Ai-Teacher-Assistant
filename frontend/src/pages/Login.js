import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import "./Login.css";
import login from "../assets/login.jpeg";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { email, password });
      if (response.data.success) {
        navigate("/dashboard");
      } else {
        setError("Invalid Credentials");
      }
    } catch (error) {
      setError("Login Failed");
    }
  };

  return (
    <div className="login-page">
      {/* Left Side - Only Image Placeholder */}
      <div className="login-left">
        <img src={login} alt="Login Illustration" className="login-image" />
      </div>

      {/* Right Side - Login Form */}
      <div className="login-right">
        <h2>Hi, Welcome Back</h2>
        <p>Ready to <span className="highlight">Teach</span> Today?</p>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Your email or phone number" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p><a href="/forgot-password" className="forgot-password-link">Forgot Password?</a></p>
        <p>Don't have an account? <a href="/register">Join 10,000+ other teachers here</a></p>

        {/* Social Login with Icons */}
        <div className="social-icons">
          <FaGoogle className="google-icon" />
          <FaApple className="apple-icon" />
          <FaFacebook className="facebook-icon" />
        </div>

      </div>
    </div>
  );
};

export default Login;
