import React, { userRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Register from './components/AdultInterface/Register';
import ChildInterface from './components/ChildInterface/ChildInterface';
import RecipeApp from './components/ChildInterface/RecipeApp';
import Welcome from './components/ChildInterface/Welcome';
import Bookshelf from './components/ChildInterface/Bookshelf';
import Home from './components/AdultInterface/Home'; 
import Login from './components/AdultInterface/Login'; 
import Dashboard from './components/AdultInterface/Dashboard'; 
import AddRecipe from './components/AdultInterface/AddRecipe'; 


// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cook" element={<Welcome/>} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/add-recipe" element={<AddRecipe />} />
//         <Route path="/bookshelf" element={<Bookshelf />}/>
//         <Route path="recipe/:id"  element={<RecipeApp />}/>
//       </Routes>
//     </Router>
//   )
// }

const App = () => {
  return (
    <RecipeApp />
  )
}


export default App;