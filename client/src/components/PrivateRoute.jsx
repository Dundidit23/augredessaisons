//PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminPrivateRoute = ({ element: Element }) => {
  const { isAuthenticated } = useAdminAuth();

  return isAuthenticated ? <Element /> : <Navigate to="/adminLogin" />;
};

export default PrivateRoute;
