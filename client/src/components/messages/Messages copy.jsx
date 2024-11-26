import React, { useState } from 'react';
import './messages.scss';
import TitleActions from './TitleActions.jsx';
import FormNom from './FormNom.jsx';
import Modal from '../modal/Modal'; // Assurez-vous que Modal est importé

const Messages = () => {
  const [noms, setNoms] = useState([]); // État pour stocker la liste des noms
  const [isEditing, setIsEditing] = useState(false); // État pour savoir si nous sommes en mode édition
  const [currentNom, setCurrentNom] = useState(''); // État pour le nom actuel
  const [currentIndex, setCurrentIndex] = useState(null); // État pour l'index du nom en cours d'édition
  const [showModal, setShowModal] = useState(false); // État pour afficher le modal

  const handleOpenModal = () => {
    setIsEditing(false); // Réinitialise l'état d'édition
    setCurrentNom(''); // Réinitialise le nom
    setShowModal(true); // Ouvre le modal
  };

  const handleSubmit = (nom) => {
    if (isEditing) {
      const updatedNoms = noms.map((n, index) => (index === currentIndex ? nom : n));
      setNoms(updatedNoms);
    } else {
      setNoms([...noms, nom]); // Ajoute le nouveau nom à la liste
    }
    setShowModal(false); // Ferme le modal
  };

  const handleEdit = (index) => {
    setCurrentNom(noms[index]); // Remplit le champ d'édition avec le nom sélectionné
    setIsEditing(true); // Active le mode édition
    setCurrentIndex(index); // Stocke l'index du nom en cours d'édition
    setShowModal(true); // Ouvre le modal
  };

  const handleDelete = (index) => {
    setNoms(noms.filter((_, i) => i !== index)); // Supprime le nom à l'index spécifié
  };

  const handleCancel = () => {
    setShowModal(false); // Ferme le modal
    setCurrentNom(''); // Réinitialise le champ d'entrée
    setIsEditing(false); // Désactive le mode édition
    setCurrentIndex(null); // Réinitialise l'index
  };

  return (
    <div className="messages">
      <TitleActions onAdd={handleOpenModal} />
      {noms.map((nom, index) => (
        <div key={index}>
          <p>Bonjour {nom}</p> {/* Affiche chaque nom */}
          <button type="button" onClick={() => handleEdit(index)}>Modifier</button>
          <button type="button" onClick={() => handleDelete(index)}>Supprimer</button>
        </div>
      ))}
      {showModal && (
     <Modal show={showModal} onClose={handleCancel}>
       <FormNom
         onSubmit={handleSubmit}
         isEditing={isEditing}
         currentNom={currentNom}
         onCancel={handleCancel}
       />
     </Modal>
   )}
    </div>
  );
};

export default Messages;