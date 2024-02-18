import React from 'react';

const HomeScreen = ({ onStartClick }) => {
  return (
    <div className="recipe-screen">
      <h1 className="instrTitle">Let's Cook!</h1>
      <button className="bigButton" onClick={onStartClick}>Start</button>
    </div>
  );
};

export default HomeScreen;
