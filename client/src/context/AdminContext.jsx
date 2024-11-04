//AdminContext.jsx
import { createContext, useContext, useState } from 'react';
import api, { ADMIN_LOGIN_URL } from '../services/api'; // Assurez-vous que le chemin est correct

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  const loginAdmin = async (username, password) => {
    try {
        const response = await api.post(ADMIN_LOGIN_URL, {
            json: { username, password },
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        setIsAuthenticated(true);
        setUsername(data.username); // Mettez à jour le nom d'utilisateur
        return true;
    } catch (error) {
        console.error("Error during admin login: ", error);
        return false;
    }
};

const logout = () => {
  console.log('Executing logout'); // Debugging
  setIsAuthenticated(false);
  setUsername('');
};


  return (
    <AdminContext.Provider value={{ isAuthenticated, setUsername, username, loginAdmin, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AuthProvider");
  }
  return context;
};