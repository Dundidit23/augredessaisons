import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext'; // Assurez-vous d'avoir le contexte UserContext
import ItemUser from './ItemUser'; // Assurez-vous d'avoir ce composant pour afficher chaque utilisateur
import './adminAuthUsers.scss';

const AdminUsers = () => {
  const {
    users,
    isLoading,
    errorMessage,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser
  } = useUser();

  const [formData, setFormData] = useState({
    _id: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false); // Contrôler l'affichage du formulaire

  useEffect(() => {
    fetchUsers(); // Charger les utilisateurs au montage du composant
  }, []);

  // Fonction pour démarrer l'édition d'un utilisateur
  const handleEditUser = (user) => {
    setFormData({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: '', // laisser vide pour la mise à jour
      role: user.role,
    });
    setIsEditMode(true);
    setShowForm(true);
  };

  // Fonction pour initialiser le formulaire pour l'ajout d'un utilisateur
  const handleAddUser = () => {
    setFormData({
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setIsEditMode(false);
    setShowForm(true);
  };

  // Fonction pour annuler l'ajout/modification
  const handleCancel = () => {
    setFormData({
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setIsEditMode(false);
    setShowForm(false);
  };

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { _id, username, email, password, role } = formData;
    const userToSubmit = { _id, username, email, role };

    // Inclure le mot de passe seulement s'il a été saisi
    if (isEditMode && password.trim() !== '') {
      userToSubmit.password = password;
    }

    if (isEditMode) {
      await updateUser(userToSubmit);
    } else {
      await addUser(userToSubmit);
    }

    handleCancel(); // Réinitialiser et masquer le formulaire après soumission
    fetchUsers(); // Rafraîchir la liste des utilisateurs
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      await deleteUser(userId);
      fetchUsers(); // Actualiser la liste après suppression
    }
  };

  return (
    <div className="adminUsers">
      <div className="title">
        <h3>Gestion des utilisateurs</h3>
        <button onClick={handleAddUser} className="btn">
          Ajouter un utilisateur
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showForm && (
        <form onSubmit={handleSubmit} className="userForm">
          <h2>{isEditMode ? 'Modifier' : 'Ajouter'} un utilisateur</h2>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Nom d'utilisateur"
            required
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
            required={!isEditMode} // Requis seulement lors de l'ajout
          />
          <input
            name="role"
            type="text"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Rôle"
            required
          />
         
          <div className="formActions">
            <button type="submit">{isEditMode ? 'Mettre à jour' : 'Ajouter'}</button>
            <button type="button" onClick={handleCancel} className="btn-cancel">
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Liste des utilisateurs */}
      {isLoading ? (
        <div>Chargement...</div>
      ) : errorMessage ? (
        <div className="error">{errorMessage}</div>
      ) : (
        <div className="userList">
          {users.length > 0 ? (
            users.map((user) => (
              <ItemUser
                key={user._id}
                user={user}
                handleEdit={handleEditUser}
                handleDelete={handleDeleteUser}
              />
            ))
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
