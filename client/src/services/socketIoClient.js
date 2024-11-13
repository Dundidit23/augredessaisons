// services/socketIoClient.js
import io from 'socket.io-client';


const socket = io(import.meta.env.VITE_WS_BASE_URL);

socket.on('connect', () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    socket.emit('userOnline', userId);
  }
});

socket.on('message', (data) => {
  if (data.type === 'statusUpdate') {
    console.log(`${data.userId} est maintenant ${data.status}`);
  } else if (data.type === 'chatMessage') {
    console.log(data.text);  // Affiche le message de chat
  }
});

// Fonction pour changer le statut
function changeStatus(userId, status) {
  socket.emit('change_status', userId, status);
}

// Gérer la déconnexion proprement
const handleDisconnect = () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    socket.emit('change_status', userId, 'offline');
  }
  socket.disconnect();
};

window.addEventListener('beforeunload', handleDisconnect);

socket.on('disconnect', () => {
  console.log('Déconnecté du serveur');
  handleDisconnect();
});

// Gestion des erreurs de connexion
socket.on('connect_error', (err) => {
  console.error('Erreur de connexion:', err.message);
  handleDisconnect(); // Déconnexion propre
});

export default socket;
