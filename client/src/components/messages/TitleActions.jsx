import React from 'react';
import './titleActions.scss';

const TitleActions = ({ onAdd }) => {
  return (
    <div className="titleActions">
      <h1>Messages</h1>
      <button onClick={onAdd}>Ajouter un nom</button>
    </div>
  );
};

export default TitleActions;