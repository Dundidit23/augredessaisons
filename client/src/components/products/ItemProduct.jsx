import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import Modal from '../modal/Modal';
import ContactForm from '../forms/ContactForm';

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
  const [showModal, setShowModal] = useState(false);

  // Fonction de redirection vers les détails du produit
  const handleViewDetails = () => {
    navigate(`/product/${product._id}`, { state: { product, category: currentCategory } });
  };

  // Fonction pour ajouter le produit au panier
  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  // Fonction pour afficher le formulaire de contact dans un modal
  const handleSendEmail = () => {
    setShowModal(true);
  };

  // Fonction pour basculer l'affichage du modal
  const toggleModal = () => {
    setShowModal(!showModal);
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
      <div className='product-img'>
      <img
        className={`product-image ${productClass}`}
        src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`}
        alt={`Image de ${product.name}`}
      /></div>
      {/* Container pour les informations du produit */}
      <div className="info-container">
        {/* Afficher le nom du produit uniquement si ce n'est pas la vue de détail */}
        {!isProductDetailView && <h4>{product.name}</h4>}
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
        <div className='product-details-buttons buttons-actions'>
          {!isProductDetailView && (
            <button onClick={handleViewDetails}>Voir</button>
          )}
          <button className="commander" onClick={handleAddToCart}>Commander</button>
          {isProductDetailView ? ( // Correction ici
            <button className="sendEmail" onClick={handleSendEmail}>Une question ?</button>
          ) : null}
        </div>
      )}
      <Modal show={showModal} onClose={toggleModal}>
        <ContactForm 
          subject={`Demande de renseignement sur le produit : ${product.name}`}
          onClose={toggleModal} 
        />
      </Modal>
    </div>
  );
};

export default ItemProduct;