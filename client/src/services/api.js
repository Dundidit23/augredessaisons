import ky from 'ky';

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: Set a timeout for requests
});

const handleResponse = async (request) => {
  try {
    return await request.json();
  } catch (error) {
    console.error('API request failed', error);
    throw error;
  }
};

const loginUser = async (e) => {
  e.preventDefault();
  if (!validate()) {
    console.error('Validation failed', errors);
    return;
  }
  try {
    await api.post('api/users/login', { formData }).json();
    login();
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed', error);
  }
};

export const fetchProducts = () => handleResponse(api.get('api/products'));
export const fetchUsers = () => handleResponse(api.get('api/users'));
export const addProduct = (product) => handleResponse(api.post('api/products', { json: product }));
export const processPayment = (paymentData) => handleResponse(api.post('api/paiement', { json: paymentData }));

export { handleResponse };
export default api;