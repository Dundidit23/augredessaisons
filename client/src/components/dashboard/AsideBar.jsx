import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { MdDashboard, MdReceipt, MdInsights, MdEmail, MdAdminPanelSettings, MdOutlineLogout, MdClose } from "react-icons/md";
import { FaPeopleGroup, FaProductHunt } from "react-icons/fa6";
import DashboardMain from './DashboardMain';
import ProductList from '../products/ProductList';
import ClientList from '../clients/ClientList';
import Dash from './Dash';
import './asidebar.scss';

const AsideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
     
    <aside className={isSidebarOpen ? 'open' : 'closed'}>
      <div className="top">
        <div className="close" id="close-btn" onClick={handleSidebarToggle}>
          <span className="material-icons-sharp"><MdClose /></span>
        </div>
        <h4>Au gré des saisons</h4>
      </div>
      <div className="sidebar">
        <Link to="/dashboard">
          <span className="material-icons-sharp"><MdDashboard /></span>
          <h3>Accueil</h3>
        </Link>

        <Link to="/dashboard/clients" className="active">
          <span className="material-icons-sharp"><FaPeopleGroup /></span>
          <h3>Clients</h3>
        </Link>

        <Link to="/dashboard/products">
          <span className="material-icons-sharp"><FaProductHunt /></span>
          <h3>Produits</h3>
        </Link>

        <Link to="/dashboard/orders">
          <span className="material-icons-sharp"><MdReceipt /></span>
          <h3>Commandes</h3>
        </Link>

        <Link to="/dashboard/dash">
          <span className="material-icons-sharp"><MdInsights /></span>
          <h3>Analytics</h3>
        </Link>

        <Link to="/dashboard/messages">
          <span className="material-icons-sharp"><MdEmail /></span>
          <h3>Messages</h3>
          <span className="message-count">26</span>
        </Link>

        <Link to="/dashboard/settings">
          <span className="material-icons-sharp"><MdAdminPanelSettings /></span>
          <h3>Paramètres</h3>
        </Link>

        <Link to="#">
          <span className="material-icons-sharp"><MdOutlineLogout /></span>
          <h3>Logout</h3>
        </Link>
      </div>
    
    </aside>
    </>

  );
};

export default AsideBar;