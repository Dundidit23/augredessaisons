import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useCategories from '../hooks/useCategories';

const CreateCategory = ({ onSubmit, isEditing, category }) => {
  const [formData, setFormData] = useState({ category: '' });
  const { addNewCategory, updateExistingCategory } = useCategories();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (isEditing && category) {
      setFormData(category);
    }
  }, [isEditing, category]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        // Update the existing category
        const updatedCategory = await updateExistingCategory(category._id, formData);
        console.log("Category updated successfully:", updateExistingCategory);
        onSubmit(updateExistingCategory);
      } else {
        // Create a new category
        const categoryWithId = { ...formData, id: uuidv4() }; // Add a unique ID
        const newCategory = await addNewCategory(categoryWithId);
        console.log("Category added successfully:", newCategory);
        onSubmit(newCategory);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error('Conflict error: Category already exists:', error);
        alert('A category with this name already exists. Please use a different name.');
      } else {
        console.error('Error adding/updating category:', error);
      }
      onSubmit(null, error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Editer une catégorie' : 'Ajouter une catégorie'}</h2>
      <fieldset>
        <label htmlFor="category">Catégorie</label>
        <input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </fieldset>
      <button type="submit">{isEditing ? 'Editer une catégorie' : 'Ajouter une catégorie'}</button>
    </form>
  );
};

export default CreateCategory;