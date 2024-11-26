// Messages
import React, { useEffect, useState} from 'react';
import {
  fetchMessages,
  replyToMessage,
  deleteMessage,
  markMessageAsRead,
  markAsReplied,
} from '../../services/api';
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import './messages.scss';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedTab, setSelectedTab] = useState('received'); // Tabs: received, sent, deleted
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [messageListHeight, setMessageListHeight] = useState(60); // Hauteur initiale en pixels
  const [messageDetailsHeight, setMessageDetailsHeight] = useState(40); // Hauteur initiale en pourcentage
  const [isResizing, setIsResizing] = useState(false);
  
  //const isResizingRef = useRef(false);

  // Gestion du redimensionnement - test
  const handleMouseDown = () => {
    setIsResizing(true);
    document.body.style.cursor = 'default'; // Change le curseur globalement
    document.body.style.userSelect = 'none'; // Désactive la sélection de texte
  };
  const handleMouseMove = (e) => {
    if (isResizing) {
      const newHeight = (e.clientY / window.innerHeight) * 100;
      if (newHeight > 20 && newHeight < 80) {
        setMessageListHeight(newHeight);
        setMessageDetailsHeight(100 - newHeight);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.body.style.cursor = 'default'; // Rétablit le curseur par défaut
    document.body.style.userSelect = ''; // Rétablit la sélection de texte
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);


  // Chargement des messages
  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await fetchMessages(selectedTab);
      setMessages(data.map((msg) => ({
        ...msg,
        isReplied: msg.replied,
      })));
    } catch (err) {
      setError('Erreur lors de la récupération des messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, [selectedTab]);

  // Gestion des actions
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
  const handleReadMessage = (msg) => {
    setSelectedMessage(msg);
  };

  const handleDeleteSelected = async () => {
    if (!selectedMessages.length) {
      alert("Aucun message sélectionné !");
      return;
    }
    try {
      await Promise.all(selectedMessages.map((id) => deleteMessage(id)));
      setMessages((prev) => prev.filter((msg) => !selectedMessages.includes(msg._id)));
      setSelectedMessages([]);
    } catch {
      alert('Erreur lors de la suppression des messages');
    }
  };
   // Fonction pour supprimer un message
   const handleDeleteMessage = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer ce message ?");
    if (!confirmDelete) return;
    try {
      await deleteMessage(id);
      setMessages(messages.filter((message) => message._id !== id));
      alert('Message supprimé avec succès !');
    } catch (error) {
      console.error("Erreur lors de la suppression du message :", error);
      alert('Erreur lors de la suppression du message');
    }
  };


 // Fonction pour trier les messages
 const sortMessages = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });

  const sortedMessages = [...messages].sort((a, b) => {
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  setMessages(sortedMessages);
};
const getSortIcon = (key) => {
  if (sortConfig.key === key) {
    return sortConfig.direction === 'asc' ? '▲' : '▼';
  }
  return '⇅';
};
const markAsRead = async (id) => {
  try {
    // Appel à l'API pour marquer comme lu
    await markMessageAsRead(id);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === id ? { ...msg, read: true } : msg // Utiliser read au lieu de isRead
      )
    );
  } catch (error) {
    console.error('Erreur lors du marquage du message comme lu', error);
  }
};

const handleMarkAsReplied  = async (id) => {
  try {
    // Appel à l'API pour marquer comme lu
    await markAsReplied(id);
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg._id === id ? { ...msg, isreplied: true } : msg // Utiliser read au lieu de isRead
      )
    );
  } catch (error) {
    console.error('Erreur lors du marquage du message comme lu', error);
  }
};


  const handleReply = async (id) => {
    if (!replyContent.trim()) {
      alert('Veuillez écrire une réponse.');
      return;
    }
    try {
      await replyToMessage(id, replyContent);
      alert('Réponse envoyée avec succès');
      setReplyContent('');
      setShowReplyForm(false);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, isReplied: true } : msg))
      );
    } catch {
      alert('Erreur lors de l\'envoi de la réponse');
    }
  };
  const refreshMessages = async () => {
    await getMessages(); // Réutilise la même fonction pour rafraîchir
  };
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`messages content ${isResizing ? 'resizing' : ''}`}>
      {/* <div className="message-list" style={{ flex: `${messageListWidth}%` }}> */}
     {/* //</div></div> <div className="messages content"> */}
      <div className="message-list" style={{ flex: `${100 - messageDetailsHeight}%` }}>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) => (e.target.checked ? selectAllMessages() : deselectAllMessages())}
                />
              </th>
              <th onClick={() => sortMessages('receivedAt')}>
  Reçu le {getSortIcon('receivedAt')}
</th>
<th onClick={() => sortMessages('name')}>
  Nom {getSortIcon('name')}
</th>
<th onClick={() => sortMessages('email')}>
  Email {getSortIcon('email')}
</th>
<th onClick={() => sortMessages('subject')}>
  Sujet {getSortIcon('subject')}
</th>
<th onClick={() => sortMessages('read')}>
  Lu {getSortIcon('read')}
</th>
<th onClick={() => sortMessages('replied')}>
  Répondus {getSortIcon('replied')}
</th>
      
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr
                key={msg._id}
                className={`message-row ${msg.read ? 'read' : 'unread'}`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.read) markMessageAsRead(msg._id);
                }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(msg._id)}
                    onChange={() => toggleMessageSelection(msg._id)}
                  />
                </td>
                <td>{new Date(msg.receivedAt).toLocaleDateString()}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.subject}</td>
                <td>{msg.read ? '✅' : '❌'}</td>
                <td>{msg.isReplied ? '🟢' : '🔴'}</td>
                <td>
                <div className="buttons-actions">
                <button onClick={() => handleReply(msg._id)}>
            <MdOutlineEditNote />
          </button>
          <button className="delete" onClick={() => handleDeleteMessage(msg._id)}>
            <BsTrash3 />
          </button>
          </div>
                </td>
              </tr>
            ))}
          </tbody>
         
        </table>
       
      </div>
    
      <div className="message-details" style={{ flex: `${100 - messageListHeight}%` }}>
      <div
            className="resizer"
            onMouseDown={handleMouseDown}
       >
         </div>
        {selectedMessage && (
          <div> 
            <div className='message-details-title'> <h5>Détails du Message</h5> 
            <div className='message-details-controlls'>
            <button onClick={() => setShowReplyForm(true)}>Répondre</button>
            <button onClick={() => setSelectedMessage(null)}>Fermer</button>
            <button onClick={() => handleReply(selectedMessage._id)}>Envoyer</button>
            </div>
           
            </div>
           <div>
           <p><strong>Nom :</strong> {selectedMessage.name}</p>
            <p><strong>Email :</strong> {selectedMessage.email}</p>
            <p><strong>Sujet :</strong> {selectedMessage.subject}</p>
            <p><strong>Message :</strong> {selectedMessage.content}</p>
           </div>
          
           
          </div>
        )}
        {showReplyForm && (
          <div>
            <textarea
              placeholder="Votre réponse..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            />
          
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
