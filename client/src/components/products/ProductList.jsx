//ProductList.Jsx
import React, { useState, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../../services/api';
import AllProducts from './AllProducts';
import DashAction from '../dashboard/DashAction1';
import Modal from '../modal/Modal';
import CreateProduct from '../forms/CreateProduct2';
import './text.scss';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch des produits depuis l'API une seule fois au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProductList(data);
        setFilteredProducts(data); // Assigner initialement la même liste
      } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err);
      }
    };

    fetchData();
  }, []); // Le tableau de dépendances est vide, donc ça s'exécute une seule fois.

  // Utilise useCallback pour mémoriser la fonction handleDelete
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?');
    if (confirmDelete) {
      try {
    await deleteProduct(productId);
  } catch (error) {
    setErrorMessage('Une erreur est survenue lors de la suppression du produit.');
    console.error('Une erreur est survenue lors de la suppression du produit');   
  }
}
};

    //const updatedProducts = productList.filter(product => product._id !== productId);
        //setProductList(updatedProducts);
        //setFilteredProducts(updatedProducts);
     // })
    //  .catch(err => console.error('Erreur lors de la suppression du produit:', err));
  //}, [productList]); // Dépend de productList, mais ne se recrée que quand productList change.

  // Utilise useCallback pour mémoriser la fonction handleAdd
  const handleAdd = useCallback((newProduct) => {
    addProduct(newProduct) // newProduct est maintenant un FormData
      .then(() => {
        const updatedProducts = [...productList, newProduct];
        setProductList(updatedProducts);
        setFilteredProducts(updatedProducts);
      })
      .catch(err => console.error('Erreur lors de l\'ajout du produit:', err));
  }, [productList]);

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setIsEditing(true); // Passer en mode édition
    setShowModal(true);
  };
  // Utilise useCallback pour mémoriser la fonction handleUpdate
  const handleUpdate = useCallback((updatedProduct) => {
    updateProduct(updatedProduct)
      .then(() => {
        const updatedProducts = productList.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        setProductList(updatedProducts);
        setFilteredProducts(updatedProducts);
        setShowModal(false);
        setEditingProduct(null);
        setIsEditing(false);
      })
      .catch(err => console.error('Erreur lors de la mise à jour du produit:', err));
  }, [productList]); // Dépend de productList, mais ne se recrée que quand productList change.

  // Utilise useCallback pour gérer le filtrage des produits par catégorie
  const handleFilter = useCallback((selectedCategory) => {
    const filtered = Array.isArray(productList)
      ? productList.filter(product => product.category === selectedCategory)
      : [];
    setFilteredProducts(filtered);
  }, [productList]); // Dépend de productList, mais ne se recrée que quand productList change.

  // Utilise useCallback pour gérer le changement de vue (grille ou tableau)
  const handleViewChange = useCallback((mode) => {
    setViewMode(mode);
  }, []); // Ne change jamais, donc ne déclenche pas de re-rendu.

  return (
    <div className='products-content'>
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
          onEdit={setEditingProduct} 
          onDelete={handleDelete} 
          viewMode={viewMode}
        />
      </div>

      {showModal && (
        <Modal show={showModal} onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
          setIsEditing(false);
        }}>
          <CreateProduct 
            product={editingProduct} 
            onSubmit={isEditing ? handleUpdate : handleAdd} 
            isEditing={isEditing} 
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductList;
