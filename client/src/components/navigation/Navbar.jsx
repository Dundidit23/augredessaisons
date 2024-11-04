import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./navbar.scss";
import Logo from '../logo/Logo';
import StatusUser from '../navigation/statusUser/StatusUser';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navToggle = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className="nav container">
      <Logo className="nav__logo"/>
 <div className="nav__alllinks">
      <ul className={`nav__menu ${isNavOpen ? 'nav__active' : ''}`}>
        {["/", "/Conseils_En_Herboristerie", "/boutique", "/soins", "/ateliers"].map((path, index) => {
          const formattedPath = path.substring(1).split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return (
            <li key={index} className="nav__item">
              <NavLink to={path} className="nav__link" onClick={() => setIsNavOpen(false)}>
                {index === 0 ? "Home" : formattedPath}
              </NavLink>
            </li>
          );
        })}
        <li><NavLink className="nav__link" to="/dashboard/">D</NavLink></li> 
       
      </ul>
     
      
    

      {/* Hamburger menu toggler */}
      <button onClick={navToggle} className={`nav__toggler ${isNavOpen ? 'toggle' : ''}`}>
        <span className={isNavOpen ? 'rotate-down' : ''}></span>
        <span className={isNavOpen ? 'fade-out' : ''}></span>
        <span className={isNavOpen ? 'rotate-up' : ''}></span>
      </button>
      <StatusUser className="status-user"/> 
      </div>
    </nav>
  );
}

export default Navbar;
