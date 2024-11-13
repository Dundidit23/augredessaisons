// ItemUser.jsx
import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import socket from '../../services/socketIoClient'; // Ajoutez cette ligne pour importer socket

const ItemUser = ({ user, handleEdit, handleDelete }) => {
  const { onlineUsers } = useSocket(); // Récupération de la liste des utilisateurs en ligne
  const [isUserOnline, setIsUserOnline] = useState(user.isOnline);

  useEffect(() => {
    // Mettre à jour le statut en ligne à partir de la liste des utilisateurs en ligne
    const onlineStatus = onlineUsers[user._id] === 'online' || user.isOnline;
    setIsUserOnline(onlineStatus);

    // Écouter les mises à jour de statut
    const handleStatusUpdate = (data) => {
      if (data.status === 'offline') {
        // Mettre à jour l'état pour marquer l'utilisateur comme hors ligne
        setIsUserOnline(false);
      } else if (data.status === 'online') {
        // Mettre à jour l'état pour marquer l'utilisateur comme en ligne
        setIsUserOnline(true);
      }
    };

    socket.on('status_update', handleStatusUpdate);
    return () => {
      socket.off('status_update', handleStatusUpdate); // Nettoyer l'écouteur
    };
  }, [onlineUsers, user._id, user.isOnline]);

  const statusColor = isUserOnline ? 'green' : 'red';

  return (
    <div className="user-item">
      <h3>Nom : {user.username}</h3>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>
      <p style={{ color: statusColor }}>
        <span>{isUserOnline ? '🟢' : '🔴'}</span>
        {isUserOnline ? ' En ligne' : ' Hors ligne'}
      </p>
      <div className="buttons-actions">
        <button onClick={() => handleEdit(user)}>Modifier</button>
        <button onClick={() => handleDelete(user._id)}>Supprimer</button>
      </div>
    </div>
  );
};

export default ItemUser;