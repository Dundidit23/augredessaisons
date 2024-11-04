// CategoryContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async (retryCount = 0) => {
    if (categories.length > 0) return; // Ne pas re-fetch si les catégories sont déjà chargées

    setLoading(true);
    try {
      const response = await api.get('categories').json();
      setCategories(response);
      setError(null); // Réinitialiser l'erreur en cas de succès
    } catch (err) {
      console.error('Erreur lors de la récupération des catégories:', err);
      setError('Erreur lors de la récupération des catégories.');
      
      if (retryCount < 3) {
        setTimeout(() => fetchCategories(retryCount + 1), 2000); // Réessaye après 2 secondes
      }
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (newCategory) => {
    try {
      const response = await api.post('categories', {
        json: newCategory,
      }).json();
      setCategories((prev) => [...prev, response]);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    }
  };

  const updateCategory = async (id, updatedCategory) => {
    try {
      const response = await api.put(`categories/${id}`, {
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
      await api.delete(`categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []); // Appelle fetchCategories lors du premier rendu

  return (
    <CategoryContext.Provider value={{ fetchCategories, categories, loading, error, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useCategory = () => {
  return useContext(CategoryContext);
};
