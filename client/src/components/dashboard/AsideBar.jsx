import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdDashboard, MdReceipt, MdEmail, MdAdminPanelSettings, MdOutlineLogout } from "react-icons/md";
import { FaPeopleGroup, FaProductHunt } from "react-icons/fa6";
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { fetchMessages } from '../../services/api';
import Modal from '../../components/modal/Modal';
import './asidebar.scss';

const AsideBar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { logout, username, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  
  // État pour gérer l'ouverture des sous-menus
  const [openSubmenus, setOpenSubmenus] = useState({
    messages: false,
    parametres: false,
  });

  const getNewMessagesCount = async () => {
    try {
      const messages = await fetchMessages();
      const unreadMessages = messages.filter(message => !message.read);
      setNewMessagesCount(unreadMessages.length);
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const interval = setInterval(getNewMessagesCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleSubmenuToggle = (submenu) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [submenu]: !prev[submenu], // Inverse l'état du sous-menu spécifique
    }));
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
          <button onClick={handleSidebarToggle} className="toggle-btn">
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/boutique">
            <h3 className='marque'>Au gré des saisons</h3>
          </Link>
        </div>
        <div className="side-links">
          <Link to="/admin/dashboard" className={activeLink === '/admin/dashboard' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard')}>
            <span className="material-icons-sharp"><MdDashboard /></span>
            <h4>Accueil</h4>
          </Link>
          <Link to="/admin/dashboard/utilisateurs" className={activeLink === '/admin/dashboard/utilisateurs' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard/utilisateurs')}>
            <span className="material-icons-sharp"><FaPeopleGroup /></span>
            <h4>Clients</h4>
          </Link>
          <Link to="/admin/dashboard/produits" className={activeLink === '/admin/dashboard/produits' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard/produits')}>
            <span className="material-icons-sharp"><FaProductHunt /></span>
            <h4>Produits</h4>
          </Link>
          <Link to="/admin/dashboard/orders" className={activeLink === '/admin/dashboard/orders' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard/orders')}>
            <span className="material-icons-sharp"><MdReceipt /></span>
            <h4>Commandes</h4>
          </Link>
          <ul id="sous-menu-messages">
            <li>
              <Link to="/admin/dashboard/mailbox" className={activeLink === '/admin/dashboard/messages' ? 'active' : 'non-active'} onClick={() => {
                handleLinkClick('/admin/dashboard/messages');
                handleSubmenuToggle('messages'); // Ouvre ou ferme le sous-menu des messages
              }}>
                <span className="material-icons-sharp"><MdEmail /></span>
                <h4>Messagerie</h4>
                {newMessagesCount > 0 && (
                  <span className="message-count">{newMessagesCount}</span>
                )}
              </Link>
              {/* <ul className={`submenu ${openSubmenus.messages ? 'open' : ''}`}>
                <li>
                  <Link to="/admin/dashboard/messages/messages-envoyés" className={activeLink === '/admin/dashboard/messages/messages-envoyés' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard/messages/messages-envoyés')}>
                    <h5>Messages Envoyés</h5>
                  </Link>
                </li>
              </ul> */}
            </li>
          </ul>
          <ul id="sous-menu">
            <li>
              <Link to="/admin/dashboard/paramètres" className={activeLink === '/admin/dashboard/paramètres' ? 'active' : 'non-active'} onClick={() => {
                handleLinkClick('/admin/dashboard/paramètres');
                handleSubmenuToggle('parametres'); // Ouvre ou ferme le sous-menu des paramètres
              }}>
                <span className="material-icons-sharp"><MdAdminPanelSettings /></span>
                <h4>Paramètres</h4>
              </Link>
              <ul className={`submenu ${openSubmenus.parametres ? 'open' : ''}`}>
                <li>
                  <Link to="/admin/dashboard/paramètres/catégories" className={activeLink === '/admin/dashboard/paramètres/catégories' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard/paramètres/catégories')}>
                    <h5>Catégories</h5>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/dashboard/paramètres/administrateurs" className={activeLink === '/admin/dashboard/paramètres/administrateurs' ? 'active' : 'non-active'} onClick={() => handleLinkClick('/admin/dashboard/paramètres/administrateurs')}>
                    <h5>Administrateurs</h5>
                  </Link>
                </li>
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