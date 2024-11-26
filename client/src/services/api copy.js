// services/api.js
import ky from 'ky';

// Création de l'instance de ky avec des hooks pour ajouter le token dans les headers
const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,  // URL de base sans '/api'
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
        // Gérer les erreurs globales après la réponse
        if (!response.ok) {
          const data = await response.json();
          const errorMessage = data.message || 'Une erreur est survenue';
          console.error('Erreur API:', errorMessage);
        }
      }
    ]
  }
});

// services/api.js

export const sendMessage = async (data) => {
  return await api.post('messages', { json: data }).json();
};

export const replyToMessage = async (id, replyData) => {
  return await api.post(`messages/${id}/reply`, { json: replyData }).json();
};


export const fetchMessages = async () => {
  try {
    const response = await ky.get(`${VITE_API_BASE_URL}/messages`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    throw error;
  }
};

// Exporter les URLs pour réutilisation
export const REGISTER_URL = 'users/register';
export const LOGIN_URL = 'users/login';
export const ADMIN_REGISTER_URL = 'admins/register';
export const ADMIN_LOGIN_URL = 'admins/login';
export const USERS_URL = 'users'; // Ajout de cette ligne

export default api;

