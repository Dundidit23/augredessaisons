import React from 'react';
import { useNavigate } from 'react-router-dom';
import Infusion from '../../../assets/images/infusion.webp';
import Gemmo from '../../../assets/images/gemmo.webp';
import Teintures from '../../../assets/images/Teintures2.webp';
import Huiles from '../../../assets/images/huiles.webp';
import './products.scss';

const Products = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/boutique/${encodeURIComponent(category)}`);
  };

  return (
    <div className='products'>
      <div className='decouvre'>
        <h3>Découvrez <br></br>  toutes nos gammes de produits à base de plantes</h3>
        <div>
          <p>Une large gamme de produits à base de plantes médicinales, dont des tisanes, des huiles essentielles et des herbes et épices.</p>
          <button 
            className='garanty button-quality'
            onClick={() => navigate('/boutique')}
          >
            Achetez →
          </button>
        </div>
      </div>

      <div className='byCategory'>
        <div className='category'>
          <div className='text'>
            <h2>Infusions</h2>
            <p>Nous proposons une grande variété de mélanges de tisanes délicieuses et apaisantes à base de plantes.</p>
            <button 
              className='garanty button-quality voir'
              onClick={() => handleCategoryClick('Infusions')}
            >
              Voir
            </button>
          </div>
          <div className='categoryImg'>
            <img src={Infusion} alt="Infusions" />
          </div>
        </div>
    

     
        <div className='category'>
          <div className='text'>
            <h2>Huiles et Baumes</h2>
            <p>Baume respiratoire, baume des rêves, baume des bobos, baume corporel, baume à lèvres..</p>
            <button 
              className='garanty button-quality voir'
              onClick={() => handleCategoryClick('Huiles et Baumes')}
            >
              Voir
            </button>
          </div>
          <div className='categoryImg'>
            <img src={Huiles} alt="Huiles" />
          </div>
        </div>
    
      
        <div className='category'>
          <div className='text'>
            <h2>Teintures</h2>
            <p> La teinture-mère est un procédé consistant à utiliser une plante fraîche qu'on laisse macérer plusieurs jours dans un mélange d'alcool. La solution hydro-alcoolique va extraire les composants végétaux et ainsi se charger en principes actifs (ceux de la plante utilisée).</p>
            <button 
              className='garanty button-quality voir'
              onClick={() => handleCategoryClick('Teintures')}
            >
              Voir
            </button>
          </div>
          <div className='categoryImg'>
            <img src={Teintures} alt="Infusions" />
          </div>
        </div>
      

   
        <div className='category'>
          <div className='text'>
            <h2>Gemmothérapie</h2>
            <p>La gemmothérapie est une forme de phytothérapie qui utilise les tissus embryonnaires végétaux, c’est-à-dire les bourgeons, les jeunes pousses et les radicelles pour prévenir et adoucir les maux. Cette médecine douce est aussi connue sous le nom de « médecine des bourgeons » et provient du terme latin « gemmae ».</p>
            <button 
              className='garanty button-quality voir'
              onClick={() => handleCategoryClick('Gemmo')}
            >
              Voir
            </button>
          </div>
          <div className='categoryImg'>
            <img src={Gemmo} alt="gemmo"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;