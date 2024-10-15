// api.js
import ky from 'ky';
import { HTTPError } from 'ky';

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

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

export const fetchProducts = () => api.get('api/products').json();

export const addProduct = async (product) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Échec de l\'ajout du produit');
  }
  
  return await response.json();
};

export const updateProduct = async (productId, updatedProduct) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedProduct),
  });
  
  if (!response.ok) {
    throw new Error('Échec de la mise à jour du produit');
  }
  
  return await response.json();
};

export const deleteProduct = async (productId) => {
  const response = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Échec de la suppression du produit');
  }
};
export const addCategory = (category) => api.post('api/categories', { json: category }).json();
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

export const processPayment = (paymentData) => api.post('api/paiement', { json: paymentData }).json();

export default api;