// components/products/ItemProduct.jsx
import React, { useState } from 'react';
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineEditNote } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import ProductButtons from './ProductButtons';
import CategoryLink from '../categories/CategoryLink';

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

  const handleViewDetails = (e) => {
    e.stopPropagation(); // Empêcher la propagation du clic
    navigate(`/product/${product._id}`, { 
      state: { product, category: currentCategory } 
    });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Empêcher la propagation du clic
    addToCart(product);
    navigate('/cart');
  };

  const handleSendEmail = (e) => {
    e.stopPropagation(); // Empêcher la propagation du clic
    setShowModal(true);
  };

  const productClass = viewMode === 'dashboard' 
    ? 'product-item-dashboard' 
    : isProductDetailView 
      ? 'product-item-details' 
      : 'product-item-boutique';

  const renderAdminButtons = () => (
    <div className='buttons-actions'>
      <button onClick={(e) => {
        e.stopPropagation();
        handleEdit(product._id);
      }}>
        <MdOutlineEditNote />
      </button>
      <button className="delete" onClick={(e) => {
        e.stopPropagation();
        handleDelete(product._id);
      }}>
        <BsTrash3 />
      </button>
    </div>
  );

  return (
    <div 
      className={`product-item ${productClass}`} 
      onClick={!isProductDetailView ? handleViewDetails : undefined}
    >
      <div className='product-img'>
        <img
          className={`product-image ${productClass}`}
          src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`}
          alt={`Image de ${product.name}`}
        />
      </div>
      
      <div className="info-container">
        {!isProductDetailView && <h4>{product.name}</h4>}
        <p className={`product-description ${productClass}`}>
          {product.description}
        </p>
        <CategoryLink 
          category={product.category}
          className={productClass}
        />
        <p className={`${productClass} price`}>
          {product.price} €
        </p>
        {isAdminView && <p className='stock'>Stock : {product.stock}</p>}
      </div>

      {isAdminView 
        ? renderAdminButtons()
        : <ProductButtons
            isProductDetailView={isProductDetailView}
            handleAddToCart={handleAddToCart}
            handleSendEmail={handleSendEmail}
          />
      }

    </div>
  );
};

export default ItemProduct;