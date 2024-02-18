import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Screens.css';

const Welcome = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted code: ${code}`);
    navigate('/bookshelf')
  };

  return (
    <div className="container">
      <h1 className = "title">Title or whatever</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
            <label className = "label">
              Session Code:
            </label>
            <input
              type="text"
              value={code}
              onChange={handleInputChange}
              placeholder="Enter your session code here..."
            />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Welcome;
