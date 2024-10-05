//UserList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../services/api';
import DashAction from '../dashboard/DashAction';
import Modal from '../modal/Modal';
import CreateUser from '../forms/CreateClient'; // Votre composant de formulaire pour les users
import '../products/productList.scss';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(data => {
        setUserList(data);
        setFilteredUsers(data);
      })
      .catch(err => console.error('Erreur lors de la récupération des users:', err));
  }, []);

  const handleAdd = (newUser) => {
    adduser(newUser) // Utilisez addUser ici
      .then(() => {
        const updatedUser = [...userList, newUser];
        setUserList(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch(err => console.error('Erreur lors de l\'ajout du user:', err));
};

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdate = (updatedUser) => {
    updateUser(updatedUser)
      .then(() => {
        const updatedUsers = userList.map(user =>
          user._id === updatedUser._id ? updatedUser : user
        );
        setUserList(updatedUsers);
        setFilteredUsers(updatedUsers);
        setShowModal(false);
        setEditingUser(null);
        setIsEditing(false);
      })
      .catch(err => console.error('Erreur lors de la mise à jour du user:', err));
  };

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then(() => {
        const updatedUsers = userList.filter(user => user._id !== userId);
        setUserList(updatedUsers);
        setFilteredUsers(updatedUsers);
      })
      .catch(err => console.error('Erreur lors de la suppression du user:', err));
  };

  return (
    <div className='user-list-principal'>
      <h1>Users</h1>
      <DashAction 
        onAdd={handleAdd} 
      />
      <div className='user-grid'>
        {filteredUsers.map(user => (
          <div key={user._id}>
            <h2>{user.name}</h2>
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <CreateUser 
            user={editingUser} 
            onSubmit={isEditing ? handleUpdate : handleAdd} 
          />
        </Modal>
      )}
    </div>
  );
};

export default UserList;
