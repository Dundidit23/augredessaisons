import React, { useContext, useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';
import ListProducts from '../components/products/ListProducts';
import CategoryFilter from '../components/categories/categoryFilter';
import './boutique.scss';

const Boutique = () => {
 const { products } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // const filterByCategory = (category) => {
  //   setFilteredProducts(products.filter(product => product.category === category));
  // };
  useEffect(() => {
    setFilteredProducts(products); // Mettre à jour la liste lorsque les produits changent
  }, [products]);

  const filterByCategory = (categoryId) => {
    if (categoryId) {
      setFilteredProducts(products.filter(product => product.category === categoryId));
    } else {
      setFilteredProducts(products); // Affiche tous les produits si aucune catégorie n'est sélectionnée
    }
  };

  return (
    <div className="boutique">
      <h2>La Boutique en ligne</h2>
      <div className="boutique-container">
        <CategoryFilter onSelectCategory={filterByCategory} />
        <ListProducts products={filteredProducts} isBoutiqueView={true} />      </div>
    </div>
  );
};

export default Boutique;