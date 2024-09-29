import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { handleResponse } from '../../services/api';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useFormValidation } from '../../components/hooks/adminLoginFormValidations';

//import './AdminRegister.scss'; // Make sure to import your CSS file

export default function AdminRegister() {
  const { data, errors, handleChange, validate } = useFormValidation({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'admin',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState('password');

  const navigate = useNavigate(); // Get the navigate function

  const registerUser = async (e) => {
    e.preventDefault();
    if (!validate()) {
      console.error('Validation failed', errors);
      return;
    }
    try {
      const response = await api.post('api/users/register', { json: data }).json();
      console.log('User registered successfully:', response);
      navigate('/adminLogin'); // Redirect to login page after successful registration
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Registration failed:', error.response.status, error.response.statusText);
        const errorData = await error.response.json();
        console.error('Error details:', errorData);
      } else {
        // Network error or other issues
        console.error('Registration failed:', error.message);
      }
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

  return (
    <div className='auth-wrapper'>
      <h3>Admin Registration</h3>
      <form className='input-group' onSubmit={registerUser}>
        <input
          className='field'
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Username"
        />
        
        <input
          className='field'
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <div className='password-wrapper'>
          <input
            className='field password-field'
            type={type}
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <span className='icon-wrapper' onClick={handleToggle}>
            <Icon icon={icon} size={20} />
          </span>
        </div>
        <div className='password-wrapper'>
          <input
            className='field password-field'
            type={type}
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          <span className='icon-wrapper' onClick={handleToggle}>
            <Icon icon={icon} size={20} />
          </span>
        </div>
        <button className='btn' type="submit">Register</button>
      </form>
    </div>
  );
}