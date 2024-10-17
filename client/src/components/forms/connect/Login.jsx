import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../../../private/services/api';
import './login.scss';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import Forgot from './Forgot';
import Register from './Register';

const Login = ({ onLogin }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState("login"); // 'login', 'forgot', 'register'
  const toggleNav = () => {
    setIsFormOpen(!isFormOpen);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = isAdmin ? { username, password } : { email, password };
      const response = await api.post('api/users/login', loginData);
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('isAdmin', data.isAdmin);
      toast.success('Connexion réussie !');
      navigate(data.isAdmin ? '/admin/dashboard' : '/home');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });

    if (validator !== null) {
      setValidate(validator.errors);
      isValid = false;
    }

    return isValid;
  };

  const authenticate = async (e) => {
    e.preventDefault();

    const isValid = validateLogin();

    if (isValid) {
      setValidate({});
      await handleLogin(e); // Call handleLogin
      setEmail("");
      setPassword("");
    } else {
      Object.keys(validate).forEach(key => {
      });
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const renderForm = () => {
    switch (currentForm) {
      case "login":
        return (
          <form className="auth-form" method="POST" onSubmit={authenticate} autoComplete="off">
            <div className="input-group email">
              <input
                type="email"
                className={`field ${validate.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="invalid-feedback text-start">
                {validate.email ? validate.email[0] : ""}
              </div>
            </div>
            <div className="input-group password">
              <input
                type={type}
                className="field"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span className="field__span" onClick={handleToggle}>
                <Icon className="field__span__icon" icon={icon} size={16} />
              </span>
              <div className="invalid-feedback text-start">
                {validate.password ? validate.password[0] : ""}
              </div>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.currentTarget.checked)}
              />
              <label className="form-check-label" htmlFor="remember">
                Se souvenir de moi
              </label>
            </div>
            <button type="submit" className="btn submit">
              Je me connecte
            </button>
            <div className="options">
              <button
                type="button"
                className="btn option register"
                onClick={() => setCurrentForm("register")}
              >
                Je crée mon compte
              </button>
              <button
                type="button"
                className="btn option forgot"
                onClick={() => setCurrentForm("forgot")}
              >
                J'ai oublié mon mot de passe
              </button>
            </div>
          </form>
        );
      case "forgot":
        return <Forgot onBack={() => setCurrentForm("login")} />;
      case "register":
        return <Register onBack={() => setCurrentForm("register")} />;
      default:
        return null;
    }
  };

  return (
    <div className="auth-wrapper">
      <h3>Connection</h3>
      {renderForm()}
    </div>
  );
};

export default Login;
