import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './checkoutForm.scss';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  // États pour les informations client
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    shippingAddress: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      // Création du PaymentMethod avec les infos client
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          address: {
            line1: customerInfo.address,
            city: customerInfo.city,
            postal_code: customerInfo.postalCode,
            country: customerInfo.country,
          },
        },
      });

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setSuccess(true);
        console.log('Payment Successful:', paymentMethod);
        // Vous pouvez envoyer les informations de paiement à votre backend ici
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Styles personnalisés pour CardElement
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Roboto", sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Informations Client */}
      <div className="customer-info">
        <input
          type="text"
          name="firstName"
          placeholder="Prénom"
          value={customerInfo.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Nom"
          value={customerInfo.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerInfo.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Adresse"
          value={customerInfo.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={customerInfo.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Code Postal"
          value={customerInfo.postalCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Pays"
          value={customerInfo.country}
          onChange={handleChange}
          required
        />
      </div>

      {/* Champ Carte Bancaire */}
      <div className='card-element-wrapper'>
        <CardElement options={cardStyle} />
      </div>

      <button className='pay-button' type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Payer'}
      </button>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Paiement réussi !</div>}
    </form>
  );
};

export default CheckoutForm;
