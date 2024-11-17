//AdminAuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import api, { ADMIN_REGISTER_URL, ADMIN_LOGIN_URL } from '../services/api';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [username, setUsername] = useState('');

  // Fonction pour mettre à jour le statut en ligne
  const updateAdminStatus = async (adminId, isOnline) => {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        'admins/update-status',
        { adminId, isOnline },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const addAdmin = async (newAdmin) => {
    try {
      const response = await api.post(ADMIN_REGISTER_URL, {
        json: newAdmin,
      });

      if (!response.ok) throw new Error("Erreur lors de la création de l'administrateur");

      const createdAdmin = await response.json();
      setAdmins((prev) => [...prev, createdAdmin.admin]);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'admin:", error);
    }
  };

  const loginAdmin = async (username, password) => {
    try {
      const response = await api.post(ADMIN_LOGIN_URL, {
        json: { username, password },
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setUsername(data.username);
      setCurrentAdmin(data.admin); // Stocker l'admin connecté
  
      // Mettre à jour le statut en ligne
      await updateAdminStatus(data.admin._id, true);
      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    }
  };

  const logout = async () => {
    if (currentAdmin) {
      await updateAdminStatus(currentAdmin._id, false); // Mettre à jour le statut hors ligne
    }
    setIsAuthenticated(false);
    setUsername('');
    setCurrentAdmin(null);
    localStorage.removeItem('token');
  };

  const fetchAdmins = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get('admins', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erreur lors de la récupération des administrateurs');
      const data = await response.json();
      setAdmins(data.admins);
    } catch (error) {
      console.error('Erreur lors de la récupération des admins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Détection de la fermeture de la fenêtre ou du rafraîchissement de la page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentAdmin) {
        updateAdminStatus(currentAdmin._id, false);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentAdmin]);

  return (
    <AdminAuthContext.Provider
      value={{
        addAdmin,
        admins,
        isLoading,
        isAuthenticated,
        errorMessage,
        fetchAdmins,
        setUsername,
        username,
        loginAdmin,
        logout,
        currentAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
