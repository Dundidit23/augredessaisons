import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="products-row">
      <div className="product-cell image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-cell name">{product.name}</div>
      <div className="product-cell description">{product.description}</div>
      <div className="product-cell category">{product.category}</div>
      <div className="product-cell status">{product.status}</div>
      <div className="product-cell sales">{product.sales}</div>
      <div className="product-cell stock">{product.stock}</div>
      <div className="product-cell price">{product.price}</div>
      <div className="product-cell actions">
        <button onClick={() => onEdit(product)}>Edit</button>
        <button onClick={() => onDelete(product._id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductItem;
