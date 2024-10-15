// ProductContext.jsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../services/api';

// Export ProductContext
export const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // État pour gérer les messages d'erreur

  useEffect(() => {
    // Fetch all products when the component mounts
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log('Produits récupérés:', data); // Ajoutez cette ligne
        setProducts(data || []);
      } catch (error) {
        console.error('Échec de la récupération des produits:', error);
      }
    };
    
    loadProducts();
  }, []);

  const addProductHandler = async (newProduct) => {
    try {
      const addProduct = await addProduct(newProduct);
      setProducts([...products, addProduct]); // Mettre à jour l'état local avec le nouveau produit ajouté
      setErrorMessage(''); // Réinitialiser le message d'erreur
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Ce produit existe déjà. Veuillez en choisir un autre.');
      } else {
        setErrorMessage('Une erreur est survenue lors de l\'ajout du produit.');
      }
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  const updateProductHandler = async (productId, updatedProduct) => {
    try {
      const updated = await updateProduct(productId, updatedProduct);
      setProducts(products.map((prod) => (prod._id === productId ? updated : prod)));
      setErrorMessage(''); // Réinitialiser le message d'erreur
    } catch (error) {
      setErrorMessage('Une erreur est survenue lors de la mise à jour du produit.');
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  const deleteProductHandler = async (productId) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?');
    if (confirmDelete) {
      try {
        await deleteProduct(productId);
        setProducts(products.filter((prod) => prod._id !== productId));
        setErrorMessage(''); // Réinitialiser le message d'erreur
      } catch (error) {
        setErrorMessage('Une erreur est survenue lors de la suppression du produit.');
        console.error('Erreur lors de la suppression du produit:', error);
      }
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct: addProductHandler,
        updateProduct: updateProductHandler,
        deleteProduct: deleteProductHandler,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
