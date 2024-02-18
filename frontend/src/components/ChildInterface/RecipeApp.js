import React, { useState } from 'react';
import StartScreen from './StartScreen';
import Steps from './Steps';
import FinishScreen from './FinishScreen';


const exampleJSON = {
    "1": "Get a pan",
    "2": "Crack an egg into the pan",
    "3": "Cook the egg until it's done"
}

const RecipeApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = Object.keys(exampleJSON).length; 

  const handleStartClick = () => {
    setCurrentScreen('recipe');
  };

  const handleNextClick = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentScreen('finished');
    }
  };

  const handleRestartClick = () => {
    setCurrentScreen('home');
    setCurrentStep(1);
  };

  return (
    <div className="recipe-app">
      {currentScreen === 'home' && <StartScreen onStartClick={handleStartClick} />}
      {currentScreen === 'recipe' && (
        <Steps 
            step={currentStep} 
            totalSteps={totalSteps} 
            onNextClick={handleNextClick}
            exampleJSON={exampleJSON} />
      )}
      {currentScreen === 'finished' && <FinishScreen onRestartClick={handleRestartClick} />}
    </div>
  );
};

export default RecipeApp;
