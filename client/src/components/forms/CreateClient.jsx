import React, { useState, useEffect } from 'react';
import './createProduct.scss';

const CreateClient = ({ client, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',  // Changez MdPassword en password
    avatar: '',
    role: '',
  });

  useEffect(() => {
    if (isEditing && client) {
      setFormData(client); // Remplit le formulaire avec les données du client à éditer
    }
  }, [isEditing, client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Appelle la fonction onSubmit passée en prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Client' : 'Add Client'}</h2>
      {/* Votre code pour les champs du formulaire */}
      <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <input name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Avatar URL" />
      <input name="role" value={formData.role} onChange={handleChange} placeholder="Role" required />
      <button type="submit">{isEditing ? 'Update Client' : 'Create Client'}</button>
    </form>
  );

};

export default CreateClient;
