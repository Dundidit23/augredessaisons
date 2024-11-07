//DashboardLayout.jsx
import { Routes, Route, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminContext';
import DashboardAccueil from './DashboardAccueil';
import AdminProducts from '../products/AdminProducts.jsx';
import AdminUsers from '../users/AdminUsers.jsx';
import Messages from '../messages/Messages.jsx';

import Parameters from './Parameters.jsx';
import Categories from '../categories/Categories.jsx';
import DashboardHeader from './DashboardHeader';
import AsideBar from './AsideBar';
import './dashboardLayout.scss';

const DashboardLayout = () => {
  const { username } = useAdminAuth(); // Access the username from context
  return (
    <div className="dashboard-layout">
     <DashboardHeader username={username} />
      <div className="dashboard-main">
        <AsideBar />
        <Routes>
          <Route path="/" element={<DashboardAccueil />} />
          <Route path="produits" element={<AdminProducts />} />
          <Route path="utilisateurs" element={<AdminUsers />} />
          <Route path="messages" element={<Messages />} />

          <Route path="paramètres" element={<Parameters />} />
          <Route path="paramètres/Catégories" element={<Categories />} />
          {/* Autres sous-routes */}
        </Routes>
        <Outlet /> {/* Ceci affichera les sous-composants spécifiques */}
      </div>
    </div>
  );
};

export default DashboardLayout;