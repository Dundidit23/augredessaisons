// services/api.js
import ky from 'ky';

// Créer une instance de ky avec des configurations par défaut
const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL, // URL de base (par exemple: http://localhost:4000/api)
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (!response.ok) {
          const data = await response.json();
          const errorMessage = data.message || 'Une erreur est survenue';
          console.error('Erreur API:',response.statusText);
          throw new Error(errorMessage);
        }
      }
    ]
  }
});


// ** Fonctions d'authentification **
export const registerUser = (data) => api.post('users/register', { json: data }).json();
export const loginUser = (data) => api.post('users/login', { json: data }).json();
export const registerAdmin = (data) => api.post('admins/register', { json: data }).json();
export const loginAdmin = (data) => api.post('admins/login', { json: data }).json();

// ** Fonctions liées aux utilisateurs **
export const fetchUsers = () => api.get('users').json();
export const deleteUser = (id) => api.delete(`users/${id}`).json();

// ** Fonctions liées aux messages **
export const sendMessage = (data) => api.post('messages', { json: data }).json();
export const getSentMessages = () => api.get('messages/sent').json();
export const fetchMessages = () => api.get('messages').json();

// export const fetchMessages = async () => {
//   try {
//     const response = await fetch('http://localhost:4000/api/messages'); // Remplacez par votre URL
//     const data = await response.json();
//   //  console.log('Données brutes reçues :', data); // Log des données
//     return data;
//   } catch (error) {
//     console.error('Erreur lors de la récupération des messages :', error);
//     throw error;
//   }
// };


export const replyToMessage = (id, replyData) => 
  api.post(`messages/${id}/reply`, { json: { content: replyData } }).json();

export const markMessageAsRead = (id) => 
  api.patch(`messages/${id}/read`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).json();
  export const markAsReplied = (id) => 
    api.patch(`messages/${id}/replied`, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).json();

  export const deleteMessage = (id) => api.delete(`messages/${id}`).json();

// ** Fonctions liées aux produits **
export const fetchProducts = () => api.get('products').json();
export const addProduct = (data) => api.post('products', { json: data }).json();
export const updateProduct = (id, data) => api.put(`products/${id}`, { json: data }).json();
export const deleteProduct = (id) => api.delete(`products/${id}`).json();

// ** Fonctions liées aux catégories **
export const fetchCategories = () => api.get('categories').json();
export const addCategory = (data) => api.post('categories', { json: data }).json();
export const updateCategory = (id, data) => api.put(`categories/${id}`, { json: data }).json();
export const deleteCategory = (id) => api.delete(`categories/${id}`).json();

// ** Export des URLs pour une réutilisation simplifiée dans l'application **
export const REGISTER_URL = 'users/register';
export const LOGIN_URL = 'users/login';
export const ADMIN_REGISTER_URL = 'admins/register';
export const ADMIN_LOGIN_URL = 'admins/login';
export const USERS_URL = 'users';
export const PRODUCTS_URL = 'products';
export const CATEGORIES_URL = 'categories';
export const MESSAGES_URL = 'messages';

export default api;
