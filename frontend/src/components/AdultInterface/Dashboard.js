// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import axios from 'axios';

const Dashboard = () => {
  const [children, setChildren] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [sessionCode, setSessionCode] = useState('');

  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchChildren = async () => {
        const parent_id = localStorage.getItem('parent_id');
        if (!parent_id) {
            console.error('No parent_id found');
            return; // Early return if no parent_id
        }

        try {
            const response = await axios.get(`http://127.0.0.1:5000/children?parent_id=${parent_id}`);
            setChildren(response.data);
        } catch (error) {
            console.error('Failed to fetch children:', error);
        }
    };

    fetchChildren();
  }, []);
  

  const handleChildClick = (child) => {
    setSelectedChild(child);
    setShowPopup(true);
  };

  const handleGenerateCode = async () => {
    setSessionCode('263749');
  };
  
  
  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <div className="dashboard-container">
      <h1>Children</h1>
      <ul className="children-list">
        {children.map((child) => (
          <li key={child.id} onClick={() => handleChildClick(child)}>
          {child.name}
        </li>        
        ))}

        {showPopup && (
        <div className="popup">
            <h2>{selectedChild ? selectedChild.name : ''}</h2>
            <button onClick={handleGenerateCode}>Generate Code</button>
            {sessionCode && <p>Session Code: {sessionCode}</p>}
            <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
        )}

      </ul>
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
};

export default Dashboard;
