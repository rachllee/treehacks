// Assuming this is in src/ChildInterface.js or a similar file

import React from 'react';
import Bookshelf from './Bookshelf/Bookshelf';
import Recipes from './Recipes';

const ChildInterface = () => {
  return (
    <div>
      <h1>Child Interface</h1>
      <Bookshelf />
      <Recipes /> 
    </div>
  );
};

export default ChildInterface;

