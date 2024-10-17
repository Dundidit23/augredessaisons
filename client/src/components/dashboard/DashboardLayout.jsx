//DashboarLayout.jsx
import { Routes, Route, Outlet } from 'react-router-dom';
import DashboardAccueil from './DashboardAccueil';
import GestionProducts from '../products/GestionProducts.jsx';
import ClientList from '../clients/ClientList';
import Parameters from './Parameters.jsx';
import Categories from '../categories/Categories.jsx';
import DashboardHeader from './DashboardHeader';
import AsideBar from './AsideBar';
import './dashboardLayout.scss';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <DashboardHeader />
      <div className="dashboard-main">
        <AsideBar />
        <Outlet />
          <Routes>
            <Route path="/" element={<DashboardAccueil />} />
            <Route path="produits" element={<GestionProducts />} />
            <Route path="clients" element={<ClientList />} />
            <Route path="/paramètres" element={<Parameters />} />
            <Route path="/paramètres/Catégories" element={<Categories />} />
            {/* Autres sous-routes */}
          </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
