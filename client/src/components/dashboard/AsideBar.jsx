import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdReceipt, MdInsights, MdEmail, MdAdminPanelSettings, MdOutlineLogout, MdClose } from "react-icons/md";
import { FaPeopleGroup, FaProductHunt } from "react-icons/fa6";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Modal from '../../components/modal/Modal';
//style dans dashboardLayout.scss;

const AsideBar = () => {
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
      <button onClick={toggleSidebar} className="toggle-btn">
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
        <div className="side-top">
        <a href="../../boutique">
            <h4 className='marque'>Au gré des saisons</h4>
          </a>
          <div className="close" onClick={handleSidebarToggle}>
           
          </div>
         
        </div>
        <div className="side-links">
          <Link to="/admin/dashboard" className={isActiveLink('/admin/dashboard') ? 'active' : ''}>
            <span className="material-icons-sharp"><MdDashboard /></span>
            <h3>Accueil</h3>
          </Link>
          <Link to="/admin/dashboard/utilisateurs" className={isActiveLink('/admin/dashboard/utilisateurs') ? 'active' : ''}>
            <span className="material-icons-sharp"><FaPeopleGroup /></span>
            <h3>Clients</h3>
          </Link>
          <Link to="/admin/dashboard/produits" className={isActiveLink('/admin/dashboard/produits') ? 'active' : ''}>
            <span className="material-icons-sharp"><FaProductHunt /></span>
            <h3>Produits</h3>
          </Link>
          <Link to="/admin/dashboard/orders" className={isActiveLink('/admin/dashboard/orders') ? 'active' : ''}>
            <span className="material-icons-sharp"><MdReceipt /></span>
            <h3>Commandes</h3>
          </Link>
          <Link to="/admin/dashboard/messages">
            <span className="material-icons-sharp"><MdEmail /></span>
            <h3>Messages</h3>
            <span className="message-count">26</span>
          </Link>
          <ul id="sous-menu">
            <li>
              <Link to="/admin/dashboard/paramètres" onClick={handleSubmenuToggle}>
                <span className="material-icons-sharp"><MdAdminPanelSettings /></span>
                <h3>Paramètres</h3>
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
          <h3>Déconnexion</h3>
        </button>
      </aside>
    </>
  );
};

export default AsideBar;
