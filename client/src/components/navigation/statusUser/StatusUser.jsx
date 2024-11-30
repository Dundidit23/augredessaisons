import React, { useState } from 'react';
import './statusUser.scss';
import { BsBasket } from "react-icons/bs";
import Modal from '../../modal/Modal';
import AuthForm from '../../forms/connect/AuthForm';
import { useUser } from '../../../context/UserContext'; // Vérifiez ce chemin
import { useCart } from '../../../context/CartContext'; // Assurez-vous que ce contexte existe
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const StatusUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("login");
  const { currentUser, isAuthenticated } = useAuth();
  const { logoutUser } = useUser();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  console.log('Utilisateur actuel :', currentUser);

  // Calculer le nombre total d'articles dans le panier
 // const cartCount = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSwitch = (type) => {
    setFormType(type);
  };

  // Rediriger vers la page du panier
  const goToCartPage = () => {
    navigate('/cart');
  };

  return (
    <div className='buttons-statusUser'>
      <button 
        className='buttons-statusUser__button__basket' 
        aria-label="Panier"
        onClick={goToCartPage}
      >
        <BsBasket />
        <span className='buttons-statusUser__button__basket__items-in'>
          {cartCount}
        </span>
      </button>

      {isAuthenticated ? (
        <div className='buttons-statusUser__user-greeting'>
          <p>Bienvenue, {currentUser?.username}</p>
          <button 
            className='buttons-statusUser__button__logout' 
            onClick={logoutUser}
            aria-label="Se déconnecter"
          >
            Déconnexion
          </button>
        </div>
      ) : (
        <button 
          className='buttons-statusUser__button__login' 
          onClick={toggleModal}
          aria-label="Se connecter"
        >
        
        </button>
      )}

      <Modal show={showModal} onClose={toggleModal}>
        <AuthForm
          formType={formType}
          onFormSwitch={handleFormSwitch}
          onClose={toggleModal} 
        />
      </Modal>
    </div>
  );
};

export default StatusUser;
