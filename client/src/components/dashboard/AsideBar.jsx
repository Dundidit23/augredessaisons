//AsideBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdReceipt, MdInsights, MdEmail, MdAdminPanelSettings, MdOutlineLogout, MdClose } from "react-icons/md";
import { FaPeopleGroup, FaProductHunt } from "react-icons/fa6";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import Modal from '../../components/modal/Modal';
import './asidebar.scss'
//style dans dashboardLayout.scss;

const AsideBar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { logout, username, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmenuToggle = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/admin/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      {showLogoutModal && (
        <Modal show={showLogoutModal} onClose={cancelLogout}>
          <div>
            <h2>Déconnexion</h2>
            <p>Au revoir, {username} !</p>
            <button onClick={confirmLogout}>Confirmer</button>
            <button onClick={cancelLogout}>Annuler</button>
          </div>
        </Modal>
      )}
      <aside className={`side ${isSidebarOpen ? 'open' : 'closed'}`}>
     
        <div className="side-top">
        <button onClick={toggleSidebar} className="toggle-btn">
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
       <Link to="/boutique">
            <h3 className='marque'>Au gré des saisons</h3>
            </Link>
          <div className="close" onClick={handleSidebarToggle}>
           
          </div>
         
        </div>
        <div className="side-links">
          <Link to="/admin/dashboard" className={isActiveLink('/admin/dashboard') ? 'active' : ''}>
            <span className="material-icons-sharp"><MdDashboard /></span>
            <h4>Accueil</h4>
          </Link>
          <Link to="/admin/dashboard/utilisateurs" className={isActiveLink('/admin/dashboard/utilisateurs') ? 'active' : ''}>
            <span className="material-icons-sharp"><FaPeopleGroup /></span>
            <h4>Clients</h4>
          </Link>
          <Link to="/admin/dashboard/produits" className={isActiveLink('/admin/dashboard/produits') ? 'active' : ''}>
            <span className="material-icons-sharp"><FaProductHunt /></span>
            <h4>Produits</h4>
          </Link>
          <Link to="/admin/dashboard/orders" className={isActiveLink('/admin/dashboard/orders') ? 'active' : ''}>
            <span className="material-icons-sharp"><MdReceipt /></span>
            <h4>Commandes</h4>
          </Link>
          <Link to="/admin/dashboard/messages">
            <span className="material-icons-sharp"><MdEmail /></span>
            <h4>Messages</h4>
            <span className="message-count">26</span>
          </Link>
          <ul id="sous-menu">
            <li>
              <Link to="/admin/dashboard/paramètres" onClick={handleSubmenuToggle}>
                <span className="material-icons-sharp"><MdAdminPanelSettings /></span>
                <h4>Paramètres</h4>
              </Link>
              <ul className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
                <li><Link to="/admin/dashboard/paramètres/Catégories"><h5>Catégories</h5></Link></li>
                <li><Link to="/admin/dashboard/paramètres/Administrateurs"><h5>Administrateurs</h5></Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <button className='btn-logout' type="button" onClick={handleLogout}>
          <span className="material-icons-sharp"><MdOutlineLogout /></span>
          <h4>Déconnexion</h4>
        </button>
      </aside>
    </>
  );
};

export default AsideBar;
