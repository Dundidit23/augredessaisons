// components/categories/CategoryFilter.jsx
import React, { useEffect } from 'react';
import { useCategory } from '../../context/CategoryContext';
import './categoryFilter.scss';

const CategoryFilter = ({ onSelectCategory, currentCategory }) => {
  const { categories, fetchCategories } = useCategory();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="category-filter">
      <button 
        className={!currentCategory ? 'active' : ''} 
        onClick={() => onSelectCategory('all')}
      >
        Toutes les catégories
      </button>
      {categories && categories.map(category => (
        <button
          key={category._id}
          className={currentCategory === category.category ? 'active' : ''}
          onClick={() => onSelectCategory(category.category)}
        >
          {category.category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;