import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [parentInfo, setParentInfo] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    childrenCount: 1,
    children: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChildrenCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setParentInfo(prevState => ({
      ...prevState,
      childrenCount: count,
      children: new Array(count).fill('').map((_, index) => prevState.children[index] || { name: '', age: '' })
    }));
  };

  const handleChildDetailChange = (index, field, value) => {
    const updatedChildren = [...parentInfo.children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setParentInfo(prevState => ({
      ...prevState,
      children: updatedChildren
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', parentInfo);
      console.log(response.data);
      alert('Registration submitted successfully!');
      
      // Reset form
      setParentInfo({
        title: '',
        ingredients: '',
        instructions: '',
        childrenCount: 1,
        children: []
      });
    } catch (error) {
      console.error('There was an error submitting the registration:', error);
      alert('Failed to submit the registration.');
    }
  };

  return (
    <div className="Register">
      <h1>Submit a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={parentInfo.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ingredients (separated by commas):</label>
          <textarea
            name="ingredients"
            value={parentInfo.ingredients}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={parentInfo.instructions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>How many children do you have?</label>
          <select
            name="childrenCount"
            value={parentInfo.childrenCount}
            onChange={handleChildrenCountChange}
          >
            {[1, 2, 3, 4, 5].map(count => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>
        {Array.from({ length: parentInfo.childrenCount }, (_, index) => (
          <div key={index}>
            <label>Child {index + 1} Name:</label>
            <input
              type="text"
              value={parentInfo.children[index]?.name || ''}
              onChange={(e) => handleChildDetailChange(index, 'name', e.target.value)}
            />
            <label>Child {index + 1} Age:</label>
            <input
              type="number"
              value={parentInfo.children[index]?.age || ''}
              onChange={(e) => handleChildDetailChange(index, 'age', e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
}

export default Register;
