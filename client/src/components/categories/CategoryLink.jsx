// components/products/CategoryLink.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryLink = ({ category, className }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    navigate(`/boutique/${encodeURIComponent(category)}`);
  };

  return (
    <p 
      className={`${className} category clickable`} 
      onClick={handleCategoryClick}
      style={{ cursor: 'pointer' }}
    >
      {category || "N/A"}
    </p>
  );
};

export default CategoryLink;