import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
//import CheckoutForm from '../components/forms/CheckoutForm';
import './cartPage.scss'
const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const totalAmount = 1000;
  const navigate = useNavigate();

  // Calculer le total du panier
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Le panier est vide</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${item.image}`}
                alt={`Image de ${item.name}`}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Prix : {item.price} €</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  />
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-btn">Supprimer</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <p>Total : {total} €</p>
            <button onClick={clearCart} className="clear-cart-btn">Vider le panier</button>
            <button onClick={() => navigate('/checkout')} className="checkout-btn">Passer à la caisse</button>
          </div>
        </div>
      )}
       
    </div>
  );
};

export default CartPage;
