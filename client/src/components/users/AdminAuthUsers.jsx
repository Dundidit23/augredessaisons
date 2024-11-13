//AdminAuthUsers.jsx
import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import ItemUser from './ItemUser';
import './adminAuthUsers.scss'

const AdminAuthUsers = () => {
  const {
    isLoading,
    errorMessage,
    fetchAdmins,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    admins,
  } = useAdminAuth();
  
  const [formData, setFormData] = useState({
    _id: '',
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false); // Ajouter un état pour gérer l'affichage du formulaire

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Fonction pour remplir le formulaire avec les données d'un utilisateur existant
  const handleEditUser = (user) => {
    setFormData({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: '', // laisser vide pour la mise à jour
      role: user.role,
      status: user.status,
    });
    setIsEditMode(true);
    setShowForm(true); // Afficher le formulaire lorsque vous êtes en mode édition
  };

  // Fonction pour gérer l'ajout d'un administrateur
  const handleAddAdmin = () => {
    setFormData({
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setIsEditMode(false);
    setShowForm(true); // Afficher le formulaire pour ajouter un nouvel administrateur
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
    setShowForm(false); // Masquer le formulaire sans sauvegarder les modifications
  };

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fonction pour gérer la soumission du formulaire (ajout ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Si en mode édition, ne pas envoyer le mot de passe vide
    const { _id, username, email, role, status, password } = formData;
    const updatedData = { _id, username, email, role };
  
    // Inclure le mot de passe seulement s'il a été saisi
    if (isEditMode && password.trim() !== '') {
      updatedData.password = password;
    }
  
    if (isEditMode) {
      await updateAdmin(updatedData);
    } else {
      await addAdmin(formData);
    }
    
    // Réinitialiser le formulaire
    setFormData({
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setIsEditMode(false);
    setShowForm(false); // Masquer le formulaire après soumission
    fetchAdmins(); // Actualiser la liste des admins
  };

  // Fonction pour supprimer un utilisateur
  const handleDeleteUser = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      await deleteAdmin(id);
      fetchAdmins();
    }
  };

  return (
    <div className='adminAuthUsers'>
      <div className='title '>
         <h3>Gestion des administrateurs</h3>
      <button onClick={handleAddAdmin} className="btn">
        Créer un administrateur
      </button>
      </div>
      {/* Affichage conditionnel du formulaire */}
      {showForm && (
        <form onSubmit={handleSubmit}>
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
            required={!isEditMode} // Mot de passe requis seulement en mode ajout
          />
          <input
            name="role"
            type="text"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Rôle"
            required
          />
        
          <button type="submit">{isEditMode ? 'Mettre à jour' : 'Ajouter'}</button>

          {/* Bouton annuler pour réinitialiser le formulaire */}
          <button type="button" onClick={handleCancel} className="btn-cancel">
            Annuler
          </button>
        </form>
      )}

     
      {isLoading ? (
        <div>Chargement...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : admins.length > 0 ? (
        admins.map((user) => (
          <ItemUser
            key={user._id}
            user={user}
            handleEdit={handleEditUser}
            handleDelete={handleDeleteUser}
          />
        ))
      ) : (
        <p>Aucun administrateur trouvé.</p>
      )}
    </div>
  );
};

export default AdminAuthUsers;
