import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './layout/header/Header';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Boutique from './pages/Boutique';
import Soins from './pages/Soins';
import Ateliers from './pages/Ateliers';
import Register from './pages/Register';
//import Login from './pages/Login';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister'; // Ensure this matches the actual file name
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isAdminPath = path.includes('/admin-login') || path === '/dashboard' || path.includes('/admin/admin-register');  const isDashboardPath = path === '/dashboard';

  return (
    <AuthProvider>
      {!isAdminPath && <Header />}
      {isDashboardPath && <h1>Admin</h1>}
      <ErrorBoundary>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/soins" element={<Soins />} />
          <Route path="/ateliers" element={<Ateliers />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/admin/admin-register' element={<AdminRegister />} /> {/* Ensure this matches the actual file name */}
          <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;