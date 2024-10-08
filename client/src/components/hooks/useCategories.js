import { useState, useEffect } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory, fetchCategoryById } from '../../services/api';
//import api from '../../services/api'
const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const addNewCategory = async (categoryData) => {
    try {
      const newCategory = await addCategory(categoryData);
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      return newCategory;
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  };

  const updateExistingCategory = async (id, categoryData) => {
    try {
      const updatedCategory = await updateCategory(id, categoryData);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? updatedCategory : category
        )
      );
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  const removeCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  const loadCategoryById = async (id) => {
    try {
      const category = await fetchCategoryById(id);
      setSelectedCategory(category);
      return category;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    selectedCategory,
    loadCategories,
    addNewCategory,
    updateExistingCategory,
    removeCategory,
    loadCategoryById,
  };
};

export default useCategories;