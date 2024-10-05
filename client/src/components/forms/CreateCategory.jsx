import React, { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';
import './createCategory.scss';

const CreateCategory = ({ category, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const categories = useCategories();

  useEffect(() => {
    if (isEditing && category) {
      setFormData(category);
    }
  }, [isEditing, category]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, // Handle file input
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (isEditing && category && category.id) {
      onSubmit(category.id, data); // Pass category ID for update
    } else {
      onSubmit(data); // For creating a new category
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Category' : 'Add Category'}</h2>
      
      <fieldset>
        <label htmlFor="name">Catégorie</label>
        <input id="category" name="category" value={formData.name} onChange={handleChange} required />
        <select
          id="category"
          className="small-width-select"
          name="category"
          value={formData.name}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} {/* Assuming category has a 'name' property */}
            </option>
          ))}
        </select>
      </fieldset>
      <button type="submit">{isEditing ? 'Update Category' : 'Create Category'}</button>
    </form>
  );
};

export default CreateCategory;