//ItemProduct.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ItemProduct = ({ 
  product, 
  isAdminView, 
  handleUpdate, 
  handleDelete, 
  startEditProduct, 
  isEditMode 
}) => {  
  const { addToCart } = useCart();
  //const [updatedProduct, setUpdatedProduct] = useState(product);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-item">
      {/* Image */}
      <img src={`${import.meta.env.VITE_API_BASE_URL}${product.image}`} />

      {/* Nom et Description */}
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      {/* Catégorie */}
      <p>{product.category ? product.category || product.category : "N/A"}</p>
      {/* Prix et Stock */}
      <p>Prix : {product.price} €</p>
      <p>Stock : {product.stock}</p>

      {/* Boutons selon la vue */}
      {isAdminView && (
        <>
          <button onClick={() => startEditProduct(product)}>Modifier</button>
          <button onClick={() => handleDelete(product._id)}>Supprimer</button>
        </>
      )}

      {!isAdminView && (
        <>
          <button onClick={handleViewDetails}>Voir</button>
          <button onClick={handleAddToCart}>Ajouter au panier</button>
        </>
      )}
    </div>
  );
};

export default ItemProduct;
