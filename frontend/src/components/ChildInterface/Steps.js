import React from 'react';

const Steps = ({ step, totalSteps, onNextClick, exampleJSON }) => {
    const isLastStep = step == totalSteps;
    return (
    <div className="recipe-screen">
        <h1 className="instrTitle">Step {step}</h1>
        <h3 className="instr">{exampleJSON[step]}</h3>
        {isLastStep ? (
        <button className="bigButton" onClick={onNextClick}>Finish</button>
      ) : (
        <button className="bigButton" onClick={onNextClick}>Next</button>
      )}
    </div>
    );
};

export default Steps;
