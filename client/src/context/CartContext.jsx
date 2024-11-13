//CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Crée un contexte pour le panier
const CartContext = createContext();

// Crée un hook personnalisé pour utiliser le contexte du panier
export const useCart = () => {
  return useContext(CartContext);
};

// Composant Provider qui enveloppe l'application et fournit les données du panier
export const CartProvider = ({ children }) => {
  // Le panier est un tableau d'objets contenant les produits et leur quantité
  const [cart, setCart] = useState([]);

  // Ajouter un produit au panier
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        // Si le produit existe déjà, on augmente sa quantité
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Sinon, on l'ajoute au panier
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Modifier la quantité d'un produit dans le panier
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;