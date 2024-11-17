// PaymentPage.tsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/forms/CheckoutForm';
import CartPage from './CartPage'
import { useContext } from 'react';
import { useCart } from '../context/CartContext';
import './paymentPage.scss';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { cartItems, totalAmount } = useCart();

  return (
    <div className="payment-page">
      <h2>Page de Paiement</h2>
<div className='form-cart'>
      {/* Afficher le montant total du panier */}
      <div className="cart-summary">
        <h3>Montant Total: {totalAmount} €</h3>
   
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      </div>
      <div className='final-cart'>
        <CartPage className='small'/>
      </div>
    </div>
    </div>
  );
};

export default PaymentPage;
