import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";

const ItemProduct = ({
  product,
  isAdminView,
  isProductDetailView,
  currentCategory,
  viewMode,
  handleEdit,
  handleDelete
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fonction de redirection vers les détails du produit
  const handleViewDetails = () => {
    navigate(`/product/${product._id}`, { state: { product, category: currentCategory } });
  };

  // Fonction pour ajouter le produit au panier
  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  // Déterminer la classe selon le mode d'affichage
  let productClass = '';
  if (viewMode === 'dashboard') {
    productClass = 'product-item-dashboard';
  } else if (isProductDetailView) {
    productClass = 'product-item-details';
  } else {
    productClass = 'product-item-boutique';
  }

  return (
    <div className={`product-item ${productClass}`}>
      {/* Affichage de l'image du produit */}
      <img
        className={`product-image ${productClass}`}
        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`}
        alt={`Image de ${product.name}`}
      />
      
      {/* Container pour les informations du produit */}
      <div className="info-container">
        {/* Afficher le nom du produit uniquement si ce n'est pas la vue de détail */}
        {!isProductDetailView && <h3>{product.name}</h3>}
        
        <p className={`product-description ${productClass}`}>{product.description}</p>
        <p className='category'>{product.category || "N/A"}</p>
        <p className='price'>Prix : {product.price} €</p>

        {isAdminView && <p className='stock'>Stock : {product.stock}</p>}
      </div>

      {/* Boutons d'action */}
      {isAdminView ? (
        <div className='buttons-actions'>
          <button onClick={() => handleEdit(product._id)}>
            <MdOutlineEditNote />
          </button>
          <button className="delete" onClick={() => handleDelete(product._id)}>
            <BsTrash3 />
          </button>
          
        </div>
      ) : (
        <div className='buttons-actions'>
          {!isProductDetailView && (
            <button onClick={handleViewDetails}>Voir</button>
          )}
          <button className="commander" onClick={handleAddToCart}>Commander</button>
        </div>
      )}
    </div>
  );
};

export default ItemProduct;
