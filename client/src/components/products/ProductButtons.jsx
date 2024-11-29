// components/products/ProductButtons.jsx
import React, { useState } from 'react';
import Modal from '../modal/Modal';
import ContactForm from '../forms/ContactForm';

const ProductButtons = ({ 
  isProductDetailView, 
  handleAddToCart,
  productName
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSendEmail = (e) => {
    e.stopPropagation();
    setShowModal(true);
  };

  return (
    <>
      <div className='product-details-buttons buttons-actions'>
        <button className="commander" onClick={handleAddToCart}>Commander</button>
        {isProductDetailView && (
          <button className="sendEmail" onClick={handleSendEmail}>
            Une question ?
          </button>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ContactForm 
          subject={`Demande de renseignement sur le produit : ${productName}`}
          onClose={() => setShowModal(false)} 
        />
      </Modal>
    </>
  );
};

export default ProductButtons;