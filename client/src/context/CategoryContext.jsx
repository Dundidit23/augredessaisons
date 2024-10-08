//CategoryContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../services/api';

// Export CategoryContext
export const CategoryContext = createContext();

export const useCategory = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch all categories when the component mounts
    const loadCategories = async () => {
        try {
          const data = await fetchCategories();
          console.log('Catégories récupérées:', data); // Ajoutez cette ligne
          setCategories(data);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
      
    loadCategories();
  }, []);


  
  const [errorMessage, setErrorMessage] = useState(''); // État pour gérer les messages d'erreur

  const addNewCategory = async (newCategory) => {
    try {
      const addedCategory = await addCategory(newCategory); // Appel à l'API pour ajouter la catégorie
      setCategories([...categories, addedCategory]); // Mettre à jour l'état local avec la nouvelle catégorie ajoutée
      setErrorMessage(''); // Réinitialiser le message d'erreur
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Cette catégorie existe déjà. Veuillez en choisir une autre.'); // Message d'erreur convivial
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'ajout de la catégorie.'); // Message d'erreur générique
      }
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    }
  };
  

  const updateExistingCategory = async (categoryId, updatedCategory) => {
    const updated = await updateCategory(categoryId, updatedCategory);
    setCategories(
      categories.map((cat) => (cat._id === categoryId ? updated : cat))
    );
  };

  const deleteExistingCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    setCategories(categories.filter((cat) => cat._id !== categoryId));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addNewCategory,
        updateExistingCategory,
        deleteExistingCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
