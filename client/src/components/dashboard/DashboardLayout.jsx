import { Routes, Route, Outlet } from 'react-router-dom';
import ProductList from '../products/ProductList';
import AllProducts from '../products/AllProducts';
import ClientList from '../clients/ClientList';
import DashboardMain from './DashboardMain';
import AsideBar from './AsideBar';
import DashboardHeader from './DashboardHeader';
import './dashboard.scss';

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <div className="dashboard-principal">
        <AsideBar />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<DashboardMain />} />
            <Route path="products" element={<ProductList />} />
            <Route path="clients" element={<AllProducts />} />
            {/* Autres sous-routes */}
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
