// src/RecipeList/RecipeList.js or src/components/RecipeList.js

import React, { useState, useEffect } from 'react';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id} onClick={() => alert(`Clicked on ${recipe.title}`)}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
