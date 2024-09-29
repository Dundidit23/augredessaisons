import React from 'react';
import { Link } from 'react-router-dom';
import LogoPic from '../../assets/images/illustration-plantain-logo.png';
import styles from './logo.module.scss'

const Logo = () => {
  return (
    <Link to="/Home"  className={styles.logo}>
       <img className={styles.logopic} src={LogoPic} alt="" />
    </Link>
  )
}

export default Logo
