import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/forms/CheckoutForm';
import './cartPage.scss'
const CartPage = ({ className }) => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  //const totalAmount = 1000;
  const { cartItems, totalAmount } = useCart();

  const navigate = useNavigate();

  // Calculer le total du panier
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`cart-page ${className}`}>
      <h2>Votre Panier</h2>

      {cart.length === 0 ? (
        <p>Le panier est vide</p>
      ) : (
        <div className='cart-items'>
                <div className="cart-items-headers"><span>Détail du produit</span> <span>Prix unitaire</span> <span>Quantité</span></div>

          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${item.image}`}
                alt={`Image de ${item.name}`}
                className={`cart-item-img ${className}`}
              />
              <div className="cart-item-info">
                <h3   className={`${className}`}>{item.name}</h3>
                <p  className={`${className}`}> {item.price} €</p>
                <div  className={`quantity-control ${className}`}>
                  <input
                   className={`${className}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                  />
                </div>
                <button  className={`remove-btn ${className}`} onClick={() => removeFromCart(item._id)}>🗑</button>
              </div>
            </div>
            
          ))}
                  

          <div className={`cart-summary ${className}`}>
            <p className={`price ${className}`}>Total : {total} €</p>
           <button className={`checkout-btn ${className}`} onClick={() => navigate('/checkout')}>Passer à la caisse</button>
          </div>
          <button className={`clear-cart-btn ${className}`} onClick={clearCart}>Vider le panier</button>
          <button onClick={() => navigate('/boutique')} className="go-back-btn">Poursuivez vos achats</button>
        </div>
      )}
       
    </div>
  );
};

export default CartPage;
