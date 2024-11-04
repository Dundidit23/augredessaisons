import React, { useState } from 'react';
import './statusUser.scss';
import { BsBasket } from "react-icons/bs";
import Modal from '../../modal/Modal';
import AuthForm from '../../forms/connect/AuthForm';
import { useUser } from '../../../context/UserContext'; // Assurez-vous que ce chemin est correct

const StatusUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("login"); // État pour le type de formulaire
  const { user, logoutUser } = useUser(); // Récupérez l'utilisateur et la fonction de déconnexion

  console.log("Utilisateur actuel :", user);

  // Fonction pour basculer l'affichage du modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Fonction pour changer le type de formulaire
  const handleFormSwitch = (type) => {
    setFormType(type);
  };

  return (
    <div className='buttons-statusUser'>
            <button className='buttons-statusUser__button__basket' aria-label="Panier">
                <BsBasket />
                <span className='buttons-statusUser__button__basket__items-in'>0</span>
            </button>

            {user ? (
                <div className='buttons-statusUser__user-greeting'>
                    <span>Bonjour, {user.username} !</span>
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
                    Connexion
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