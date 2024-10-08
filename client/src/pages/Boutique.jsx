import React, { useState, useEffect } from 'react';
import './boutique.scss';
import AllProducts from '../components/products/AllProducts';
import { fetchProducts } from '../services/api'; // Assuming you have a fetchProducts function in your API service

const Boutique = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => console.error('Erreur lors de la récupération des produits:', err));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='boutique'>
      <div className='boutique__titre'>
        <h2>La Boutique en ligne</h2>
        <p>Consultez nos produits en ligne pour une meilleure expérience.</p>
      </div>
      <section className='boutique__container'>
        <aside className='boutique__sideBar'>
          <h3>Catégories</h3>
          <ul>
            <li onClick={() => handleCategoryClick('Category 1')}>Category 1</li>
            <li onClick={() => handleCategoryClick('Category 2')}>Category 2</li>
          </ul>
        </aside>
        <div className='boutique__products'>
          <AllProducts products={products} category={selectedCategory} />
        </div>
      </section>
    </div>
  );
};

export default Boutique;