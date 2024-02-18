import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Welcome = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleJoinSession = async (e) => {
    e.preventDefault();
    try {
      // Replace '/join-session' with your actual endpoint
      const response = await axios.post('/join-session', { code });
      console.log('Session joined:', response.data);
      navigate('/bookshelf', { state: { sessionCode: code } });
    } catch (error) {
      console.error('Error joining session:', error);
      // Handle error (show error message)
    }
  };

  return (
    <div className="container">
      <h1>Welcome to Title</h1>
      <form onSubmit={handleJoinSession}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter session code..."
          required
        />
        <button type="submit">Join Session</button>
      </form>
    </div>
  );
};

export default Welcome;
