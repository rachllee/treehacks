
import React, { useState, useEffect } from 'react';

/** 
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
*/

const Recipes = () => {
  const recipes = [
    { id: 1, title: 'Spaghetti Carbonara', instructions: 'A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.' },
    { id: 2, title: 'Chicken Tikka Masala', instructions: 'Grilled marinated chicken in a spiced curry sauce.' },
    { id: 3, title: 'Beef Tacos', instructions: 'Tacos filled with seasoned beef, cheese, and lettuce.' },
  ];

  return (
    <div className="recipes">
      <h3>Recipes</h3>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h4>{recipe.title}</h4>
            <p>{recipe.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Recipes;
