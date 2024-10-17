import React, { useContext } from 'react';
import { useCategory } from '../../context/CategoryContext';

const CategoryFilter = ({ onSelectCategory }) => {
  const { categories } = useCategory();

  return (
    <div className="category-filter">
      <h4>Categories</h4>
      <ul>
        <li onClick={() => onSelectCategory(null)}>All Products</li>
        {categories.map(category => (
          <li key={category._id} onClick={() => onSelectCategory(category.category)}>
            {category.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
