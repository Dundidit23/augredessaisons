import React from 'react';
import Heropic from '../../assets/images/preparation_assiette.jpg'
import styles from './hero.module.scss'

const Hero = () => {
  return (
    <>
    <img  className={styles.heropic} src={Heropic} alt="" />
    </>
  )
}

export default Hero
