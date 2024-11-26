import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAdminAuth } from './context/AdminAuthContext'; // Ajout de l'import manquant
import ThemeProvider from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import socket from './services/socketIoClient';
import Header from './layout/header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import ConseilsEnHerboristerie from './pages/ConseilEnHerboristerie';
import Boutique from './pages/Boutique';
import DetailsProduct from './pages/DetailsProduct';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage.jsx';
import Soins from './pages/Soins';
import Ateliers from './pages/Ateliers';
import AdminLogin from './pages/admin/AdminLogin';
import DashboardLayout from './components/dashboard/DashboardLayout';
import NotFound from './components/NotFound';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAdminAuth();
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const isAdminPath = path.startsWith('/admin');
    const [status, setStatus] = useState('');

    useEffect(() => {
        // Écouter les mises à jour du statut des utilisateurs
        socket.on('status_update', (data) => {
          console.log(`Le statut de l'utilisateur ${data.userId} a changé à : ${data.status}`);
          setStatus(data.status);
        });
    
        return () => {
          socket.off('status_update'); // Ne pas oublier de nettoyer l'écouteur
        };
      }, []);

    return (
        <ThemeProvider>
        <AdminAuthProvider>
            <UserProvider>
                <CategoryProvider>
                    <ProductProvider>
                        <CartProvider>
                            {!isAdminPath && <Header />}
                            <ErrorBoundary>
                                <Routes>
                                    {/* Routes publiques */}
                                    <Route path="/" element={<Home />} />
                                    <Route path="/Conseils_En_Herboristerie" element={<ConseilsEnHerboristerie />} />
                                    <Route path="/boutique" element={<Boutique />} />
                                    <Route path="/product/:id" element={<DetailsProduct />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/checkout" element={<PaymentPage />} />
                                    <Route path="/soins" element={<Soins />} />
                                    <Route path="/ateliers" element={<Ateliers />} />
                                    {/* Autres routes publiques */}
                                    <Route path="/admin/login" element={<AdminLogin />} />
                                    {/* Routes protégées du Dashboard */}
                                    <Route path="/admin/dashboard/*" element={
                                        <PrivateRoute>
                                            <DashboardLayout />
                                        </PrivateRoute>
                                    } />
                                       <Route path="*" element={<NotFound />} />
                                </Routes>
                            </ErrorBoundary>
                        </CartProvider>
                    </ProductProvider>
                </CategoryProvider>
            </UserProvider>
        </AdminAuthProvider>
    </ThemeProvider>
    );
}

export default App;
