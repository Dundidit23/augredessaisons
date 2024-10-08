import { Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CategoryProvider } from './context/CategoryContext';
import Header from './layout/header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import ConseilsEnHerboristerie from './pages/ConseilEnHerboristerie';
import Boutique from './pages/Boutique';
import Soins from './pages/Soins';
import Ateliers from './pages/Ateliers';
import Register from './pages/Register';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import DashboardLayout from './components/dashboard/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Vérifiez si le chemin commence par "/dashboard" pour exclure le header sur toutes les routes du dashboard
  const isDashboardPath = path.startsWith('/dashboard');

  return (
    
    <AuthProvider>
      <CategoryProvider>
        {/* Affichez le Header si on n'est pas sur une route liée au Dashboard */}
        {!isDashboardPath && <Header />} 
        
        <ErrorBoundary>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/Conseils_En_Herboristerie" element={<ConseilsEnHerboristerie />} />            <Route path="/boutique" element={<Boutique />} />
            <Route path="/soins" element={<Soins />} />
            <Route path="/ateliers" element={<Ateliers />} />
            <Route path='/register' element={<Register />} />
            <Route path='/adminLogin' element={<AdminLogin />} />
            <Route path='/admin/admin-register' element={<AdminRegister />} />
            
            {/* Route du dashboard protégée */}
            <Route path='/dashboard/*' element={<PrivateRoute element={<DashboardLayout />} />} />

          </Routes>
        </ErrorBoundary>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;
