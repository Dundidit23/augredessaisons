// CartContext.jsx
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
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === newItem._id);
      if (existingItem) {
        // Si le produit existe déjà, on augmente sa quantité
        return prevCart.map((item) =>
          item._id === newItem._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Sinon, on l'ajoute au panier
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  // Modifier la quantité d'un produit dans le panier
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  // Supprimer un produit du panier
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
  };

  // Calculer le nombre total d'articles dans le panier
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
