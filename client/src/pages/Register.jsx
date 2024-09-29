import { useState } from 'react'
import { Link} from 'react-router-dom'

export default function Register() {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const registerUser = async (e) => {
        e.preventDefault();
    

    if (data.password !== data.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
  
      // Make API call or perform backend logic to register the user
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          alert('User registered successfully');
          // Redirect to the login page or perform any other necessary actions
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred while registering the user');
      }
    };
  

  return (
    <div className="auth-wrapper">
    <h3>Create Account</h3>
    <form className="auth-form" onSubmit={registerUser}>
    <div className="input-group name">
        <input
          type="nom"
          className="field"
          id="name"
          name="name"
          placeholder="Entrez votre nom"
          value={data.name}
          onChange={(e) => setData({...data, name: e.target.value})}
        />
      </div>

      <div className="input-group email">
        <input
          type="email"
          className="field"
          id="email"
          name="email"
          placeholder="Entrez votre email"
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
        />
      </div>
      <div className="input-group password">
        <input
          type="password"
          className="field"
          id="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
        />
      </div>
      <div className="input-group password">
        <input
          type="password"
          className="field"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          value={data.confirmPassword}
          onChange={(e) => setData({...data, confirmPassword: e.target.value})}
        />
      </div>
      <button type="submit" className="btn submit">
        Register
      </button>
     
    </form>
    <button type="submit" className="btn back">
       <Link to="/Login">Login</Link>
      </button>
  </div>
  );
};
