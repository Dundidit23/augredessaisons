import React from 'react';
import Modal from '../modal/Modal';
import CreateProduct from '../forms/CreateProduct';

const AddProduct = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(!showModal);
    };
  
    return (
      <div className='addproduct'>
        <button className='buttons-statusUser__button__basket'><BsBasket /><span className='buttons-statusUser__button__basket__items-in'>0</span></button>
        <button className='buttons-statusUser__button__login' onClick={toggleModal}></button>
        
        <Modal show={showModal} onClose={toggleModal}>
          <CreateProduct />
        </Modal>
      
      </div>
    );
  };
export default AddProduct