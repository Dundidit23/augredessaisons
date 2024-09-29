import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ModalProduct from './ModalProduct'; // Import the Modal component
import './dash.scss';

const DashAction = ({ onAdd, onFilter, onViewChange }) => {
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const categories = ["Infusion", "Huiles", "Gemmo", "Teintures"];
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProduct = (product) => {
    if (product.name && product.category) {
      const newProductId = uuidv4();
      onAdd({ ...product, id: newProductId });
      setShowAddModal(false);
    }
  };

  return (
    <div className="dash-action">
      <button onClick={() => setShowAddModal(true)}>Add Product</button>
      <select onChange={(e) => onFilter(e.target.value)} value={filterCategory}>
        <option value="All Categories">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <button onClick={onViewChange}>Toggle Theme</button>
      {showAddModal && (
        <ModalProduct 
          onClose={() => setShowAddModal(false)} 
          onSave={handleAddProduct} 
        />
      )}
    </div>
  );
};

export default DashAction;