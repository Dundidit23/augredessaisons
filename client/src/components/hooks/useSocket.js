//useSocket.js
import { useEffect, useState } from 'react';
import socket from '../../services/socketIoClient'; // Ton fichier socket.io-client.js

// Hook pour gérer les connexions et les statuts des utilisateurs
const useSocket = () => {
  const [onlineUsers, setOnlineUsers] = useState({}); // Pour stocker les utilisateurs en ligne

  useEffect(() => {
    // Écouter les mises à jour de statut des utilisateurs
    socket.on('status_update', (data) => {
      setOnlineUsers((prevUsers) => ({
        ...prevUsers,
        [data.userId]: data.status, // Mise à jour du statut
      }));
    });

    // Optionnellement, écouter les événements de connexion et de déconnexion
    socket.on('connect', () => {
      console.log('Connecté au serveur Socket.io');
    });

    socket.on('disconnect', () => {
      console.log('Déconnecté du serveur Socket.io');
    });

    // Nettoyage à la déconnexion du composant
    return () => {
      socket.off('status_update'); // Désabonnement à l'événement
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  // Fonction pour émettre un changement de statut
  const changeUserStatus = (userId, status) => {
    socket.emit('change_status', userId, status); // Émet un changement de statut
  };

  return { onlineUsers, changeUserStatus };
};

export default useSocket;
