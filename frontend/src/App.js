import React, { userRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Register from './components/AdultInterface/Register';
import ChildInterface from './components/ChildInterface/ChildInterface';
import RecipeApp from './components/ChildInterface/RecipeApp';
import Welcome from './components/ChildInterface/Welcome';
import Signin from './components/AdultInterface/Signin';
import Bookshelf from './components/ChildInterface/Bookshelf';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/bookshelf" element={<Bookshelf />}/>
        <Route path="recipe/:id"  element={<RecipeApp />}/>
      </Routes>
    </Router>
  )
}





// const App = () => {
//   return (
//     <div>
//       <RecipeApp />
//     </div>
//   );
// };

export default App;