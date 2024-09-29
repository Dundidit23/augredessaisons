import React, { useState } from 'react';
import Modal from '../Admin//dashboard3/ModalProduct'; // Import the Modal component
import './productItem.scss';

const ProductItem = ({ product, onEdit, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);

  const handleEditProduct = () => {
    onEdit(editedProduct);
    setShowEditModal(false);
  };
  const handleDelete = () => {
    onDelete(productId);
  };
  return (
    <>
      <ul className='item-product'>
        <li>{product.id}</li>
        <li>{product.name}</li>
        <li><img src={product.imageUrl} className="ProductImg" alt={product.name} style={{ width: '30px', height: '30px'}} /></li>
        <li>{product.description}</li>
        <li>{product.category}</li>
        <li>{product.stock}</li>
        <li>{product.price} €</li>
        <li>
          <button onClick={() => setShowEditModal(true)} className='productItemButton'>Edit</button>
        </li>
        <li>
          <button onClick={() => onDelete(product.id)} className='productItemButton'>Delete</button>
        </li>
      </ul>

      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Product">
        <div className="modal-form">
          <input 
            type="text" 
            placeholder="Product Name" 
            value={editedProduct.name} 
            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })} 
          />
          <select value={editedProduct.category} onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}>
            <option>Select Category</option>
            {/* Assuming you have categories passed or imported */}
            <option value="Infusion">Infusion</option>
            <option value="Huiles">Huiles</option>
            <option value="Gemmo">Gemmo</option>
            <option value="Teintures">Teintures</option>
          </select>
          <input 
            type="number" 
            placeholder="Price" 
            value={editedProduct.price} 
            onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} 
          />
          <input 
            type="number" 
            placeholder="Stock" 
            value={editedProduct.stock} 
            onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Image URL" 
            value={editedProduct.imageUrl} 
            onChange={(e) => setEditedProduct({ ...editedProduct, imageUrl: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Description"  
            value={editedProduct.description}  
            onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} 
          />
          <button onClick={handleEditProduct}>Save Changes</button>
        </div>
      </Modal>
    </>
  );
};

export default ProductItem;
