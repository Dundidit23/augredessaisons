import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import "./navbar.scss";
import Logo from '../logo/Logo';
import StatusUser from '../navigation/statusUser/StatusUser';

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navToggle = () => setIsNavOpen(!isNavOpen);

  return (
    <nav className="nav">
      <Logo />
      <StatusUser />
      <ul className={`nav__menu ${isNavOpen ? 'nav__active' : ''}`}>
        {["/", "/Conseils_En_Herboristerie", "/boutique", "/soins", "/ateliers", "/dashboard"].map((path, index) => {
          const formattedPath = path.substring(1).split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
          return (
            <li key={index} className="navitem">
              <NavLink to={path} onClick={() => setIsNavOpen(false)}>
                {index === 0 ? "Home" : formattedPath}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <button onClick={navToggle} className={`nav__toggler ${isNavOpen ? 'toggle' : ''}`}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}

export default Navbar;
