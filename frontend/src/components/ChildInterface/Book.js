import React from 'react';
import './Book.css'; 

const Book = ({ title, onClick }) => {
  return (
    <div className="book" onClick={onClick}>
      <div className="book-spine"></div>
      <div className="book-front">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default Book;
