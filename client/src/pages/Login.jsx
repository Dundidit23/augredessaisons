// File: client/src/pages/Login.jsx
import { useState } from 'react';
import ky from 'ky';
import api from '../services/api'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '../components/hooks/useFormValidation';

export default function Login() {
  const { data, errors, handleChange, validate } = useFormValidation({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(data);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await ky.post('http://localhost:4000/api/users/login', { json: formData }).json();
      login();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="auth-wrapper">
      <h3>Login to your Account</h3>
      <form className="auth-form" onSubmit={loginUser}>
        <div className="input-group email">
          <input
            type="email"
            className="field"
            id="email"
            name="email"
            placeholder="Entrez votre email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="input-group password">
          <input
            type="password"
            className="field"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button type="submit" className="btn submit">
          Login
        </button>
      </form>
    </div>
  );
}