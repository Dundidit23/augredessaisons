import React from 'react';
import { useLocation } from 'react-router-dom';
import './productItem.scss';

const ProductItem = ({ product, onEdit, onDelete }) => {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  return (
    <div className={`products-row product-item ${isDashboard ? 'dashboard-style' : 'boutique-style'}`}>
      <div className="product-cell image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <h4 className="product-cell name">{product.name}</h4>
      <div className="product-cell description">{product.description}</div>
      <div className="product-cell category">{product.category}</div>
      <div className="product-cell sales">{product.sales}</div>
      <div className="product-cell price">{product.price} €</div>
      {isDashboard && <div className="product-cell stock">{product.stock}</div>}
      {isDashboard ? (
        <>
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product._id)}>Delete</button>
        </>
      ) : (
        <button>Ajouter au panier</button>
      )}
    </div>
  );
};

export default ProductItem;
