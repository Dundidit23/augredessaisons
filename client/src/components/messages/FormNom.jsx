import React, { useState, useEffect } from 'react';

const FormNom = ({ onSubmit, isEditing, currentNom, onCancel }) => {
  const [nom, setNom] = useState(currentNom || ''); // État pour le nom actuel

  useEffect(() => {
    setNom(currentNom); // Met à jour le nom lorsque currentNom change
  }, [currentNom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(nom); // Appelle la fonction onSubmit passée en props
    setNom(''); // Réinitialise le champ d'entrée
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Modifier' : 'Ajouter'} un nouveau nom</h2>
      <label htmlFor="nom">Nom</label>
      <input
        type="text"
        id="nom"
        name="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <br />
      <input type="submit" value={isEditing ? 'Sauvegarder' : 'Ajouter'} />
      {isEditing && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Annuler les changements
        </button>
      )}
    </form>
  );
};

export default FormNom;