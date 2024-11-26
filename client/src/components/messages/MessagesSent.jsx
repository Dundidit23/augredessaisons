//MessagesSent.jsx
import React, { useEffect, useState } from 'react';
import { getSentMessages } from '../../services/api'; // Correction de l'import

const MessagesSent = () => {
  const [sentMessages, setSentMessages] = useState([]); // Variable d'état pour les messages envoyés
  const [loading, setLoading] = useState(false); // Variable d'état pour gérer le chargement
  const [error, setError] = useState(null); // Variable d'état pour gérer les erreurs
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);


  // Fonction pour récupérer les messages envoyés
  const fetchSentMessages = async () => {
    setLoading(true);
    setError(null); // Réinitialise l'erreur avant de charger les messages
    try {
      const data = await getSentMessages(); // Appel API pour récupérer les messages envoyés
      console.log('Données chargées dans le composant :', data);
      setSentMessages(data); // Mise à jour de l'état avec les données récupérées
    } catch (err) {
      console.error('Erreur dans le composant Messages:', err);
      setError('Erreur lors de la récupération des messages');
    } finally {
      setLoading(false); // Désactive le chargement
    }
  };
  const toggleMessageSelection = (id) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const selectAllMessages = () => {
    setSelectedMessages(messages.map((msg) => msg._id));
  };

  const deselectAllMessages = () => {
    setSelectedMessages([]);
  };
  useEffect(() => {
    fetchSentMessages(); // Chargement des messages au montage du composant
  }, []);

  return (
    <div>
      <h1>Messages envoyés</h1>
      <button onClick={() => {/* Logique pour écrire un message */}}>
        Écrire un message
      </button>
      
      {loading && <p>Chargement...</p>} {/* Affiche un message de chargement pendant le fetch */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Affiche l'erreur si une erreur survient */}

      <table>
        <thead>
          <tr>
          <th>
                <input
                  type="checkbox"
                  onChange={(e) => (e.target.checked ? selectAllMessages() : deselectAllMessages())}
                />
              </th>
            <th>Nom</th>
            <th>Email</th>
            <th>Sujet</th>
            <th>Contenu</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sentMessages.length > 0 ? (
            sentMessages.map((message) => (
              <tr key={message._id}>
                 <td>
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message._id)}
                    onChange={() => toggleMessageSelection(msg._id)}
                  />
                </td>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.subject}</td>
                <td>{message.content}</td>
                <td>{new Date(message.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucun message envoyé</td> {/* Message si aucun message n'est trouvé */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesSent;
