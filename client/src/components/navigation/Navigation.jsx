import React, { useState } from 'react';
import styles from './navigation.module.scss';
import Logo from '../../components/logo/Logo'
//import LoginModal from '../loginModal/LoginModal'
//import Login from '../../components/login/Login'
import Hamburger from './hamburger_links/hamburger';
//import SignUp from '../../pages/SignUp';
import StatusUser from './statusUser/StatusUser'

 const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav>
      <Logo />
      <Hamburger />
      <StatusUser />
    </nav>
  );
};
export default Navigation;



