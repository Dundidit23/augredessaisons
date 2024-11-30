import React from 'react'
import facebook from '../../assets/images/icons/facebook-logo-transparent-round.webp';
import Instagram from '../../assets/images/icons/instagram-logo-transparent-round.webp';
import Linkedin from '../../assets/images/icons/linkedinlogo-transparent-round.webp';
import './Footer.scss'

const Footer = () => {
  return (
    <footer> 
      <div className="footer-content">

        <div className='garanties'>
          <h4>Nos garanties</h4>
          <ul>
              <li>Produits de qualité</li>
              <li>Livraison rapide</li>
              <li>Paiement sécurisé</li>
              <li>Sécurité et confidentialité</li>
          </ul>
        </div>
        <div className='informations'>
          <h4>Informations</h4>
          <ul>
            <li>CGV</li>
            <li>Mentions légales</li>
            <li>Livraison</li>
            <li>Points fidèlité</li>
            <li>FAQ</li>
          </ul>

        </div>

        <div className="contact">
            <h4>Contactez-nous</h4>
            <ul>
              <li>202, avenue des Éclaireurs</li>
              <li>Paris, 75008</li>
              <li>France</li>
              <li>Tél : +33 6 99 48 87 55</li>
              <li>Email :  vincent.cassagne@agredessaison.com</li>
            </ul>
        </div>

        <div className="social-media">
          
          <ul>
            <li><a href="#">  <img className="social-icons" src={facebook} alt="logo-facebbok" /></a></li>
            <li> <img className="social-icons" src={Instagram} alt="logo-facebbok" /></li>
            <li> <img className="social-icons" src={Linkedin} alt="logo-facebbok" /></li>
            
          </ul>
        </div>
      </div>
        <p className='copyright'>&copy; Au gré des saisons - Tous droits réservés. Tous les droits sont réservés.</p>
</footer>

    
  )
}
export default Footer
