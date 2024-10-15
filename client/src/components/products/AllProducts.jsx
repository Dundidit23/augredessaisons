//AllProducts.jsx
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../../services/api';
import ProductItem from './ProductItem';

const AllProducts = ({ onEdit, onDelete}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState(''); // Filter by product name

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.products); // Ensure you access the 'products' array
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    // useEffect(() => {
    //   // Apply filtering when filter state changes
    //   const filtered = products.filter(product =>
    //     product.name.toLowerCase().includes(filter.toLowerCase())
    //   );
    //   setFilteredProducts(filtered);
    // }, [filter, products]);
  
    loadProducts();
  }, []);

  return (
    <div className="boutique">
        {filteredProducts.map(product => (
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