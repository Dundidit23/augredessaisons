import React from 'react';
//import './dash.scss';

const ProductItem = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="products-row">
      <div className="product-cell image">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="product-cell category">{product.category}</div>
      <div className="product-cell status">{product.status}</div>
      <div className="product-cell sales">{product.sales}</div>
      <div className="product-cell stock">{product.stock}</div>
      <div className="product-cell price">{product.price}</div>
      <div className="product-cell actions">
        <button onClick={() => onUpdate(product.id, { ...product, status: 'Active' })}>Edit</button>
        <button onClick={() => onDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;