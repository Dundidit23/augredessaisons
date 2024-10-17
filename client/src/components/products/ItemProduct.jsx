import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ItemProduct = ({ product, isAdminView = false, isDetailView = false, isBoutiqueView = false, handleUpdate, handleDelete }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Gestion des actions spécifiques à chaque vue
  const handleViewDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-item">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price} €</p>

      {/* Affichage conditionnel des boutons selon la vue */}
      {isAdminView && (
        <>
          <button onClick={() => handleUpdate(product)}>Update</button>
          <button onClick={() => handleDelete(product)}>Delete</button>
        </>
      )}

      {isBoutiqueView && (
        <>
          <button onClick={handleViewDetails}>View Details</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </>
      )}

      {isDetailView && (
        <button onClick={handleAddToCart}>Add to Cart</button>
      )}
    </div>
  );
};

export default ItemProduct;
