import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from './Book'; 
import './Bookshelf.css'; 

const Bookshelf = () => {
  const [recipes, setRecipes] = useState([]); // Initialize recipes state
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch recipes
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/recipes', { // Your endpoint to fetch recipes
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include other headers as needed, e.g., authorization
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setRecipes(data); // Update state with fetched recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleBookClick = async (recipeId) => {
    try {
      const response = await fetch(`http://localhost:5000/recipe/${recipeId}`, {
        method: 'GET',
        credentials: 'include', // Needed for cookies to be sent if you're using session-based authentication
        headers: {
          'Content-Type': 'application/json',
          // Add your auth headers here if needed, e.g., Authorization: 'Bearer <token>'
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const recipeDetails = await response.json();
      setSelectedRecipe(recipeDetails);
      navigate(`/recipe/${recipeId}`)
    } catch (error) {
      console.error("Failed to fetch recipe details:", error);
    }
  };

  return (
    <div className="bookshelf">
      {recipes.map((recipe) => (
        <Book key={recipe.id} title={recipe.title} onClick={() => handleBookClick(recipe.id)} />
      ))}

      {selectedRecipe && (
        <div className="popup">
          <h2>{selectedRecipe.title}</h2>
          <p>{selectedRecipe.instructions}</p>
          <button onClick={() => setSelectedRecipe(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
