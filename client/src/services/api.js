// services/api.js
import ky from 'ky';

const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ]
  }
});

export const REGISTER_URL = 'users/register';
export const LOGIN_URL = 'users/login';
export const ADMIN_REGISTER_URL = 'admins/register';
export const ADMIN_LOGIN_URL = 'admins/login';
export default api;
