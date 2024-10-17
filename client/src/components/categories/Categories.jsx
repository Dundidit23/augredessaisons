import React, { useState } from 'react';
//import Modal from '../modal/Modal'; 
import { useCategory } from '../../context/CategoryContext'; 
import './categories.scss';

const ManageCategories = () => {
  const { addCategory, updateCategory, deleteCategory, categories } = useCategory(); // Utilisation du hook
  const [newCategoryCategory, setNewCategoryCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleAddCategory = async () => {
    if (!newCategoryCategory) {
      setErrorMessage('Le nom de la catégorie ne peut pas être vide.');
      return;
    }
    
    try {
      await addCategory({ category: newCategoryCategory});
      setNewCategoryCategory(''); // Réinitialise le champ
      setErrorMessage('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Cette catégorie existe déjà. Veuillez en choisir une autre.');
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'ajout de la catégorie.');
      }
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category._id);
    setNewCategoryCategory(category.category); // Remplir le champ avec le nom de la catégorie à éditer
    setIsEditing(true);
  };

  const handleUpdateCategory = async () => {
    if (!newCategoryCategory) {
      setErrorMessage('Le nom de la catégorie ne peut pas être vide.');
      return;
    }
    try {
      await updateCategory(editingCategoryId, { category: newCategoryCategory }); // Assurez-vous que l'objet corresponde à ce qui est attendu par votre API
      setNewCategoryCategory('');
      setIsEditing(false);
      setEditingCategoryId(null);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la mise à jour de la catégorie.');
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (confirmDelete) {
      try {
        await deleteCategory(categoryId);
      } catch (error) {
        setErrorMessage('Une erreur est survenue lors de la suppression de la catégorie.');
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    }
  };

  return (
    <div>
      <h2>Gestion des Catégories</h2>
      <input
        type="text"
        value={newCategoryCategory}
        onChange={(e) => setNewCategoryCategory(e.target.value)}
        placeholder="Nouvelle catégorie"
      />
      <button onClick={isEditing ? handleUpdateCategory : handleAddCategory}>
        {isEditing ? 'Mettre à jour' : 'Ajouter'}
      </button>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
  
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.category} {/* Assurez-vous que 'name' correspond à votre champ de catégorie */}
            <button onClick={() => handleEditCategory(category)}>Éditer</button>
            <button onClick={() => handleDeleteCategory(category._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
