import React, { useState, useEffect } from 'react';
import DashAction from './DashAction';
import ProductList from '../products/ProductList';
import './dash.scss';

const Dash = () => {
  const [theme, setTheme] = useState('light');
  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All Categories");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark-theme', theme === 'light');
  };

  useEffect(() => {
    // Load initial products data (simulated)
    setProducts([
      { id: 1, name: 'Ocean', category: 'Furniture', status: 'Active', sales: 11, stock: 36, price: 560, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
      // Add more products here...
    ]);
  }, []);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now(), img: 'https://via.placeholder.com/150' }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredProducts = filterCategory === "All Categories"
    ? products
    : products.filter(product => product.category === filterCategory);

  return (
    <div className="app-container">
      <div className="app-content">
        <div className="app-content-header">
          <h1 className="app-content-headerText">Produits</h1>
          <DashAction 
            onAdd={addProduct} 
            onFilter={setFilterCategory} 
            onViewChange={toggleTheme} 
          />
        </div>
        <ProductList 
          products={filteredProducts} 
          onUpdate={updateProduct} 
          onDelete={deleteProduct} 
        />
      </div>
    </div>
  );
};

export default Dash;