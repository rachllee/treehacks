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
  const [totalSteps, setTotalSteps] = useState(0);
  const [recipeData, setRecipeData] = useState(null);

  const hardcodeId = 1; //replace with id given by bookshelf

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_recipe', recipe_id);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setRecipeData(data);
        setTotalSteps(data.simplified.length);
        setCurrentScreen('recipe');
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, []);



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
            exampleJSON={recipeData.simplified} />
      )}
      {currentScreen === 'finished' && <FinishScreen onRestartClick={handleRestartClick} />}
    </div>
  );
};

export default RecipeApp;
