import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', credentials);
      if (response.data.message === "Logged in!") {
        console.log('Login successful:', response.data);
        navigate('/dashboard'); 
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('There was an error logging in:', error);
      if (error.response && error.response.data.error) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {loginError && <div className="login-error">{loginError}</div>} {/* Display login error message if present */}
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
