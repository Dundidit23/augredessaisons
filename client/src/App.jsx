import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { AdminProvider } from './context/AdminContext'; // Importez AdminProvider
import { CategoryProvider } from './context/CategoryContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './layout/header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import ConseilsEnHerboristerie from './pages/ConseilEnHerboristerie';
import Boutique from './pages/Boutique';
import DetailsProduct from './pages/DetailsProduct';
import CartPage from './pages/CartPage.jsx';
import Soins from './pages/Soins';
import Ateliers from './pages/Ateliers';
import AdminLogin from './pages/admin/AdminLogin';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { useAdminAuth } from './context/AdminContext'; // Assurez-vous que le chemin est correct

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAdminAuth(); // Vérifiez si l'admin est authentifié
    return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const isAdminPath = path.startsWith('/admin');

    return (
      <AdminProvider>
        <UserProvider>
            <CategoryProvider>
                <ProductProvider>
                    <CartProvider>
                      
                            {/* Affichez le Header si on n'est pas sur une route liée au Dashboard */}
                            {!isAdminPath && <Header />}
                            <ErrorBoundary>
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    <Route path="/Conseils_En_Herboristerie" element={<ConseilsEnHerboristerie />} />
                                    <Route path="/boutique" element={<Boutique />} />
                                    <Route path="/product/:id" element={<DetailsProduct />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/soins" element={<Soins />} />
                                    <Route path="/ateliers" element={<Ateliers />} />
                                    <Route path='/admin/login' element={<AdminLogin />} />
                                    {/* Route du dashboard protégée */}
                                    <Route path="/admin/dashboard/*" element={
                                        <PrivateRoute>
                                            <DashboardLayout />
                                        </PrivateRoute>
                                    } />
                                </Routes>
                            </ErrorBoundary>
                      
                    </CartProvider>
                </ProductProvider>
            </CategoryProvider>
        </UserProvider>
        </AdminProvider>
    );
}

export default App;