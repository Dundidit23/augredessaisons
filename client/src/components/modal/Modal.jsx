import React, { useEffect } from 'react';
import './modal.scss';

const Modal = ({ show, onClose, children }) => {
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleEscape);
    } 
    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [show]);

  if (!show) return null; // Return null if not showing

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
