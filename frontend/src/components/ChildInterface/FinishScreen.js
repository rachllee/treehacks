import React from 'react';
import './Screens.css';

const FinishedScreen = ({ onRestartClick }) => {
  return (
    <div className="recipe-screen">
      <h2 className="instrTitle">Finished!</h2>
      <button onClick={onRestartClick}>Go back to home screen</button>
    </div>
  );
};

export default FinishedScreen;
