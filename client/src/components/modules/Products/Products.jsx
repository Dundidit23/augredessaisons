import React from 'react'
import Infusion from '../../../assets/images/infusion.webp'
import Huiles from '../../../assets/images/huiles.webp'


import './products.scss'


const Products = () => {
  return (
    <div className='products'>
       <div className='decouvre'>
            <h2>Découvrez nos gammes de produits à base de plantes</h2>
       
        <div>
            <p>Une large gamme de produits à base de plantes médicinales, dont des tisanes, des huiles essentielles et des herbes et épices.</p>
            <button>Achetez →</button>
            </div>
        </div>
        <div className='byCategory'>
          <div className='category'>
            <div className='text'>
              <h2>Infusions</h2>
              <p>Nous proposons une grande variété de mélanges de tisanes délicieuses et apaisantes à base de plantes.</p>
            <button className='voir'>Voir</button>
            </div>
            <div className='categoryImg'>
              <img src={Infusion} alt="" />
            </div>
          </div>
        </div>

        <div className='byCategory'>
          <div className='category'>
            <div className='text'>
              <h2>Huiles</h2>
              <p>Nous proposons une grande variété de mélanges de tisanes délicieuses et apaisantes à base de plantes.</p>
            <button className='voir'>Voir</button>
            </div>
            <div className='categoryImg'>
              <img src={Huiles} alt="" />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Products