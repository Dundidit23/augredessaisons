//ProductList.jsx
import React, { useState, useEffect } from 'react';
import ky from 'ky';
import ProductItem from './ProductItem';
import DashAction from '../Admin/dashboard3/DashAction';
import './productList.scss';

const ProductList = ({ products, onEdit, onDelete }) => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // Can be 'table' or 'grid'

  useEffect(() => {
    ky.get('http://localhost:5000/api/product')
      .json()
      .then(data => {
        setProductList(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error(err));
  }, []);
console.log(productList);
  const handleEdit = (product) => {
    console.log('Edit product:', product);
    // Implement editing logic here
  };

  const handleDelete = (productId) => {
    const updatedProduct = productList.filter(product => product.id !== productId);
    setProductList(updatedProduct);
    setFilteredProducts(updatedProduct);
  };

  const handleAdd = (newProduct) => {
    const updatedProduct = [...productList, newProduct];
    setProductList(updatedProduct);
    setFilteredProducts(updatedProduct);
  };

  const handleFilter = (category) => {
    if (category === 'All Categories') {
      setFilteredProducts(productList);
    } else {
      const filtered = productList.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className='product-list-principal'>
      <div className="title-action">
        <h1>Product List</h1>
        <DashAction 
          onAdd={handleAdd} 
          onFilter={handleFilter} 
          onViewChange={handleViewChange} 
        />
      </div>
      <div className={`product-grid ${viewMode === 'grid' ? 'gridView' : 'tableView'}`}>
        {productList.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
