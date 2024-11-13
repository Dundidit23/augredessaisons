//UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { REGISTER_URL, LOGIN_URL, USERS_URL } from '../services/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Enregistrer un nouvel utilisateur
  const registerUser = async ({ username, email, password }) => {
    try {
      const response = await api.post(REGISTER_URL, {
        json: { username, email, password },
      });

      if (!response.ok) throw new Error("Erreur d'inscription");

      const data = await response.json();
      const newUser = { _id: data.user._id, username: data.user.username, email: data.user.email };
      setUsers((prev) => [...prev, newUser]);
      return { message: 'Utilisateur enregistré avec succès', user: newUser };
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setErrorMessage("Erreur d'inscription");
      return null;
    }
  };

  // Connexion d'un utilisateur
  const loginUser = async (email, password) => {
    try {
      const response = await api.post(LOGIN_URL, {
        json: { email, password }
        
      });
      console.log('Email:', email);
      console.log('Password:', password);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la connexion');
      }
  
      const { token, user } = await response.json();
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setCurrentUser(user);
      setUsername(data.username);
      setErrorMessage('');
  
      return true;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErrorMessage(error.message || 'Erreur lors de la connexion');
      return false;
    }
  };
  

  // Déconnexion de l'utilisateur
  const logoutUser = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setUsername('');
    localStorage.removeItem('token');
    navigate('/login'); // Rediriger vers la page de connexion
  };

  // Récupérer tous les utilisateurs (si nécessaire)
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get(USERS_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs');

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const addUser = async (userData) => {
    try {
      const response = await api.post(`${USERS_URL}`, { json: userData });
      const data = await response.json();
      console.log('Utilisateur ajouté:', data);
      fetchUsers(); // Actualiser la liste des utilisateurs après l'ajout
    } catch (error) {
      console.error('Erreur dans addUser:', error);
    }
  };
  

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (userData) => {
    try {
      await api.put(`${USERS_URL}/${userData._id}`, { json: userData });
      fetchUsers();
    } catch (error) {
      console.error('updateUser', error);
    }
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId) => {
    try {
      await api.delete(`${USERS_URL}/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('deleteUser', error);
    }
  };

  // Vérifier si un utilisateur est déjà authentifié au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUsers();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        isAuthenticated,
        currentUser,
        username,
        users,
        errorMessage,
        fetchUsers,
        isLoading,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
