// api.js
import ky from 'ky';

// Create an instance of ky with default settings
const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Optional: Set a timeout for requests
});


// User-related API calls
export const handleLogin = async (e) => {
  e.preventDefault();
  
  if (!validate()) {
    console.error('Validation failed', errors);
    return;
  }
  
  try {
    const response = await api.post('api/users/login', { json: formData });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    login();
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed', error.message || error);
  }
};

export const addUser = (user) => api.post('api/user', { json: user }).json();
export const fetchUsers = () => api.get('api/users').json();
export const updateUser = (user) => api.put(`api/user/${user._id}`, { json: user }).json();
export const deleteUser = (userId) => api.delete(`api/user/${userId}`).json();

// Product-related API calls
export const fetchProducts = () => api.get('api/product').json();
export const addProduct = (product) => api.post('api/product', { json: product }).json();
export const deleteProduct = (productId) => api.delete(`api/product/${productId}`).json();
export const updateProduct = (productId, productData) => {
  if (!productId) {
    throw new Error('Product ID is required');
  }
  return api.put(`api/product/${productId}`, {
    body: productData, // Utilisez 'body' au lieu de 'json' pour FormData
  });
};
// Category-related API calls
// Add this function to client\src\services\api.js

export const addCategory = (category) => api.post('api/categories', { json: category}).json();
export const fetchCategories = () => api.get('api/categories').json();
export const fetchCategoryById = (categoryId) => api.get(`api/categories/${categoryId}`).json();

export const updateCategory = (categoryId, categoryData) => {
  if (!categoryId) {
    throw new Error('Category ID is required');
  }
  return api.put(`api/categories/${categoryId}`, { json: categoryData }).json();
};

export const deleteCategory = (categoryId) => {
  if (!categoryId) {
    throw new Error('Category ID is required');
  }
  return api.delete(`api/categories/${categoryId}`).json();
};

// Payment-related API calls
export const processPayment = (paymentData) => api.post('api/paiement', { json: paymentData }).json();;

// Export the API instance and the handleResponse function
export default api;
