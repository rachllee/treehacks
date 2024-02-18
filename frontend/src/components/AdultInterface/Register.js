import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {
  const [parentInfo, setParentInfo] = useState({
    name: '',
    email: '',
    password:'',
    children: []
  });

  const [childrenCount, setChildrenCount] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParentInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChildrenCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setChildrenCount(count);

    if (count < parentInfo.children.length) {
      setParentInfo(prevState => ({
        ...prevState,
        children: prevState.children.slice(0, count)
      }));
    }
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
      const response = await axios.post('http://127.0.0.1:5000/register', parentInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data);
      alert('Registration submitted successfully!');
      
      // Reset form
      setParentInfo({
        name: '',
        email: '',
        password: '',
        children: []
      });
    } catch (error) {
      console.error('There was an error submitting the registration:', error);
      alert('Failed to submit the registration.');
    }
  };

  return (
    <div className="Register">
      <h1>Register Account</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={parentInfo.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={parentInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={parentInfo.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>How many children do you have?</label>
          <select
            name="childrenCount"
            value= {childrenCount}
            onChange={handleChildrenCountChange}
          >
            {[1, 2, 3, 4, 5].map(count => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>
        {Array.from({ length: childrenCount }, (_, index) => (
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