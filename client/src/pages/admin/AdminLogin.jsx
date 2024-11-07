//AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminContext'; // Assurez-vous que le chemin est correct
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useFormValidation } from '../../components/hooks/adminLoginFormValidations';
import '../../components/forms/connect/login.scss';

export default function AdminLogin() {
  const { data, errors, handleChange, validate } = useFormValidation({ username: '', password: '' }, 'admin');
  const { loginAdmin, setUsername } = useAdminAuth(); // Vérifiez que cela retourne bien une fonction
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.error('Validation failed', errors);
      return;
    }

    // Appel à loginAdmin avec les bons arguments
    const success = await loginAdmin(data.username, data.password);
    
    if (success) {
      setUsername(data.username); // Met à jour le contexte avec le nom d'utilisateur
      navigate('/admin/dashboard'); // Redirigez vers le tableau de bord
    } else {
      console.error('Login failed');
      alert('Nom d\'utilisateur ou mot de passe incorrect.'); // Affichez un message d'erreur à l'utilisateur
    }
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    handleChange(e);
  };

  return (
    <div className="auth-wrapper">
      <form className="login" onSubmit={handleLogin}>
        <h3>Admin Connection</h3>
        <div className="input-group">
          <label className="label" htmlFor="username">Nom</label>
          <input
            id="username"
            className="input"
            type="text"
            name="username"
            value={data.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">Mot de passe</label>
          <input
            className="input"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={data.password}
            onChange={handleInputChange}
          />
          <span className="icon-wrapper" onClick={handleToggle}>
            <Icon icon={showPassword ? eye : eyeOff} size={20} />
          </span>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="buttons">
          <button className="btn" type="submit">Login</button>
          <div className="options">
            {/* <Link to="/admin/admin-register" className="btn option register">Register</Link> */}
          </div>
        </div>
      </form>
    </div>
  );
}