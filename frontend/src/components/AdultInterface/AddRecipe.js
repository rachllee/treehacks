import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddRecipe = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    instructions: '',
    simplified: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const simplifyResponse = await axios.post('http://127.0.0.1:5000/simplify-recipe', { text: recipe.instructions });
        console.log('Recipe successfully simplified:');
        const simplifiedInstructions = simplifyResponse;
        
        const recipeWithSimplifiedInstructions = {
            title: recipe.name,
            instructions: recipe.instructions,
            simplified: simplifiedInstructions 
        };

        const addRecipeResponse = await axios.post('http://127.0.0.1:5000/addrecipe', recipeWithSimplifiedInstructions);
        console.log('Recipe successfully added:', addRecipeResponse.data);
        navigate('/dashboard');
    } catch (error) {
        console.error('There was an error processing the recipe:', error);
    }
  };

  return (
    <div className="add-recipe-container">
      <h1>Add a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Recipe Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;

