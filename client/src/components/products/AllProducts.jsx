import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/api';
import ProductItem from './ProductItem';

const AllProducts = ({ onEdit, onDelete, viewMode }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products); // Ensure you access the 'products' array
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    loadProducts();
  }, []);

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