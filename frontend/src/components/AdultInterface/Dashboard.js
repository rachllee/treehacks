// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Dashboard = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      const response = await fetch('/children');
      const data = await response.json();
      //setChildren(data);
      setChildren([{ id: 1, name: 'Child 1' }, { id: 2, name: 'Child 2' }]);
    };

    //fetchChildren();
  }, []);

  const handleChildClick = (childId) => {
    // Navigate to a child-specific page or perform an action
    console.log(`Child clicked: ${childId}`);
    // navigate(`/child/${childId}`); // Example navigation
  };

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <div className="dashboard-container">
      <h1>Children</h1>
      <ul className="children-list">
        {children.map((child) => (
          <li key={child.id} onClick={() => handleChildClick(child.id)}>
            {child.name}
          </li>
        ))}
      </ul>
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
};

export default Dashboard;
