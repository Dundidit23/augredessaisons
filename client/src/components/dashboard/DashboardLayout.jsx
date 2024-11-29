import { Routes, Route, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import DashboardAccueil from './DashboardAccueil';
import AdminProducts from '../products/AdminProducts';
import AdminUsers from '../users/AdminUsers';
import AdminAuthUsers from '../users/AdminAuthUsers';
import MailboxLayout from '../messages/MailboxLayout'; // Importation correcte
import Parameters from './Parameters';
import Categories from '../categories/Categories';
import DashboardHeader from './DashboardHeader';
import AsideBar from './AsideBar';
//import './dashboardLayout.scss';

const DashboardLayout = () => {
  const { username } = useAdminAuth(); // Accès au contexte pour récupérer le nom d'utilisateur
  return (
    <div className="dashboard-layout">
      <DashboardHeader username={username} />
      <div className="dashboard-main">
        <AsideBar />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<DashboardAccueil />} />
            <Route path="produits" element={<AdminProducts />} />
            <Route path="utilisateurs" element={<AdminUsers />} />
            <Route path="paramètres" element={<Parameters />} />
            <Route path="paramètres/catégories" element={<Categories />} />
            <Route path="paramètres/administrateurs" element={<AdminAuthUsers />} />
            <Route path="/mailbox/*" element={<MailboxLayout />} /> {/* Corrigé */}
          </Routes>
          <Outlet /> {/* Déplacez l'Outlet ici pour afficher les routes enfants */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;