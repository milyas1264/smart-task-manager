import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // API call to backend
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // Success alert
      alert("Registered Successfully!");

      // Clear form
      setName("");
      setEmail("");
      setPassword("");

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration Failed. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="card auth-card">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn-primary" type="submit">
            Register
          </button>
          <p>
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
