import React, { useState } from 'react';
import './statusUser.scss';
import { BsBasket } from "react-icons/bs";
import Modal from '../../modal/Modal';  // Assurez-vous que le chemin est correct
import LoginForm from '../../forms/connect/Login';

const StatusUser = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='buttons-statusUser'>
      <button className='buttons-statusUser__button__basket'><BsBasket /><span className='buttons-statusUser__button__basket__items-in'>0</span></button>
      <button className='buttons-statusUser__button__login' onClick={toggleModal}></button>
      
      <Modal show={showModal} onClose={toggleModal}>
        <LoginForm />
      </Modal>
    
    </div>
  );
};

export default StatusUser;
