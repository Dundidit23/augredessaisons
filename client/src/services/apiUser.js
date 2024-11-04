// services/apiUser.js

const API_URL = 'http://localhost:4000/api/users';

export const fetchUserData = async (token) => {
  const response = await fetch(`${API_URL}/your-endpoint`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return await response.json();
};

// Ajoutez d'autres fonctions pour la connexion, la mise à jour, etc.
