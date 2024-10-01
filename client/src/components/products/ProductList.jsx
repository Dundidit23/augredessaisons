import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct } from '../../services/api';
import AllProducts from './AllProducts';
import DashAction from '../dashboard/DashAction';
import './productList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('table');

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProductList(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error('Erreur lors de la récupération des produits:', err));
  }, []);

  const handleEdit = (product) => {
    console.log('Modification du produit:', product);
    // Logique de modification du produit (ajout d'une modal ou d'un formulaire)
  };

  const handleDelete = (productId) => {
    const updatedProducts = productList.filter(product => product._id !== productId);
    setProductList(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const handleAdd = (newProduct) => {
    console.log('New product to add:', newProduct);
    addProduct(newProduct)
      .then(() => {
        const updatedProducts = [...productList, newProduct];
        setProductList(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch(err => console.error('Erreur lors de l\'ajout du produit:', err));
  };

  const handleFilter = useCallback((category) => {
    if (category === "All Categories") {
      setFilteredProducts(productList);
    } else {
      setFilteredProducts(productList.filter(product => product.category === category));
    }
  }, [productList]);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className='product-list-principal'>
      <div className="title-action">
        <h1>Produits en ligne</h1>
        <DashAction 
          onAdd={handleAdd} 
          onFilter={handleFilter} 
          onViewChange={handleViewChange} 
        />
      </div>
      <div className={`product-grid ${viewMode === 'grid' ? 'gridView' : 'tableView'}`}>
        <AllProducts 
          products={filteredProducts} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
          viewMode={viewMode} // Pass viewMode to AllProducts
        />
      </div>
    </div>
  );
};

export default ProductList;