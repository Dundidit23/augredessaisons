//ListProducts.jsx
import React from 'react';
import ItemProduct from './ItemProduct';

const ProductList = ({ products, onUpdate, onDelete, isAdminView }) => {
  return (
    <div className="product-list">
      {products.map(product => (
        <ItemProduct
          key={product._id}
          product={product}
          onUpdate={isAdminView ? () => onUpdate(product._id) : null}
          onDelete={isAdminView ? () => onDelete(product._id) : null}
          isAdminView={isAdminView}
          showStock={isAdminView}  /* N'affiche le stock que si isAdminView est true */
        />
      ))}
    </div>
  );
};

export default ProductList;
