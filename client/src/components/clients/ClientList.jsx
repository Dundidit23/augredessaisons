//ClientList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchClients, addClient, updateClient, deleteClient } from '../../services/api';
import DashAction from '../dashboard/DashAction';
import Modal from '../modal/Modal';
import CreateClient from '../forms/CreateClient'; // Votre composant de formulaire pour les clients
import '../products/productList.scss';

const ClientList = () => {
  const [clientList, setClientList] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchClients()
      .then(data => {
        setClientList(data);
        setFilteredClients(data);
      })
      .catch(err => console.error('Erreur lors de la récupération des clients:', err));
  }, []);

  const handleAdd = (newClient) => {
    addClient(newClient) // Utilisez addClient ici
      .then(() => {
        const updatedClients = [...clientList, newClient];
        setClientList(updatedClients);
        setFilteredClients(updatedClients);
      })
      .catch(err => console.error('Erreur lors de l\'ajout du client:', err));
};

  const handleEdit = (client) => {
    setEditingClient(client);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleUpdate = (updatedClient) => {
    updateClient(updatedClient)
      .then(() => {
        const updatedClients = clientList.map(client =>
          client._id === updatedClient._id ? updatedClient : client
        );
        setClientList(updatedClients);
        setFilteredClients(updatedClients);
        setShowModal(false);
        setEditingClient(null);
        setIsEditing(false);
      })
      .catch(err => console.error('Erreur lors de la mise à jour du client:', err));
  };

  const handleDelete = (clientId) => {
    deleteClient(clientId)
      .then(() => {
        const updatedClients = clientList.filter(client => client._id !== clientId);
        setClientList(updatedClients);
        setFilteredClients(updatedClients);
      })
      .catch(err => console.error('Erreur lors de la suppression du client:', err));
  };

  return (
    <div className='client-list-principal'>
      <h1>Clients</h1>
      <DashAction 
        onAdd={handleAdd} 
      />
      <div className='client-grid'>
        {filteredClients.map(client => (
          <div key={client._id}>
            <h2>{client.name}</h2>
            <button onClick={() => handleEdit(client)}>Edit</button>
            <button onClick={() => handleDelete(client._id)}>Delete</button>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <CreateClient 
            client={editingClient} 
            onSubmit={isEditing ? handleUpdate : handleAdd} 
          />
        </Modal>
      )}
    </div>
  );
};

export default ClientList;
