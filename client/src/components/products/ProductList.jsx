import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';
import AllProducts from './AllProducts';
import DashAction from '../dashboard/DashAction';
import Modal from '../modal/Modal'; // Assuming you have a Modal component
import CreateProduct from '../forms/CreateProduct'; // Assuming you have a CreateProduct component
import './productList.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Ajoutez cette ligne


  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProductList(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error('Erreur lors de la récupération des produits:', err));
  }, []);


  const handleDelete = (productId) => {
    deleteProduct(productId)  // Appel à l'API pour supprimer le produit côté serveur
      .then(() => {
        // Mise à jour de l'état local si la suppression est réussie
        const updatedProducts = productList.filter(product => product._id !== productId);
        setProductList(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch(err => console.error('Erreur lors de la suppression du produit:', err));
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
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsEditing(true); // Passer en mode édition
    setShowModal(true);
  };

  const handleUpdate = (updatedProduct) => {
    updateProduct(updatedProduct)
      .then(() => {
        const updatedProducts = productList.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProductList(updatedProducts);
        setFilteredProducts(updatedProducts);
        setShowModal(false);
        setEditingProduct(null);
        setIsEditing(false); // Réinitialiser l'état d'édition
      })
      .catch(err => console.error('Erreur lors de la mise à jour du produit:', err));
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
      {showModal && (
        <Modal show={showModal} onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
          setIsEditing(false); // Réinitialiser l'état d'édition lors de la fermeture
        }}>
          <CreateProduct 
            product={editingProduct} 
            onSubmit={isEditing ? handleUpdate : handleAdd} // Passer la fonction appropriée
            isEditing={isEditing} // Passer l'état d'édition
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;