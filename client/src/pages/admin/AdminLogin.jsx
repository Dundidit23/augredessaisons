import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext'; // Vérifiez que le chemin est correct
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useFormValidation } from '../../components/hooks/adminLoginFormValidations';
import '../../components/forms/connect/login.scss';

export default function AdminLogin() {
  const { data, errors, handleChange, validate } = useFormValidation({ username: '', password: '' }, 'admin');
  const { loginAdmin, setUsername } = useAdminAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.error('Validation failed', errors);
      return;
    }

    try {
      const success = await loginAdmin(data.username, data.password);
      if (success) {
        setUsername(data.username);
        navigate('/admin/dashboard');
      } else {
        setLoginError('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    } catch (error) {
      // Si l'admin est inactif ou a un statut particulier, l'erreur peut être affichée ici.
      if (error.response && error.response.status === 401) {
        setLoginError('Nom d\'utilisateur ou mot de passe incorrect.');
      } else if (error.response && error.response.status === 403) {
        setLoginError('Votre compte est inactif. Veuillez contacter l\'administrateur.');
      } else {
        console.error('Erreur lors de la connexion', error);
        setLoginError('Erreur interne, veuillez réessayer plus tard.');
      }
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
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            type="text"
            name="username"
            value={data.username}
            onChange={handleInputChange}
            className={errors.username ? 'input error-input' : 'input'}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="input-group password-wrapper">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={data.password}
            onChange={handleInputChange}
            className={errors.password ? 'input error-input' : 'input'}
          />
          <span className="icon-wrapper" onClick={handleToggle}>
            <Icon icon={showPassword ? eye : eyeOff} size={20} />
          </span>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {loginError && <div className="error-message">{loginError}</div>}

        <div className="buttons">
          <button className="btn" type="submit">Connexion</button>
        </div>
      </form>
    </div>
  );
}
