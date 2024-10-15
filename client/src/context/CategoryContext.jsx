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
  const [isLoading, setIsLoading] = useState(true); // État pour le chargement
  const [errorMessage, setErrorMessage] = useState(''); // État pour gérer les messages d'erreur


  useEffect(() => {
    // Fetch all categories when the component mounts
    const loadCategories = async () => {
      setIsLoading(true); // Commencer le chargement
      try {
        const data = await fetchCategories();
        console.log('Catégories récupérées:', data); // Ajoutez cette ligne
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setErrorMessage('Une erreur est survenue lors de la récupération des catégories.'); // Message d'erreur
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };

    loadCategories();
  }, []);


  

  const addNewCategory = async (newCategory) => {
    try {
      const addedCategory = await addCategory(newCategory); // Appel à l'API pour ajouter la catégorie
      setCategories((prevCategories) => [...prevCategories, addedCategory]); // Mettre à jour l'état local avec la nouvelle catégorie ajoutée
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
    setCategories((prevCategories) =>
      prevCategories.map((cat) => (cat._id === categoryId ? updated : cat))
    );
  };


  const deleteExistingCategory = async (categoryId) => {
    await deleteCategory(categoryId);
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat._id !== categoryId)
    );
  };


  return (
    <CategoryContext.Provider
      value={{
        categories,
        isLoading, // Ajout de l'état de chargement
        errorMessage, // Ajout de l'état de message d'erreur
        addNewCategory,
        updateExistingCategory,
        deleteExistingCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
