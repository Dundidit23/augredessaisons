import React, { useEffect, useState, useCallback } from 'react';
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import ItemProduct from './ItemProduct';
import DashActions from '../dashboard/DashActions';
import CreateEditProduct from '../forms/CreateEditProduct';
import Modal from '../modal/Modal';
import './adminProducts.scss';

const AdminProducts = () => {
  const { products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct, fetchProducts } = useProduct();
  const { categories, fetchCategories } = useCategory();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' ou 'grid'

  // Charger les catégories et produits au chargement du composant
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products); // Mettre à jour la liste des produits lorsqu'elle change
  }, [products]);

  // Fonction de filtrage des produits par catégorie
  const handleFilterCategory = (category) => {
    if (category === 'All Categories') {
      setFilteredProducts(products); // Si "Toutes les catégories", afficher tous les produits
    } else {
      const filtered = products.filter((product) => product.category === category); // Filtrer les produits par catégorie
      setFilteredProducts(filtered);
    }
  };

  // Fonction pour ouvrir le modal d'édition d'un produit
  const openEditModal = useCallback((productId) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductToEdit(product);
      setIsEditMode(true);
      setShowModal(true);
    }
  }, [products]);

  const closeEditModal = () => {
    setShowModal(false);
    setProductToEdit(null);
    setIsEditMode(false);
  };

  // Fonction de suppression d'un produit
  const handleDelete = (productId) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      deleteProduct(productId); // Appeler la fonction de suppression depuis le contexte
    }
  };

  // Fonction de soumission du formulaire (ajouter ou mettre à jour un produit)
  const handleSubmit = async (formData) => {
    try {
      if (isEditMode && productToEdit) {
        await updateProduct(productToEdit._id, formData); // Mettre à jour le produit existant
      } else {
        await addProduct(formData); // Ajouter un nouveau produit
      }
      closeEditModal(); // Fermer le modal après la soumission
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    }
  };

  if (isLoading) return <div>Chargement des produits...</div>;
  if (errorMessage) return <div>Erreur : {errorMessage}</div>;

  return (
    <div className="product-content">
      <div className="title-action">
        <h2 className="title-page-product">Gestion des produits</h2>
        <DashActions
          onFilterCategory={handleFilterCategory}
          onAddProduct={() => {
            setIsEditMode(false); // Réinitialiser l'état pour l'ajout d'un produit
            setProductToEdit(null);
            setShowModal(true); // Ouvrir le modal pour ajouter un produit
          }}
          onViewChange={setViewMode}
          currentViewMode={viewMode}
        />
      </div>
      <div className={`product-grid ${viewMode === 'grid' ? 'gridView' : 'tableView'}`}>
        {filteredProducts.map((product) => (
          <ItemProduct
          className={`product-grid ${viewMode === 'grid' ? 'gridView' : 'tableView'}`}
            key={product._id}
            product={product}
            isAdminView={true}
            handleDelete={handleDelete} // Passer la fonction de suppression
            handleEdit={openEditModal} // Passer la fonction d'édition
            viewMode="dashboard"
          />
        ))}
      </div>

      {showModal && (
        <Modal show={showModal} onClose={closeEditModal}>
          <CreateEditProduct
            productToEdit={productToEdit}
            isEditMode={isEditMode}
            onSubmit={handleSubmit} // Passer la fonction de soumission
            onCancel={closeEditModal}
            categories={categories} // Passer les catégories pour le formulaire
          />
        </Modal>
      )}
    </div>
  );
};

export default AdminProducts;
