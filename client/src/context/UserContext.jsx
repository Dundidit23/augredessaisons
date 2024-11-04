
//UserContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api,{ REGISTER_URL, LOGIN_URL } from '../services/api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('token');
};

  // Enregistrement d’un utilisateur
  const registerUser = async ({ username, email, password }) => {
    console.log("API URL:", import.meta.env.VITE_API_BASE_URL);
    try {
        const response = await api.post(REGISTER_URL, {
            json: { username, email, password }, // Assurez-vous d'utiliser 'json'
        });

        const data = await response.json(); // Récupération des données de la réponse
        console.log("Données reçues pour l'inscription :", data);

        if (response.ok) {
            const newUser = { _id: data.user._id, username: data.user.username, email: data.user.email };
            return { message: "Utilisateur enregistré avec succès", user: newUser };
        } else {
            throw new Error(data.error || "Erreur d'inscription");
        }
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        throw new Error("Erreur d'inscription");
    }
};
  
  

  // Connexion d’un utilisateur
  const loginUser = async (email, password) => {
    try {
        const response = await api.post(LOGIN_URL, {
            json: { email, password },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la connexion');
        }

        const { token, user } = await response.json();
        console.log("Données de l'utilisateur :", user); // Log des données de l'utilisateur
        localStorage.setItem('token', token);
        setUser(user);
        setErrorMessage('');

        return { token, user }; // Retournez les données pour la redirection
    } catch (error) {
        console.error("Login error:", error.message);
        setErrorMessage(error.message || 'Erreur lors de la connexion');
    }
};

    return (
      <UserContext.Provider value={{ errorMessage, registerUser, loginUser, user, setUser, logoutUser }}>
          {children}
      </UserContext.Provider>
    );
};
