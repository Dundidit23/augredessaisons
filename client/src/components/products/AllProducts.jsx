import React from 'react';
import ProductItem from './ProductItem';

const AllProducts = ({ products, onEdit, onDelete, viewMode }) => {
  return (
    <div className={`all-products ${viewMode}`}>
      {products.map(product => (
        <ProductItem 
          key={product._id} 
          product={product} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default AllProducts;