import React, { useState, useEffect } from 'react';

const ProductFormModal = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      // Load the product data into the form when editing
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product) {
      // Update product logic
    } else {
      // Add new product logic
    }
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <fieldset>
        <label>Nom du produit</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        
</fieldset>
<fieldset>
        <label>Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
</fieldset>
<fieldset>
        <label>Prix</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
</fieldset>
<fieldset>
        <label>Stock</label>
        <input
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        />
        </fieldset>
        <button type="submit">{product ? 'Mettre à jour' : 'Ajouter'}</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
    </div>
  );
};

export default ProductFormModal;
