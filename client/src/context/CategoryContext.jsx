// CategoryContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import ky from 'ky';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await ky.get('http://localhost:5000/api/categories').json();
      setCategories(response);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const response = await ky.post('http://localhost:5000/api/categories', {
        json: newCategory,
      }).json();
      setCategories((prev) => [...prev, response]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const response = await ky.put(`http://localhost:5000/api/categories/${id}`, {
        json: updatedCategory,
      }).json();
      setCategories((prev) =>
        prev.map((cat) => (cat._id === id ? response : cat))
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await ky.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, error, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useCategory = () => {
  return useContext(CategoryContext);
};
