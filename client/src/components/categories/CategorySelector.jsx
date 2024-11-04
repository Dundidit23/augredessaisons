// CategorySelector.jsx

import React from 'react';
import { useCategory } from '../../context/CategoryContext';

const CategorySelector = React.memo(({ selectedCategory, onSelect }) => {
  const { categories, loading, error } = useCategory();

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error.message}</p>;

  return (
    <select value={selectedCategory} onChange={(e) => onSelect(e.target.value)}>
      <option value="">Sélectionner une catégorie</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
});

export default CategorySelector;
