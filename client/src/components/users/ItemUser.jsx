// ItemUser.jsx
import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import socket from '../../services/socketIoClient'; // Ajoutez cette ligne pour importer socket
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import './itemUser.scss';
const ItemUser = ({ user, handleEdit, handleDelete, isTableView }) => {
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

  if (isTableView) {
    // Affichage en mode tableau
    return (
      <tr>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td style={{ color: statusColor }}>
          {isUserOnline ? '🟢 En ligne' : '🔴 Hors ligne'}
        </td>
        <td>
          <div className="buttons-actions">
          <button onClick={() => handleEdit(user)}><MdOutlineEditNote /></button>
          <button onClick={() => handleDelete(user._id)}><BsTrash3 /></button>
          </div>
        </td>
      </tr>
    );
  } else {
    // Affichage en mode grille
    return (
      <div className="item">
        <h3>{user.username}</h3>
        <p>{user.email}</p>
        <p>Rôle : {user.role}</p>
        <p style={{ color: statusColor }}>
          {isUserOnline ? '🟢 En ligne' : '🔴 Hors ligne'}
        </p>
        <div className="buttons-actions">
          <button onClick={() => handleEdit(user)}><MdOutlineEditNote /></button>
          <button onClick={() => handleDelete(user._id)}><BsTrash3 /></button>
        </div>
      </div>
    );
  }
};

export default ItemUser;