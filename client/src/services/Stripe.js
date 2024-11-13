import { loadStripe } from '@stripe/stripe-js';

// Votre clé publique Stripe ici (clée test pour l'environnement de développement)
const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;
