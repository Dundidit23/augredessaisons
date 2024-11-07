
//AdminProducts.jsx
import React, { useEffect, useState, useCallback } from 'react';  
import { useProduct } from '../../context/ProductContext';  
import { useCategory } from '../../context/CategoryContext';  
import ItemProduct from './ItemProduct';  
import DashActions from '../dashboard/DashActions';  
import CreateEditProduct from '../forms/CreateEditProduct'; 
import Modal from '../modal/Modal'; 
import '../../assets/styles/dashboard/dashboard.scss';  
import './adminp.scss';  
import './adminProducts.scss';  

const AdminProducts = () => {  
  const { products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct, fetchProducts } = useProduct();  
  const { categories, fetchCategories } = useCategory();  
  const [filteredProducts, setFilteredProducts] = useState(products); // État pour les produits filtrés 
  const [allProducts, setAllProducts] = useState([]); // État pour tous les produits 
  const [isEditMode, setIsEditMode] = useState(false);  
  const [productToEdit, setProductToEdit] = useState(null);  
  const [showModal, setShowModal] = useState(false); 
  const [viewMode, setViewMode] = useState('table'); 

useEffect(() => {  
  fetchCategories(); 
  fetchProducts().then(() => {
    setAllProducts(products); // Initialisation de tous les produits une fois chargés
    setFilteredProducts(products); // Affichage initial de tous les produits
  });
}, []);

const handleFilterCategory = (category) => { 
  if (category === 'All Categories') { 
    setFilteredProducts(allProducts); // Affiche tous les produits 
  } else { 
    const filtered = allProducts.filter(product => product.category === category); 
    if (filtered.length === 0) { // Vérifie si la liste filtrée est vide
      window.alert(`Aucun produit trouvé pour la catégorie : ${category}`);
      setFilteredProducts(allProducts); // Garde tous les produits affichés
    } else {
      setFilteredProducts(filtered); // Filtre les produits par catégorie 
    }
  } 
};

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
  const handleDelete = (productId) => { 
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) { 
      deleteProduct(productId); 
    } 
  }; 
  const handleSubmit = async (formData) => { 
    try { 
      if (isEditMode && productToEdit) { 
        await updateProduct(productToEdit._id, formData); 
      } else { 
        await addProduct(formData); 
      } 
      closeEditModal();  
    } catch (error) { 
      console.error('Erreur lors de la soumission :', error); 
      alert('Une erreur est survenue. Veuillez réessayer.'); 
    } 
  }; 
  if (isLoading) { 
    return <div>Chargement des produits...</div>; 
  } 
  
  if (errorMessage) { 
    return <div>Erreur : {errorMessage}</div>; 
  } 

  return (  
    <div className='product-content'>  
      <div className="title-action">  
        <h2 className='title-page-product'>Gestion des produits</h2>   
        <DashActions  
        onFilterCategory={handleFilterCategory}  
          onAddProduct={() => { 
            setIsEditMode(false); 
            setProductToEdit(null); 
            setShowModal(true); 
          }}  
          onViewChange={setViewMode}  // Définir le mode de vue à partir de DashActions
          currentViewMode={viewMode}  // Transmettre le mode de vue actif
        /> 
      </div>  
      <div className={`product-grid ${viewMode === 'grid' ? 'gridView' : 'tableView'}`}> 
        {filteredProducts.map((product) => (  
          <ItemProduct  
            key={product._id}  
            product={product}  
            isAdminView={true}  
            handleDelete={handleDelete}  
            handleEdit={openEditModal} 
            isEditMode={isEditMode && productToEdit?._id === product._id} 
          />  
        ))}  
      </div>  
      {showModal && ( 
        <Modal show={showModal} onClose={closeEditModal}> 
          <CreateEditProduct 
            productToEdit={productToEdit} 
            isEditMode={isEditMode} 
            onSubmit={handleSubmit} 
            onCancel={closeEditModal} 
            categories={categories} 
          /> 
        </Modal> 
      )} 
    </div>  
  );  
}; 
export default AdminProducts;