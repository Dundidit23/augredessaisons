import React, { useState, useEffect } from 'react';
import AllProducts from '../../src/components/products/AllProducts';
import DashActions from '../../src/components/dashboard/DashActions';
import CreateProduct from '../../src/components/forms/CreateProduct2'; // Le modal pour ajouter un produit

import './productListsupprimer.scss';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      // Logic to fetch products
    };
    fetchProducts();
  }, []);

  const handleSort = () => {
    // Logic to sort products by name or price
    const sortedProducts = [...products].sort((a, b) => a.name.localeCompare(b.name));
    setProducts(sortedProducts);
  };

  const handleAddProduct = () => {
    // Open modal to add product
    setModalOpen(true);
  };

  const handleEditProduct = (productId) => {
    // Logic to handle product editing
  };

  const handleDeleteProduct = (productId) => {
    // Logic to delete a product
    setProducts(products.filter(product => product._id !== productId));
  };

  return (
    <div className="product-list">
       < div className="title-action">
        <h1>Produits en ligne</h1>
        <DashActions onSort={handleSort} onAddProduct={handleAddProduct} />
      </div>
      <AllProducts 
        products={products} 
        onEdit={handleEditProduct} 
        onDelete={handleDeleteProduct} 
      />
      {isModalOpen && <CreateProduct closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default ProductList;
