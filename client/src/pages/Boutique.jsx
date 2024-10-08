import React, { useState, useEffect, useContext } from 'react';
import './boutique.scss';
import AllProducts from '../components/products/AllProducts';
import { fetchProducts, fetchCategories } from '../services/api'; 
import { CategoryContext } from '../context/CategoryContext'; // Importation correcte du contexte

const Boutique = () => {
  const [products, setProducts] = useState([]); // Initialisation en tant que tableau
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const { categories } = useContext(CategoryContext); // Accès au contexte des catégories

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        console.log('Données récupérées:', data); // Log des données
        if (Array.isArray(data.products)) {
          setProducts(data.products); // Accédez à data.products
          setFilteredProducts(data.products);
        } else {
          console.error('Les données des produits ne sont pas un tableau:', data.products);
        }
      })
      .catch((err) => console.error('Erreur lors de la récupération des produits:', err));
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log('Type de products avant le filtre:', typeof products); // Log du type
    console.log('Valeur de products avant le filtre:', products); // Log de la valeur

    if (!categoryId) {
      setFilteredProducts(products); // Montre tous les produits
    } else {
      const filtered = products.filter((product) => product.category === categoryId); // Filtrage
      setFilteredProducts(filtered);
    }
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
            <li onClick={() => handleCategoryClick(null)}>Tous les produits</li>
            {categories.length > 0 ? (
              categories.map((category) => (
                <li key={category._id} onClick={() => handleCategoryClick(category._id)}>
                  {category.category} {/* Utilisez category.category au lieu de category.name */}
                </li>
              ))
            ) : (
              <li>Aucune catégorie disponible</li> // Affiche un message si aucune catégorie
            )}
          </ul>
        </aside>
        <div className='boutique__products'>
          <AllProducts products={filteredProducts} />
        </div>
      </section>
    </div>
  );
};

export default Boutique;
