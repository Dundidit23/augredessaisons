import React, { useState, useEffect, useRef } from 'react';
import { fetchProducts, addProduct } from '../../services/api';
import ProductItem from './ProductItem';
import './productList.scss';

const AllProducts = ({ onEdit, onDelete, viewMode }) => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const productListRef = useRef(null);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProductList(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAdd = () => {
    const newProduct = {
      _id: Math.random().toString(36).substring(2, 9),
      name: 'New Product',
      description: 'Description of new product',
      category: 'New Category',
      status: 'Available',
      sales: 0,
      stock: 100,
      price: 100,
      imageUrl: '/path/to/image',
    };

    addProduct(newProduct)
      .then(() => {
        const updatedProductList = [...productList, newProduct];
        setProductList(updatedProductList);
        setFilteredProducts(updatedProductList);
        if (productListRef.current) {
          productListRef.current.scrollTop = productListRef.current.scrollHeight;
        }
      })
      .catch(err => console.error('Erreur lors de l\'ajout du produit:', err));
  };

  return (
    <div className='product-list-principal'>
      <div className="title-action">
        <h1>All Products</h1>
        <button onClick={handleAdd}>Add Product</button>
      </div>
      <div className={`product-list-container ${viewMode}`} ref={productListRef}>
        {filteredProducts.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;