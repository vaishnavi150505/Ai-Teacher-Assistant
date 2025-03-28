import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import register from "../assets/register.jpeg";
const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleRegister = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", user);
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      alert("Error Registering");
    }
  };

  return (
    <div className="register-page">
      {/* Left Side - Image Placeholder */}
      <div className="register-left">
        <img src={register} alt="Register Illustration" className="register-image" />
      </div>

      {/* Right Side - Registration Form */}
      <div className="register-right">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Name" onChange={(e) => setUser({ ...user, name: e.target.value })} required />
          <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} required />
          <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} required />
          <select onChange={(e) => setUser({ ...user, role: e.target.value })} required>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
