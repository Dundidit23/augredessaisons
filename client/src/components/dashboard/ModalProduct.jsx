import React, { useState } from 'react';
//import './modal.scss';

const ModalProduct = ({ onClose, onSave }) => {
  const [product, setProduct] = useState({
    name: '', 
    category: '', 
    description: '',
    stock: 0, 
    price: 0,
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {
    onSave(product);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Product</h2>
        <input 
          type="text" 
          name="name" 
          value={product.name} 
          onChange={handleChange} 
          placeholder="Name" 
        />
        <input 
          type="text" 
          name="category" 
          value={product.category} 
          onChange={handleChange} 
          placeholder="Category" 
        />
        <input 
          type="text" 
          name="description" 
          value={product.description} 
          onChange={handleChange} 
          placeholder="Description" 
        />
        <input 
          type="number" 
          name="stock" 
          value={product.stock} 
          onChange={handleChange} 
          placeholder="Stock" 
        />
        <input 
          type="number" 
          name="price" 
          value={product.price} 
          onChange={handleChange} 
          placeholder="Price" 
        />
        <input 
          type="text" 
          name="imageUrl" 
          value={product.imageUrl} 
          onChange={handleChange} 
          placeholder="Image URL" 
        />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalProduct;