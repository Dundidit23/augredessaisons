import React, { useState } from 'react';
import { useCategory } from '../../context/CategoryContext';
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md"; 
import './categories.scss';

const ManageCategories = () => {
  const { addCategory, updateCategory, deleteCategory, categories } = useCategory(); // Utilisation du hook
  const [newCategoryCategory, setNewCategoryCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [showInput, setShowInput] = useState(false); // État pour gérer l'affichage de l'input

  const handleAddCategory = async () => {
    if (!newCategoryCategory) {
      setErrorMessage('Le nom de la catégorie ne peut pas être vide.');
      return;
    }
    try {
      await addCategory({ category: newCategoryCategory });
      setNewCategoryCategory(''); // Réinitialise le champ
      setErrorMessage('');
      setShowInput(false); // Cacher l'input après l'ajout
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
    setShowInput(true); // Afficher l'input lors de l'édition
  };

  const handleUpdateCategory = async () => {
    if (!newCategoryCategory) {
      setErrorMessage('Le nom de la catégorie ne peut pas être vide.');
      return;
    }
    try {
      await updateCategory(editingCategoryId, { category: newCategoryCategory });
      setNewCategoryCategory('');
      setIsEditing(false);
      setEditingCategoryId(null);
      setErrorMessage('');
      setShowInput(false); // Cacher l'input après la mise à jour
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

  const handleButtonClick = () => {
    if (isEditing) {
      handleUpdateCategory(); // Mettre à jour la catégorie si en mode édition
    } else {
      handleAddCategory(); // Ajouter une catégorie si en mode ajout
    }
  };

  return (
    <div className='categories-content'>
      <div className='title'>
        <h2>Gestion des Catégories</h2>
        <div className='btn-input-container'>
          {showInput && (
            <input
              type="text"
              value={newCategoryCategory}
              onChange={(e) => setNewCategoryCategory(e.target.value)}
              placeholder="Nouvelle catégorie"
            />
          )}
          <button
            className="btn"
            onClick={() => {
              if (!showInput) {
                setShowInput(true); // Afficher l'input lors de l'ajout
                setIsEditing(false); // Réinitialiser l'état d'édition
                setNewCategoryCategory(''); // Réinitialiser le champ
              } else {
                handleButtonClick(); // Appeler la fonction appropriée (ajout ou mise à jour)
              }
            }}
          >
            {isEditing ? 'Mettre à jour' : 'Ajouter'} une catégorie
          </button>
        </div>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.category}
            <div className='buttons-actions'>
              <button onClick={() => handleEditCategory(category)}><MdOutlineEditNote /></button>
              <button onClick={() => handleDeleteCategory(category._id)}><BsTrash3 /></button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;