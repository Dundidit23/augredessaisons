// AdminUsers.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useUser } from '../../context/UserContext';

const AdminUsers = () => {
  const { users, isLoading, errorMessage, addUser, updateUser, deleteUser, fetchUsers } = useUser();
  const formRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [formData, setFormData] = useState({
    _id: user._id,
    username: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
    status: user.status,
    avatar: user.avatar,
    image: user.image,
  });
  
  const fileInputRef = useRef(null);

  // Charger les catégories et produits une seule fois
 
  // Fonction pour commencer l'édition d'un produit
  const startEditUser = (user) => {
    setUserToEdit(user);
    setFormData({
      _id: user._id,
      username: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      status: user.status,
      //avatar: user.avatar,
     // image: user.image,
    });
    // const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${user.image.replace(/\\/g, '/')}`;
    // setPreviewImage(imageUrl);
    // setIsEditMode(true);
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fonction pour gérer les changements dans le champ fichier (image)
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prevData) => ({ ...prevData, image: file }));
  //     const previewUrl = URL.createObjectURL(file);
  //     setPreviewImage(previewUrl);
  //   }
  // };

  // Fonction pour réinitialiser le formulaire
  const handleCancel = () => {
    setFormData({
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
      status: '',
      //avatar: '',
     // image: '',
    });
    // setPreviewImage(null);
    // fileInputRef.current.value = null;  // Réinitialiser le champ fichier
    // setIsEditMode(false);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = { ...formData };
    if (isEditMode) {
      await updateUser(formDataToSubmit);
    } else {
      await addUser(formDataToSubmit);
    }

    handleCancel(); // Réinitialiser après soumission
  };

  const handleDelete = async (userId) => {
    await deleteUser(userId);
  };

  return (
    <div>
      <h2>{isEditMode ? 'Modifier' : 'Ajouter'} un utilisateur</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="Nom de l/'utilisateur"
          required
        />

        <textarea
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="adresse mail"
          required
        />

        {/* <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category}
            </option>
          ))}
        </select> */}

        {/* <input
          name="image"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {previewImage && <img src={previewImage} alt="Aperçu" width="100" />} */}

        <input
          name="password"
          type="test"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="mot de passe"
          required
        />

        <input
          name="role"
          type="text"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="role"
          required
        />
           <input
          name="statut"
          type="text"
          value={formData.status}
          onChange={handleInputChange}
          placeholder="statut"
          required
        />

        <button type="submit">
          {isEditMode ? 'Modifier' : 'Ajouter'} l'utilisateur
        </button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Annuler
        </button>
      </form>

      <h2>Gestion des utilisateurs (Admin)</h2>
      <div className="user-list">
        {users.map((user) => (
          <ItemUser
            key={user._id}
            user={user}
            isAdminView={true}
            handleDelete={handleDelete}
            startEditUser={startEditUser}
            isEditMode={isEditMode && userToEdit?._id === user._id}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
