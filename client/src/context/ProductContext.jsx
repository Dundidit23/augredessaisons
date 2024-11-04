// ProductContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Utilisation de ky pour la requête GET
      const data = await api.get('products').json();
      setProducts(data.products); // En supposant que `data.products` est correct
    } catch (error) {
      setErrorMessage('Erreur lors du chargement des produits');
      console.error('Erreur d\'API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData) => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      const response = await api.post('products', {
        body: formData,
      }).json();

      if (response && response.product) {
        setProducts((prevProducts) => [...prevProducts, response.product]);
      }

      await fetchProducts(); // Rafraîchit la liste des produits après l'ajout

      return response;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit :', error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }

    try {
      await api.put(`products/${id}`, {
        body: formData, // Utilisation de `body` pour FormData
      });
      fetchProducts(); // Rafraîchit la liste des produits après modification
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`products/${id}`);
      fetchProducts(); // Rafraîchit la liste des produits après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
