import React, { useState } from 'react';
import './boutique.scss';
import ProductList from '../components/products/ProductList';

const Boutique = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='boutique'>
    <div className='boutique__titre'>
    <h2>La Boutique en ligne</h2>
    <p>Consultez nos produits en ligne pour une meilleure expérience.</p>

    </div>
   
    <section className='boutique__container' >
    
    <aside className='boutique__sideBar'>
          <h3>Catégories</h3>
          <ul>
            {/* Replace with actual categories */}
            <li onClick={() => handleCategoryClick('Category 1')}>Category 1</li>
            <li onClick={() => handleCategoryClick('Category 2')}>Category 2</li>
            {/* Add more categories as needed */}
          </ul>
        </aside>
      <div className='boutique__products'>
      <ProductList category={selectedCategory} />
      </div>
    </section>
    <div className='productList'>
      < ProductList /> 
    </div>
    </div>
  )
}

export default Boutique