import React, { useState } from 'react';
import styles from './hamburger.module.scss';
import {NavLink} from 'react-router-dom'

 const Hamburger = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const toggleNav = () => {
      setIsNavOpen(!isNavOpen);
  };
  const closeNav = () => {
    setIsNavOpen(false);
  };
  return (
    <nav>
      <button
        className={`${styles.hamburger} ${isNavOpen ? styles['open'] : ''}`}
        type="button"
        aria-label="Toggle navigation"
        // aria-expanded={isNavOpen}
        onClick={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`${styles.navlinks} ${isNavOpen ? styles.open : ''}`}>
        <li><NavLink to="/"  onClick={closeNav}>Home</NavLink></li>
        <li><NavLink to="/boutique"  onClick={closeNav}>Boutique</NavLink></li>
        <li><NavLink to="/Soins"  onClick={closeNav}>Soins</NavLink></li>
        <li><NavLink to="/Ateliers"  onClick={closeNav}>Ateliers</NavLink></li>
        <li><NavLink to="/admin/dashboard"  onClick={closeNav}>Dashboard</NavLink></li>
      </ul>
      
  </nav>
  );
};

export default Hamburger;