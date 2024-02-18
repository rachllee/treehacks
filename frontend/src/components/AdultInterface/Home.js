import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to Title</h1>
      <div className="button-group">
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Home;
