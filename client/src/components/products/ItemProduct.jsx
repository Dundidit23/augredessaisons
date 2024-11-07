//itemProduct.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ItemProduct = ({ 
  product, 
  isAdminView, 
  currentCategory, 
  handleEdit,
  handleDelete 
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`, { state: { category: currentCategory } });
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-item">
      <img 
        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`} 
        alt={`Image de ${product.name}`} 
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.category || "N/A"}</p>
      <p>Prix : {product.price} €</p>
      <p>Stock : {product.stock}</p>
      {isAdminView ? (
        <div className='buttons-actions'>
          <button onClick={() => handleEdit(product._id)}>Modifier</button>
          <button onClick={() => handleDelete(product._id)}>Supprimer</button>
        </div>
      ) : (
        <>
          <button onClick={handleViewDetails}>Voir</button>
          <button onClick={handleAddToCart}>Ajouter au panier</button>
        </>
      )}
    </div>
  );
};

export default ItemProduct;