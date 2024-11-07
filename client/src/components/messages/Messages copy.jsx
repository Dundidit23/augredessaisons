import React, { useState } from 'react';
import './messages.scss';
import TitleActions from './TitleActions.jsx';
import FormNom from './FormNom.jsx';

const Messages = () => {
  const [noms, setNoms] = useState([]); // État pour stocker la liste des noms
  const [isEditing, setIsEditing] = useState(false); // État pour savoir si nous sommes en mode édition
  const [currentNom, setCurrentNom] = useState(''); // État pour le nom actuel
  const [currentIndex, setCurrentIndex] = useState(null); // État pour l'index du nom en cours d'édition

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const form = e.target; // Récupère le formulaire
    const inputNom = form.nom.value; // Récupère la valeur de l'input
    setNoms([...noms, inputNom]); // Ajoute le nouveau nom à la liste
    setCurrentNom(''); // Réinitialise le champ d'entrée
    form.reset(); // Réinitialise le formulaire
  };

  const handleEdit = (index) => {
    setCurrentNom(noms[index]); // Remplit le champ d'édition avec le nom sélectionné
    setIsEditing(true); // Active le mode édition
    setCurrentIndex(index); // Stocke l'index du nom en cours d'édition
  };

  const handleDelete = (index) => {
    setNoms(noms.filter((_, i) => i !== index)); // Supprime le nom à l'index spécifié
  };

  const handleSaveEdit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const updatedNoms = noms.map((nom, index) => 
      index === currentIndex ? currentNom : nom // Met à jour le nom à l'index actuel
    );
    setNoms(updatedNoms);
    setIsEditing(false); // Désactive le mode édition
    setCurrentNom(''); // Réinitialise le champ d'entrée
    setCurrentIndex(null); // Réinitialise l'index
  };

  const handleCancel = () => {
    setCurrentNom(''); // Réinitialise le champ d'entrée
    setIsEditing(false); // Désactive le mode édition
    setCurrentIndex(null); // Réinitialise l'index
  };

  return (
    <div className="messages">
      <TitleActions />
      <form onSubmit={isEditing ? handleSaveEdit : handleSubmit}>
        <h2>{isEditing ? 'Modifier' : 'Ajouter'} un nouveau nom</h2>
        <label htmlFor="nom">Nom</label>
        <input type="text" id="nom" name="nom" value={currentNom} onChange={(e) => setCurrentNom(e.target.value)} />
        <br />
        <input type="submit" value={isEditing ? 'Modifier' : 'Ajouter'} />
        {isEditing && (
          <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
            Annuler les changements
          </button>
        )}
      </form>
      {noms.map((nom, index) => (
        <p key={index}>Bonjour {nom}</p> // Affiche chaque nom
      ))}
      {noms.map((nom, index) => (
        <div key={index}>
          <button type="button" onClick={() => handleEdit(index)}>Modifier</button>
          <button type="button" onClick={() => handleDelete(index)}>Supprimer</button>
        </div>
      ))}
      <FormNom />
    </div>
  );
};

export default Messages;