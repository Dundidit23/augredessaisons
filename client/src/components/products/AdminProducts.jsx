import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProduct } from '../../context/ProductContext';
import DashActions from '../dashboard/DashActions';
import Modal from '../modal/Modal';
import CreateProduct from '../forms/CreateProduct';
import './productsAdmin.scss';

const AdminProducts = () => {
  const { products, fetchProducts, deleteExistingProduct } = useProduct(); // Assurez-vous que fetchProducts est importé
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès
  const [viewMode, setViewMode] = useState('table');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.includes('/dashboard');

  useEffect(() => {
    setFilteredProducts(products); // Assurez-vous que filteredProducts se met à jour quand products change
  }, [products]);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
  };

  useEffect(() => {
    if (filterCategory === 'All Categories') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === filterCategory);
      setFilteredProducts(filtered);
    }
  }, [filterCategory, products]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleProductSubmit = async () => {
    setIsEditing(false);
    setSelectedProduct(null);
    setShowModal(false);
    setSuccessMessage('Produit enregistré avec succès !'); // Affiche le message de succès
    await fetchProducts(); // Rafraîchit la liste des produits
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
    if (confirmDelete) {
      try {
        await deleteExistingProduct(productId);
        setSuccessMessage('Produit supprimé avec succès !'); // Affiche le message de succès
        await fetchProducts(); // Rafraîchit la liste des produits
      } catch (error) {
        setErrorMessage('Une erreur est survenue lors de la suppression du produit.');
        console.error('Erreur lors de la suppression du produit:', error);
      }
    }
  };

  return (
    <div className='products-content'>
      <div className="title-action">
        <h1>Gestion des Produits en ligne</h1>
        <DashActions
          onFilterCategory={handleFilterCategory}
          onAddProduct={handleAddProduct}
          onViewChange={handleViewChange}
        />
      </div>

      <h4>Modifier les produits existants</h4>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>} {/* Affiche le message de succès */}

      <div className={`product-grid ${viewMode === 'grid' ? 'gridView' : 'tableView'}`}>
        {filteredProducts.map((product) => (
          <ul key={product._id} className={`products-item ${isDashboard ? 'dashboard-style' : 'boutique-style'}`}>
            <li><img src={`http://localhost:5000/${product.imageUrl}`} alt={product.name} /></li>
            <li>{product.name}</li>
            <li>{product.category}</li>
            <li>{product.description}</li>
            <li>{product.stock}</li>
            <li>{product.price}</li>
            <li><button onClick={() => handleEditProduct(product)}>Éditer</button></li>
            <li><button onClick={() => handleDeleteProduct(product._id)}>Supprimer</button></li>
          </ul>
        ))}
      </div>

      {showModal && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <CreateProduct
            isEditing={isEditing}
            productToEdit={selectedProduct}
            onSubmit={handleProductSubmit}
            errorMessage={errorMessage}
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminProducts;
