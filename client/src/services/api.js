//api.js
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



export const fetchProducts = () => handleResponse(api.get('api/product'));
export const addProduct = (product) => handleResponse(api.post('api/product', { json: product }));
export const updateProduct = (product) => handleResponse(api.put(`api/product/${product._id}`, { json: product }));
export const deleteProduct = (productId) => handleResponse(api.delete(`api/product/${productId}`));

export const fetchUsers = () => handleResponse(api.get('api/users'));
export const addUser = (user) => handleResponse(api.post('api/user', { json: product }));

export const fetchClients = () => handleResponse(api.get('api/users'));
export const addClient = (client) => handleResponse(api.post('api/user', { json: client }));
export const updateClient = (client) => handleResponse(api.put(`api/user/${client._id}`, { json: client }));
export const deleteClient = (clientId) => handleResponse(api.delete(`api/user/${clientId}`));


export const fetchCategories = () => handleResponse(api.get('api/categories'));

export const processPayment = (paymentData) => handleResponse(api.post('api/paiement', { json: paymentData }));

export { handleResponse };
export default api;