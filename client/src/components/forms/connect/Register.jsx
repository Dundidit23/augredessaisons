// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import './login.scss';

const Register = ({ onBack }) => {
  const { register, error } = useUser();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Vous pouvez définir un rôle par défaut
  const [status, setStatus] = useState("offline"); // Vous pouvez définir un statut par défaut
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
  
    console.log("Username:", userName);
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      await register({ identifier, username: userName, email, password, role, status });
      navigate('/login');
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <div className="auth-wrapper">
      <h3>Create Account</h3>
      <form className="auth-form" onSubmit={handleRegister}>
        <div className="input-group name">
          <input
            type="text"
            className="field"
            id="name"
            name="name"
            value={userName}
            placeholder="Entrez votre nom"
            onChange={(e) => setUserName(e.target.value)}
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
        <button type="submit" className="btn submit">Register</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button type="button" className="btn back" onClick={onBack}>
        <Link to="/login">Retour à la connexion</Link>
      </button>
    </div>
  );
};

export default Register;
