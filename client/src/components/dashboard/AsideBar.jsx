import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdDashboard, MdReceipt, MdInsights, MdEmail, MdAdminPanelSettings, MdOutlineLogout, MdClose } from "react-icons/md";
import { FaPeopleGroup, FaProductHunt } from "react-icons/fa6";
import { useAdminAuth } from '../../context/AdminContext'; 
import Modal from '../../components/modal/Modal';
import './asidebar.scss';

const AsideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const { logout, username, isAuthenticated } = useAdminAuth();  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSubmenuToggle = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true); // Affiche le modal de déconnexion
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false); // Ferme le modal après déconnexion
    navigate('/admin/login'); // Navigue vers la page de connexion
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Ferme le modal sans déconnexion
  };

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
      <aside className={isSidebarOpen ? 'side open' : 'side closed'}>
        <div className="side-top">
          <div className="close" id="close-btn" onClick={handleSidebarToggle}>
            <span className="material-icons-sharp"><MdClose /></span>
          </div>
          <a href="../../boutique"><h4 className='marque'>Au gré des saisons</h4></a> 
        </div>
        <div className="side-links">
          <Link to="/admin/dashboard">
            <span className="material-icons-sharp"><MdDashboard /></span>
            <h3>Accueil</h3>
          </Link>
          <Link to="/admin/dashboard/utilisateurs" className="active">
            <span className="material-icons-sharp"><FaPeopleGroup /></span>
            <h3>Clients</h3>
          </Link>
          <Link to="/admin/dashboard/produits">
            <span className="material-icons-sharp"><FaProductHunt /></span>
            <h3>Produits</h3>
          </Link>
          <Link to="/admin/dashboard/orders">
            <span className="material-icons-sharp"><MdReceipt /></span>
            <h3>Commandes</h3>
          </Link>
          <Link to="/admin/dashboard/dash">
            <span className="material-icons-sharp"><MdInsights /></span>
            <h3>Analytics</h3>
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
              </ul>
            </li>
          </ul>
          <button className='logout' type="button" onClick={handleLogout}>
            <span className="material-icons-sharp"><MdOutlineLogout /></span>
            <h3>Déconnexion</h3>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AsideBar;
