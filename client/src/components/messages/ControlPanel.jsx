//ControlPanel.jsx
import React from 'react';
import './controlPanel.scss';

const ControlPanel = ({
  loading,
  handleRefresh,
  handleDeleteSelected,
  handleMarkAsRead,
  handleMarkAsReplied,
  searchTerm,
  setSearchTerm,
}) => (
  <div className="control-bar">
    <button onClick={handleRefresh} disabled={loading}>
      {loading ? 'Actualisation...' : 'Actualiser'}
    </button>

    <button onClick={handleRefresh}>Actualiser</button> {/* Correction ici */}
    <button onClick={handleDeleteSelected}>Supprimer sélectionnés</button>
    <button onClick={handleMarkAsRead}>Marquer comme lus</button>
    <button onClick={handleMarkAsReplied}>Marquer comme répondus</button>
    <input
      type="text"
      placeholder="Rechercher..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);

export default ControlPanel
