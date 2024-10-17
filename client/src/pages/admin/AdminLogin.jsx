import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useFormValidation } from '../../components/hooks/adminLoginFormValidations';
import api from '../../../private/services/api';
import '../../components/forms/connect/login.scss';

export default function AdminLogin() {
  console.log('AdminLogin component rendered'); // Debug log

  const { data, errors, handleChange, validate } = useFormValidation({ username: '', password: '' }, 'admin');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(data);
  const [showPassword, setShowPassword] = useState(false);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const loginUser = async (e) => {
    e.preventDefault();
    if (!validate(formData)) {
      console.error('Validation failed', errors);
      return;
    }
    console.log('Form data before login:', formData); // Debug log
    try {
      const response = await api.post('api/users/login', { json: formData }).json();
      if (response.isAdmin) {
        login();
        navigate('/dashboard'); // Correct path for navigation after login
      } else {
        console.error('Not an admin user');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    handleChange(e); // Call handleChange from useFormValidation
  };

  return (
    <div className='auth-wrapper'>
      <h3>Admin Connection</h3>
      <form className='input-group' onSubmit={loginUser}>
        <input
          className='field'
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <div className='password-wrapper'>
          <input
            className='field password-field'
            type={type}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <span className='icon-wrapper' onClick={handleToggle}>
            <Icon icon={icon} size={20} />
          </span>
        </div>
        <button className='btn' type="submit">Login</button>
      </form>
      <div className="options">
        <button type="button" className="btn option register">
          <Link to="/admin/admin-register">Register</Link> {/* Updated the path here */}
        </button>
      </div>
    </div>
  );
}