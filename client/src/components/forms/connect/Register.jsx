import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../../services/api'; // Import the centralized API configuration
import './login.scss';

const Register = ({ onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    ky.post('api/users/register', { name, email, password})
    .then(result => console.log(result))
    navigate('/login')
    .catch(err => console.log(err))
    // Logic for handling registration
    //alert("Account created successfully!");
  };

  return (
    <div className="auth-wrapper">
      <h3>Create Account</h3>
      <form className="auth-form" onSubmit={handleRegister}>
      <div className="input-group name">
          <input
            type="nom"
            className="field"
            id="name"
            name="name"
            value={name}
            placeholder="Entrez votre nom"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group email">
          <input
            type="email"
            className="field"
            id="email"
            name="email"
            value={email}
            placeholder="Entrez votre email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group password">
          <input
            type="password"
            className="field"
            id="password"
            name="password"
            value={password}
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group password">
          <input
            type="password"
            className="field"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirmez votre mot de passe"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn submit">
          Register
        </button>
       
      </form>
      <button type="button" className="btn back" onClick={onBack}>
         <Link to="/login">Login</Link>
        </button>
    </div>
  );
};

export default Register;
