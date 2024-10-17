import React, { createContext, useContext, useEffect, useState } from 'react';
import ky from 'ky';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
        const response = await ky.get('http://localhost:5000/api/products').json();
        console.log("Produits:", response); // Pour vérifier le format de la réponse
        setProducts(response.products); // Mettre à jour l'état avec response.products
    } catch (error) {
        setErrorMessage('Erreur lors du chargement des produits');
        console.error(error);
    } finally {
        setIsLoading(false);
    }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  // const addProduct = async (formData) => {
  //   try {
  //     await ky.post('http://localhost:5000/api/products', { body: formData });
  //     fetchProducts(); // Rafraîchir la liste des produits après ajout
  //   } catch (error) {
  //     console.error('Erreur lors de l\'ajout du produit :', error);
  //   }
  // };
  const addProduct = async (productData) => {
    try {
      const response = await ky.post(`http://localhost:5000/api/products/`, {
        body: productData,
      }).json();
      
      return response;
    } catch (error) {
      throw error;
    }
  };
  const updateProduct = async (id, formData) => {
    try {
      await ky.put(`http://localhost:5000/api/products/${id}`, { body: formData });
      fetchProducts(); // Rafraîchir la liste des produits après modification
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit :', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await ky.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // Rafraîchir la liste des produits après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
