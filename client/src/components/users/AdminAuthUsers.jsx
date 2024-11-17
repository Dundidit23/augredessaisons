import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import ItemUser from './ItemUser';
import './adminAuthUsers.scss';

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
  const [showForm, setShowForm] = useState(false);
  const [isTableView, setIsTableView] = useState(false);

  const toggleView = () => {
    setIsTableView((prevMode) => !prevMode);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEditUser = (user) => {
    setFormData({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status,
    });
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleAddAdmin = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { _id, username, email, role, password } = formData;
    const updatedData = { _id, username, email, role };

    if (isEditMode && password.trim() !== '') {
      updatedData.password = password;
    }

    if (isEditMode) {
      await updateAdmin(updatedData);
    } else {
      await addAdmin(formData);
    }

    setFormData({
      _id: '',
      username: '',
      email: '',
      password: '',
      role: '',
    });
    setIsEditMode(false);
    setShowForm(false);
    fetchAdmins();
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      await deleteAdmin(id);
      fetchAdmins();
    }
  };

  return (
    <div className='adminAuthUsers'>
      <div className='title'>
        <h3>Gestion des administrateurs</h3>
        <div className='buttons-control'>
          <button onClick={handleAddAdmin} className="btn">
            Créer un administrateur
          </button>
          <button className="view-toggle btn" onClick={toggleView}>
            {isTableView ? 'Vue Grille' : 'Vue Tableau'}
          </button>
        </div>
      </div>

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
            required={!isEditMode}
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
        isTableView ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((user) => (
                <ItemUser
                  key={user._id}
                  user={user}
                  handleEdit={handleEditUser}
                  handleDelete={handleDeleteUser}
                  isTableView={true}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid">
            {admins.map((user) => (
              <ItemUser
                key={user._id}
                user={user}
                handleEdit={handleEditUser}
                handleDelete={handleDeleteUser}
                isTableView={false}
              />
            ))}
          </div>
        )
      ) : (
        <p>Aucun administrateur trouvé.</p>
      )}
    </div>
  );
};

export default AdminAuthUsers;
