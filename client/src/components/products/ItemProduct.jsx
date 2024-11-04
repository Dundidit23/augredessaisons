import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ItemProduct = ({ 
  product,
  isAdminView,
  isProductDetailView, 
  currentCategory, // Ajout de currentCategory pour recevoir la catégorie depuis le parent
  handleUpdate, 
  handleDelete, 
  startEditProduct,
  isEditMode 
}) => {  
  const { addToCart } = useCart(); // Récupère la fonction d'ajout au panier
  const navigate = useNavigate(); // Pour naviguer entre les pages

  // Fonction pour afficher les détails du produit
  const handleViewDetails = () => {
    navigate(`/product/${product._id}`, { state: { category: currentCategory } }); // Passe la catégorie à la page suivante
  };

  // Fonction pour ajouter le produit au panier
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-item">
      {/* Image */}
      <img src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`} alt={product.name} />

      {/* Nom et Description */}
      <h3>{product.name}</h3>
      <p>{product.description}</p>

      {/* Catégorie */}
      <p>{product.category ? product.category : "N/A"}</p>

      {/* Prix et Stock */}
      <p>Prix : {product.price} €</p>
      <p>Stock : {product.stock}</p>

      {/* Boutons selon la vue */}
      {isAdminView ? (
        <>
          <button onClick={() => startEditProduct(product)}>Modifier</button>
          <button onClick={() => handleDelete(product._id)}>Supprimer</button>
        </>
      ) : (
        <>
          {/* Si c'est la vue de détail, n'affichez que le bouton "Ajouter au panier" */}
          {isProductDetailView ? (
            <button onClick={handleAddToCart}>Ajouter au panier</button>
          ) : (
            <>
              <button onClick={handleViewDetails}>Voir</button>
              <button onClick={handleAddToCart}>Ajouter au panier</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ItemProduct;
